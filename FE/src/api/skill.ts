import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISkill } from "../interfaces";

const skillApi = createApi({
    reducerPath: "skill",
    tagTypes: ['skill'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:8000/api",
        fetchFn: async (...arg) => {
            return fetch(...arg)
        }
    }),
    endpoints: (builder) => ({
        getSkill: builder.query<ISkill[], void>({
            query: () => "/skill",
            providesTags: ['skill']
        }),
        getSkillById: builder.query<ISkill, number | string>({
            query: (id) => "/skill/" + id,
            providesTags: ['skill']
        }),
        addSkill: builder.mutation({
            query: (skill: ISkill) => ({
                url: "/skill",
                method: "POST",
                body: skill
            }),
            invalidatesTags: ['skill']
        }),
        editSkill: builder.mutation<ISkill, ISkill>({
            query: (skill: ISkill) => ({
                url: `/skill/${skill.id}`,
                method: "PUT",
                body: skill
            }),
            invalidatesTags: ['skill']
        }),
        deleteSkill: builder.mutation<void, number | string>({
            query: (id) => ({
                url: `/skill/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['skill']
        }),
    })
})
export const {
    useGetSkillQuery,
    useGetSkillByIdQuery,
    useAddSkillMutation,
    useEditSkillMutation,
    useDeleteSkillMutation
} = skillApi;

export const skillReducer = skillApi.reducer;

export default skillApi;