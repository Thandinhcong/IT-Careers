import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../utils/pause";
import { IWorkingForm } from "../interfaces";

const workingFormApi = createApi({
    reducerPath: "workingForm",
    tagTypes: ['WorkingForm'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
        fetchFn: async (...arg) => {
            await pause(1000);
            return fetch(...arg)
        }
    }),
    endpoints: (builder) => ({
        getWorkingForm: builder.query<IWorkingForm[], void>({
            query: () => "/working-form",
            providesTags: ['WorkingForm']
        }),
        getWorkingFormById: builder.query<IWorkingForm, number | string>({
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
        updateWorkingForm: builder.mutation<IWorkingForm, IWorkingForm>({
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