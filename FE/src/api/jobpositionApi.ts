import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IJobposition, } from "../interfaces";

export interface IJobpositionALL {
    status: string,
    Job_position: IJobposition[]
}
export interface IJobpositionOne {
    status: string,
    Job_position: IJobposition
}
const jobpositionApi = createApi({
    reducerPath: "JobPosition",
    tagTypes: ['Jobposition'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_ADMIN,
        prepareHeaders: (headers) => {
            const user = JSON.parse(localStorage.getItem("admin") as string);
            const token = user?.accessToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        },
    }),
    endpoints: (builder) => ({
        getjobposition: builder.query<IJobpositionALL, void>({
            query: () => "/job_position",
            providesTags: ['Jobposition']
        }),
        getjobpositionById: builder.query<IJobpositionOne, any>({
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
        updatejobposition: builder.mutation<IJobpositionOne, any>({
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