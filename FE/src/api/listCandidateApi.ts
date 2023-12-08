import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICompanyInfor } from "../interfaces";

const candidateApi = createApi({
  reducerPath: "ListCandidate",
  tagTypes: ["list_candidate"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    fetchFn: async (...arg) => {
      return fetch(...arg);
    },
  }),
  endpoints: (builder) => ({
    getCompanySetting: builder.query<ICompanyInfor[], void>({
      query: () => "/list_company",
      providesTags: ["list_candidate"],
    }),
    getCompanySettingById: builder.query<ICompanyInfor, number | string>({
      query: (id) => "/list_company/" + id,
      providesTags: ["list_candidate"],
    }),

    editCompanySetting: builder.mutation<ICompanyInfor, ICompanyInfor>({
      query: (company: ICompanyInfor) => ({
        url: `/list_company/${company.id}`,
        method: "PUT",
        body: company,
      }),
      invalidatesTags: ["list_candidate"],
    }),
  }),
});
export const {
  useGetCompanySettingQuery,
  useGetCompanySettingByIdQuery,
  useEditCompanySettingMutation,
} = candidateApi;

export const candidateReducer = candidateApi.reducer;

export default candidateApi;
