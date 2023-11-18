import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const findJobApi = createApi({
  reducerPath: "findJob",
  tagTypes: ["FindJob"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/candidate",

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
  }),
});
export const { useFindJobsMutation } = findJobApi;
export const findJobReducer = findJobApi.reducer;
export default findJobApi;
