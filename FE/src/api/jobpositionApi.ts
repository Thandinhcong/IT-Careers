import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../utils/pause";
import { IJobposition, } from "../interfaces";

const jobpositionApi = createApi({
    reducerPath: "JobPosition",
    tagTypes: ['Jobposition'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
    }),
    endpoints: (builder) => ({
        getjobposition: builder.query<IJobposition[], void>({
            query: () => "/job_position",
            providesTags: ['Jobposition']
        }),
        getjobpositionById: builder.query<IJobposition, number | string>({
            query: (id) => "/job_position/" + id,
            providesTags: ['Jobposition']
        }),
        addjobposition: builder.mutation({
            query: (jobposition: IJobposition) => ({
                url: "/job_position",
                method: "POST",
                body: jobposition
            }),
            invalidatesTags: ['Jobposition']
        }),
        updatejobposition: builder.mutation<IJobposition, IJobposition>({
            query: (jobposition: IJobposition) => ({
                url: `/job_position/${jobposition.id}`,
                method: "PUT",
                body: jobposition
            }),
            invalidatesTags: ['Jobposition']
        }),
        deletejobposition: builder.mutation<{ id: number }, number>({
            query: (id) => ({
                url: `/job_position/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Jobposition']
        }),
    })
})
export const {
    useAddjobpositionMutation,
    useGetjobpositionByIdQuery,
    useGetjobpositionQuery,
    useDeletejobpositionMutation,
    useUpdatejobpositionMutation
} = jobpositionApi;

export const JoppositionFormReducer = jobpositionApi.reducer;

export default jobpositionApi;