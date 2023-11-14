import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IOnePackage, IPackage, IPackages } from "../interfaces";

const packageApi = createApi({
    reducerPath: "package",
    tagTypes: ['package'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_ADMIN,
        fetchFn: async (...arg) => {
            return fetch(...arg)
        },
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
        getPackage: builder.query<IPackage, void>({
            query: () => "/package",
            providesTags: ['package']
        }),
        getPackageById: builder.query<IOnePackage, number | string>({
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
        editPackage: builder.mutation<IOnePackage, IPackages>({
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