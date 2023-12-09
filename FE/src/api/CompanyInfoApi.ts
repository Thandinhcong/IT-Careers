import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICompanyInfor } from "../interfaces";

const CompnayInfoApi = createApi({
  reducerPath: "company_information",
  tagTypes: ["company"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_COMPANYS,
    fetchFn: async (...arg) => {
      return fetch(...arg);
    },
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authCompany");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getInfor: builder.query<any, void>({
      query: () => "/company_information",
      providesTags: ["company"],
    }),
    editCompanyInfo: builder.mutation<any, any>({
      query: (company: ICompanyInfor) => ({
        url: `/company_information/`,
        method: "POST",
        body: company,
      }),
      invalidatesTags: ["company"],
    }),
  }),
});
export const {
  useGetInforQuery,
  useEditCompanyInfoMutation,
  // useDeleteCandidateMutation
} = CompnayInfoApi;

export const CompanyInfoReducer = CompnayInfoApi.reducer;

export default CompnayInfoApi;
