import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


const authApi = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/candidate"

    }),
    endpoints: (builder) => ({
        login: builder.mutation<{ accessToken: string, users: {} }, { email: string, password: string }>({
            query: (credentials) => ({
                url: "/signin",
                method: "POST",
                body: credentials
            })
        }),
        signup: builder.mutation<{ accessToken: string, users: {}, errors: string }, { name: string, email: string, password: string, phone: string, password_confirmation: string }>({
            query: (credentials) => ({
                url: "/register",
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