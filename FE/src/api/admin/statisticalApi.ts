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
      const user = JSON.parse(localStorage.getItem("admin") as string);
      const token = user?.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    rev_statistical: builder.query<any, void>({
      query: () => "/rev-sta",
      providesTags: ["StatisticalApi"],
    }),
  }),
});
export const { useRev_statisticalQuery } = StatisticalApi;

export const StatisticalReducer = StatisticalApi.reducer;

export default StatisticalApi;
