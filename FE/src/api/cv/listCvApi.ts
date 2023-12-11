import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const listCvApi = createApi({
  reducerPath: "Cv",
  tagTypes: ["CV"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_CANDIDATE,
    fetchFn: (...arg) => {
      return fetch(...arg);
    },
    prepareHeaders: (headers) => {
      const user = JSON.parse(localStorage.getItem("user") as string);
      const token = user?.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (buidler) => ({
    listCv: buidler.query<any, void>({
      query: () => "/cv",
      providesTags: ["CV"],
    }),
    addCv: buidler.mutation<any, any>({
      query: (credentials) => ({
        url: "/create_cv",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["CV"],
    }),
    updateCv: buidler.mutation<any, string | number>({
      query: (data: any) => ({
        url: `/update_cv/${data?.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CV"],
    }),
    //profile
    listInfo: buidler.query({
      query: (id: any) => `/update_cv/${id}`,
      providesTags: ["CV"],
    }),
    updateInfoProfile: buidler.mutation<any, string | number>({
      query: (data: any) => ({
        url: `/update_cv/update_info/${data?.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CV"],
    }),
    //kinh nghiệm
    addExp: buidler.mutation<any, string | number>({
      query: (data: any) => ({
        url: `/update_cv/save_exp`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CV"],
    }),
    //update exp
    updateExp: buidler.mutation<any, string | number>({
      query: (data: any) => ({
        url: `/update_cv/update_exp/${data?.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CV"],
    }),
    removeExp: buidler.mutation<any, string | number>({
      query: (id: any) => ({
        url: `/update_cv/delete_exp/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["CV"],
    }),
    // chọn cv chính
    active_cv: buidler.mutation<any, string | number>({
      query: (data: any) => ({
        url: `/active_cv`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CV"],
    }),
    // xóa cv
    delete_cv: buidler.mutation<any, string | number>({
      query: (id: any) => ({
        url: `/delete_cv/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["CV"],
    }),
    //project
    addProject: buidler.mutation<any, string | number>({
      query: (data: any) => ({
        url: `/update_cv/save_project`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CV"],
    }),
    updateProject: buidler.mutation<any, string | number>({
      query: (data: any) => ({
        url: `/update_cv/update_project/${data?.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CV"],
    }),
    deleteProject: buidler.mutation<any, string | number>({
      query: (id: any) => ({
        url: `/update_cv/delete_project/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["CV"],
    }),

    //education
    addEdu: buidler.mutation<any, string | number>({
      query: (data: any) => ({
        url: `/update_cv/save_edu`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CV"],
    }),
    updateEdu: buidler.mutation<any, string | number>({
      query: (data: any) => ({
        url: `/update_cv/update_edu/${data?.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CV"],
    }),
    deleteEdu: buidler.mutation<any, string | number>({
      query: (id: any) => ({
        url: `/update_cv/delete_edu/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["CV"],
    }),
    //skill
    addSkill: buidler.mutation<any, string | number>({
      query: (data: any) => ({
        url: `/update_cv/save_skill`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CV"],
    }),
    updateSkill: buidler.mutation<any, string | number>({
      query: (data: any) => ({
        url: `/update_cv/update_skill/${data?.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CV"],
    }),
    deleteSkill: buidler.mutation<any, string | number>({
      query: (id: any) => ({
        url: `/update_cv/delete_skill/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["CV"],
    }),

    // lưu cv
    SaveCv: buidler.mutation<any, any | number>({
      query: (data: any) => ({
        url: `/update_cv/saveCV/${data?.id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CV"],
    }),
    UploadCV: buidler.mutation<any, any | number>({
      query: (data: any) => ({
        url: `upload_cv`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CV"],
    }),
  }),
});
export const {
  useListCvQuery,
  useAddCvMutation,
  useListInfoQuery,
  useUpdateInfoProfileMutation,
  //kinh no
  useAddExpMutation,
  useRemoveExpMutation,
  useUpdateExpMutation,
  //chọn cv
  useActive_cvMutation,
  useDelete_cvMutation,
  //project
  useAddProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,

  //edu
  useAddEduMutation,
  useUpdateEduMutation,
  useDeleteEduMutation,

  //skill
  useAddSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,

  // lưu Cv
  useSaveCvMutation,
  useUploadCVMutation,
} = listCvApi;
export const listCvReducer = listCvApi.reducer;
export default listCvApi;
