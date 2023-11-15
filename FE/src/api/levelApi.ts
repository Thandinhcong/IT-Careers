import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILevel } from "../interfaces";

export interface ILevelAll {
  status: string;
  data: ILevel[];
}
export interface ILevelOne {
  status: string;
  data: ILevel;
}
const LevelApi = createApi({
  reducerPath: "level",
  tagTypes: ["level"],
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
    getLevel: builder.query<ILevelAll, void>({
      query: () => "/level",
      providesTags: ["level"],
    }),
    getLevelById: builder.query<any, any>({
      query: (id) => `/level/${id}`,
      providesTags: ["level"],
    }),
    addLevel: builder.mutation({
      query: (level: ILevel) => ({
        url: "/level",
        method: "POST",
        body: level,
      }),
      invalidatesTags: ["level"],
    }),
    editLevel: builder.mutation<ILevelOne, any>({
      query: (level: ILevel) => ({
        url: `/level/${level.id}`,
        method: "PUT",
        body: level,
      }),
      invalidatesTags: ["level"],
    }),
    deleteLevel: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `/level/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["level"],
    }),
  }),
});
export const {
  useGetLevelQuery,
  useGetLevelByIdQuery,
  useAddLevelMutation,
  useEditLevelMutation,
  useDeleteLevelMutation,
} = LevelApi;

export const LevelReducer = LevelApi.reducer;

export default LevelApi;
