import { useState } from "react";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">

                <form
                    action=""
                    className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                >
                    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                        Chào Mừng Đến Với IT Careers
                    </h1>
                    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                        Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng tại IT Careers nhé !!!
                    </p>
                    <div>
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Họ và Tên"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="relative">
                            <input
                                type="number"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Số Điện Thoại"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="relative">
                            <input
                                type="email"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Email"
                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Mật Khẩu"
                            />

                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4 " onClick={togglePasswordVisibility}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div className="col-span-6">
                        <label htmlFor="MarketingAccept" className="flex gap-4">
                            <input
                                type="checkbox"
                                id="MarketingAccept"
                                name="marketing_accept"
                                className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
                            />

                            <span className="text-sm text-gray-700">
                                Tôi đồng ý với quy chế hoạt động và chính sách bảo mật thông tin của IT Careesr
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                    >
                        Đăng Ký
                    </button>

                    <p className="text-center text-sm text-gray-500">
                        Bạn đã có Tài Khoản ?
                        <a className="underline text-indigo-600" href="/signin"> Đăng Nhập ngay nhé !</a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignUp