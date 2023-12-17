import React, { useState } from 'react';
import { AiOutlineCaretDown, AiOutlineCaretUp } from 'react-icons/ai';
import { useParams } from "react-router-dom"
import { useGetOneCompanysQuery } from "../../../api/companyApi"
import './style.css'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Skeleton } from 'antd';

const TabsOverview = React.memo(({ onTabChange }: any) => {
    const { id } = useParams();
    const { data, isLoading } = useGetOneCompanysQuery(id || '');
    const listCompanyDetail: any = data && data?.company;

    const [showMore, setShowMore] = useState(false);
    const toggleShowMore = () => {
        setShowMore(!showMore);
    };
    const handleTabChange = () => {
        onTabChange("tab2");
    };
    if (isLoading) return <Skeleton loading />

    // const post = [
    //     { jobType: 'Nhân viên bán thời gian', title: 'Thực tập sinh Ract1', location: 'Tây Hồ Hà Nội1', salary: '8-15', date: '4 tuần trước' },
    //     { jobType: 'Nhân viên toàn thời gian', title: 'Thực tập sinh Ract2', location: 'Tây Hồ Hà Nội2', salary: '8-15', date: '3 tuần trước' },
    //     { jobType: 'Nhân viên toàn thời gian', title: 'Thực tập sinh Ract3', location: 'Tây Hồ Hà Nội3', salary: '8-15', date: '2 tuần trước' },
    //     { jobType: 'Nhân viên bán thời gian', title: 'Thực tập sinh Ract4', location: 'Tây Hồ Hà Nội4', salary: '8-15', date: '1 tuần trước' },
    //     { jobType: 'Nhân viên bán thời gian', title: 'Thực tập sinh Ract5', location: 'Tây Hồ Hà Nội5', salary: '8-15', date: '5 tuần trước' },
    //     { jobType: 'Nhân viên toàn thời gian', title: 'Thực tập sinh Ract6', location: 'Tây Hồ Hà Nội6', salary: '8-15', date: '6 tuần trước' },
    //     { jobType: 'Nhân viên toàn thời gian', title: 'Thực tập sinh Ract7', location: 'Tây Hồ Hà Nội7', salary: '8-15', date: '7 tuần trước' },
    //     { jobType: 'Nhân viên bán thời gian', title: 'Thực tập sinh Ract8', location: 'Tây Hồ Hà Nội8', salary: '8-15', date: '8 tuần trước' },
    // ]
    return (
        <div>
            <div className='grid grid-cols-2 gap-8 text-gray-700'>
                <div className="border-r-2 px-6">
                    <p className="font-bold text-3xl mb-8">Giới thiệu</p>
                    <div
                        className={`${showMore ? "max-h-full" : "max-h-40 overflow-hidden"
                            } transition-max-h duration-500 ease-in-out`}
                    >
                        <p>
                            {listCompanyDetail?.description}
                        </p>
                    </div>
                    <button
                        className="text-gray-900 my-2 flex mx-auto"
                        onClick={toggleShowMore}
                    >
                        {showMore
                            ? <span>Ẩn đi< AiOutlineCaretUp className="inline-block" /></span>
                            : <span>Xem thêm< AiOutlineCaretDown className="inline-block" /></span>}
                    </button>
                </div>
                <div className='grid grid-cols-3 gap-6 h-60'>
                    <div className='border border-gray-300 rounded-lg p-3 text-center'>
                        <p className='font-semibold h-[63px]'>{listCompanyDetail?.name}</p>
                        <p>Nhà sáng lập</p>
                    </div>
                    <div className='border border-gray-300 rounded-lg p-3 text-center'>
                        <p className='font-semibold h-[63px]'>{listCompanyDetail?.founded_in?.toLocaleString()}</p>
                        <p>Năm thành lập</p>
                    </div>
                    <div className='border border-gray-300 rounded-lg p-3 text-center'>
                        <p className='font-semibold h-[63px]'>Mô hình nhân sự</p>
                        <p>{listCompanyDetail?.company_size_min}-{listCompanyDetail?.company_size_max}</p>
                    </div>


                    <div className='border border-gray-300 rounded-lg p-3 text-center '>
                        <p className='text-title  font-semibold h-[63px]'>{listCompanyDetail?.office}</p>
                        <p>Trụ sở chính</p>
                    </div>
                    <div className='border border-gray-300 rounded-lg p-3 text-center'>
                        <p className='font-semibold h-[63px]'>{listCompanyDetail?.link_web}</p>
                        <p>Website</p>
                    </div>
                </div>
            </div>
            <div className='px-8'>
                {/* <p className='font-bold text-2xl my-8'>Việc làm đang tuyển dụng</p> */}
                {/* <Swiper

                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={25}
                    slidesPerView={4}
                    navigation={true}
                    className="my-swiper"
                >
                    {post.map((item, index) => (
                        <SwiperSlide key={index} >
                            <div className='border border-gray-400 rounded-lg shadow-lg p-5 text-left text-gray-700 leading-10 text-base'>
                                <div className='h-56'>
                                    <p>{item.jobType}</p>
                                    <p className='font-bold text-lg'>{item.title}</p>
                                    <p>{item.location}</p>
                                    <p className='bg-gray-100 border text-center w-5/6'>{item.salary} triệu/tháng</p>
                                </div>
                                <div>
                                    <p>{item.date}</p>
                                    <button
                                        className='font-semibold text-blue-800 border-2 border-gray-300 rounded-lg px-10'
                                        onClick={handleTabChange} // Gọi hàm handleTabChange khi bạn bấm vào nút "Xem chi tiết"
                                    >
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide >
                    ))}

                </Swiper> */}
            </div>
        </div>

    )
});

export default TabsOverview


