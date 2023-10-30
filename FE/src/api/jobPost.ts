import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IJobPost, IListOneJobs } from "../interfaces";
const JobPostApi = createApi({
    reducerPath: "job-post",
    tagTypes: ['job-post'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/admin",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
        },
        fetchFn: (...arg) => {
            return fetch(...arg)
        }
    }),
    endpoints: (builder) => ({
        getJobPost: builder.query<IJobPost[], void>({
            query: () => "/job-post",
            providesTags: ['job-post']
        }),
        getJobPostById: builder.query<IListOneJobs, number | string>({
            query: (id) => `/job_detail/${id}`,
            providesTags: ['job-post']
        }),
        editJobPostStatus: builder.mutation<IJobPost, { id: number | string, status: number }>({
            query: ({ id, status }) => ({
                url: `/job-post/${id}`,
                method: "PUT",
                body: { status },
            }),
            invalidatesTags: ['job-post']
        }),
    })
})
export const {
    useGetJobPostQuery,
    useGetJobPostByIdQuery,
    useEditJobPostStatusMutation,
} = JobPostApi;

export const jobPostReducer = JobPostApi.reducer;
export default JobPostApi;