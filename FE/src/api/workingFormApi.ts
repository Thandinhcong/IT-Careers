import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../utils/pause";
import { IWorkingForm } from "../interfaces";

export interface IWorkingFormAll {
    status: number,
    workingForm: IWorkingForm[]
}
export interface IWorkingFormOne {
    status: number,
    workingForm: IWorkingForm
}
const workingFormApi = createApi({
    reducerPath: "workingForm",
    tagTypes: ['WorkingForm'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_ADMIN,

        fetchFn: async (...arg) => {
            await pause(1000);
            return fetch(...arg)
        },
        prepareHeaders: (headers) => {
            const user = JSON.parse(localStorage.getItem("admin") as string);
            const token = user?.accessToken;
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),

    endpoints: (builder) => ({
        getWorkingForm: builder.query<IWorkingFormAll, void>({
            query: () => "/working-form",
            providesTags: ['WorkingForm']
        }),
        getWorkingFormById: builder.query<IWorkingFormOne, number | string>({
            query: (id) => "/working-form/" + id,
            providesTags: ['WorkingForm']
        }),
        addWorkingForm: builder.mutation({
            query: (workingForm: IWorkingForm) => ({
                url: "/working-form",
                method: "POST",
                body: workingForm
            }),
            invalidatesTags: ['WorkingForm']
        }),
        updateWorkingForm: builder.mutation<IWorkingFormOne, any>({
            query: (workingForm: IWorkingForm) => ({
                url: `/working-form/${workingForm.id}`,
                method: "PUT",
                body: workingForm
            }),
            invalidatesTags: ['WorkingForm']
        }),
        deleteWorkingForm: builder.mutation<{ id: number }, number>({
            query: (id) => ({
                url: `/working-form/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['WorkingForm']
        }),
    })
})
export const {
    useGetWorkingFormQuery,
    useGetWorkingFormByIdQuery,
    useAddWorkingFormMutation,
    useUpdateWorkingFormMutation,
    useDeleteWorkingFormMutation
} = workingFormApi;

export const workingFormReducer = workingFormApi.reducer;

export default workingFormApi;