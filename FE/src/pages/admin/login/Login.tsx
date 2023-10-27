import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import { FormLoginAdmin, schemaLoginAdmin } from '../../../schemas';
import { useAdminLoginMutation } from '../../../api/admin/loginAdminApi';
import { useLocalStorage } from '../../../useLocalStorage/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const LoginAdmin = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<FormLoginAdmin>({
        resolver: yupResolver(schemaLoginAdmin)
    })
    const [admin, setAdmin] = useLocalStorage("admin", null);
    const [LoginAdmin] = useAdminLoginMutation();
    const onHandleSubmit = async (data: FormLoginAdmin) => {
        try {
            const results = await LoginAdmin(data).unwrap();
            setAdmin({
                accessToken: results?.access_token,
                admin: results?.admin
            })
            Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Đăng nhập thành công',
                timer: 1500
            })

            setTimeout(() => {
                alert("Đăng nhập admin thành công");
                navigate("/admin")
            }, 1000)

        } catch (error) {
            Swal.fire({
                position: 'top',
                icon: 'error',
                title: 'Opps',
                text: "Thong tin taì khoản hoặc mật khẩu không chính xác!",
                timer: 1500
            })
        }
    }

    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">

                        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                            Đăng nhập admin
                        </h1>

                        <form className="mt-8 " onSubmit={handleSubmit(onHandleSubmit)}>
                            <div className='grid grid-cols-6 gap-6'>

                                <div className="col-span-6 my-2">
                                    <label
                                        htmlFor="Email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="Email"

                                        className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700
                                        border outline-none py-2 px-2
                                         shadow-sm"
                                        {...register("email")}
                                    />
                                    <div className='text-sm text-red-500'>
                                        {errors.email && errors.email.message}
                                    </div>
                                </div>
                                <div className="col-span-6">
                                    <label
                                        htmlFor="Email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="Email"
                                        className="mt-1 w-full rounded-md
                                        border outline-none py-2 px-2
                                        border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                                        {...register("password")}

                                    />
                                    <div className='text-sm text-red-500'>
                                        {errors.password && errors.password.message}
                                    </div>
                                </div>
                            </div>
                            <button className='border px-2 py-2 my-5 rounded bg-blue-500 text-white'>Đăng nhập</button>

                        </form>
                    </div>
                </main>
            </div >
        </section >

    )
}

export default LoginAdmin