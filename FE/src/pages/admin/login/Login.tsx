import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import { FormLoginAdmin, schemaLoginAdmin } from '../../../schemas';
import { useAdminLoginMutation } from '../../../api/admin/loginAdminApi';
import { useLocalStorage } from '../../../useLocalStorage/useLocalStorage';
import { Link, useNavigate } from 'react-router-dom';
import { Notyf } from 'notyf';


const LoginAdmin = () => {
    const navigate = useNavigate();
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
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
            notyf.success("Đăng nhập admin thành công!");
            setTimeout(() => {
                navigate("/admin")
            }, 1000)

        } catch (error: any) {
            notyf.error(error?.data?.message);
        }
    }

    return (
        <section className="bg-white flex justify-between">
            <div className="lg:grid lg:min-h-screen lg:">
                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">
                        <Link to="/">
                            <img src="https://res.cloudinary.com/dxzlnojyv/image/upload/v1700016144/xhfmztmgbyqu1ezm71dh.png" alt="" width={150} />
                        </Link>
                        <h1 className="mt-6 text-2xl  text-gray-900 sm:text-3xl md:text-4xl">
                            Chào mừng bạn đã quay trở lại!
                        </h1>
                        <h5 className="mt-6 text-base  sm:text-3xl md:text-2xl text-blue-500">
                            Đăng nhập quản trị viên!
                        </h5>
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
                                        placeholder='bework@gmail.com'
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
                                        placeholder='**************'
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
            <img src="https://res.cloudinary.com/dxzlnojyv/image/upload/v1700832295/tech_r7rqqf.jpg" alt="" width={600} />
        </section >

    )
}

export default LoginAdmin