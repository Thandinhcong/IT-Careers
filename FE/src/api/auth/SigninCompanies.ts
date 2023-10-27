import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


interface AuthSignup {
    email: string;
    password: string;
    name: string;
    confirmPassword: string
}
export interface AuthSignin {
    email: string;
    password: string;
}

const authCompaniesApi = createApi({
    reducerPath: 'company',
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/company",
    }),
    endpoints: (builder) => ({
        signupCompanies: builder.mutation<{ message: string, access_token: string }, AuthSignup>({
            query: (account) => ({
                url: 'http://127.0.0.1:8000/api/company/',
                method: 'POST',
                body: account,
            }),
        }),
        signinCompanies: builder.mutation<{ message: string, access_token: string }, AuthSignin>({
            query: (account) => ({
                url: '/login',
                method: 'POST',
                body: account,
            }),
        })
    }),
});

export const { useSignupCompaniesMutation, useSigninCompaniesMutation } = authCompaniesApi;

export default authCompaniesApi;