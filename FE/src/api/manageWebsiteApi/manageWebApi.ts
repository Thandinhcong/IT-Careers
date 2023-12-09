import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IExperienceAll } from "../experienceApi";

const manageWebAllApi = createApi({
  reducerPath: "listMana",
  tagTypes: ["ListMana"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
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
    getDistrict: builder.query({
      query: () => "/job_post_select",
      providesTags: ["ListMana"],
    }),
  }),
});
export const {
  useGetInfoManaWebsiteQuery,
  useGetMajorQuery,
  useGetExperienceQuery,
  useGetDistrictQuery,
} = manageWebAllApi;

export const manageWebAllApiReducer = manageWebAllApi.reducer;

export default manageWebAllApi;
