import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const StatisticalApi = createApi({
  reducerPath: "statisticalApi",
  tagTypes: ["StatisticalApi"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ADMIN,
    fetchFn: async (...arg) => {
      return fetch(...arg);
    },
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("admin");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    rev_statistical: builder.query<any, any>({
      query: () => "/rev-sta",
      providesTags: ["StatisticalApi"],
    }),
  }),
});
export const { useLazyRev_statisticalQuery } = StatisticalApi;

export const StatisticalReducer = StatisticalApi.reducer;

export default StatisticalApi;
