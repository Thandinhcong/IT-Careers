import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISalaryType } from "../interfaces";

const SalaryTypeApi = createApi({
  reducerPath: "salary_type",
  tagTypes: ["salary_type"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    fetchFn: (...arg) => {
      return fetch(...arg);
    },
  }),
  endpoints: (builder) => ({
    getSalaryType: builder.query<ISalaryType[] | any, void>({
      query: () => "/salary_type",
      providesTags: ["salary_type"],
    }),
    getSalaryTypeById: builder.query<ISalaryType | any, number | string>({
      query: (id) => "/salary_type/" + id,
      providesTags: ["salary_type"],
    }),
    addSalaryType: builder.mutation({
      query: (salary_type: ISalaryType) => ({
        url: "/salary_type",
        method: "POST",
        body: salary_type,
      }),
      invalidatesTags: ["salary_type"],
    }),
    editSalaryType: builder.mutation<ISalaryType, ISalaryType>({
      query: (salary_type: ISalaryType) => ({
        url: `/salary_type/${salary_type.id}`,
        method: "PUT",
        body: salary_type,
      }),
      invalidatesTags: ["salary_type"],
    }),
    deleteSalaryType: builder.mutation<void, number | string>({
      query: (id) => ({
        url: `/salary_type/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["salary_type"],
    }),
  }),
});
export const {
  useGetSalaryTypeQuery,
  useGetSalaryTypeByIdQuery,
  useAddSalaryTypeMutation,
  useEditSalaryTypeMutation,
  useDeleteSalaryTypeMutation,
} = SalaryTypeApi;

export const SalaryTypeReducer = SalaryTypeApi.reducer;

export default SalaryTypeApi;
