import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IManageWebsiteAll {
  data: IManageWebsite[];
}
export interface IManageWebsite {
  id?: number;
  logo: string;
  banner: string;
  name_web: string;
  company_name: string;
  address: string;
  email: string;
  phone: string;
  sdt_lienhe: string;
}

export interface IManageWebsiteOne {
  man_web: IManageWebsite;
}
const ManageWebsiteApi = createApi({
  reducerPath: "manageWebsite",
  tagTypes: ["ManageWebsite"],
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
    getManageWebsite: builder.query<IManageWebsiteAll, void>({
      query: () => "/man-web",
      providesTags: ["ManageWebsite"],
    }),
    getManageOneWebsite: builder.query<
      IManageWebsiteOne | any,
      number | string
    >({
      query: (id: string | number) => "/man-web/" + id,
      providesTags: ["ManageWebsite"],
    }),
    update_Manage: builder.mutation<IManageWebsiteOne | any, any>({
      query: (data: IManageWebsiteOne | any) => ({
        url: `/man-web/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ManageWebsite"],
    }),
  }),
});
export const {
  useGetManageWebsiteQuery,
  useGetManageOneWebsiteQuery,
  useUpdate_ManageMutation,
} = ManageWebsiteApi;

export const ManageWebsiteReducer = ManageWebsiteApi.reducer;

export default ManageWebsiteApi;
