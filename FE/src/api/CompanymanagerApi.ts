import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../utils/pause";
import { ICompanys } from "../interfaces";

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
            query: () => "/company-management",
            providesTags: ['company']
        }),
        getcompanysById: builder.query<ICompanys, number | string>({
            query: (id) => "/company-management/" + id,
            providesTags: ['company']
        }),
        updateStatuscompanys: builder.mutation<ICompanys, ICompanys>({
            query: (companys: ICompanys) => ({
                url: `/company-management/${companys.id}`,
                method: "PUT",
                body: companys
            }),
            invalidatesTags: ['company']
        }),
        deletecompanys: builder.mutation<{ id: number }, number>({
            query: (id) => ({
                url: `/company-management/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['company']
        }),
    })
})
export const {
    useGetcompanysQuery,
    useGetcompanysByIdQuery,
    // useAddcompanysMutation,
    useDeletecompanysMutation,
    useUpdateStatuscompanysMutation,

} = companysApi;

export const companysReducer = companysApi.reducer;

export default companysApi;