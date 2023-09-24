

const ForgotPass = () => {
    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
                <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
                    Bạn Đã Quên Mật Khẩu ?
                </h1>


                <form
                    action=""
                    className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
                >
                    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                        Đừng lo, chúng tôi sẽ gửi cho bạn một tin nhắn giúp bạn đặt lại mật khẩu qua email đăng ký tài khoản.
                    </p>


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

                    <button
                        type="submit"
                        className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                    >
                        Lấy Lại Mật Khẩu
                    </button>



                    <p className="text-center text-sm text-gray-600">
                        Bạn chưa có Tài Khoản ?
                        <a className="underline text-indigo-600" href="/signup"> Đăng ký ngay nhé !</a>
                    </p>


                </form>
                {/* <p className="text-center text-sm text-gray-500">
                    Trở Thành Nhà Tuyển Dụng
                    <a className="underline" href="/signup"> Đăng ký ngay nhé !</a>
                </p> */}
            </div>
        </div>
    )
}

export default ForgotPass