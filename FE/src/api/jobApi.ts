import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IListOneJob } from "../interfaces";

export interface IJobList {
    status: number
    job_list: IListJobs[],
}
export interface IListJobs {
    id?: string | number,
    title: string,
    min_salary: number,
    max_salary: number,
    company_name: string,
    logo: string
    area: string
    status: number,
    province: string,
    district: string,
    end_date: string
}
const jobsApi = createApi({
    reducerPath: "jobs",
    tagTypes: ['Jobs'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/",
        fetchFn: async (...arg) => {
            return fetch(...arg)
        }
    }),
    endpoints: (buidler) => ({
        getAllJobs: buidler.query<IJobList, void>({
            query: () => "/job_list",
            providesTags: ['Jobs']
        }),
        getOneJobs: buidler.query<IListOneJob, string>({
            query: (id) => "/job_detail/" + id,
            providesTags: ['Jobs']
        }),
    })
})
export const {
    useGetAllJobsQuery,
    useGetOneJobsQuery
} = jobsApi;
export const JobsReducer = jobsApi.reducer;
export default jobsApi;