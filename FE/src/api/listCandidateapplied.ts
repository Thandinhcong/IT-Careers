import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IJobPostApply {
    id?: number | undefined,
    path_cv: string,
    email: string,
    phone: string,
    name: string,
}
const candidateapplyApi = createApi({
    reducerPath: "candidate_apply",
    tagTypes: ['candidateapply'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_CANDIDATE,
        fetchFn: (...arg) => {
            return fetch(...arg)
        },
        prepareHeaders: (headers) => {
            const user = JSON.parse(localStorage.getItem("user") as string);
            const token = user?.accessToken;
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    endpoints: (builder) => ({
        getcandidateapply: builder.query<IJobPostApply, void>({
            query: () => '/job_apply',
            providesTags: ['candidateapply']
        }),
        applyJob: builder.mutation({
            query: (data: IJobPostApply) => ({
                url: `/candidate_apply/${data?.id}`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ['candidateapply']
        })
    })

})
export const { useApplyJobMutation, useGetcandidateapplyQuery } = candidateapplyApi;
export default candidateapplyApi;
export const candidateappliedReducer = candidateapplyApi.reducer;