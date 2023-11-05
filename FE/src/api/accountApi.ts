import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAccount } from "../interfaces";

const AccountApi = createApi({
    reducerPath: "candidate_information",
    tagTypes: ['candidates'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/candidate",

        prepareHeaders: (headers) => {
            const user = JSON.parse(localStorage.getItem("user") as string);
            const token = user?.accessToken;
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        getCandidates: builder.query<IAccount, void>({
            query: () => "/candidate_information",
            providesTags: ['candidates']
        }),
        editCandidate: builder.mutation({
            query: (candidate: IAccount) => ({
                url: `/candidate_information/`,
                method: "POST",
                body: candidate
            }),
            invalidatesTags: ['candidates']
        }),
        changePassCandidate: builder.mutation({
            query: (candidate: IAccount) => ({
                url: `/refreshPass`,
                method: "POST",
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
    })
})
export const {
    useGetCandidatesQuery,
    useEditCandidateMutation,
    useDeleteCandidateMutation,
    useChangePassCandidateMutation
} = AccountApi;

export const AccountReducer = AccountApi.reducer;

export default AccountApi;