import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const listCvApi = createApi({
  reducerPath: "Cv",
  tagTypes: ["CV"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api/candidate",
    fetchFn: (...arg) => {
      return fetch(...arg);
    },
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem("user") as string);
      const token = user?.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (buidler) => ({
    listCv: buidler.query<any, void>({
      query: () => "/cv",
      providesTags: ["CV"],
    }),
    addCv: buidler.mutation<any, void>({
      query: (credentials) => ({
        url: "/create_cv",
        method: "POST",
        body: credentials,
      }),
    }),
    updateCv: buidler.mutation<any, string | number>({
      query: (data: any) => ({
        url: `/update_cv/${data?.id}`,
        method: "POST",
        body: data,
      }),
    }),
    //profile
    listInfo: buidler.query({
      query: (id: any) => "/update_cv/" + id,
      providesTags: ["CV"],
    }),
    updateInfoProfile: buidler.mutation<any, string | number>({
      query: (data: any) => ({
        url: `/update_cv/update_info/${data?.id}`,
        method: "POST",
        body: data,
      }),
    }),
    //kinh nghiệm
    addExp: buidler.mutation<any, string | number>({
      query: (data: any) => ({
        url: `/update_cv/save_exp`,
        method: "POST",
        body: data,
      }),
    }),
    removeExp: buidler.mutation<any, string | number>({
      query: (id: any) => ({
        url: `/update_cv/delete_exp/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CV"],
    }),
    // chọn cv chính
    active_cv: buidler.mutation<any, string | number>({
      query: (data: any) => ({
        url: `/active_cv`,
        method: "POST",
        body: data,
      }),
    }),
    // xóa cv
    delete_cv: buidler.mutation<any, string | number>({
      query: (id: any) => ({
        url: `/delete_cv/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["CV"],
    }),
  }),
});
export const {
  useListCvQuery,
  useAddCvMutation,
  useListInfoQuery,
  useUpdateInfoProfileMutation,
  useAddExpMutation,
  useRemoveExpMutation,
  useActive_cvMutation,
  useDelete_cvMutation,
} = listCvApi;
export const listCvReducer = listCvApi.reducer;
export default listCvApi;
