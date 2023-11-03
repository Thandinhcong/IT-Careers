import { useState } from "react";
import { AiOutlineCalendar, AiOutlineClose, AiOutlineDownload, AiOutlineEdit, AiOutlineEye, AiOutlineMail, AiOutlinePhone, AiOutlineSetting, AiOutlineSwap } from "react-icons/ai"
import {
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TERipple,
    TEModalFooter,
} from "tw-elements-react";

const MainCvApply = () => {
    const [currentStatus, setCurrentStatus] = useState(false);
    const [showModalLg, setShowModalLg] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleStatusChange = () => {
        setCurrentStatus(!currentStatus);
    };

    const statusClass = currentStatus ? 'bg-[#e9ebee] text-[#364a63] p-1' : 'bg-[#fceceb] text-[#e85347]';
    return (
        <div>
            <div className="flex justify-between my-4 p-2 items-center border-b-2">
                <div>
                    <img
                        className="w-20 rounded-full border border-gray-400 p-1"
                        src="https://cdn1.123job.vn/123job/uploads/2023/10/06/2023_10_06______622e2e506d59c1af0f1a16739bcc252d.png" alt="" />
                </div>
                <div className="grid grid-cols-1 gap-3">
                    <p className="font-semibold text-base">Nguyễn Văn Dũng</p>
                    <p className="flex items-center">
                        <p className="flex items-center gap-1"><AiOutlinePhone /><span>0983442815</span> </p>
                        <p className="border-gray-500 border-x-2 mx-1 px-2 flex items-center gap-1">
                            <AiOutlineMail />
                            <span>nguyendung031201@gmail.com</span>
                        </p>
                        <p className="flex items-center gap-1"><AiOutlineCalendar /> <span>Tuyển thực tập sinh ReactJS</span></p>
                    </p>
                    <div className="flex justify-between items-center mb-3">
                        <p className="grid grid-cols-1 gap-3">
                            <p>Mã ứng viên</p>
                            <p>1491771</p>
                        </p>
                        <p className="grid grid-cols-1 gap-3">
                            <p>Ngày ứng tuyển</p>
                            <p>2023/10/06 11:41:08</p>
                        </p>
                        <p className="grid grid-cols-1 gap-3">
                            <p>Trạng thái</p>
                            <p onClick={handleStatusChange} className={`p-1 rounded text-xs text-center ${statusClass}`}>
                                {currentStatus ? 'đã xem' : 'chưa xem'}
                            </p>
                        </p>
                        <p className="grid grid-cols-1 gap-3">
                            <p>Vòng hồ sơ</p>
                            <p className="p-1 rounded text-xs text-center bg-[#e4f8fb] text-[#09c2de]">phỏng vấn</p>
                        </p>
                    </div>
                </div>
                <div className="flex gap-1 text-gray-700">
                    <button className="flex items-center bg-[#f5f6fa] px-3 py-1 border border-[#dbdfea] rounded-sm"><AiOutlineEye /><span>Chi tiết</span></button>
                    <TERipple rippleColor="white">
                        <button
                            className="flex items-center bg-[#f5f6fa] px-3 py-1 border border-[#dbdfea] rounded-sm"
                            type="button"
                            onClick={() => setShowModalLg(true)}
                        ><AiOutlineEdit /><span> Đánh giá</span>
                        </button>
                    </TERipple>
                    <div className="relative">
                        <button
                            className="flex items-center bg-[#f5f6fa] px-3 py-1 border border-[#dbdfea] rounded-sm"
                            onClick={handleDropdownToggle}
                        >
                            <AiOutlineSetting />
                            <span> Thao tác</span>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute end-0 z-10 mt-2 w-48 rounded-md border border-gray-100 bg-white shadow-lg">
                                <ul className="p-1">
                                    <li>
                                        <a
                                            href="#"
                                            className="block rounded-lg px-4 py-2 text-[13px] text-gray-500 hover:bg-gray-50 hover:text-blue-500"                                    >
                                            <AiOutlineDownload className="inline-block mr-1" />Tải xuống cv
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="block rounded-lg px-4 py-2 text-[13px] text-gray-500 hover:bg-gray-50 hover:text-blue-500"                                    >
                                            <AiOutlineSwap className="inline-block mr-1" />
                                            Lịch sử ghi chú
                                        </a>
                                    </li>
                                </ul>

                            </div>
                        )}
                    </div>
                </div>
                <TEModal show={showModalLg} setShow={setShowModalLg}>
                    <TEModalDialog size="lg" centered>
                        <TEModalContent className="px-4">
                            <TEModalHeader>
                                {/* <!--Modal title--> */}
                                <h5 className="text-xl font-semibold leading-normal text-gray-700 dark:text-neutral-200">
                                    Đánh giá CV ứng viên
                                </h5>
                                {/* <!--Close button--> */}
                                <button
                                    type="button"
                                    className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                    onClick={() => setShowModalLg(false)}
                                    aria-label="Close"
                                >
                                    <AiOutlineClose className="text-xl" />
                                </button>
                            </TEModalHeader>
                            {/* <!--Modal body--> */}
                            <form action="" className="text-sm">
                                <TEModalBody>
                                    {/* Radiobox */}
                                    <fieldset className="flex flex-wrap gap-3">
                                        <div>
                                            <input type="radio" name="ColorOption" value="tiepnhan" id="tiepnhan" className="peer hidden" />
                                            <label
                                                htmlFor="tiepnhan"
                                                className="flex cursor-pointer items-center justify-center rounded-2xl border border-[#dbdfea] bg-[#f5f6fa] px-6 py-2 text-[#526484] hover:border-gray-200 peer-checked:border-[#9dc6ff] peer-checked:bg-[#e4efff] peer-checked:text-[#0971fe]"
                                            >
                                                <p className="text-sm font-medium">Tiếp nhận</p>
                                            </label>
                                        </div>

                                        <div>
                                            <input type="radio" name="ColorOption" value="phuhop" id="phuhop" className="peer hidden" />
                                            <label
                                                htmlFor="phuhop"
                                                className="flex cursor-pointer items-center justify-center rounded-2xl border border-[#dbdfea] bg-[#f5f6fa] px-6 py-2 text-[#526484] hover:border-gray-200 peer-checked:border-[#9dc6ff] peer-checked:bg-[#e4efff] peer-checked:text-[#0971fe]"
                                            >
                                                <p className="text-sm font-medium">Phù hợp</p>
                                            </label>
                                        </div>

                                        <div>
                                            <input type="radio" name="ColorOption" value="phongvan" id="phongvan" className="peer hidden" />
                                            <label
                                                htmlFor="phongvan"
                                                className="flex cursor-pointer items-center justify-center rounded-2xl border border-[#dbdfea] bg-[#f5f6fa] px-6 py-2 text-[#526484] hover:border-gray-200 peer-checked:border-[#9dc6ff] peer-checked:bg-[#e4efff] peer-checked:text-[#0971fe]"
                                            >
                                                <p className="text-sm font-medium">Phỏng vấn</p>
                                            </label>
                                        </div>

                                        <div>
                                            <input type="radio" name="ColorOption" value="nhanviec" id="nhanviec" className="peer hidden" />
                                            <label
                                                htmlFor="nhanviec"
                                                className="flex cursor-pointer items-center justify-center rounded-2xl border border-[#dbdfea] bg-[#f5f6fa] px-6 py-2 text-[#526484] hover:border-gray-200 peer-checked:border-[#9dc6ff] peer-checked:bg-[#e4efff] peer-checked:text-[#0971fe]"
                                            >
                                                <p className="text-sm font-medium">Nhận việc</p>
                                            </label>
                                        </div>

                                        <div>
                                            <input type="radio" name="ColorOption" value="tuchoi" id="tuchoi" className="peer hidden" />
                                            <label
                                                htmlFor="tuchoi"
                                                className="flex cursor-pointer items-center justify-center rounded-2xl border border-[#dbdfea] bg-[#f5f6fa] px-6 py-2 text-[#526484] hover:border-gray-200 peer-checked:border-[#9dc6ff] peer-checked:bg-[#e4efff] peer-checked:text-[#0971fe]"
                                            >
                                                <p className="text-sm font-medium">Từ chối</p>
                                            </label>
                                        </div>

                                        <div>
                                            <input type="radio" name="ColorOption" value="khac" id="khac" className="peer hidden" />
                                            <label
                                                htmlFor="khac"
                                                className="flex cursor-pointer items-center justify-center rounded-2xl border border-[#dbdfea] bg-[#f5f6fa] px-6 py-2 text-[#526484] hover:border-gray-200 peer-checked:border-[#9dc6ff] peer-checked:bg-[#e4efff] peer-checked:text-[#0971fe]"
                                            >
                                                <p className="text-sm font-medium">Khác</p>
                                            </label>
                                        </div>
                                    </fieldset>
                                    {/* textarea */}
                                    <div>
                                        <label htmlFor="OrderNotes" className="block font-semibold text-gray-500 my-3">
                                            Nhận xét về ứng viên
                                        </label>

                                        <textarea
                                            id="OrderNotes"
                                            className="mt-2 w-full rounded-lg border border-gray-300 align-top shadow-md sm:text-sm p-3 outline-blue-500"
                                            rows={5}
                                            placeholder="Bạn có muốn thêm ghi chú cho thay đổi này không"
                                        ></textarea>
                                    </div>
                                </TEModalBody>
                                <TEModalFooter>
                                    <TERipple rippleColor="light">
                                        <button
                                            type="button"
                                            className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                                            onClick={() => setShowModalLg(false)}
                                        >
                                            Hủy
                                        </button>
                                    </TERipple>
                                    <TERipple rippleColor="light">
                                        <button
                                            type="button"
                                            className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                        >
                                            Đánh giá
                                        </button>
                                    </TERipple>
                                </TEModalFooter>
                            </form>
                        </TEModalContent>
                    </TEModalDialog>
                </TEModal>
            </div >
        </div>

    )
}

export default MainCvApply