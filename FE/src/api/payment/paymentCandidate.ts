import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPackages } from "../../interfaces";

const PackagesCandidateApi = createApi({
  reducerPath: "packageCandidate",
  tagTypes: ["PackageCandidate"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_CANDIDATE,
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem("user") as string);
      const token = user?.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      const cookieToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user="))
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
      providesTags: ["PackageCandidate"],
    }),
    getHistoryPayment: builder.query<any, void>({
      query: () => "/history_payment",
      providesTags: ["PackageCandidate"],
    }),

    vnpayReturn: builder.query<any, any>({
      query: (param) => "/vnpay_return" + param,
      providesTags: ["PackageCandidate"],
    }),
    vnpayIpn: builder.query<any, any>({
      query: (param) => "/vnpay_ipn" + param,
      providesTags: ["PackageCandidate"],
    }),
    getAllHistoryPayments: builder.query<any, void>({
      query: () => "/history_payment",
      providesTags: ["PackageCandidate"],
    }),
    insertInvoice: builder.mutation<any, any>({
      query: (Package: IPackages) => ({
        url: "/insert_invoice",
        method: "POST",
        body: Package,
      }),
      invalidatesTags: ["PackageCandidate"],
    }),
    payMent: builder.mutation<any, any>({
      query: (Package: IPackages) => ({
        url: "/payment",
        method: "POST",
        body: Package,
      }),
      invalidatesTags: ["PackageCandidate"],
    }),
    getInfoUsers: builder.query<any, void>({
      query: () => "/candidate_information",
      providesTags: ["PackageCandidate"],
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
  useGetHistoryPaymentQuery,
  useGetInfoUsersQuery,
} = PackagesCandidateApi;

export const packageCandidateReducer = PackagesCandidateApi.reducer;
export default PackagesCandidateApi;
