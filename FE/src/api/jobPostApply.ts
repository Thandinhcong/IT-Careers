import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IJobPostApply {
  id?: number | undefined;
  path_cv: string;
  email: string;
  phone: string;
  name: string;
  job_list: Array<string>;
  introduce: string;
  candidate_id?: number | string;
  curriculum_vitae_id?: string;
}
const jobPostApply = createApi({
  reducerPath: "jobPostApply",
  tagTypes: ["JobPostApply"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_CANDIDATE,
    fetchFn: (...arg) => {
      return fetch(...arg);
    },
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem("user") as string);
      const token = user?.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getJobApply: builder.query<IJobPostApply | any, void>({
      query: () => "/job_apply",
      providesTags: ["JobPostApply"],
    }),
    applyJob: builder.mutation({
      query: (data: IJobPostApply | any) => ({
        url: `/candidate_apply/${data?.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["JobPostApply"],
    }),
  }),
});
export const { useApplyJobMutation, useGetJobApplyQuery } = jobPostApply;
export default jobPostApply;
export const JobPostApplyReducer = jobPostApply.reducer;
