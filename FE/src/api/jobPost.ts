import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IJobPost } from "../interfaces";
export interface IJobPosts {
  status?: string;
  jobPost: IJobPost[];
}
const JobPostApi = createApi({
  reducerPath: "job-post",
  tagTypes: ["job-post"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ADMIN,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    fetchFn: (...arg) => {
      return fetch(...arg);
    },
  }),
  endpoints: (builder) => ({
    getJobPost: builder.query<IJobPosts | any, void>({
      query: () => "/job-post",
      providesTags: ["job-post"],
    }),
    getJobPostById: builder.query<any, number | string>({
      query: (id) => `/job_detail/${id}`,
      providesTags: ["job-post"],
    }),
    editJobPostStatus: builder.mutation<
      IJobPost,
      { id: number | string; status: number }
    >({
      query: ({ id, status }) => ({
        url: `/job-post/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["job-post"],
    }),
  }),
});
export const {
  useGetJobPostQuery,
  useGetJobPostByIdQuery,
  useEditJobPostStatusMutation,
} = JobPostApi;

export const jobPostReducer = JobPostApi.reducer;
export default JobPostApi;
