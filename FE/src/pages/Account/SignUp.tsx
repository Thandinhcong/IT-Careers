import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../api/auths";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSignup, schemaSignup } from "../../schemas";
import Swal from 'sweetalert2';
import { useAdminLoginMutation } from "../../api/admin/loginAdminApi";

const SignUp = () => {
    const navigate = useNavigate();
    const { data } = useAdminLoginMutation();
    const loginGoogle = () => {
        window.location.href = "http://127.0.0.1:8000/api/auth/google"
    }
    const { register, handleSubmit, formState: { errors } } = useForm<FormSignup>({
        resolver: yupResolver(schemaSignup)
    })
    const [signup] = useSignupMutation();
    const onHandleSubmit = async (user: FormSignup) => {
        try {
            const result = await signup(user as any).unwrap();

            if (result.errors && result.errors.email) {
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Opps',
                    text: "Email đã tồn tại",
                    confirmButtonText: 'Quay lại',
                    timer: 1500
                })
                return;
            } else if (result.errors && result.errors.phone) {
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Opps',
                    text: "Số điện thoại đã tồn tại",
                    confirmButtonText: 'Quay lại',
                    timer: 1500
                })
                return;
            } else {
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Đăng ký thành công',
                    timer: 1500
                })
                navigate("/signin");
            }
        } catch (error: any) {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Opps',
                text: "Có lỗi xảy ra vui lòng thử lại",
                timer: 1500
            })
        }
    };


    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-20 h-15 mr-2" src="https://123job.vn/images/logo_tim.png" alt="logo" />
                </Link>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-blue-500 md:text-2xl dark:text-white">
                            Đăng ký tài khoản
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onHandleSubmit)}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    {...register("email")}
                                    type="text" className="bg-gray-50 border outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                                <div className="text-red-500 my-2">
                                    {errors.email && errors.email.message}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input
                                    {...register('name')}
                                    type="text" name="name" id="name" className="bg-gray-50  outline-none border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" />
                                <div className="text-red-500 my-2">
                                    {errors.name && errors.name.message}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                                <input
                                    {...register("phone")}
                                    type="number" name="phone" id="phone" className="bg-gray-50 outline-none border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone Number" />
                                <div className="text-red-500 my-2">
                                    {errors.phone && errors.phone.message}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                <input
                                    {...register('password')}
                                    type='password'
                                    name="password" placeholder="••••••••" className="bg-gray-50 border  outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onClick={togglePasswordVisibility} />
                                <div className="text-red-500 my-2">
                                    {errors.password && errors.password.message}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Xác nhận mật khẩu</label>
                                <input
                                    {...register('password_confirmation')}
                                    type="password"
                                    placeholder="••••••••" className="bg-gray-50 border outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                <div className="text-red-500 my-2">
                                    {errors.password_confirmation && errors.password_confirmation.message}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 outline-none rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Ghi nhớ tôi</label>
                                    </div>
                                </div>
                                <Link to="/forgot" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Quên mật khẩu?</Link>

                            </div>

                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng ký</button>
                            <div className="flex items-start mb-6">

                            </div>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Bạn đã có tài khoản? <Link to="/signin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng nhập</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp