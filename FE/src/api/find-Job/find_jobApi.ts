import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const findJobApi = createApi({
  reducerPath: "findJob",
  tagTypes: ["FindJob"],
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
  endpoints: (buidler) => ({
    findJobs: buidler.mutation<any, void>({
      query: (credentials) => ({
        url: "/find_job",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["FindJob"],
    }),
    getInfoUser: buidler.query<any, void>({
      query: () => "/candidate_information",
      providesTags: ["FindJob"],
    }),
    SaveInfoFindJob: buidler.mutation<any, void>({
      query: (credentials) => ({
        url: "/save_info_find_job",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["FindJob"],
    }),
    getDataFindJob: buidler.query<any, void>({
      query: () => "/get_data_find_job",
      providesTags: ["FindJob"],
    }),
    getInfoFindJob: buidler.query<any, void>({
      query: () => "/get_info_find_job",
      providesTags: ["FindJob"],
    }),
    ProfileToTop: buidler.mutation<any, any>({
      query: () => ({
        url: "/profile_to_top",
        method: "GET",
      }),
      invalidatesTags: ["FindJob"],
    }),
    dataFastJob: buidler.query<any, void>({
      query: () => "/data_fast_job",
      providesTags: ["FindJob"],
    }),
    findJobFast: buidler.mutation<any, any>({
      query: (data) => ({
        url: "/find_job_fast",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FindJob"],
    }),
  }),
});
export const {
  useFindJobsMutation,
  useGetInfoUserQuery,
  useSaveInfoFindJobMutation,
  useGetDataFindJobQuery,
  useGetInfoFindJobQuery,
  useProfileToTopMutation,
  useDataFastJobQuery,
  useFindJobFastMutation,
} = findJobApi;
export const findJobReducer = findJobApi.reducer;
export default findJobApi;
