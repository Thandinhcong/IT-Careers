import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const findJobApi = createApi({
  reducerPath: "findJob",
  tagTypes: ["FindJob"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/candidate",
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
  }),
});
export const {
  useFindJobsMutation,
  useGetInfoUserQuery,
  useSaveInfoFindJobMutation,
  useGetDataFindJobQuery,
  useGetInfoFindJobQuery,
} = findJobApi;
export const findJobReducer = findJobApi.reducer;
export default findJobApi;
