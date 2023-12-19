import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IJobPost } from "../interfaces";
export interface IJobPosts {
  status?: string;
  jobPost: IJobPost[];
  assess_admin?: string;
}
const JobPostApi = createApi({
  reducerPath: "job-post",
  tagTypes: ["Job-post"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ADMIN,
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem("admin") as string);
      const token = user?.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
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
      providesTags: ["Job-post"],
    }),
    getJobPostById: builder.query<any, number | string>({
      query: (id) => `/job_detail/${id}`,
      providesTags: ["Job-post"],
    }),
    editJobPostStatus: builder.mutation<
      IJobPost,
      { id: number | string; status: number; assess_admin: string }
    >({
      query: ({ id, status, assess_admin }) => ({
        url: `/job-post/${id}`,
        method: "PUT",
        body: { status, assess_admin },
      }),
      invalidatesTags: ["Job-post"],
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
