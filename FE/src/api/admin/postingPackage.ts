import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PostingPackageApi = createApi({
  reducerPath: "postingPackages",
  tagTypes: ["PostingPackages"],
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
    addTypeJobPost: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `/type-job-post`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PostingPackages"],
    }),
    getAllTypeJobPost: builder.query<any, void>({
      query: () => "/type-job-post",
      providesTags: ["PostingPackages"],
    }),
    getOneTypeJobPost: builder.query<any, any>({
      query: (id: any) => `/type-job-post/${id}`,
      providesTags: ["PostingPackages"],
    }),
    updateTypeJobPost: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `/type-job-post/${data?.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["PostingPackages"],
    }),
    deleteTypeJobPost: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `/type-job-post/${data?.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PostingPackages"],
    }),
  }),
});
export const {
  useAddTypeJobPostMutation,
  useGetOneTypeJobPostQuery,
  useGetAllTypeJobPostQuery,
  useUpdateTypeJobPostMutation,
  useDeleteTypeJobPostMutation,
} = PostingPackageApi;

export const PostingPackageApiReducer = PostingPackageApi.reducer;

export default PostingPackageApi;
