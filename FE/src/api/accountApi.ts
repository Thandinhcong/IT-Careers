import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAccount } from "../interfaces";

const AccountApi = createApi({
    reducerPath: "candidates",
    tagTypes: ['candidates'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
        fetchFn: async (...arg) => {
            return fetch(...arg)
        }
    }),
    endpoints: (builder) => ({
        getCandidates: builder.query<IAccount[], void>({
            query: () => "/candidates",
            providesTags: ['candidates']
        }),
        getCandidateById: builder.query<IAccount, number | string>({
            query: (id) => `/candidates/${id}`,
            providesTags: ['candidates']
        }),
        editCandidate: builder.mutation<IAccount, IAccount>({
            query: (candidate: IAccount) => ({
                url: `/candidates/${candidate.id}`,
                method: "PUT",
                body: candidate
            }),
            invalidatesTags: ['candidates']
        }),
        deleteCandidate: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/candidates/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['candidates']
        }),
        editCandidateStatus: builder.mutation<IAccount, { id: number, status: number }>({
            query: ({ id, status }) => ({
                url: `/candidates/${id}`,
                method: "PUT",
                body: { status },
            }),
            invalidatesTags: ['candidates']
        }),
    })
})
export const {
    useGetCandidatesQuery,
    useGetCandidateByIdQuery,
    useDeleteCandidateMutation,
    useEditCandidateMutation,
    useEditCandidateStatusMutation
} = AccountApi;

export const AccountReducer = AccountApi.reducer;

export default AccountApi;