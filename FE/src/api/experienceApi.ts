import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IExperience } from "../interfaces";

const experienceApi = createApi({
    reducerPath: "experience",
    tagTypes: ['experience'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
        fetchFn: async (...arg) => {
            return fetch(...arg)
        }
    }),
    endpoints: (builder) => ({
        getExperience: builder.query<IExperience[], void>({
            query: () => "/experience",
            providesTags: ['experience']
        }),
        getExperienceById: builder.query<IExperience, number | string>({
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
        editExperience: builder.mutation<IExperience, IExperience>({
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