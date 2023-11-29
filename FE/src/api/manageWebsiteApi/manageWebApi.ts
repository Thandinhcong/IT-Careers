import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IExperienceAll } from "../experienceApi";

const manageWebAllApi = createApi({
  reducerPath: "listMana",
  tagTypes: ["ListMana"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/",
    fetchFn: async (...arg) => {
      return fetch(...arg);
    },
  }),
  endpoints: (builder) => ({
    getInfoManaWebsite: builder.query<any, void>({
      query: () => "/web_tt",
      providesTags: ["ListMana"],
    }),
    getMajor: builder.query<any, void>({
      query: () => "/major",
      providesTags: ["ListMana"],
    }),
    getExperience: builder.query<IExperienceAll, void>({
      query: () => "/experience",
      providesTags: ["ListMana"],
    }),
  }),
});
export const {
  useGetInfoManaWebsiteQuery,
  useGetMajorQuery,
  useGetExperienceQuery,
} = manageWebAllApi;

export const manageWebAllApiReducer = manageWebAllApi.reducer;

export default manageWebAllApi;
