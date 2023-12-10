import { Link } from "react-router-dom"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Notyf } from "notyf";
import { ForgotPassword, FormForgot } from "../../../schemas";
import { useForgotPasswordMutation } from "../../../api/auth/Companies";


const ForgotPassCompany = () => {
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
    const { register, handleSubmit, formState: { errors } } = useForm<FormForgot>({
        resolver: yupResolver(ForgotPassword)
    });
    const [Submit] = useForgotPasswordMutation();
    const onHandleSubmit = async (data: any) => {
        try {
            await Submit(data).unwrap();
            notyf.success("Mật khẩu đã được gửi đến email của bạn!")
        } catch (error: any) {
            if (error?.status === 400) {
                notyf.error("Email không tồn tại!")
            }
        }
    }
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
                        <Link className="block text-blue-600" to="/">
                            <img src="https://res.cloudinary.com/dxzlnojyv/image/upload/v1700416379/riqyog9hekgrzdpdwg8w.png" alt="" width={100} />
                        </Link>
                        <h1 className="mt-6 text-2xl font-bold text-blue-500 sm:text-3xl md:text-4xl">
                            Chào mừng bạn đến với <Link to="/">BEWORK</Link>
                        </h1>
                        <p className="mt-4 leading-relaxed text-gray-500">
                            Bạn quên mật khẩu?Bework sẽ giúp bạn lấy lại
                        </p>
                        <form className="mt-8 grid grid-cols-2 gap-3" onSubmit={handleSubmit(onHandleSubmit)} >

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
                                <div className="text-sm mt-2 text-red-500">
                                    {errors?.email && errors?.email.message}
                                </div>
                            </div>

                            <div className="col-span-6 ">
                                <button className="inline-block shrink-0 w-full rounded-md border border-blue-600 bg-blue-600 px-12 py-2 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                                    Gửi
                                </button>
                            </div>
                            <p className="col-span-6  text-sm w-full text-gray-500 sm:mt-0">
                                Bạn chưa có tài khoản?
                                <Link to="/business/signup" className="text-blue-500 underline">
                                    Đăng ký
                                </Link>
                                .
                            </p>
                        </form>

                    </div>
                </main>
            </div>
        </section>

    )
}

export default ForgotPassCompany