import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../utils/pause";
import { IMajors, } from "../interfaces";

const MajorApi = createApi({
    reducerPath: "Major",
    tagTypes: ['Majors'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api/admin",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
        },
        fetchFn: async (...arg) => {
            await pause(1000);
            return fetch(...arg)
        }
    }),
    endpoints: (builder) => ({
        getMajor: builder.query<IMajors[], void>({
            query: () => "/major",
            providesTags: ['Majors']
        }),
        getMajorById: builder.query<IMajors, number | string>({
            query: (id) => "/major/" + id,
            providesTags: ['Majors']
        }),
        addMajor: builder.mutation({
            query: (jobposition: IMajors) => ({
                url: "/major",
                method: "POST",
                body: jobposition
            }),
            invalidatesTags: ['Majors']
        }),
        updateMajor: builder.mutation<IMajors, IMajors>({
            query: (jobposition: IMajors) => ({
                url: `/major/${jobposition.id}`,
                method: "PUT",
                body: jobposition
            }),
            invalidatesTags: ['Majors']
        }),
        deleteMajor: builder.mutation<{ id: number }, number>({
            query: (id) => ({
                url: `/major/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Majors']
        }),
    })
})
export const {
    useGetMajorQuery,
    useGetMajorByIdQuery,
    useAddMajorMutation,
    useDeleteMajorMutation,
    useUpdateMajorMutation

} = MajorApi;

export const MajorReducer = MajorApi.reducer;

export default MajorApi;