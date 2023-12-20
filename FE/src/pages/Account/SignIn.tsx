import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { FormLogin, schemaLogin } from "../../schemas";
import { useLoginMutation } from "../../api/auths";
import { useLocalStorage } from "../../useLocalStorage/useLocalStorage";
import { Notyf } from "notyf";
import { FaGooglePlusG } from "react-icons/fa";


const Login = React.memo(() => {

    const navigate = useNavigate();
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
    const { register, handleSubmit, formState: { errors } } = useForm<FormLogin>({
        resolver: yupResolver(schemaLogin)
    });
    const [user, setUser] = useLocalStorage("user", null);

    const [login] = useLoginMutation();
    const loginGoogle = () => {
        window.location.href = 'http://127.0.0.1:8000/api/auth/google';

    }
    const location = useLocation();

    useEffect(() => {
        // Trích xuất token từ query parameters
        const urlParams = new URLSearchParams(location.search);
        const token = urlParams.get('token');
        console.log(token);

        // Lưu token vào local storage
        if (token) {
            localStorage.setItem('access_token', token);
            navigate('/')
        } else {
            console.error('Không tìm thấy token trong query parameters.');
        }
    }, [location, history]);
    const onHandleSubmit = async (data: FormLogin) => {
        try {
            const results = await login(data).unwrap();
            setUser({
                accessToken: results.access_token,
                users: results.user,
            });
            notyf.success("Đăng nhập thành công!")
            setTimeout(() => {
                navigate("/");
            }, 1000);

        } catch (error: any) {
            notyf.error(error.data.message)
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    return (
        <>
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
                            <Link className="block text-blue-600" to="/">
                                <img src="https://res.cloudinary.com/dxzlnojyv/image/upload/v1700416379/riqyog9hekgrzdpdwg8w.png" alt="" width={100} />
                            </Link>
                            <h1 className="mt-6 text-2xl font-bold text-blue-500 sm:text-3xl md:text-4xl">
                                Chào mừng bạn đã quay trở lại
                            </h1>
                            <p className="mt-4 leading-relaxed text-gray-500">
                                Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng
                            </p>
                            <form className="mt-8 grid grid-cols-2 gap-6" onSubmit={handleSubmit(onHandleSubmit)}>

                                <div className="col-span-6">
                                    <label
                                        htmlFor="Email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email
                                    </label>
                                    <input
                                        {...register("email")}
                                        placeholder="bework@gmail.com"
                                        type="text"
                                        className="px-5 py-3 w-full rounded-md outline-none border border-blue-500  bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                    <div className="text-red-500 text-sm mt-2">
                                        {errors?.email && errors?.email?.message}
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <label
                                        htmlFor="Password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Password
                                    </label>
                                    <input
                                        {...register("password")}
                                        placeholder="***************"
                                        type="password"
                                        className="w-full outline-none border border-blue-500 px-5 py-3  rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                                    />
                                    <div className="text-red-500 text-sm mt-2">
                                        {errors?.password && errors?.password?.message}
                                    </div>
                                </div>
                                <Link to="/forgot" className="text-blue-500 col-span-6">Quên mật khẩu?</Link>

                                <div className="col-span-6 ">
                                    <button className="inline-block shrink-0 w-full rounded-md border border-blue-600 bg-blue-600 px-12 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                                        Đăng nhập
                                    </button>
                                </div>
                                <p className="col-span-6  text-sm w-full text-gray-500 sm:mt-0">
                                    Bạn chưa có tài khoản?
                                    <Link to="/register" className="text-blue-500 underline">
                                        Đăng ký
                                    </Link>
                                    .
                                </p>
                            </form>
                            {/* <div className="col-span-6 ">
                                <button
                                    onClick={loginGoogle}
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
        </>

    )
})

export default Login
