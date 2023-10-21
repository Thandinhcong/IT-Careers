import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IJobPost } from "../interfaces";
const JobPostApi = createApi({
    reducerPath: "job-post",
    tagTypes: ['job-post'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
        // prepareHeaders: (headers) => {
        //     // Lấy token từ store
        //     const token = localStorage.getItem('accessToken');
        //     // const token = JSON.parse(localStorage.getItem("accessToken") as string);
        //     console.log(token);

        //     // Gán token vào tiêu đề "Authorization"
        //     if (token) {
        //         headers.set('Authorization', `Bearer ${token}`);
        //         console.log(headers.get('Authorization'));
        //     }
        // },
        // fetchFn: (...arg) => {
        //     return fetch(...arg)
        // }
    }),
    endpoints: (builder) => ({
        getJobPost: builder.query<IJobPost[], void>({
            query: () => "/job-post",
            providesTags: ['job-post']
        }),
        getInfor: builder.query<[], void>({
            query: () => "/company/company_information",
            providesTags: ['job-post']
        }),
        getJobPostById: builder.query<IJobPost, number | string>({
            query: (id) => "/job-post/" + id,
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
        editJobPost: builder.mutation<IJobPost, IJobPost>({
            query: (jobPost: IJobPost) => ({
                url: `/job-post/${jobPost.id}`,
                method: "PUT",
                body: jobPost
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
    useAddJobPostMutation,
    useEditJobPostMutation,
    // useDeleteSkillMutation
    useEditJobPostStatusMutation,
    useGetJobPostSelectByIdQuery,
    useGetInforQuery
} = JobPostApi;

export const jobPostReducer = JobPostApi.reducer;
export default JobPostApi;