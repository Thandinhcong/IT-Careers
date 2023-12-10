import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const authGooleApi = createApi({
  reducerPath: "authGoogle",
  tagTypes: ["AuthGoogle"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/",
    fetchFn: (...arg) => {
      return fetch(...arg);
    },
  }),
  endpoints: (builder) => ({
    googleLogin: builder.mutation<any, any>({
      query: () => "auth/google", // Adjust the endpoint based on your server setup
      method: "GET",
    }),
  }),
});
export const { useGoogleLoginMutation } = authGooleApi;
export const authsGooleReducer = authGooleApi.reducer;
export default authGooleApi;
