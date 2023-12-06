import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPackages } from "../../interfaces";

const PackagesCompanyApi = createApi({
  reducerPath: "Package",
  tagTypes: ["Package"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/company",
    prepareHeaders: (headers) => {
      const localStorageToken = localStorage.getItem("authCompany");
      if (localStorageToken) {
        headers.set("Authorization", `Bearer ${localStorageToken}`);
        return;
      }

      const cookieToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authCompany="))
        ?.split("=")[1];

      if (cookieToken) {
        headers.set("Authorization", `Bearer ${cookieToken}`);
      }
    },
    fetchFn: (...arg) => {
      return fetch(...arg);
    },
  }),
  endpoints: (builder) => ({
    getAllPackage: builder.query<IPackages | any, void>({
      query: () => "/get_list_package",
      providesTags: ["Package"],
    }),

    vnpayReturn: builder.query<any, any>({
      query: (param) => "/vnpay_return" + param,
      providesTags: ["Package"],
    }),
    vnpayIpn: builder.query<any, any>({
      query: (param) => "/vnpay_ipn" + param,
      providesTags: ["Package"],
    }),
    getAllHistoryPayments: builder.query<any, void>({
      query: () => "/history_payment",
      providesTags: ["Payments"],
    }),
    insertInvoice: builder.mutation<any, any>({
      query: (Package: IPackages) => ({
        url: "/insert_invoice",
        method: "POST",
        body: Package,
      }),
      invalidatesTags: ["Package"],
    }),
    payMent: builder.mutation<any, any>({
      query: (Package: IPackages) => ({
        url: "/payment",
        method: "POST",
        body: Package,
      }),
      invalidatesTags: ["Package"],
    }),
  }),
});
export const {
  useGetAllHistoryPaymentsQuery,
  useGetAllPackageQuery,
  useInsertInvoiceMutation,
  usePayMentMutation,
  useVnpayReturnQuery,
  useVnpayIpnQuery,
} = PackagesCompanyApi;

export const packageCompanyReducer = PackagesCompanyApi.reducer;
export default PackagesCompanyApi;
