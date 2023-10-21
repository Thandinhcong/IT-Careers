// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { ICompanyInfor } from "../interfaces";

// const candidateApi = createApi({
//     reducerPath: "Candidate",
//     tagTypes: ['candidate'],
//     baseQuery: fetchBaseQuery({
//         baseUrl: "http://127.0.0.1:8000/api",
//         fetchFn: async (...arg) => {
//             return fetch(...arg)
//         }
//     }),
//     endpoints: (builder) => ({
//         getCompanySetting: builder.query<ICompanyInfor[], void>({
//             query: () => "/list_company",
//             providesTags: ['candidate']
//         }),
//         getCompanySettingById: builder.query<ICompanyInfor, number | string>({
//             query: (id) => "/list_company/" + id,
//             providesTags: ['candidate']
//         }),

//         editCompanySetting: builder.mutation<ICompanyInfor, ICompanyInfor>({
//             query: (company: ICompanyInfor) => ({
//                 url: `/list_company/${company.id}`,
//                 method: "PUT",
//                 body: company
//             }),
//             invalidatesTags: ['candidate']
//         }),

//     })
// })
// export const {
//     useGetCompanySettingQuery,
//     useGetCompanySettingByIdQuery,
//     useEditCompanySettingMutation,
// } = candidateApi;

// export const candidateReducer = candidateApi.reducer;

// export default candidateApi;