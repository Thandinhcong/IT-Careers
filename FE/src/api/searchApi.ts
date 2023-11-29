import { FetchArgs, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const searchApi = createApi({
    reducerPath: 'search',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/api/', // Thay đổi với URL cụ thể của bạn
        fetchFn: (...args) => fetch(...args),
    }),
    tagTypes: ['search'],
    // endpoints: (builder) => ({
    //     search: builder.query<any, { search: string }>({
    //         query: ({ search }) => `search?search=${search}`,
    //     }),
    // }),
    endpoints: (builder) => ({
        search: builder.query<any, { search: string; province?: number }>({
            query: ({ search, province }) => `search?title=${search}${province ? `&province=${province}` : ''}`,
        }),
        getJobPostSelectById: builder.query<any, void>({
            query: () => "/job_post_select",
            providesTags: ["search"],
        }),
    }),

});

export const { useSearchQuery, useGetJobPostSelectByIdQuery } = searchApi;
export const searchReducer = searchApi.reducer;
export default searchApi;