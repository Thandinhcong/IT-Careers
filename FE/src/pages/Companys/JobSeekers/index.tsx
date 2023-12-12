import { CgWorkAlt } from "react-icons/cg"
import { CiLocationOn, CiMoneyBill, CiTimer } from 'react-icons/ci'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./index.css"
import { BsArrowRightShort } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useGetFindCandidateQuery, useOpenProfileMutation, useRateProfileMutation } from "../../../api/companies/findJob";
import React, { useState } from "react";
import { IFindJob } from "../../../interfaces";
import { formatDistanceToNow, parse } from 'date-fns';
import { vi } from 'date-fns/locale';
import { TERipple, TEModal, TEModalDialog, TEModalContent, TEModalHeader, TEModalBody, TEModalFooter, } from "tw-elements-react";
import { AiOutlineClose, AiOutlineSwap } from "react-icons/ai";
import { Form, Input, Modal, Rate, message } from "antd";
import { useGetInforQuery } from "../../../api/CompanyInfoApi";
import { MdOutlineRateReview } from "react-icons/md";

const JobSeekers = () => {
    const [form] = Form.useForm();
    const { data } = useGetFindCandidateQuery();
    console.log(data)
    const { data: Infor } = useGetInforQuery();
    const [selectedCandidateId, setSelectedCandidateId] = useState<string | number | null>(null); // lưu trữ id của ứng viên được chọn
    const [showModal, setShowModal] = useState(false);
    const [ratingModalVisible, setRatingModalVisible] = useState(false);
    const [openProfile] = useOpenProfileMutation();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [rateProfile] = useRateProfileMutation();
    const settings: any = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2000,
    }

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
    //hàm mở modal mở khoá
    const handleOpenModalUnlock = (candidateId: number | string | null) => {
        setModalVisible(true);
        setSelectedCandidateId(candidateId);
    }
    //Hàm mở khoá hồ sơ
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
    //Hàm mở modal đánh giá
    const hadleOpenModalRateProfile = (id: number | string | null) => {
        setRatingModalVisible(true)
        console.log(id);
    }
    //hàm đánh giá ứng viên
    const handleRateProfile = () => {
        // Validate the form before submitting
        form.validateFields()
            .then((values) => {
                if (selectedCandidateId !== null) {
                    rateProfile({ ...values, id: selectedCandidateId })
                        .unwrap()
                        .then(() => {
                            message.success(`Đánh giá thành công`);
                            form.resetFields();
                        })
                        .catch((error) => {
                            message.error(error.data.errors);
                        });
                } else {
                    message.error("Không có ID hồ sơ ứng tuyển được chọn.");
                }
                setRatingModalVisible(false);
                setShowModal(false)
            })
            .catch(error => {
                console.error("Form validation error:", error);
            });
    };
    const formatCurrency = (amount: number, currency: string) => {
        const formattedAmount = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: currency,
        }).format(amount);

        return formattedAmount;
    };
    const handleOpenModal = (candidateId: number | string) => {
        setSelectedCandidateId(candidateId); // lưu id của ứng viên được chọn vào state
        setShowModal(true);
    };

    return (
        <section className='jobsee mt-5 border shadow  px-4 py-5 '>
            <div className='flex justify-between items-center  text-gray-400'>
                <h5 className='font-semibold '>Ứng viên tìm việc</h5>
                <Link to="/business/find-job" className='flex items-center gap-1'>Xem thêm các ứng viên khác <span className='text-xl'><BsArrowRightShort /> </span> </Link>
            </div>
            <Slider {...settings} className='mt-10 p-2 overflow-x-hidden overflow-y-hidden '>
                {data?.data?.map((candidate: IFindJob) => (
                    <div key={candidate.id} className='border p-5 bg-blue-50/50'>
                        <div className='flex items-center gap-3'>
                            <img src={candidate.image} className='rounded-full w-10 h-10' alt="" />
                            <div>
                                <p className='text-xl font-semibold'>{candidate.name}</p>
                                <p>{candidate.phone} <span>- Năm sinh : {candidate.birth === null ? (
                                    "Chưa cập nhật"
                                ) : (
                                    <span>{candidate.birth}</span>
                                )}</span></p>
                            </div>
                        </div>
                        <div className='font-sans'>
                            <p className='flex items-center justify-between font-normal gap-3'>
                                <span className='flex items-center gap-2'>
                                    <CgWorkAlt />
                                    <span>Vị trí</span>
                                </span>
                                <span>{candidate.major === null ? (
                                    <p>Chưa cập nhật</p>
                                ) : (
                                    <p>{candidate.major}</p>
                                )}</span>
                            </p>
                            <p className='flex items-center justify-between font-normal gap-3'>
                                <span className='flex items-center gap-2'>
                                    <CiLocationOn />Địa điểm
                                </span>
                                <span>{candidate.province} {candidate.district === null ? 'Chưa cập nhật' : candidate.district}</span>
                            </p>
                            <p className='flex items-center justify-between font-normal gap-3'>
                                <span className='flex items-center gap-2'>
                                    <CiMoneyBill /> Mức lương
                                </span>
                                <span>{candidate.desired_salary === null ? (
                                    <p>Chưa cập nhật</p>
                                ) : (
                                    <p className="text-red-500">{formatCurrency(candidate.desired_salary, 'VND')}</p>
                                )}</span>
                            </p>
                            <hr className='mt-3' />
                            <div className='flex justify-between items-center my-5 font-normal gap-3'>
                                <span className='flex gap-2 items-center'>
                                    <CiTimer /> Đăng {formatTimeDifference(candidate.created_at)}
                                </span>
                                <button onClick={() => handleOpenModal(candidate.id)} className='py-2 hover:bg-blue-500 rounded px-5 border border-solid border-blue-500 hover:text-white text-blue-500 font-medium'>Xem ngay</button>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            {/* <!-- Modal --> */}
            <TEModal show={showModal} setShow={setShowModal} >
                <TEModalDialog style={{ maxWidth: '1000px' }}>
                    {data?.data
                        .filter((item: { id: null; }) => item.id === selectedCandidateId)// Lọc ứng viên với ID tương ứng
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
                                    <TEModalBody style={{ maxHeight: '75vh', overflowY: 'auto' }}>
                                        <div>
                                            <h2 className="text-gray-700 font-semibold mb-4 text-lg">Thông tin công việc</h2>
                                            <div className="flex">
                                                <div className="w-1/3 border border-slate-200 p-2">
                                                    <p className="font-semibold">Chức danh, tên công việc</p>
                                                </div>
                                                <div className="w-2/3 border border-slate-200 p-2">
                                                    <p>{item.major === null ? (
                                                        <p>Chưa cập nhật</p>
                                                    ) : (
                                                        <p>{item.major}</p>
                                                    )}</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-1/3 border border-slate-200 p-2">
                                                    <p className="font-semibold">Địa điểm làm việc</p>
                                                </div>
                                                <div className="w-2/3 border border-slate-200 p-2">
                                                    <p>{item.province} {item.district === null ? 'Chưa cập nhật' : item.district}</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-1/3 border border-slate-200 p-2">
                                                    <p className="font-semibold">Mức Lương mong muốn</p>
                                                </div>
                                                <div className="w-2/3 border border-slate-200 p-2">
                                                    {item.desired_salary === null ? (
                                                        <p>Chưa cập nhật</p>
                                                    ) : (
                                                        <p className="text-red-500">{formatCurrency(item.desired_salary, 'VND')}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-1/3 border border-slate-200 p-2">
                                                    <p className="font-semibold">Thời gian</p>
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
                                                    {item.experience === null ? (
                                                        <p>Chưa cập nhật</p>
                                                    ) : (
                                                        <p>{item.experience}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h2 className="text-gray-700 font-semibold my-4 text-lg">Thông tin liên hệ</h2>
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
                                                    <p>{item.birth === null ? (
                                                        <p>Chưa cập nhật</p>
                                                    ) : (
                                                        <p>{item.birth}</p>
                                                    )}</p>
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
                                                    <p>{item.path_cv === null ? (
                                                        <p>Bạn phải mở khoá mới có thể thấy link hồ sơ</p>
                                                    ) : (
                                                        <a href={item.path_cv} className="text-blue-500" target="_blank" rel="noopener noreferrer">Hồ sơ của ứng viên</a>
                                                    )}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border border-slate-200 p-2 my-3">
                                            <p className="flex justify-between">
                                                <span>Phí mở liên hệ</span>
                                                <span className="text-red-400">{item.coin} xu</span>
                                            </p>
                                            <p className="flex justify-between">
                                                <span>Số xu trong tài khoản</span>
                                                <span>{Infor?.company?.coin} xu</span>
                                            </p>
                                        </div>
                                        <div>
                                            <h2 className="text-gray-700 font-semibold my-4 text-lg">Những công ty đã đánh giá</h2>
                                            <div className="pl-4">
                                                {item.start !== null ? (
                                                    <>
                                                        <Rate allowHalf defaultValue={item.start} disabled />
                                                        <span className="text-red-500 ml-1">{item.start}/5 (71 đánh giá)</span>
                                                    </>
                                                ) : (
                                                    <span className="text-red-500 font-medium">Hồ sơ này chưa có đánh giá từ công ty nào.</span>
                                                )}

                                                {/* <div className="grid-cols-1">
                                                    <div className="border-t my-3 pt-3">
                                                        <div className="flex items-center gap-2">
                                                            <img src="data:image/jpeg;base64,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" alt="" className="w-14 h-14 rounded-full" />
                                                            <div>
                                                                <p className="text-base font-medium">Công ty cổ phần ABC</p>
                                                                <Rate allowHalf defaultValue={item.start} disabled className="text-sm" />
                                                            </div>
                                                        </div>
                                                        <p className="mt-2">Hàng thì oke đẹp mỗi tội k khâu đế khâu là k j phải bàn lun tuyệt🤭</p>
                                                        <p className="text-gray-500 font-medium">7/10/2023 13:28</p>
                                                    </div>
                                                    <div className="border-t my-3 pt-3">
                                                        <div className="flex items-center gap-2">
                                                            <img src="data:image/jpeg;base64,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" alt="" className="w-14 h-14 rounded-full" />
                                                            <div>
                                                                <p className="text-base font-medium">Công ty cổ phần ABC</p>
                                                                <Rate allowHalf defaultValue={item.start} disabled className="text-sm" />
                                                            </div>
                                                        </div>
                                                        <p className="mt-2">Hàng thì oke đẹp mỗi tội k khâu đế khâu là k j phải bàn lun tuyệt🤭</p>
                                                        <p className="text-gray-500 font-medium">7/10/2023 13:28</p>
                                                    </div>
                                                </div> */}
                                            </div>

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
                                            {item.open_profile === "chưa mua" ? (
                                                <button
                                                    type="button"
                                                    className="ml-3 flex items-center gap-1 bg-blue-500 text-white rounded-md p-2"
                                                    onClick={() => handleOpenModalUnlock(selectedCandidateId)}
                                                >
                                                    <AiOutlineSwap /> <span>Mở liên hệ</span>
                                                </button>
                                            ) : (
                                                item.comment === null ? (
                                                    <button
                                                        type="button"
                                                        className="ml-3 flex items-center gap-1 bg-blue-500 text-white rounded-md p-2"
                                                        onClick={() => hadleOpenModalRateProfile(selectedCandidateId)}
                                                    >
                                                        <MdOutlineRateReview /> <span>Đánh giá</span>
                                                    </button>
                                                ) : (
                                                    <button className="ml-3 flex items-center gap-1 bg-blue-500 text-white rounded-md p-2">Bạn đã đánh giá hồ sơ này rồi!!</button>
                                                )
                                            )}
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
                                    {/* Modal đánh giá ứng viên */}
                                    <Modal
                                        title="Đánh giá ứng viên"
                                        visible={ratingModalVisible}
                                        onOk={() => handleRateProfile()}
                                        onCancel={() => setRatingModalVisible(false)}
                                        okType="default"
                                        okText="Đánh giá"
                                        zIndex={1200}
                                    >
                                        <Form
                                            form={form}
                                            name="repostJobForm"
                                            labelCol={{ span: 24 }}
                                            wrapperCol={{ span: 24 }}
                                            initialValues={{ remember: true }}
                                            autoComplete="off"
                                        >
                                            <Form.Item label="Mức độ hài lòng:" name="start" rules={[{ required: true, message: 'Vui lòng chọn đánh giá' }]}>
                                                <Rate />
                                            </Form.Item>
                                            <Form.Item label="Bình luận:" name="comment" rules={[{ required: true, message: 'Vui lòng viết bình luận' }]}>
                                                <Input.TextArea rows={6} />
                                            </Form.Item>
                                        </Form>
                                    </Modal>
                                </TEModalContent>
                            )
                        })
                    }
                </TEModalDialog>
            </TEModal>
        </section>
    )

}

export default JobSeekers