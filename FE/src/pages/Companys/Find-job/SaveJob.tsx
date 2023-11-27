import React, { useState } from "react";
import { AiOutlineCalendar, AiOutlineClockCircle, AiOutlineClose, AiOutlineDollarCircle, AiOutlineEnvironment, AiOutlineFilter, AiOutlineHeart, AiOutlineReload, AiOutlineSwap } from "react-icons/ai"
import { TERipple, TEModal, TEModalDialog, TEModalContent, TEModalHeader, TEModalBody, TEModalFooter, } from "tw-elements-react";
import { useGetProfileSaveQuery, useOpenProfileMutation, useSaveProfileMutation } from "../../../api/companies/findJob";
import { IFindJob } from "../../../interfaces";
import { Modal, message } from "antd";
import { formatDistanceToNow, parse } from 'date-fns';
import { vi } from 'date-fns/locale';

const SaveJob = () => {
    const [showModal, setShowModal] = useState(false);
    const { data } = useGetProfileSaveQuery();
    const [selectedCandidateId, setSelectedCandidateId] = useState<string | number | null>(null); // lưu trữ id của ứng viên được chọn
    const [modalVisible, setModalVisible] = React.useState(false);
    const [openProfile] = useOpenProfileMutation();
    const [saveProfile] = useSaveProfileMutation();

    const handleOpenModal = (candidateId: number | string) => {
        setSelectedCandidateId(candidateId); // lưu id của ứng viên được chọn vào state
        setShowModal(true);
    };

    const handleOpenModalUnlock = (candidateId: number | string | null) => {
        setModalVisible(true);
        setSelectedCandidateId(candidateId);
    }

    const handleModalConfirm = () => {
        if (selectedCandidateId) {
            openProfile(selectedCandidateId)
                .unwrap()
                .then(() => {
                    message.success("Mở khoá thành công");
                    setShowModal(false);
                })
                .catch((error) => {
                    setShowModal(false);
                    message.error(error.data.error);
                });
        }

        setModalVisible(false);
    };

    const formatTimeDifference = (createdAt: string) => {
        if (!createdAt || typeof createdAt !== 'string') {
            return "Ngày không xác định";
        }

        const startDate = parse(createdAt, 'yyyy-MM-dd HH:mm:ss', new Date());

        if (isNaN(startDate.getTime())) {
            return "Ngày không xác định";
        }

        return formatDistanceToNow(startDate, { locale: vi, addSuffix: true });
    };

    const handleSaveProfile = (id: number | string) => {
        saveProfile(id)
            .unwrap()
            .then(() => {
                message.success("Lưu thành công");
            })
            .catch((error) => {
                message.error(error.data.error);
            });
    }
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
                    <p className="text-gray-700">Có {data?.data?.length || 0} kết quả tìm kiếm.</p>
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
                    {data?.data?.map((item: IFindJob) => (
                        <div className="p-4 bg-white text-base" key={item.candidate_id}>
                            <div className="flex gap-4 leading-7">
                                <img src={item.image} className="w-14 rounded-full border p-1.5" alt="" />
                                <div>
                                    <p className="font-semibold text-lg">{item.name}</p>
                                    <p>{item.phone}-<span> Năm sinh: 1980</span></p>
                                </div>
                            </div>
                            <p className="text-gray-500 my-3">Công việc quan tâm</p>
                            <div className="leading-8 border-b pb-2">
                                <p className="flex items-center"><AiOutlineCalendar /> <span className="w-28">Vị trí:</span> <span>Đội Bếp</span></p>
                                <p className="flex items-center"><AiOutlineEnvironment /> <span className="w-28">Địa điểm:</span> <span>Hồ Chí Minh</span></p>
                                <p className="flex items-center"><AiOutlineDollarCircle /> <span className="w-28">Mức lương:</span> <span>Trên 50 triệu</span></p>
                            </div>
                            <div className="mt-3 flex justify-between">

                                <p className="flex items-center gap-2 text-gray-500"><AiOutlineClockCircle /><span>{item.created_at ? (
                                    <span>{formatTimeDifference(item.created_at)}</span>
                                ) : (
                                    <span>Ngày không xác định</span>
                                )}</span></p>
                                <div>
                                    <button
                                        onClick={() => handleSaveProfile(item.candidate_id)}
                                        className="bg-gray-100 p-3 mr-2 rounded text-gray-400">
                                        <AiOutlineHeart />
                                    </button>

                                    <TERipple rippleColor="white">
                                        <button
                                            type="button"
                                            className="bg-[#e4efff] text-[#0971fe] border border-[#9dc6ff] rounded py-2 px-3"
                                            onClick={() => handleOpenModal(item.candidate_id)}
                                        >
                                            Xem ngay
                                        </button>
                                    </TERipple>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            {/* <!-- Modal --> */}
            <TEModal show={showModal} setShow={setShowModal}>
                <TEModalDialog style={{ maxWidth: '700px' }}>
                    {data?.data
                        .filter((item: { candidate_id: null; }) => item.candidate_id === selectedCandidateId)// Lọc ứng viên với ID tương ứng
                        .map((item: IFindJob) => {
                            return (
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
                                                    <p>{item.created_at ? (
                                                        <span>{formatTimeDifference(item.created_at)}</span>
                                                    ) : (
                                                        <span>Ngày không xác định</span>
                                                    )}</p>
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
                                                    <p>{item.name}</p>
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
                                                    <p>{item.phone}</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-1/3 border border-slate-200 p-2">
                                                    <p className="font-semibold">Email</p>
                                                </div>
                                                <div className="w-2/3 border border-slate-200 p-2">
                                                    <p>{item.email}</p>
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
                                        <TERipple rippleColor="right">
                                            <button
                                                type="button"
                                                className="ml-3 flex items-center gap-1 bg-blue-500 text-white rounded-md p-2"
                                                onClick={() => handleOpenModalUnlock(selectedCandidateId)} // Chuyển thêm tham số vào hàm
                                            >
                                                <AiOutlineSwap /> <span>Mở liên hệ</span>
                                            </button>
                                        </TERipple>
                                    </TEModalFooter>
                                    {/* Modal xác nhận mở khoá */}
                                    <Modal
                                        title="Xác nhận mở khoá ứng viên"
                                        visible={modalVisible}
                                        okText="Có"
                                        cancelText="Không"
                                        okType="default"
                                        onOk={handleModalConfirm} // Không cần truyền tham số vào hàm này
                                        onCancel={() => setModalVisible(false)}
                                        zIndex={1200}
                                    >
                                        Bạn có muốn mở khoá ứng viên này không không?
                                    </Modal>
                                </TEModalContent>
                            )
                        })
                    }
                </TEModalDialog>
            </TEModal>



        </div>
    )
};

export default SaveJob