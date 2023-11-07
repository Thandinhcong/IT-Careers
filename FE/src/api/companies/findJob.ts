
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICvApply, IFindJob } from "../../interfaces";
const FindJobCompanyApi = createApi({
    reducerPath: "FindJob",
    tagTypes: ['FindJob'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken');
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
        getProfileOpen: builder.query<ICvApply, void>({
            query: () => "/company/profile_open/",
            providesTags: ['FindJob']
        }),
        // getCandidateDetail: builder.query<ICvApply, number | string>({
        //     query: (id) => "/company/candidate_detail/" + id,
        //     providesTags: ['FindJob']
        // }),
        // assseCandidate: builder.mutation<ICvApply, ICvApply>({
        //     query: (cvAplly: ICvApply) => ({
        //         url: `/company/assses_candidate/${cvAplly.id}`,
        //         method: "POST",
        //         body: cvAplly
        //     }),
        //     invalidatesTags: ['FindJob']
        // }),
    })
})
export const {
    useGetFindCandidateQuery, //Hiển thị ứng viên bật tìm việc
    useGetProfileOpenQuery, //Hiển thị ứng viên đã mở khoá
    // useGetCandidateDetailQuery,
    // useAssseCandidateMutation,
} = FindJobCompanyApi;

export const FindJobCompanyReducer = FindJobCompanyApi.reducer;
export default FindJobCompanyApi;  