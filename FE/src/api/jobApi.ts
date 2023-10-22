import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IListDataJobs, IListJobs, IListOneJobs } from "../interfaces";

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
        getAllJobs: buidler.query<IListDataJobs, void>({
            query: () => "/job_list",
            providesTags: ['Jobs']
        }),
        getOneJobs: buidler.query<IListOneJobs, number | string>({
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