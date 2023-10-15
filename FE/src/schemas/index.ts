import * as yup from "yup";


export const schemaLogin = yup.object({
    email: yup.string().email("Email không đúng ký tự").required("Email không được để trống! "),
    password: yup.string().min(6, "Tối thiểu 6 ký tự!").required("Trường dữ liệu bắt buộc"),
})