import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../utils/pause";
import { IWorkingForm } from "../interfaces";

const workingFormApi = createApi({
    reducerPath: "workingForm",
    tagTypes: ['WorkingForm'],
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.API_URL,
        fetchFn: async (...arg) => {
            await pause(1000);
            return fetch(...arg)
        }
    }),
    endpoints: (builder) => ({
        getWorkingForm: builder.query<IWorkingForm[], void>({
            query: () => "/working_form",
            providesTags: ['WorkingForm']
        }),
        getWorkingFormById: builder.query<IWorkingForm, number | string>({
            query: (id) => "/working_form/" + id,
            providesTags: ['WorkingForm']
        }),
        addWorkingForm: builder.mutation({
            query: (workingForm: IWorkingForm) => ({
                url: "/working_form",
                method: "POST",
                body: workingForm
            }),
            invalidatesTags: ['WorkingForm']
        }),
        updateWorkingForm: builder.mutation<IWorkingForm, IWorkingForm>({
            query: (workingForm: IWorkingForm) => ({
                url: `/working_form/${workingForm.id}`,
                method: "PUT",
                body: workingForm
            }),
            invalidatesTags: ['WorkingForm']
        }),
        deleteWorkingForm: builder.mutation<{ id: number }, number>({
            query: (id) => ({
                url: `/working_form/${id}`,
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