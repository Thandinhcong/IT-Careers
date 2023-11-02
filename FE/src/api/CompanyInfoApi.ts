import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAccount, ICompanyInfor } from "../interfaces";

const CompnayInfoApi = createApi({
    reducerPath: "company_information",
    tagTypes: ['company'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/company",
        fetchFn: async (...arg) => {
            return fetch(...arg)
        },
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
                // console.log(token);
            }
        },
    }),
    endpoints: (builder) => ({
        getInfor: builder.query<[], void>({
            query: () => "/company_information",
            providesTags: ['company']
        }),
        editCompanyInfo: builder.mutation({
            query: (company: ICompanyInfor) => ({
                url: `/company_information/`,
                method: "POST",
                body: company
            }),
            invalidatesTags: ['company']
        })
    })
})
export const {
    useGetInforQuery,
    useEditCompanyInfoMutation,
    // useDeleteCandidateMutation
} = CompnayInfoApi;

export const CompanyInfoReducer = CompnayInfoApi.reducer;

export default CompnayInfoApi;