import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../utils/pause";
import { ICompanys } from "../interfaces";

export interface ICompanyAll {
  status: string;
  data: ICompanys[];
}
export interface ICompanyOne {
  status: string;
  data: ICompanys;
}
const companysApi = createApi({
  reducerPath: "Company",
  tagTypes: ["company"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ADMIN,
    fetchFn: async (...arg) => {
      await pause(1000);
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
    getcompanys: builder.query<ICompanyAll, void>({
      query: () => "/company-management",
      providesTags: ["company"],
    }),
    getcompanysById: builder.query<ICompanys, number | string>({
      query: (id) => "/company-management/" + id,
      providesTags: ["company"],
    }),
    updateStatuscompanys: builder.mutation<ICompanyOne, any>({
      query: (companys: ICompanys) => ({
        url: `/company-management/${companys.id}`,
        method: "PUT",
        body: companys,
      }),
      invalidatesTags: ["company"],
    }),
    deletecompanys: builder.mutation<{ id: number }, number>({
      query: (id) => ({
        url: `/company-management/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["company"],
    }),
  }),
});
export const {
  useGetcompanysQuery,
  useGetcompanysByIdQuery,
  // useAddcompanysMutation,
  useDeletecompanysMutation,
  useUpdateStatuscompanysMutation,
} = companysApi;

export const companysReducer = companysApi.reducer;

export default companysApi;
