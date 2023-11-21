import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISaveJobs } from "../interfaces";

export interface IJobSaveList {
  status: number;
  listsave: IListSaveJobs[];
}

export interface IListSaveJobs {
  id?: string | number;
  title: string;
  min_salary: number;
  max_salary: number;
  company_name: string;
  logo: string;
  area: string;
  status: number;
  province: string;
  district: string;
  end_date: string;
}
const SavejobsApi = createApi({
  reducerPath: "savejobs",
  tagTypes: ["SaveJobs"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/candidate/",
    fetchFn: async (...arg) => {
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
  endpoints: (buidler) => ({
    getAllSaveJobs: buidler.query<IJobSaveList, void>({
      query: () => "show_save_job_post",
      providesTags: ["SaveJobs"],
    }),
    addSaveJobs: buidler.mutation({
      query: (data) => ({
        url: `save_job_post/${data?.id}`,
        method: "POST",
      }),
      invalidatesTags: ["SaveJobs"],
    }),
    unsaveJob: buidler.mutation({
      query: (savejobs: ISaveJobs | any) => ({
        url: `cancel_save_job_post/${savejobs.id}`,
        method: "POST",
        body: savejobs,
      }),
      invalidatesTags: ["SaveJobs"],
    }),
  }),
});
export const {
  useAddSaveJobsMutation,
  useGetAllSaveJobsQuery,
  useUnsaveJobMutation,
} = SavejobsApi;
export const SaveJobsReducer = SavejobsApi.reducer;
export default SavejobsApi;
