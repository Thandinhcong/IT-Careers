import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAccount } from "../interfaces";

export interface IAccountAll {
  status?: string;
  data: IAccount[];
}
const AccountsApi = createApi({
  reducerPath: "candidate_information",
  tagTypes: ["Candidates"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_CANDIDATE,
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem("user") as string);
      const token = user?.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCandidates: builder.query<any, void>({
      query: () => "/candidate_information",
      providesTags: ["Candidates"],
    }),
    editCandidate: builder.mutation({
      query: (candidate: IAccount) => ({
        url: `/candidate_information/`,
        method: "POST",
        body: candidate,
      }),
      invalidatesTags: ["Candidates"],
    }),
    changePassCandidate: builder.mutation({
      query: (candidate: IAccount) => ({
        url: `/refreshPass`,
        method: "POST",
        body: candidate,
      }),
      invalidatesTags: ["Candidates"],
    }),
    deleteCandidate: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `/candidates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Candidates"],
    }),
  }),
});
export const {
  useGetCandidatesQuery,
  useEditCandidateMutation,
  useDeleteCandidateMutation,
  useChangePassCandidateMutation,
} = AccountsApi;

export const AccountReducer = AccountsApi.reducer;

export default AccountsApi;
