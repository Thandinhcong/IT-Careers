import { AiFillLinkedin, AiOutlineFacebook, AiOutlineYoutube } from "react-icons/ai"


const Footer = () => {
    return (
        <footer className="bg-white">
            <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8 lg:pt-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-4">
                    <div className="">
                        <p className="font-bold text-gray-900">Về 123job.vn</p>
                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <a href="#" className="text-gray-900 transition hover:opacity-75">
                                    Giới thiệu
                                </a>
                            </li>

                            <li>
                                <a href="recruit" className="text-gray-900 transition hover:opacity-75">
                                    Tuyển dụng
                                </a>
                            </li>

                            <li>
                                <a href="help/contact" className="text-gray-900 transition hover:opacity-75">
                                    Liên hệ
                                </a>
                            </li>

                            <li>
                                <a href="help/policy" className="text-gray-900 transition hover:opacity-75">
                                    Điều khoản sử dụng
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-900 transition hover:opacity-75">
                                    Quy chế hoạt động
                                </a>
                            </li>
                            <li>
                                <a href="help/faq" className="text-gray-900 transition hover:opacity-75">
                                    Câu hỏi thường gặp
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-900 transition hover:opacity-75">
                                    Giải quyết khiếu nại
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="">
                        <p className="font-bold text-gray-900">Người tìm việc</p>

                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <a href="#" className="text-gray-900 transition hover:opacity-75">
                                    Profile cá nhân
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-900 transition hover:opacity-75">
                                    Mẫu CV xin việc
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-900 transition hover:opacity-75">
                                    Mẫu Cover Letter
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-900 transition hover:opacity-75">
                                    Mẫu CV file word
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-900 transition hover:opacity-75">
                                    Hướng dẫn viết CV
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="">
                        <p className="font-bold text-gray-900">Nhà tuyển dụng</p>

                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <a href="#" className="text-gray-900 transition hover:opacity-75">
                                    Đăng tin tuyển dụng
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-900 transition hover:opacity-75">
                                    Tìm kiếm hồ sơ
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-900 transition hover:opacity-75">
                                    Chuyên trang tuyển dụng
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-900 transition hover:opacity-75">
                                    Kết nối ứng viên
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-900 transition hover:opacity-75">
                                    Cẩm nang tuyển dụng
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="">
                        <p className="font-bold text-gray-900">Tìm việc làm</p>

                        <ul className="mt-6 space-y-4 text-sm">
                            <li>
                                <a href="#" className="text-gray-900 transition hover:opacity-75">
                                    Việc theo chức danh
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-900 transition hover:opacity-75">
                                    Việc theo địa điểm
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-900 transition hover:opacity-75">
                                    Việc theo công ty
                                </a>
                            </li>

                            <li>
                                <a href="#" className="text-gray-900 transition hover:opacity-75">
                                    Việc khu công nghiệp
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="my-6" />
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <div>
                        <div className="">
                            <img src="https://123job.vn/images/logo_tim.png" className="w-24" alt="" />
                            <p className="font-medium text-base">Công ty cổ phần VNP Group</p>
                        </div>

                        <p
                            className="mt-6 max-w-md text-center leading-relaxe sm:max-w-lg sm:text-left"
                        >
                            Số GCNĐKDN: 0102015284, cấp ngày 21/06/2012, nơi cấp: Sở kế hoạch và đầu tư thành phố Hà Nội
                        </p>
                        <p className="my-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 shrink-0 text-gray-900 inline-block base-line"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            <span>Trụ sở HN: 102 Thái Thịnh, Trung Liệt, Đống Đa, Hà Nội</span>
                        </p>
                        <img src="https://123job.vn/images/gov.png" alt="" />
                    </div>

                    <div className="lg:col-span-1">
                        <div className="text-center sm:text-left">
                            <p className="text-lg font-medium text-gray-900">Hỗ trợ khách hàng</p>

                            <ul className="mt-8 space-y-4 text-sm">
                                <li>
                                    <a
                                        className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                                        href="/"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 shrink-0 text-gray-900"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>

                                        <span className="flex-1 text-gray-900">Email: contact@123job.vn</span>
                                    </a>
                                </li>

                                <li>
                                    <a
                                        className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                                        href="/"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 shrink-0 text-gray-900"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>

                                        <span className="flex-1 text-gray-900"> Zalo/Phone: 0368.201.788 - Ngọc Bích</span>
                                    </a>
                                </li>

                                <li
                                    className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 shrink-0 text-gray-900"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    <address className="-mt-0.5 flex-1 not-italic text-gray-900">
                                        Liên hệ hợp tác: 0333.383.630 - Nguyễn Hưng
                                    </address>
                                </li>
                            </ul>

                            <div>
                                <p className="my-4 font-medium text-lg">Cộng đồng 123job.vn</p>
                                <span className="text-4xl flex gap-2">
                                    <a href=""><AiOutlineFacebook className="text-blue-500" /></a>
                                    <a href=""><AiOutlineYoutube className=" text-red-600" /></a>
                                    <a href=""><AiFillLinkedin className="text-blue-500" /></a>

                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-6" />
                <div className="pt-6">
                    <div className="text-center">
                        <p className="mt-4 text-md text-gray-900 sm:order-first sm:mt-0">
                            Copyright © 2018 123job.vn - Nền tảng tìm kiếm việc làm và review công ty hàng đầu tại Việt Nam
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer