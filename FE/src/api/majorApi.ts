import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { pause } from '../utils/pause';
import { IMajors } from '../interfaces';

const majorApi = createApi({
    reducerPath: "major",
    tagTypes: ['Major'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",

        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        },
    }),
    endpoints: (builder) => ({
        getMajor: builder.query<IMajors[], void>({
            query: () => `/major`,
            providesTags: ['Major']
        }),
        getById: builder.query<IMajors, number | string>({
            query: (id) => `/major/` + id,
            providesTags: ['Major']
        }),
    })

    //     addProduct: builder.mutation({
    //         query: (product: IMajors) => ({
    //             url: '/products',
    //             method: "POST",
    //             body: product
    //         }),
    //         invalidatesTags: ['Product']
    //     }),
    //     updateProduct: builder.mutation<IProducts, IProducts>({
    //         query: (product) => ({
    //             url: `/products/${product.id}`,
    //             method: "PUT",
    //             body: product
    //         }),
    //         invalidatesTags: ['Product']
    //     }),
    //     deleteProduct: builder.mutation<{ id: number }, number>({
    //         query: (id) => ({
    //             url: `/products/` + id,
    //             method: "DELETE"
    //         }),
    //         invalidatesTags: ['Product']
    //     })
    // })
})
export const {
    useGetMajorQuery,
    useGetByIdQuery,

} = majorApi;

export const majorReducer = majorApi.reducer;
export default majorApi;