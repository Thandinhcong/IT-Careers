import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICompanyInfor } from "../interfaces";

const companySettingAPi = createApi({
    reducerPath: "CompanySetting",
    tagTypes: ['companySetting'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
        fetchFn: async (...arg) => {
            return fetch(...arg)
        }
    }),
    endpoints: (builder) => ({
        getCompanySetting: builder.query<ICompanyInfor[], void>({
            query: () => "/list_company",
            providesTags: ['companySetting']
        }),
        getCompanySettingById: builder.query<ICompanyInfor, number | string>({
            query: (id) => "/list_company/" + id,
            providesTags: ['companySetting']
        }),

        editCompanySetting: builder.mutation<ICompanyInfor, ICompanyInfor>({
            query: (company: ICompanyInfor) => ({
                url: `/list_company/${company.id}`,
                method: "PUT",
                body: company
            }),
            invalidatesTags: ['companySetting']
        }),

    })
})
export const {
    useGetCompanySettingQuery,
    useGetCompanySettingByIdQuery,
    useEditCompanySettingMutation,
} = companySettingAPi;

export const CompanySettingReducer = companySettingAPi.reducer;

export default companySettingAPi;