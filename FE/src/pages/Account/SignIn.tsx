import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { SlSocialFacebook } from 'react-icons/sl';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { FormLogin, schemaLogin } from "../../schemas";
import { useLoginMutation } from "../../api/auths";
import { useLocalStorage } from "../../useLocalStorage/useLocalStorage";
// import { useAdminLoginMutation } from "../../api/admin/loginAdminApi";
import { Notyf } from "notyf";


const Login = () => {
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
    const [setUser] = useLocalStorage("user", null)
    const [login] = useLoginMutation();
    const loginGoogle = () => {
        window.location.href = "http://127.0.0.1:8000/api/auth/google"
    }
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
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-[500px] xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Chào mừng bạn đã quay trở lại
                        </h1>
                        <p className="text-sm text-gray-600">Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng</p>
                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit(onHandleSubmit)}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    {...register("email")}
                                    type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 outline-none dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                                <div className="text-red-500 my-2">
                                    {errors.email && errors.email.message}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                <input
                                    {...register('password')}
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••" className="bg-gray-50 border border-gray-300 outline-none text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onClick={togglePasswordVisibility} />
                                <div className="text-red-500 my-2">
                                    {errors.password && errors.password.message}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Ghi nhớ tôi</label>
                                    </div>
                                </div>
                                <Link to="/forgot" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Quên mật khẩu?</Link>

                            </div>
                            <div className="flex justify-center">
                                <button
                                    onClick={loginGoogle}
                                    className="rounded-lg bg-gray-200 text-black flex items-center space-x-2 px-9 py-2 mt-4 mr-2">
                                    <span className="w-10"><FcGoogle /></span>

                                    <span> Google</span>
                                </button>
                                <button className="rounded-lg bg-blue-800 text-white flex items-center space-x-2 px-9 py-2 mt-4 ml-2">
                                    <span className="w-10">< SlSocialFacebook /></span>
                                    <span> Facebook</span>
                                </button>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng nhập</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Chưa có tài khoản? <Link to="/dang-ky-tai-khoan" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng ký</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
