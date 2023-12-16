import * as yup from "yup";

const passwordRegex = /^[^\s]{6,}$/;
export const schemaLogin = yup.object({
  email: yup
    .string()
    .email("Email không đúng định dạng!")
    .required("Trường dữ liệu bắt buộc!"),
  password: yup
    .string()
    .max(20, "Tối đa 20 ký tự!")
    .required("Trường dữ liệu bắt buộc!"),
});
export type FormLogin = yup.InferType<typeof schemaLogin>;
export const schemaSignup = yup.object({
  name: yup
    .string()
    .min(3, "Tối thiểu 3 ký tự!")
    .max(40, "Tối đa 40 ký tự!")
    .required("Trường dữ liệu bắt buộc!"),
  email: yup
    .string()
    .email("Email không đúng định dạng!")
    .matches(
      /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
      "Email không được chứa ký tự đặc biệt!"
    )
    .required("Trường dữ liệu bắt buộc"),
  password: yup
    .string()
    .matches(passwordRegex, "Mật khẩu phải có ít nhất 6 ký tự.")
    .max(25, "Tối đa 25 ký tự!"),
  phone: yup
    .string()
    .test("is-phone-number", "Số điện thoại không hợp lệ!", function (value) {
      if (!value) return true;
      const isValidPhoneNumber = /^0[0-9]{9}$/.test(value);
      return isValidPhoneNumber;
    })
    .required("Trường dữ liệu bắt buộc"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Mật khẩu không trùng khớp!"),
});

export type FormSignup = yup.InferType<typeof schemaSignup>;

export const schemaLoginAdmin = yup.object({
  email: yup
    .string()
    .email("Email không đúng định dạng")
    .required("Trường dữ liệu bắt buộc!"),
  password: yup
    .string()
    .min(6, "Tối thiểu 6 ký tự!")
    .required("Trường dữ liệu bắt buộc!"),
});
export type FormLoginAdmin = yup.InferType<typeof schemaLoginAdmin>;

export const ForgotPassword = yup.object({
  email: yup
    .string()
    .email("Email không đúng định dạng")
    .required("Trường dữ liệu bắt buộc!"),
});
export type FormForgot = yup.InferType<typeof ForgotPassword>;
