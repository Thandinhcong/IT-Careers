import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IListData, IListOneCompany } from "../interfaces";
export interface IJobPostAll {
  status?: string;
  list_company: IListData[];
}

const companyApi = createApi({
  reducerPath: "companys",
  tagTypes: ["Companys"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    fetchFn: async (...arg) => {
      return fetch(...arg);
    },
  }),
  endpoints: (buidler) => ({
    getAllCompanys: buidler.query<IListData, void>({
      query: () => "/list_company",
      providesTags: ["Companys"],
    }),
    getOneCompanys: buidler.query<IListOneCompany | any, number | string>({
      query: (id) => "/list_company/" + id,
      providesTags: ["Companys"],
    }),
    searchCompanies: buidler.query<any, void>({
      query: () => "list_company",
      providesTags: ["Companys"],
    }),
  }),
});
export const {
  useGetAllCompanysQuery,
  useGetOneCompanysQuery,
  useSearchCompaniesQuery,
} = companyApi;
export const companyReducer = companyApi.reducer;
export default companyApi;
