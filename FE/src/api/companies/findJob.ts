
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IFindJob } from "../../interfaces";
const FindJobCompanyApi = createApi({
    reducerPath: "FindJob",
    tagTypes: ['FindJob'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('authCompany');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            console.log(token)
        },
        fetchFn: (...arg) => {
            return fetch(...arg)
        },
    }),
    endpoints: (builder) => ({
        getFindCandidate: builder.query<IFindJob, void>({
            query: () => "/company/find_candidate",
            providesTags: ['FindJob']
        }),
        getProfileOpen: builder.query<IFindJob, void>({
            query: () => "/company/profile_open/",
            providesTags: ['FindJob']
        }),
        getProfileSave: builder.query<IFindJob, void>({
            query: () => "/company/profile_open/",
            providesTags: ['FindJob']
        }),
        // getCandidateDetail: builder.query<ICvApply, number | string>({
        //     query: (id) => "/company/candidate_detail/" + id,
        //     providesTags: ['FindJob']
        // }),
        openProfile: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/company/open_profile/${id}`,
                method: "POST",
            }),
            invalidatesTags: ['FindJob']
        }),
        saveProfile: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/company/save_profile/${id}`,
                method: "POST",
            }),
            invalidatesTags: ['FindJob']
        }),
    })
})
export const {
    useGetFindCandidateQuery, //Hiển thị ứng viên bật tìm việc
    useGetProfileOpenQuery, //Hiển thị ứng viên đã mở khoá
    useGetProfileSaveQuery,
    // useGetCandidateDetailQuery,
    useOpenProfileMutation,
    useSaveProfileMutation
} = FindJobCompanyApi;

export const FindJobCompanyReducer = FindJobCompanyApi.reducer;
export default FindJobCompanyApi;  