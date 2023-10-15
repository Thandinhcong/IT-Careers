import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILevel } from "../interfaces";

const LevelApi = createApi({
    reducerPath: "level",
    tagTypes: ['level'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
        fetchFn: async (...arg) => {
            return fetch(...arg)
        }
    }),
    endpoints: (builder) => ({
        getLevel: builder.query<ILevel[], void>({
            query: () => "/level",
            providesTags: ['level']
        }),
        getLevelById: builder.query<ILevel, number | string>({
            query: (id) => `/level/${id}`,
            providesTags: ['level']
        }),
        addLevel: builder.mutation({
            query: (level: ILevel) => ({
                url: "/level",
                method: "POST",
                body: level
            }),
            invalidatesTags: ['level']
        }),
        editLevel: builder.mutation<ILevel, ILevel>({
            query: (level: ILevel) => ({
                url: `/level/${level.id}`,
                method: "PUT",
                body: level
            }),
            invalidatesTags: ['level']
        }),
        deleteLevel: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/level/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['level']
        }),
    })
})
export const {
    useGetLevelQuery,
    useGetLevelByIdQuery,
    useAddLevelMutation,
    useEditLevelMutation,
    useDeleteLevelMutation
} = LevelApi;

export const LevelReducer = LevelApi.reducer;

export default LevelApi;