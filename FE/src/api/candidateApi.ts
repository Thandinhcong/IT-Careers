import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAccount } from "../interfaces";


export interface IAccountAll {
    status?: string,
    data: IAccount[]
}
const CandidateApi = createApi({
    reducerPath: "candidate_information",
    tagTypes: ['candidates'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_ADMIN,

        prepareHeaders: (headers) => {
            const user = JSON.parse(localStorage.getItem("admin") as string);
            const token = user?.accessToken;
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        getCandidates: builder.query<any, void>({
            query: () => "/candidate",
            providesTags: ['candidates']
        }),
        editCandidate: builder.mutation({
            query: (candidate: IAccount) => ({
                url: `/candidate/`,
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
} = CandidateApi;

export const CandidateReducer = CandidateApi.reducer;

export default CandidateApi;