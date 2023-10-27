import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IJobPost } from "../interfaces";
const JobPostApi = createApi({
    reducerPath: "job-post",
    tagTypes: ['job-post'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
        // prepareHeaders: (headers) => {
        //     const token = localStorage.getItem('accessToken');
        //     if (token) {
        //         headers.set('Authorization', `Bearer ${token}`);
        //     }
        // },
        fetchFn: (...arg) => {
            return fetch(...arg)
        }
    }),
    endpoints: (builder) => ({
        getJobPost: builder.query<IJobPost[], void>({
            query: () => "/job_post",
            providesTags: ['job-post']
        }),
        getInfor: builder.query<[], void>({
            query: () => "/company/company_information",
            providesTags: ['job-post']
        }),
        getJobPostById: builder.query<IJobPost, number | string>({
            query: (id) => "/job_post/" + id,
            providesTags: ['job-post']
        }),
        getJobPostSelectById: builder.query<[], void>({
            query: () => "/job_post_select",
            providesTags: ['job-post']
        }),
        addJobPost: builder.mutation({
            query: (job_post: IJobPost) => ({
                url: "/job_post",
                method: "POST",
                body: job_post
            }),
            invalidatesTags: ['job-post']
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