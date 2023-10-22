import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";


const authApi = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/candidate"

    }),
    endpoints: (builder) => ({
        login: builder.mutation<{ access_token: string, user: {}, status: string }, { email: string, password: string }>({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials
            })
        }),
        signup: builder.mutation<{ access_token: string, users: {}, errors: string }, { name: string, email: string, password: string, phone: string, password_confirmation: string }>({
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