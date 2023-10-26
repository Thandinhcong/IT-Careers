import * as yup from "yup";

export const schemaJobApply=yup.object({
    name:yup.string().min(3,"Tối thiểu 3 ký tự!").required("Trường dữ liệu bắt buộc!"),
    email:yup.string().email("Email không đúng định dạng!").required("Trường dữ liệu bắt buộc!"),
    phone: yup.string().test('is-phone-number', 'Số điện thoại không hợp lệ', function (value) {
        if (!value) return true; 
        const isValidPhoneNumber = /^0[0-9]{9}$/.test(value);
        return isValidPhoneNumber;
    }).required("Trường dữ liệu bắt buộc"),
    desc:yup.string(),
    profile_id:yup.string().required("Trường dữ liệu bắt buộc!")
    
});
export type FromApply = yup.InferType<typeof schemaJobApply>