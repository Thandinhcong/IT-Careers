import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IListOneJob } from "../interfaces";

export interface IJobList {
  status: number;
  job_list: IListJobs[];
}
export interface IListJobs {
  id?: string | number;
  title: string;
  min_salary: string | number;
  max_salary: string | number;
  company_name: string;
  logo: string;
  area: string;
  status: number;
  province: string;
  district: string;
  end_date: string;
  desc: string;
  start_date: string;
}
const jobsApi = createApi({
  reducerPath: "jobs",
  tagTypes: ["Jobs"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    fetchFn: async (...arg) => {
      return fetch(...arg);
    },
  }),
  endpoints: (buidler) => ({
    getAllJobs: buidler.query<IJobList, void>({
      query: () => "/job_list",
      providesTags: ["Jobs"],
    }),
    getOneJobs: buidler.query<IListOneJob, string>({
      query: (id) => "/job_detail/" + id,
      providesTags: ["Jobs"],
    }),
  }),
});
export const { useGetAllJobsQuery, useGetOneJobsQuery } = jobsApi;
export const JobsReducer = jobsApi.reducer;
export default jobsApi;
