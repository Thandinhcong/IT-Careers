import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ICvApply } from "../../interfaces";
const CvApplyApi = createApi({
  reducerPath: "cV_apply",
  tagTypes: ["CV_apply"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authCompany");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    fetchFn: (...arg) => {
      return fetch(...arg);
    },
  }),
  endpoints: (builder) => ({
    getCvApllyJobPostId: builder.query<ICvApply, void>({
      query: () => "/company/list_candidate_applied",
      providesTags: ["CV_apply"],
    }),
    getCvApllyByIdJobPostId: builder.query<ICvApply, number | string>({
      query: (id) => "/company/list_candidate_apply_job/" + id,
      providesTags: ["CV_apply"],
    }),
    getCandidateDetail: builder.query<ICvApply, number | string>({
      query: (id) => "/company/candidate_detail/" + id,
      providesTags: ["CV_apply"],
    }),
    assseCandidate: builder.mutation<ICvApply, ICvApply>({
      query: (cvAplly: ICvApply) => ({
        url: `/company/assses_candidate/${cvAplly.id}`,
        method: "POST",
        body: cvAplly,
      }),
      invalidatesTags: ["CV_apply"],
    }),
  }),
});
export const {
  useGetCvApllyByIdJobPostIdQuery,
  useGetCandidateDetailQuery,
  useAssseCandidateMutation,
  useGetCvApllyJobPostIdQuery,
} = CvApplyApi;

export const CvApplyReducer = CvApplyApi.reducer;
export default CvApplyApi;
