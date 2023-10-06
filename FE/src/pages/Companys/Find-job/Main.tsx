import { useState } from "react";
import { AiOutlineCalendar, AiOutlineClockCircle, AiOutlineClose, AiOutlineDollarCircle, AiOutlineEnvironment, AiOutlineFilter, AiOutlineHeart, AiOutlineReload, AiOutlineSwap } from "react-icons/ai"
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter,
} from "tw-elements-react";

const MainFindJob = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div>
            <div className="flex gap-4 text-sm my-4">
                <input type="text" placeholder="Tìm tên việc, chức danh" className="border border-gray-200 p-2 rounded-md outline-blue-400 w-1/4" />
                <select
                    name=""
                    className="border border-gray-200 p-2 rounded-md outline-blue-400 text-gray-700 w-40"
                >
                    <option value="">- Tỉnh thành -</option>
                    <option value="JM">Hà Nội</option>
                    <option value="SRV">Đà Nẵng</option>
                    <option value="JH">Bình Dương</option>
                    <option value="BBK">Hồ Chí Minh</option>
                    <option value="AK">Khánh Hòa</option>
                    <option value="BG">Đồng Nai</option>
                </select>
                <select
                    name=""
                    className="border border-gray-200 p-2 rounded-md outline-blue-400 text-gray-700 w-40 "
                >
                    <option value="">- Quận/Huyện -</option>
                    <option value="JM">Hà Nội</option>
                    <option value="SRV">Đà Nẵng</option>
                    <option value="JH">Bình Dương</option>
                    <option value="BBK">Hồ Chí Minh</option>
                    <option value="AK">Khánh Hòa</option>
                    <option value="BG">Đồng Nai</option>
                </select>
                <select
                    name=""
                    className="border border-gray-200 p-2 rounded-md outline-blue-400 text-gray-700 w-40 "
                >
                    <option value="">- Mức lương -</option>
                    <option value="JM">Dưới 1 triệu</option>
                    <option value="SRV">1-3 triệu</option>
                    <option value="JH">3-5 triệu</option>
                    <option value="BBK">7-10 triệu</option>
                    <option value="AK">10-13 triệu</option>
                    <option value="BG">13-16 triệu</option>
                    <option value="BG">16-20 triệu</option>
                    <option value="BG">20-25 triệu</option>
                </select>
                <button className="bg-blue-600 text-white flex items-center rounded-md px-3"><AiOutlineFilter className="text-lg" /><p>Lọc</p></button>
                <button className="bg-[#eaebee] text-gray-500 flex items-center rounded-md px-3"><AiOutlineReload /><p>Xóa lọc</p></button>
            </div>
            <div className="bg-gray-100 -mx-4">
                <div className="pt-4 bg-gray-100 mb-2 flex justify-between">
                    <p className="text-gray-700">Có 28154 kết quả tìm kiếm.</p>
                    <select
                        name=""
                        className="border border-gray-200 p-2 rounded-md outline-blue-400 text-gray-700 w-48"
                    >
                        <option value="">- Tin mới nhất -</option>
                        <option value="JM">- Mức lương giảm dần -</option>
                        <option value="SRV">- Mức lương tăng dần -</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white text-base">
                        <div className="flex gap-4 leading-7">
                            <img src="https://business.123job.vn/images/rank_0.png" className="w-14" alt="" />
                            <div>
                                <p className="font-semibold text-lg">Phan Duy Thong</p>
                                <p>090409**** -<span> Năm sinh: 1980</span></p>
                            </div>
                        </div>
                        <p className="text-gray-500 my-3">Công việc quan tâm</p>
                        <div className="leading-8 border-b pb-2">
                            <p className="flex items-center"><AiOutlineCalendar /> <span className="w-28">Vị trí:</span> <span>Đội Bếp</span></p>
                            <p className="flex items-center"><AiOutlineEnvironment /> <span className="w-28">Địa điểm:</span> <span>Hồ Chí Minh</span></p>
                            <p className="flex items-center"><AiOutlineDollarCircle /> <span className="w-28">Mức lương:</span> <span>Trên 50 triệu</span></p>
                        </div>
                        <div className="mt-3 flex justify-between">
                            <p className="flex items-center gap-2 text-gray-500"><AiOutlineClockCircle /><span>Đăng 4 ngày trước</span></p>
                            <div>
                                <button className="bg-gray-100 p-3 mr-2 rounded text-gray-400"><AiOutlineHeart /></button>
                                {/* <!-- Button trigger modal --> */}
                                <TERipple rippleColor="white">
                                    <button
                                        type="button"
                                        className="bg-[#e4efff] text-[#0971fe] border border-[#9dc6ff] rounded py-2 px-3"
                                        onClick={() => setShowModal(true)}
                                    >
                                        Xem ngay
                                    </button>
                                </TERipple>

                                {/* <!-- Modal --> */}
                                <TEModal show={showModal} setShow={setShowModal}>
                                    <TEModalDialog style={{ maxWidth: '700px' }}>
                                        <TEModalContent >
                                            <TEModalHeader>
                                                {/* <!--Modal title--> */}
                                                <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                                                    Ứng viên cần tìm việc
                                                </h5>
                                                {/* <!--Close button--> */}
                                                <button
                                                    type="button"
                                                    className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                                    onClick={() => setShowModal(false)}
                                                    aria-label="Close"
                                                >
                                                    <AiOutlineClose />
                                                </button>
                                            </TEModalHeader>
                                            {/* <!--Modal body--> */}
                                            <TEModalBody>
                                                <div>
                                                    <h2 className="text-gray-700 font-semibold mb-4">Thông tin công việc</h2>
                                                    <div className="flex">
                                                        <div className="w-1/3 border border-slate-200 p-2">
                                                            <p className="font-semibold">Chức danh, tên công việc</p>
                                                        </div>
                                                        <div className="w-2/3 border border-slate-200 p-2">
                                                            <p>Nau An Cho Nguoi Han Quoc</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-1/3 border border-slate-200 p-2">
                                                            <p className="font-semibold">Địa điểm làm việc</p>
                                                        </div>
                                                        <div className="w-2/3 border border-slate-200 p-2">
                                                            <p>Quận 7, Hồ Chí Minh</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-1/3 border border-slate-200 p-2">
                                                            <p className="font-semibold">Mức Lương mong muốn</p>
                                                        </div>
                                                        <div className="w-2/3 border border-slate-200 p-2">
                                                            <p>Trên 50 triệu</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-1/3 border border-slate-200 p-2">
                                                            <p className="font-semibold">Kĩ năng gồm có</p>
                                                        </div>
                                                        <div className="w-2/3 border border-slate-200 p-2">
                                                            <p>Nau mon han quoc</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-1/3 border border-slate-200 p-2">
                                                            <p className="font-semibold">Ngày đăng</p>
                                                        </div>
                                                        <div className="w-2/3 border border-slate-200 p-2">
                                                            <p>4 tuần trươc</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-1/3 border border-slate-200 p-2">
                                                            <p className="font-semibold">Kinh nghiệm đã có</p>
                                                        </div>
                                                        <div className="w-2/3 border border-slate-200 p-2">
                                                            <p>5nam</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h2 className="text-gray-700 font-semibold my-4">Thông tin liên hệ</h2>
                                                    <div className="flex">
                                                        <div className="w-1/3 border border-slate-200 p-2">
                                                            <p className="font-semibold">Họ và tên</p>
                                                        </div>
                                                        <div className="w-2/3 border border-slate-200 p-2">
                                                            <p>Nguyen Thi Hoa</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-1/3 border border-slate-200 p-2">
                                                            <p className="font-semibold">Năm sinh</p>
                                                        </div>
                                                        <div className="w-2/3 border border-slate-200 p-2">
                                                            <p>1982</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-1/3 border border-slate-200 p-2">
                                                            <p className="font-semibold">Số điện thoại</p>
                                                        </div>
                                                        <div className="w-2/3 border border-slate-200 p-2">
                                                            <p>090395****</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-1/3 border border-slate-200 p-2">
                                                            <p className="font-semibold">Email</p>
                                                        </div>
                                                        <div className="w-2/3 border border-slate-200 p-2">
                                                            <p>hoanguy*******@gmail.com</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-1/3 border border-slate-200 p-2">
                                                            <p className="font-semibold">Hồ sơ</p>
                                                        </div>
                                                        <div className="w-2/3 border border-slate-200 p-2">
                                                            <p>4 tuần trươc</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-1/3 border border-slate-200 p-2">
                                                            <p className="font-semibold">Kinh nghiệm đã có</p>
                                                        </div>
                                                        <div className="w-2/3 border border-slate-200 p-2">
                                                            <p>	Link</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="border border-slate-200 p-2 my-3">
                                                    <p className="flex justify-between">
                                                        <span>Phí mở liên hệ</span>
                                                        <span className="text-red-400">2000 xu</span>
                                                    </p>
                                                    <p className="flex justify-between">
                                                        <span>Số xu trong tài khoản</span>
                                                        <span>30000 xu</span>
                                                    </p>
                                                </div>
                                            </TEModalBody>
                                            <TEModalFooter>
                                                <TERipple rippleColor="light">
                                                    <button
                                                        type="button"
                                                        className="flex items-center gap-1 bg-gray-100 text-gray-800 rounded-md p-2"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        <AiOutlineClose /><span>Đóng</span>
                                                    </button>
                                                </TERipple>
                                                <TERipple rippleColor="light">
                                                    <button
                                                        type="button"
                                                        className="ml-3 flex items-center gap-1 bg-blue-500 text-white rounded-md p-2"
                                                    >
                                                        <AiOutlineSwap /> <span>Mở liên hệ</span>
                                                    </button>
                                                </TERipple>
                                            </TEModalFooter>
                                        </TEModalContent>
                                    </TEModalDialog>
                                </TEModal>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-white text-base">
                        <div className="flex gap-4 leading-7">
                            <img src="https://business.123job.vn/images/rank_0.png" className="w-14" alt="" />
                            <div>
                                <p className="font-semibold text-lg">Phan Duy Thong</p>
                                <p>090409**** -<span> Năm sinh: 1980</span></p>
                            </div>
                        </div>
                        <p className="text-gray-500 my-3">Công việc quan tâm</p>
                        <div className="leading-8 border-b pb-2">
                            <p className="flex items-center"><AiOutlineCalendar /> <span className="w-28">Vị trí:</span> <span>Đội Bếp</span></p>
                            <p className="flex items-center"><AiOutlineEnvironment /> <span className="w-28">Địa điểm:</span> <span>Hồ Chí Minh</span></p>
                            <p className="flex items-center"><AiOutlineDollarCircle /> <span className="w-28">Mức lương:</span> <span>Trên 50 triệu</span></p>
                        </div>
                        <div className="mt-3 flex justify-between">
                            <p className="flex items-center gap-2 text-gray-500"><AiOutlineClockCircle /><span>Đăng 4 ngày trước</span></p>
                            <div>
                                <button className="bg-gray-100 p-3 mr-2 rounded text-gray-400"><AiOutlineHeart /></button>
                                {/* <!-- Button trigger modal --> */}
                                <TERipple rippleColor="white">
                                    <button
                                        type="button"
                                        className="bg-[#e4efff] text-[#0971fe] border border-[#9dc6ff] rounded py-2 px-3"
                                        onClick={() => setShowModal(true)}
                                    >
                                        Xem ngay
                                    </button>
                                </TERipple>

                                {/* <!-- Modal --> */}
                                <TEModal show={showModal} setShow={setShowModal}>
                                    <TEModalDialog style={{ maxWidth: '700px' }}>
                                        <TEModalContent >
                                            <TEModalHeader>
                                                {/* <!--Modal title--> */}
                                                <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                                                    Ứng viên cần tìm việc
                                                </h5>
                                                {/* <!--Close button--> */}
                                                <button
                                                    type="button"
                                                    className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                                    onClick={() => setShowModal(false)}
                                                    aria-label="Close"
                                                >
                                                    <AiOutlineClose />
                                                </button>
                                            </TEModalHeader>
                                            {/* <!--Modal body--> */}
                                            <TEModalBody>
                                                <div>
                                                    <h2 className="text-gray-700 font-semibold mb-4">Thông tin công việc</h2>
                                                    <div className="flex">
                                                        <div className="w-1/3 border border-slate-200 p-2">
                                                            <p className="font-semibold">Chức danh, tên công việc</p>
                                                        </div>
                                                        <div className="w-2/3 border border-slate-200 p-2">
                                                            <p>Nau An Cho Nguoi Han Quoc</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-1/3 border border-slate-200 p-2">
                                                            <p className="font-semibold">Địa điểm làm việc</p>
                                                        </div>
                                                        <div className="w-2/3 border border-slate-200 p-2">
                                                            <p>Quận 7, Hồ Chí Minh</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-1/3 border border-slate-200 p-2">
                                                            <p className="font-semibold">Mức Lương mong muốn</p>
                                                        </div>
                                                        <div className="w-2/3 border border-slate-200 p-2">
                                                            <p>Trên 50 triệu</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-1/3 border border-slate-200 p-2">
                                                            <p className="font-semibold">Kĩ năng gồm có</p>
                                                        </div>
                                                        <div className="w-2/3 border border-slate-200 p-2">
                                                            <p>Nau mon han quoc</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-1/3 border border-slate-200 p-2">
                                                            <p className="font-semibold">Ngày đăng</p>
                                                        </div>
                                                        <div className="w-2/3 border border-slate-200 p-2">
                                                            <p>4 tuần trươc</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-1/3 border border-slate-200 p-2">
                                                            <p className="font-semibold">Kinh nghiệm đã có</p>
                                                        </div>
                                                        <div className="w-2/3 border border-slate-200 p-2">
                                                            <p>5nam</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <h2 className="text-gray-700 font-semibold my-4">Thông tin liên hệ</h2>
                                                    <div className="flex">
                                                        <div className="w-1/3 border border-slate-200 p-2">
                                                            <p className="font-semibold">Họ và tên</p>
                                                        </div>
                                                        <div className="w-2/3 border border-slate-200 p-2">
                                                            <p>Nguyen Thi Hoa</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-1/3 border border-slate-200 p-2">
                                                            <p className="font-semibold">Năm sinh</p>
                                                        </div>
                                                        <div className="w-2/3 border border-slate-200 p-2">
                                                            <p>1982</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-1/3 border border-slate-200 p-2">
                                                            <p className="font-semibold">Số điện thoại</p>
                                                        </div>
                                                        <div className="w-2/3 border border-slate-200 p-2">
                                                            <p>090395****</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-1/3 border border-slate-200 p-2">
                                                            <p className="font-semibold">Email</p>
                                                        </div>
                                                        <div className="w-2/3 border border-slate-200 p-2">
                                                            <p>hoanguy*******@gmail.com</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-1/3 border border-slate-200 p-2">
                                                            <p className="font-semibold">Hồ sơ</p>
                                                        </div>
                                                        <div className="w-2/3 border border-slate-200 p-2">
                                                            <p>4 tuần trươc</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="w-1/3 border border-slate-200 p-2">
                                                            <p className="font-semibold">Kinh nghiệm đã có</p>
                                                        </div>
                                                        <div className="w-2/3 border border-slate-200 p-2">
                                                            <p>	Link</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="border border-slate-200 p-2 my-3">
                                                    <p className="flex justify-between">
                                                        <span>Phí mở liên hệ</span>
                                                        <span className="text-red-400">2000 xu</span>
                                                    </p>
                                                    <p className="flex justify-between">
                                                        <span>Số xu trong tài khoản</span>
                                                        <span>30000 xu</span>
                                                    </p>
                                                </div>
                                            </TEModalBody>
                                            <TEModalFooter>
                                                <TERipple rippleColor="light">
                                                    <button
                                                        type="button"
                                                        className="flex items-center gap-1 bg-gray-100 text-gray-800 rounded-md p-2"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        <AiOutlineClose /><span>Đóng</span>
                                                    </button>
                                                </TERipple>
                                                <TERipple rippleColor="light">
                                                    <button
                                                        type="button"
                                                        className="ml-3 flex items-center gap-1 bg-blue-500 text-white rounded-md p-2"
                                                    >
                                                        <AiOutlineSwap /> <span>Mở liên hệ</span>
                                                    </button>
                                                </TERipple>
                                            </TEModalFooter>
                                        </TEModalContent>
                                    </TEModalDialog>
                                </TEModal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default MainFindJob