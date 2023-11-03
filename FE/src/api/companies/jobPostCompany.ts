import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IJobPost } from "../../interfaces";
const JobPostCompanyApi = createApi({
    reducerPath: "job_post",
    tagTypes: ['job_post'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
        },
        fetchFn: (...arg) => {
            return fetch(...arg)
        },
    }),
    endpoints: (builder) => ({
        getJobPostByIdCompany: builder.query<IJobPost, void>({
            query: () => "/company/job_post",
            providesTags: ['job_post']
        }),
        getJobPostExpiresByIdCompany: builder.query<IJobPost, void>({
            query: () => "/company/job_post_expires",
            providesTags: ['job_post']
        }),
        getJobPostByIdCompanyId: builder.query<IJobPost, number | string>({
            query: (id) => "/company/job_post/" + id,
            providesTags: ['job_post']
        }),
        getInfor: builder.query<[], void>({
            query: () => "/company/company_information",
            providesTags: ['job_post']
        }),
        getJobPostSelectById: builder.query<[], void>({
            query: () => "/company/job_post_select",
            providesTags: ['job_post']
        }),
        addJobPost: builder.mutation({
            query: (job_post: IJobPost) => ({
                url: "/company/job_post",
                method: "POST",
                body: job_post
            }),
            invalidatesTags: ['job_post']
        }),
        editJobPost: builder.mutation<IJobPost, IJobPost>({
            query: (job_post: IJobPost) => ({
                url: `/company/job_post/${job_post.id}`,
                method: "PUT",
                body: job_post
            }),
            invalidatesTags: ['job_post']
        }),
        extendJobPost: builder.mutation<IJobPost, IJobPost>({
            query: (job_post: IJobPost) => ({
                url: `/company/extend_job_post/${job_post.id}`,
                method: "POST",
                body: job_post
            }),
            invalidatesTags: ['job_post']
        }),
        stopJobPost: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/company/stop_job_post/${id}`,
                method: "POST",
            }),
            invalidatesTags: ['job_post']
        }),
        getCvApllyByIdJobPostId: builder.query<IJobPost, number | string>({
            query: (id) => "/candidate_detail/" + id,
            providesTags: ['job_post']
        }),
    })
})
export const {
    useGetJobPostByIdCompanyQuery,
    useGetJobPostByIdCompanyIdQuery,
    useAddJobPostMutation,
    useEditJobPostMutation,
    useGetJobPostSelectByIdQuery,
    useGetInforQuery,
    useExtendJobPostMutation,
    useStopJobPostMutation,
    useGetCvApllyByIdJobPostIdQuery,
    useGetJobPostExpiresByIdCompanyQuery
} = JobPostCompanyApi;

export const jobPostCompanyReducer = JobPostCompanyApi.reducer;
export default JobPostCompanyApi;