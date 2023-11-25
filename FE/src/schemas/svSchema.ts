import * as yup from "yup";

export const schemaProfile = yup.object({
  name: yup.string(),
  email: yup
    .string()
    .email("Email không đúng định dạng!")
    .required("Trường dữ liệu không được để trống"),
  phone: yup.string().required("Trường dữ liệu không được để trống"),
  image: yup.string().required("Trường dữ liệu không được để trống"),
  address: yup.string().required("Trường dữ liệu không được để trống"),
  title: yup.string(),
  birth: yup.date(),
  careers_goal: yup.string(),
});
export type FormProfile = yup.InferType<typeof schemaProfile>;

export const schemaExp = yup.object({
  position: yup.string().required("Trường dữ không được để trống"),
  company_name: yup.string().required("Trường dữ liệu không được để trống"),
  start_date: yup.date().required("Trường dữ liệu không được để trống"),
  end_date: yup.date().required("Trường dữ liệu không được để trống"),
});
export type FormExp = yup.InferType<typeof schemaExp>;

export const schemaEdu = yup.object({
  major_id: yup.string().required("Trường dữ không được để trống"),
  name: yup.string().required("Trường dữ liệu không được để trống"),
  gpa: yup.string().required("Trường dữ liệu không được để trống"),
  start_date: yup.date().required("Trường dữ liệu không được để trống"),
  end_date: yup.date().required("Trường dữ liệu không được để trống"),
  type_degree: yup.date().required("Trường dữ liệu không được để trống"),
});
export type FormEdu = yup.InferType<typeof schemaEdu>;

export const schemaProject = yup.object({
  project_name: yup.string().required("Trường dữ không được để trống"),
  position: yup.string().required("Trường dữ liệu không được để trống"),
  desc: yup.string().required("Trường dữ liệu không được để trống"),
  link_project: yup.string().required("Trường dữ liệu không được để trống"),
  start_date: yup.date().required("Trường dữ liệu không được để trống"),
  end_date: yup.date().required("Trường dữ liệu không được để trống"),
});
export type FormProject = yup.InferType<typeof schemaProject>;
