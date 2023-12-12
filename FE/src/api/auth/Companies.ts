import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface AuthSignup {
  email?: string;
  password?: string;
  name?: string;
  password_confirmation?: string;
  link_web?: string;
  company_name?: string;
  phone?: string;
  address?: string;
  agreement?: string;
}
export interface AuthSignin {
  email: string;
  password: string;
}

const authCompaniesApi = createApi({
  reducerPath: "company",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authCompany");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signupCompanies: builder.mutation<
      { message: string; status: string; errors: any },
      AuthSignup
    >({
      query: (account) => ({
        url: "/company/register",
        method: "POST",
        body: account,
      }),
    }),
    signinCompanies: builder.mutation<
      { message: string; access_token: string },
      AuthSignin
    >({
      query: (account) => ({
        url: "/company/login",
        method: "POST",
        body: account,
      }),
    }),
    logOutCompanies: builder.mutation<void, void>({
      query: (account) => ({
        url: "/company/logout",
        method: "DELETE",
        body: account,
      }),
    }),
    getInfor: builder.query<[], void>({
      query: () => "/company/company_information",
    }),
    RefeshPassword: builder.mutation<any, any>({
      query: (data) => ({
        url: "/company/refreshPass",
        method: "POST",
        body: data,
      }),
    }),
    ForgotPassword: builder.mutation<any, any>({
      query: (data) => ({
        url: "/company/forget_password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSignupCompaniesMutation,
  useSigninCompaniesMutation,
  useGetInforQuery,
  useLogOutCompaniesMutation,
  useRefeshPasswordMutation,
  useForgotPasswordMutation,
} = authCompaniesApi;

export default authCompaniesApi;
