import * as yup from "yup";


export const schemaLogin = yup.object({
    email: yup.string().email("Email không đúng ký tự").required("Trường dữ liệu bắt buộc!"),
    password: yup.string().min(6, "Tối thiểu 6 ký tự!").required("Trường dữ liệu bắt buộc!"),
})
export const schemaSignup = yup.object({
    name: yup.string().min(3, "Tối thiểu 3 ký tự!").required("Trường dữ liệu bắt buộc!"),
    email: yup.string().email("Email không đúng địng dạng"),
    password: yup.string().min(6, "Tối thiểu 6 ký tự!"),
    numberPhone: yup.string().test('is-phone-number', 'Số điện thoại không hợp lệ', function (value) {
        if (!value) return true; // Bỏ qua nếu giá trị không được cung cấp
        // Thay đổi đoạn mã sau để kiểm tra số điện thoại theo quy tắc cụ thể
        // Ví dụ: kiểm tra xem số điện thoại bắt đầu bằng "0" và sau đó là 9 chữ số
        const isValidPhoneNumber = /^0[0-9]{9}$/.test(value);
        return isValidPhoneNumber;
    }).required("Trường dữ liệu bắt buộc"),
});







