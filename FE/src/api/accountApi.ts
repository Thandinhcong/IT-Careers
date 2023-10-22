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
        // getAccountById: builder.query<IAccount, number | string>({
        //     query: (id) => `/candidates/${id}`,
        //     providesTags: ['candidates']
        // }),
        deleteCandidate: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/candidates/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['candidates']
        }),
    })
})
export const {
    useGetCandidatesQuery,
    // useGetAccountByIdQuery,
    useDeleteCandidateMutation
} = AccountApi;

export const AccountReducer = AccountApi.reducer;

export default AccountApi;