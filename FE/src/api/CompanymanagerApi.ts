import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../utils/pause";
import { ICompanyInfor, } from "../interfaces";

const companysApi = createApi({
    reducerPath: "Companys",
    tagTypes: ['companys'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
        fetchFn: async (...arg) => {
            await pause(1000);
            return fetch(...arg)
        }
    }),
    endpoints: (builder) => ({
        getcompanys: builder.query<ICompanyInfor[], void>({
            query: () => "/company",
            providesTags: ['companys']
        }),
        getcompanysById: builder.query<ICompanyInfor, number | string>({
            query: (id) => "/company/" + id,
            providesTags: ['companys']
        }),
        addcompanys: builder.mutation({
            query: (companys: ICompanyInfor) => ({
                url: "/company",
                method: "POST",
                body: companys
            }),
            invalidatesTags: ['companys']
        }),
        updatecompanys: builder.mutation<ICompanyInfor, ICompanyInfor>({
            query: (companys: ICompanyInfor) => ({
                url: `/company/${companys.id}`,
                method: "PUT",
                body: companys
            }),
            invalidatesTags: ['companys']
        }),
        deletecompanys: builder.mutation<{ id: number }, number>({
            query: (id) => ({
                url: `/company/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['companys']
        }),
    })
})
export const {
    useGetcompanysQuery,
    useGetcompanysByIdQuery,
    useAddcompanysMutation,
    useDeletecompanysMutation,
    useUpdatecompanysMutation,

} = companysApi;

export const companysReducer = companysApi.reducer;

export default companysApi;