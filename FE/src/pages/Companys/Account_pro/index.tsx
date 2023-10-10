import { AiOutlineCheck, AiOutlineQuestionCircle } from "react-icons/ai"

const AccountPro = () => {
    return (
        <div className='bg-gray-100 py-8 px-4'>
            <div className='max-w-[1100px] p-5 mx-auto bg-white text-[#526484]'>
                <h2 className="font-medium text-2xl text-gray-800">Tài khoản Pro</h2>
                <p className="text-sm leading-6 my-2">Tài khoản Pro là tài khoản cao cấp dành cho nhà tuyển dụng chuyên nghiệp, cung cấp tính năng đăng và quản lý tin nâng cao giúp bạn tăng hiệu suất và tiết kiệm thời gian đăng tin. Tài khoản Pro cũng cung cấp cho bạn các hồ sơ đề xuất cho tin tuyển dụng.</p>
                <div className="mt-8 grid grid-cols-3 gap-7">
                    <div className="shadow-5xl rounded-sm p-5">
                        <div className="flex flex-col text-center leading-8 border-b-2 pb-3">
                            <p className="text-xl text-gray-600">Tài Khoản Bạc</p>
                            <p className="text-[13px]">Các tính năng cơ bản cho NTD</p>
                            <p className="text-2xl text-gray-700">50,000 xu</p>
                            <p className="text-[13px]">Mỗi tháng</p>
                            <div className="flex justify-center">
                                <button className="bg-[#e4efff] border border-[#9dc6ff] text-[#0971fe] rounded py-[2px] px-4 text-[14px] hover:bg-blue-500 hover:text-white">
                                    Mua ngay
                                </button>
                            </div>
                        </div>
                        <div className="leading-8 text-sm mt-4">
                            <p className="">
                                <AiOutlineCheck className="text-green-500 inline-block mr-1" />
                                <span> Xuất bản nhanh</span>
                            </p>
                            <p >
                                <AiOutlineCheck className="text-green-500 inline-block mr-1" />
                                Hẹn giờ lên tin
                            </p>
                            <p>
                                <AiOutlineCheck className="text-green-500 inline-block mr-1" />
                                Chat với người tìm việc online
                            </p>
                            <p>
                                <AiOutlineCheck className="text-green-500 inline-block mr-1" />
                                Mở khóa ứng viên xem tin trong báo cáo chiến dịch
                            </p>
                        </div>
                    </div>
                    <div className="shadow-5xl rounded-sm p-5">
                        <div className="flex flex-col text-center leading-8 border-b-2 pb-3">
                            <p className="text-xl text-[#F4BD0E]">Tài Khoản Vàng</p>
                            <p className="text-[13px]">Các tính năng nâng cao, hỗ trợ cho NTD</p>
                            <p className="text-2xl text-gray-700">90,000 xu</p>
                            <p className="text-[13px]">Mỗi tháng</p>
                            <div className="flex justify-center">
                                <button className="bg-[#e4efff] border border-[#9dc6ff] text-[#0971fe] rounded py-[2px] px-4 text-[14px] hover:bg-blue-500 hover:text-white">
                                    Mua ngay
                                </button>
                            </div>
                        </div>
                        <div className="leading-8 text-sm mt-4">
                            <p className="">
                                <AiOutlineCheck className="text-green-500 inline-block mr-1" />
                                <span>Tất cả lợi ích từ gói bạc</span>
                            </p>
                            <p >
                                <AiOutlineCheck className="text-green-500 inline-block mr-1" />
                                Báo cáo hiệu suất
                            </p>
                            <p>
                                <AiOutlineCheck className="text-green-500 inline-block mr-1" />
                                Thao tác với nhiều tin
                            </p>
                            <p>
                                <AiOutlineCheck className="text-green-500 inline-block mr-1" />
                                Có thêm huy hiệu uy tín
                            </p>
                        </div>
                    </div>
                    <div className="shadow-5xl rounded-sm p-5">
                        <div className="flex flex-col text-center leading-8 border-b-2 pb-3">
                            <p className="text-xl text-[#E85347]">Tài Khoản Kim Cương</p>
                            <p className="text-[13px]">Các tính năng nâng cao, hỗ trợ cho NTD</p>
                            <p className="text-2xl text-gray-700">150,000 xu</p>
                            <p className="text-[13px]">Mỗi tháng</p>
                            <div className="flex justify-center">
                                <button className="bg-[#e4efff] border border-[#9dc6ff] text-[#0971fe] rounded py-[2px] px-4 text-[14px] hover:bg-blue-500 hover:text-white">
                                    Mua ngay
                                </button>
                            </div>
                        </div>
                        <div className="leading-8 text-sm mt-4">
                            <p className="">
                                <AiOutlineCheck className="text-green-500 inline-block mr-1" />
                                <span>Tất cả lợi ích từ gói vàng</span>
                            </p>
                            <p >
                                <AiOutlineCheck className="text-green-500 inline-block mr-1" />
                                Nhận đề xuất hồ sơ cho tin các việc làm đăng tuyển
                            </p>
                            <p>
                                <AiOutlineCheck className="text-green-500 inline-block mr-1" />
                                Thao tác với nhiều tin
                            </p>
                            <p>
                                <AiOutlineCheck className="text-green-500 inline-block mr-1" />
                                Quản lý tài khoản NTD chuyên nghiệp
                            </p>
                        </div>
                    </div>
                </div>
                <p className="flex items-center gap-1 mt-6 text-sm">
                    <AiOutlineQuestionCircle className="text-red-500" />
                    <p>Bạn cần tư vấn thêm về tài khoản Pro của chúng tôi? <span className="text-blue-400">Liên hệ CSKH ngay.</span></p>
                </p>
            </div>
        </div>

    )
}


export default AccountPro