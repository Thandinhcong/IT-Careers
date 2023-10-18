import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const companyApi = createApi({
    reducerPath: "companys",
    tagTypes: ['Companys'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
        fetchFn: async (...arg) => {
            return fetch(...arg)
        }
    }),
    endpoints: (buidler) => ({
        getAllCompanys: buidler.query<any, void>({
            query: () => "/list_company",
            providesTags: ['Companys']
        }),
        getOneCompanys: buidler.query<any, number | string>({
            query: (id) => "/list_company/" + id,
            providesTags: ['Companys']
        }),
    })
})
export const {
    useGetAllCompanysQuery,
    useGetOneCompanysQuery
} = companyApi;
export const companyReducer = companyApi.reducer;
export default companyApi;