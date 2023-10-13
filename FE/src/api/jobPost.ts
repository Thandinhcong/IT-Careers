import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IJobPost } from "../interfaces";

const JobPostApi = createApi({
    reducerPath: "job-post",
    tagTypes: ['job-post'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
        fetchFn: async (...arg) => {
            return fetch(...arg)
        }
    }),
    endpoints: (builder) => ({
        getJobPost: builder.query<IJobPost[], void>({
            query: () => "/job-post",
            providesTags: ['job-post']
        }),
        getJobPostById: builder.query<IJobPost, number | string>({
            query: (id) => "/job-post/" + id,
            providesTags: ['job-post']
        }),
        // addSkill: builder.mutation({
        //     query: (skill: ISkill) => ({
        //         url: "/job-post",
        //         method: "POST",
        //         body: skill
        //     }),
        //     invalidatesTags: ['job-post']
        // }),
        editJobPost: builder.mutation<IJobPost, IJobPost>({
            query: (jobPost: IJobPost) => ({
                url: `/job-post/${jobPost.id}`,
                method: "PUT",
                body: jobPost
            }),
            invalidatesTags: ['job-post']
        }),
        // deleteSkill: builder.mutation<void, number | string>({
        //     query: (id) => ({
        //         url: `/skill/${id}`,
        //         method: "DELETE",
        //     }),
        //     invalidatesTags: ['skill']
        // }),
        editJobPostStatus: builder.mutation<IJobPost, { id: number | string, status: number }>({
            query: ({ id, status }) => ({
                url: `/job-post/${id}`,
                method: "PUT",  // Sử dụng PATCH request để cập nhật trường dữ liệu
                body: { status },  // Gửi trường dữ liệu status cần cập nhật
            }),
            invalidatesTags: ['job-post']
        }),

    })
})
export const {
    useGetJobPostQuery,
    useGetJobPostByIdQuery,
    // useAddSkillMutation,
    useEditJobPostMutation,
    // useDeleteSkillMutation
    useEditJobPostStatusMutation
} = JobPostApi;

export const jobPostReducer = JobPostApi.reducer;
export default JobPostApi;