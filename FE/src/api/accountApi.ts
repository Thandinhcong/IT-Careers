import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAccount } from "../interfaces";

const AccountApi = createApi({
    reducerPath: "account",
    tagTypes: ['user'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
        fetchFn: async (...arg) => {
            return fetch(...arg)
        }
    }),
    endpoints: (builder) => ({
        getAccount: builder.query<IAccount[], void>({
            query: () => "/user",
            providesTags: ['user']
        }),
        getAccountById: builder.query<IAccount, number | string>({
            query: (id) => `/user/${id}`,
            providesTags: ['user']
        }),
        deleteAccount: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/user/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['user']
        }),
    })
})
export const {
    useGetAccountQuery,
    useGetAccountByIdQuery,
    useDeleteAccountMutation
} = AccountApi;

export const AccountReducer = AccountApi.reducer;

export default AccountApi;