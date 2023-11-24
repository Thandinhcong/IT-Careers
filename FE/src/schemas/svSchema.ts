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
});
