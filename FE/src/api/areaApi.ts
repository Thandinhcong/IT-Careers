import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const AreaApi = createApi({
  reducerPath: "areaApi",
  tagTypes: ["AreaApi"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    fetchFn: async (...arg) => {
      return fetch(...arg);
    },
  }),
  endpoints: (builder) => ({
    getAreaAll: builder.query<any, void>({
      query: () => "/location_work",
      providesTags: ["AreaApi"],
    }),
  }),
});
export const { useGetAreaAllQuery } = AreaApi;

export const areaApiReducer = AreaApi.reducer;

export default AreaApi;
