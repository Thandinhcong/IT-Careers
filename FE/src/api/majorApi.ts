import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { pause } from "../utils/pause";
import { IMajors, } from "../interfaces";


export interface IMajorAll {
    status: number,
    major: IMajors[]
}
export interface IMajorOne {
    status: number,
    major: IMajors
}
const MajorApi = createApi({
    reducerPath: "Major",
    tagTypes: ['Majors'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_ADMIN,
        fetchFn: async (...arg) => {
            await pause(1000);
            return fetch(...arg)
        },
        prepareHeaders: (headers) => {
            const user = JSON.parse(localStorage.getItem("admin") as string);
            const token = user?.accessToken;
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }

    }),
    endpoints: (builder) => ({
        getMajor: builder.query<IMajorAll, void>({
            query: () => "/major",
            providesTags: ['Majors']
        }),
        getMajorById: builder.query<IMajorOne, any>({
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
        updateMajor: builder.mutation<IMajorOne, any>({
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