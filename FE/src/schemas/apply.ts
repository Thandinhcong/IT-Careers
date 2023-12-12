import * as yup from "yup";

export const schemaJobApply = yup.object({
  id: yup.string(),
  name: yup
    .string()
    .min(3, "Tối thiểu 3 ký tự!")
    .max(60, "Tối thiểu 60 kí tự")
    .required("Trường dữ liệu bắt buộc!"),
  email: yup
    .string()
    .email("Email không đúng định dạng!")
    .required("Trường dữ liệu bắt buộc!"),
  phone: yup
    .string()
    .test("is-phone-number", "Số điện thoại không hợp lệ", function (value) {
      if (!value) return true;
      const isValidPhoneNumber = /^0[0-9]{9}$/.test(value);
      return isValidPhoneNumber;
    })
    .required("Trường dữ liệu bắt buộc"),
  introduce: yup.string().max(500, "Tối thiểu 500 ký tự"),
  path_cv: yup.string().max(150, "Tối đa 180 ký tự"),
  curriculum_vitae_id: yup.string(),
});
export type FromApply = yup.InferType<typeof schemaJobApply>;

export const schemaUploadImage = yup.object({
  path_cv: yup.string().required("Trường dữ liệu bắt buộc"),
  title: yup.string().required("Trường dữ liệu bắt buộc!"),
});
export type FromUpload = yup.InferType<typeof schemaUploadImage>;
