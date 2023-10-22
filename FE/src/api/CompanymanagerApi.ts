import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../utils/pause";
import { ICompanyInfor, ICompanys, } from "../interfaces";

const companysApi = createApi({
    reducerPath: "Company",
    tagTypes: ['company'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
        fetchFn: async (...arg) => {
            await pause(1000);
            return fetch(...arg)
        }
    }),
    endpoints: (builder) => ({
        getcompanys: builder.query<ICompanys[], void>({
            query: () => "/list_company",
            providesTags: ['company']
        }),
        getcompanysById: builder.query<ICompanys, number | string>({
            query: (id) => "/list_company/" + id,
            providesTags: ['company']
        }),
        // addcompanys: builder.mutation({
        //     query: (companys: ICompanys) => ({
        //         url: "/company",
        //         method: "POST",
        //         body: companys
        //     }),
        //     invalidatesTags: ['company']
        // }),
        updatecompanys: builder.mutation<ICompanys, ICompanys>({
            query: (companys: ICompanys) => ({
                url: `/list_company/${companys.id}`,
                method: "PUT",
                body: companys
            }),
            invalidatesTags: ['company']
        }),
        // deletecompanys: builder.mutation<{ id: number }, number>({
        //     query: (id) => ({
        //         url: `/company/${id}`,
        //         method: "DELETE",
        //     }),
        //     invalidatesTags: ['company']
        // }),
    })
})
export const {
    useGetcompanysQuery,
    useGetcompanysByIdQuery,
    // useAddcompanysMutation,
    // useDeletecompanysMutation,
    useUpdatecompanysMutation,

} = companysApi;

export const companysReducer = companysApi.reducer;

export default companysApi;