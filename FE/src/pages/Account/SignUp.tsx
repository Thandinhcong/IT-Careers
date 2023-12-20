import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../api/auths";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSignup, schemaSignup } from "../../schemas";
import { Notyf } from "notyf";
import { FaGooglePlusG } from "react-icons/fa";

const SignUp = React.memo(() => {
    const navigate = useNavigate();
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
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
                notyf.error("Email đã tồn tại !")
                return;
            } else if (result.errors && result.errors.phone) {
                notyf.error("Số điện thoại đã tồn tại")
                return;
            } else {
                notyf.success("Đăng ký thành công!")
                navigate("/login");
            }
        } catch (error: any) {
            notyf.error("Có lỗi xảy ra vui lòng thử lại!")
        }
    };



    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt="Pattern"
                        src="https://res.cloudinary.com/dxzlnojyv/image/upload/v1700832895/nsplsh_534e2846e5b64c40b9b5bb9f34c996d5_mv2_gygm1e.webp"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </aside>
                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">

                        <h1 className="mt-6 text-2xl font-bold text-blue-500 sm:text-3xl md:text-4xl">
                            Chào mừng bạn đến với <Link to="/">BEWORK</Link>
                        </h1>
                        <p className="mt-4 leading-relaxed text-gray-500">
                            Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng
                        </p>
                        <form className="mt-8 grid grid-cols-2 gap-3" onSubmit={handleSubmit(onHandleSubmit)}>
                            <div className="col-span-6">
                                <label
                                    className="block text-sm font-medium text-gray-700  mb-2"
                                >
                                    Họ và tên
                                </label>
                                <input
                                    {...register("name")}
                                    placeholder="NGUYEN VAN A"
                                    type="text"
                                    className="px-5 py-2 w-full rounded-md outline-none border border-blue-500  bg-white text-sm text-gray-700 shadow-sm"
                                />
                                <div className="text-red-500 text-sm mt-2">
                                    {errors?.name && errors?.name?.message}
                                </div>
                            </div>
                            <div className="col-span-6">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    {...register("email")}
                                    placeholder="bework@gmail.com"
                                    type="text"
                                    className="px-5 py-2 w-full rounded-md outline-none border border-blue-500  bg-white text-sm text-gray-700 shadow-sm"
                                />
                                <div className="text-red-500 text-sm mt-2">
                                    {errors?.email && errors?.email?.message}
                                </div>
                            </div>
                            <div className="col-span-6">
                                <label
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Số điện thoại
                                </label>
                                <input
                                    {...register("phone")}
                                    placeholder="052738495"
                                    type="text"
                                    className="px-5 py-2 w-full rounded-md outline-none border border-blue-500  bg-white text-sm text-gray-700 shadow-sm"
                                />
                                <div className="text-red-500 text-sm mt-2">
                                    {errors?.phone && errors?.phone?.message}
                                </div>
                            </div>

                            <div className="col-span-6">
                                <label
                                    htmlFor="Password"
                                    className="block text-sm font-medium text-gray-700  mb-2"
                                >
                                    Mật khẩu
                                </label>
                                <input
                                    {...register("password")}
                                    placeholder="********"
                                    type="password"
                                    className="w-full outline-none border border-blue-500 px-5 py-2  rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                                />
                                <div className="text-red-500 text-sm mt-2">
                                    {errors?.password && errors?.password?.message}
                                </div>
                            </div>
                            <div className="col-span-6">
                                <label
                                    htmlFor="Password"
                                    className="block text-sm font-medium text-gray-700  mb-2"
                                >
                                    Xác nhận mật khẩu
                                </label>
                                <input
                                    {...register("password_confirmation")}
                                    placeholder="********"

                                    type="password"
                                    className="w-full outline-none border border-blue-500 px-5 py-2  rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                                />
                                <div className="text-red-500 text-sm mt-2">
                                    {errors?.password_confirmation && errors?.password_confirmation?.message}
                                </div>
                            </div>

                            <div className="col-span-6 ">
                                <button className="inline-block shrink-0 w-full rounded-md border border-blue-600 bg-blue-600 px-12 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                                    Đăng ký
                                </button>
                            </div>
                            <p className="col-span-6  text-sm w-full text-gray-500 sm:mt-0">
                                Bạn đã có tài khoản?
                                <Link to="/login" className="text-blue-500 underline">
                                    Đăng nhập
                                </Link>
                                .
                            </p>
                        </form>
                        {/* <div className="col-span-6 ">
                            <button
                                onClick={() => loginGoogle()}
                                className="flex items-center gap-2 px-2 justify-center border w-full py-1 rounded mt-2"
                            >
                                <div className="text-xl">
                                    <FaGooglePlusG />
                                </div>
                                <span>Google</span>
                            </button>
                        </div> */}
                    </div>
                </main>
            </div>
        </section>

    )
})

export default SignUp