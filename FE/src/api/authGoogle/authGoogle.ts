import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


const authGooleApi = createApi({
    reducerPath: "authGoogle",
    tagTypes: ['AuthGoogle'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        fetchFn: (...arg) => {
            return fetch(...arg)
        },
        // prepareHeaders: (headers: any) => {
        //     const cookie = document.cookie;

        //     // Thêm cookie vào header nếu có
        //     if (cookie) {
        //         headers['Cookie'] = cookie;
        //     }

        //     // Đây là một ví dụ về cách thêm Authorization header nếu bạn có thông tin token trong Redux state
        //     const token = getState().auth.token;
        //     if (token) {
        //         headers['Authorization'] = `Bearer ${token}`;
        //     }

        //     return headers;
        // },
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