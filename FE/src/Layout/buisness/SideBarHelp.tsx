import { Link } from 'react-router-dom'

const SideBarHelp = () => {
    return (
        <div><div className="flex  flex-col justify-between border-e  sidebar bg-gray-200 sticky top-0 h-screen overflow-y-auto">
            <div className="px-4 py-6">
                <Link to="/">
                    <img src='https://123job.vn/images/logo_tim.png' className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600"
                    />
                </Link>

                <ul className="mt-6 space-y-1">
                    <li className=' mt-20'>
                        <Link to=""
                            className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                        >
                            Trung tâm trợ giúp - Bework
                        </Link>
                    </li>

                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary
                                className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                                <span className="text-sm font-medium"> DỊCH VỤ CHO NHÀ TUYỂN DỤNG </span>

                                <span
                                    className="shrink-0 transition duration-300 group-open:-rotate-180"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </summary>

                            <ul className="mt-2 space-y-1 px-4">
                                <li>
                                    <Link to="help-text1"
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    > Sản Phẩm Và Dịch Vụ
                                    </Link>
                                </li>
                                <li>
                                    <Link to=""
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Tìm Kiếm Hồ Sơ Ứng Viên
                                    </Link>
                                </li>
                                <li>
                                    <Link to=""
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Trang Chuyên Tuyển Dụng
                                    </Link>
                                </li>


                            </ul>
                        </details>
                    </li>
                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary
                                className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                                <span className="text-sm font-medium"> TIN TUYỂN DỤNG </span>

                                <span
                                    className="shrink-0 transition duration-300 group-open:-rotate-180"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </summary>

                            <ul className="mt-2 space-y-1 px-4">
                                <li>
                                    <Link to=""
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    > Đăng Tin Tuyển Dụng
                                    </Link>
                                </li>
                                <li>
                                    <Link to=""
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Các Loại Tin Đăng
                                    </Link>
                                </li>
                                <li>
                                    <Link to=""
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Dịch Vụ Hỗ Trợ Đăng Tin
                                    </Link>
                                </li>


                            </ul>
                        </details>
                    </li>
                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary
                                className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                                <span className="text-sm font-medium">CHIẾN DỊCH TUYỂN DỤNG </span>

                                <span
                                    className="shrink-0 transition duration-300 group-open:-rotate-180"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </summary>

                            <ul className="mt-2 space-y-1 px-4">
                                <li>
                                    <Link to=""
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    > Khái niệm chiến dịch tuyển dụng
                                    </Link>
                                </li>
                                <li>
                                    <Link to=""
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Đăng tin tuyển dụng với chiến dịch
                                    </Link>
                                </li>
                                <li>
                                    <Link to=""
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Mẹo chiến dịch thu hút
                                    </Link>
                                </li>

                                <li>
                                    <Link to=""

                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Tạo chiến dịch hiệu quả
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary
                                className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                                <span className="text-sm font-medium">TÀI KHOẢN </span>

                                <span
                                    className="shrink-0 transition duration-300 group-open:-rotate-180"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </summary>

                            <ul className="mt-2 space-y-1 px-4">

                                <li>
                                    <Link to=""
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >Hạng Tài Khoản
                                    </Link>
                                </li>

                                <li>
                                    <Link to=""

                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Gợi Ý Tài Khoản
                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary
                                className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                            >
                                <span className="text-sm font-medium"> CÁC TÍNH NĂNG </span>

                                <span
                                    className="shrink-0 transition duration-300 group-open:-rotate-180"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </summary>

                            <ul className="mt-2 space-y-1 px-4">
                                <li>
                                    <Link to=""
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    > Báo cáo tuyển dụng
                                    </Link>
                                </li>
                                <li>
                                    <Link to=""
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Điểm tối ưu của chiến dịch
                                    </Link>
                                </li>
                                <li>
                                    <Link to=""
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Mở lại chiến dịch đang tắt
                                    </Link>
                                </li>

                                <li>
                                    <Link to=""

                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Dừng chiến dịch tuyển dụng

                                    </Link>
                                </li>
                                <li>
                                    <Link to=""

                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Sửa chiến dịch tuyển dụng

                                    </Link>
                                </li>
                                <li>
                                    <Link to=""

                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Chỉnh sửa tin tuyển dụng

                                    </Link>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
        </div></div>
    )
}

export default SideBarHelp