import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISkill } from "../interfaces";

const skillApi = createApi({
    reducerPath: "skill",
    tagTypes: ['skill'],
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