import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


const authGooleApi = createApi({
    reducerPath: "authGoogle",
    tagTypes: ['AuthGoogle'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        fetchFn: (...arg) => {
            return fetch(...arg)
        },
    }),
    endpoints: (builder) => ({
        loginGoogle: builder.query<void, void>({
            query: () => "/auth/google",
            providesTags: ['AuthGoogle']
        }),

    })
})
export const {
    useLoginGoogleQuery
} = authGooleApi;
export const authsGooleReducer = authGooleApi.reducer;
export default authGooleApi;