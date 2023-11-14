import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IExperience } from "../interfaces";

export interface IExperienceAll {
    status: string,
    data: IExperience[]
}
export interface IExperienceOne {
    status: string,
    data: IExperience
}
const experienceApi = createApi({
    reducerPath: "experience",
    tagTypes: ['experience'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_ADMIN,
        fetchFn: async (...arg) => {
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
        getExperience: builder.query<IExperienceAll, void>({
            query: () => "/experience",
            providesTags: ['experience']
        }),
        getExperienceById: builder.query<any, any>({
            query: (id) => `/experience/${id}`,
            providesTags: ['experience']
        }),
        addExperience: builder.mutation({
            query: (experience: IExperience) => ({
                url: "/experience",
                method: "POST",
                body: experience
            }),
            invalidatesTags: ['experience']
        }),
        editExperience: builder.mutation<IExperienceOne, any>({
            query: (experience: IExperience) => ({
                url: `/experience/${experience.id}`,
                method: "PUT",
                body: experience
            }),
            invalidatesTags: ['experience']
        }),
        deleteExperience: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/experience/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['experience']
        }),
    })
})
export const {
    useGetExperienceQuery,
    useGetExperienceByIdQuery,
    useAddExperienceMutation,
    useEditExperienceMutation,
    useDeleteExperienceMutation
} = experienceApi;

export const experienceReducer = experienceApi.reducer;

export default experienceApi;