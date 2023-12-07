import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const StatisicalcompanyApi = createApi({
  reducerPath: "statisicalcompanyApi",
  tagTypes: ["StatisicalcompanyApi"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_COMPANYS,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authCompany");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
    fetchFn: (...arg) => {
      return fetch(...arg);
    },
  }),
  endpoints: (builder) => ({
    getSatisicalJob: builder.query<any, void>({
      query: () => "/dashboard",
      providesTags: ["StatisicalcompanyApi"],
    }),
  }),
});
export const { useGetSatisicalJobQuery } = StatisicalcompanyApi;

export const StatisicalcompanyApiReducer = StatisicalcompanyApi.reducer;
export default StatisicalcompanyApi;
