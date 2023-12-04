import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const HistoryPaymentApi = createApi({
  reducerPath: "payments",
  tagTypes: ["Payments"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_COMPANYS,
    prepareHeaders: (headers) => {
      const localStorageToken = localStorage.getItem("authCompany");
      if (localStorageToken) {
        headers.set("Authorization", `Bearer ${localStorageToken}`);
        return;
      }
      return headers;
    },
    fetchFn: (...arg) => {
      return fetch(...arg);
    },
  }),
  endpoints: (builder) => ({
    getAllPayments: builder.query<any, void>({
      query: () => "/history_payment",
      providesTags: ["Payments"],
    }),
  }),
});
export const { useGetAllPaymentsQuery } = HistoryPaymentApi;

export const HistoryPaymentReducer = HistoryPaymentApi.reducer;
export default HistoryPaymentApi;
