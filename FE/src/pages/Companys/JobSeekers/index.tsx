import { CgWorkAlt } from "react-icons/cg"
import { CiLocationOn, CiMoneyBill, CiTimer } from 'react-icons/ci'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./index.css"
import { BsArrowRightShort } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useGetFindCandidateQuery } from "../../../api/companies/findJob";
import { useState } from "react";
import { IFindJob } from "../../../interfaces";
import { formatDistanceToNow, parse } from 'date-fns';
import { vi } from 'date-fns/locale';
import { TERipple, TEModal, TEModalDialog, TEModalContent, TEModalHeader, TEModalBody, TEModalFooter, } from "tw-elements-react";
import { AiOutlineClose } from "react-icons/ai";

const JobSeekers = () => {
    const { data } = useGetFindCandidateQuery();
    console.log(data?.data);
    const [selectedCandidateId, setSelectedCandidateId] = useState<string | number | null>(null); // lưu trữ id của ứng viên được chọn
    const [showModal, setShowModal] = useState(false);
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
                    <div key={candidate.candidate_id} className='border p-5 bg-blue-50/50'>
                        <div className='flex items-center gap-3'>
                            <img src={candidate.image} className='rounded-full w-10 h-10' alt="" />
                            <div>
                                <p className='text-xl font-semibold'>{candidate.name}</p>
                                <p>{candidate.phone} <span>- Năm sinh : {candidate.birth}</span></p>
                            </div>
                        </div>
                        <div className='font-sans'>
                            <p className='flex items-center justify-between font-normal gap-3'>
                                <span className='flex items-center gap-2'>
                                    <CgWorkAlt />
                                    <span>Vị trí</span>
                                </span>
                                <span>{candidate.title}</span>
                            </p>
                            <p className='flex items-center justify-between font-normal gap-3'>
                                <span className='flex items-center gap-2'>
                                    <CiLocationOn />Địa điểm
                                </span>
                                <span>{candidate.address}</span>
                            </p>
                            <p className='flex items-center justify-between font-normal gap-3'>
                                <span className='flex items-center gap-2'>
                                    <CiMoneyBill /> Mức lương
                                </span>
                                <span>{candidate.salary}</span>
                            </p>
                            <hr className='mt-3' />
                            <div className='flex justify-between items-center my-5 font-normal gap-3'>
                                <span className='flex gap-2 items-center'>
                                    <CiTimer /> Đăng {formatTimeDifference(candidate.created_at)}
                                </span>
                                <button onClick={() => handleOpenModal(candidate.candidate_id)} className='py-2 hover:bg-blue-500 rounded px-5 border border-solid border-blue-500 hover:text-white text-blue-500 font-medium'>Xem ngay</button>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
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
                                                    <p>{item.title}</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-1/3 border border-slate-200 p-2">
                                                    <p className="font-semibold">Địa điểm làm việc</p>
                                                </div>
                                                <div className="w-2/3 border border-slate-200 p-2">
                                                    <p>{item.address}</p>
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
                                                    <p>{item.birth}</p>
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
                                                    <p>{formatTimeDifference(item.created_at)}</p>
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
                                    </TEModalFooter>
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