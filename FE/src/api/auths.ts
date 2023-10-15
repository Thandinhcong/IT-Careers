import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


const authApi = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/"

    }),
    endpoints: (builder) => ({
        login: builder.mutation<{ accessToken: string, users: {} }, { email: string, password: string }>({
            query: (credentials) => ({
                url: "/signin",
                method: "POST",
                body: credentials
            })
        }),
        signup: builder.mutation<{ accessToken: string, users: {} }, { name: string, email: string, password: string, confilmPassword: string }>({
            query: (credentials) => ({
                url: "/signup",
                method: "POST",
                body: credentials
            })

        })
    })
})
export const {
    useLoginMutation,
    useSignupMutation
} = authApi;
export const authsReducer = authApi.reducer;
export default authApi;