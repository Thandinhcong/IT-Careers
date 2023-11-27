import { FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const searchApi = createApi({
    reducerPath: 'search',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/api/', // Thay đổi với URL cụ thể của bạn
        fetchFn: (...args) => fetch(...args),
    }),
    endpoints: (builder) => ({
        search: builder.query<any, { search: string }>({
            query: ({ search }) => `search?title=${search}`,
        }),
    }),
    // endpoints: (builder) => ({
    //     search: builder.query<any, { search: string; province?: string }>({
    //         query: ({ search, province }) => `search?search=${search}${province ? `&province=${province}` : ''}`,
    //     }),
    // })
});

export const { useSearchQuery } = searchApi;
export const searchReducer = searchApi.reducer;
export default searchApi;