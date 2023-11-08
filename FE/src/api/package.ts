import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPackages } from "../interfaces";

const packageApi = createApi({
    reducerPath: "package",
    tagTypes: ['package'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
        fetchFn: async (...arg) => {
            return fetch(...arg)
        },

    }),
    endpoints: (builder) => ({
        getPackage: builder.query<IPackages[], void>({
            query: () => "/package",
            providesTags: ['package']
        }),
        getPackageById: builder.query<IPackages, number | string>({
            query: (id) => "/package/" + id,
            providesTags: ['package']
        }),
        addPackage: builder.mutation({
            query: (packages: IPackages) => ({
                url: "/package",
                method: "POST",
                body: packages
            }),
            invalidatesTags: ['package']
        }),
        editPackage: builder.mutation<IPackages, IPackages>({
            query: (packages: IPackages) => ({
                url: `/package/${packages.id}`,
                method: "PUT",
                body: packages
            }),
            invalidatesTags: ['package']
        }),
        deletePackage: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/package/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['package']
        }),
    })
})
export const {
    useGetPackageQuery,
    useGetPackageByIdQuery,
    useAddPackageMutation,
    useEditPackageMutation,
    useDeletePackageMutation
} = packageApi;

export const packageReducer = packageApi.reducer;

export default packageApi;