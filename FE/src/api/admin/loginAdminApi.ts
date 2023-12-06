import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const AdminLogin = createApi({
  reducerPath: "accountAdmin",
  tagTypes: ["AccountAdmin"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_ADMIN,
    fetchFn: async (...arg) => {
      return fetch(...arg);
    },
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem("admin") as string);
      const token = user?.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    adminLogin: builder.mutation<
      { access_token: string; admin: {}; errors: string },
      { email: string; password: string }
    >({
      query: (data: any) => ({
        url: `/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AccountAdmin"],
    }),
    logout: builder.mutation<any, any>({
      query: () => ({
        url: `/logout`,
        method: "DELETE",
      }),
      invalidatesTags: ["AccountAdmin"],
    }),
  }),
});
export const { useAdminLoginMutation, useLogoutMutation } = AdminLogin;

export const adminLoginReducer = AdminLogin.reducer;

export default AdminLogin;
