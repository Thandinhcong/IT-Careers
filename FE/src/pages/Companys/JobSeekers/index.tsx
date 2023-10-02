import React from 'react'
import { CgWorkAlt } from "react-icons/cg"
import { CiLocationOn, CiMoneyBill, CiTimer } from 'react-icons/ci'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./index.css"
import { BsArrowRightShort } from 'react-icons/bs';
import { Link } from 'react-router-dom';


const JobSeekers = () => {

    const settings: any = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 3,
        initialSlide: 0,
    }
    return (
        <section className='jobsee mt-5 border shadow  px-4 py-5 '>
            <div className='flex justify-between items-center  text-gray-400'>
                <h5 className='font-semibold '>Ứng viên tìm việc</h5>
                <Link to="" className='flex items-center gap-1'>Xem thêm 1000+ ứng viên khác <span className='text-xl'><BsArrowRightShort /> </span> </Link>
            </div>
            <Slider {...settings} className='mt-10 p-2 overflow-x-hidden overflow-y-hidden '>
                <div className='border p-5  bg-blue-50/50'>
                    <div className='flex items-center gap-3'>
                        <img src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/376659538_1561658551032914_7301006768064783752_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=CtLD5wiczUkAX-z9CxH&_nc_ht=scontent.fhan14-3.fna&_nc_e2o=s&oh=00_AfAXtzMO5VdJgtmGbjnaIthG5EqGMynk-efNRb7Hvo1i4g&oe=651D1EDE" className='rounded-full ' width={50} alt="" />
                        <div>
                            <p className='text-xl font-semibold'>Đinh Văn Thản</p>
                            <p>0948474*** <span>- Năm sinh : 2003</span></p>
                        </div>
                    </div>
                    <p className='my-3 text-sm font-sans text-gray-500'>Công việc tìm gấp</p>
                    <div className=' font-sans'>
                        <p className='flex items-center justify-between font-normal gap-3'>
                            <span className='flex items-center gap-2'>
                                <CgWorkAlt />
                                <span>Vị trí</span>
                            </span>
                            <span>Fresher</span>
                        </p>
                        <p className='flex items-center justify-between font-normal gap-3' >
                            <span className='flex items-center gap-2'>
                                <CiLocationOn />Địa điểm
                            </span>
                            <span>Cầu giấy- Hà Nội</span>
                        </p>
                        <p className='flex items-center justify-between font-normal gap-3'>
                            <span className='flex items-center gap-2'>
                                <CiMoneyBill /> Mức lương
                            </span>
                            <span>20.000.000đ</span>
                        </p>
                        <hr className='mt-3' />
                        <div className='flex justify-between items-center my-5 font-normal gap-3'>
                            <span className='flex gap-2 items-center'>
                                <CiTimer /> Đăng 8 phút trước
                            </span>
                            <a href="" className='py-2 hover:bg-blue-500 rounded px-5 border border-solid border-blue-500 hover:text-white text-blue-500 font-medium'>Xem ngay</a>
                        </div>
                    </div>
                </div>
                <div className='border p-5 bg-blue-50/50'>
                    <div className='flex items-center gap-3'>
                        <img src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/376659538_1561658551032914_7301006768064783752_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=CtLD5wiczUkAX-z9CxH&_nc_ht=scontent.fhan14-3.fna&_nc_e2o=s&oh=00_AfAXtzMO5VdJgtmGbjnaIthG5EqGMynk-efNRb7Hvo1i4g&oe=651D1EDE" className='rounded-full ' width={50} alt="" />
                        <div>
                            <p className='text-xl font-semibold'>Đinh Văn Thản</p>
                            <p>0948474*** <span>- Năm sinh : 2003</span></p>
                        </div>
                    </div>
                    <p className='my-3 text-sm font-sans text-gray-500'>Công việc tìm gấp</p>
                    <div className=' font-sans'>
                        <p className='flex items-center justify-between font-normal gap-3'>
                            <span className='flex items-center gap-2'>
                                <CgWorkAlt />
                                <span>Vị trí</span>
                            </span>
                            <span>Fresher</span>
                        </p>
                        <p className='flex items-center justify-between font-normal gap-3' >
                            <span className='flex items-center gap-2'>
                                <CiLocationOn />Địa điểm
                            </span>
                            <span>Cầu giấy- Hà Nội</span>
                        </p>
                        <p className='flex items-center justify-between font-normal gap-3'>
                            <span className='flex items-center gap-2'>
                                <CiMoneyBill /> Mức lương
                            </span>
                            <span>20.000.000đ</span>
                        </p>
                        <hr className='mt-3' />
                        <div className='flex justify-between items-center my-5 font-normal gap-3'>
                            <span className='flex gap-2 items-center'>
                                <CiTimer /> Đăng 8 phút trước
                            </span>
                            <a href="" className='py-2 hover:bg-blue-500 rounded px-5 border border-solid border-blue-500 hover:text-white text-blue-500 font-medium'>Xem ngay</a>
                        </div>
                    </div>
                </div>
                <div className='border p-5 bg-blue-50/50'>
                    <div className='flex items-center gap-3'>
                        <img src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/376659538_1561658551032914_7301006768064783752_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=CtLD5wiczUkAX-z9CxH&_nc_ht=scontent.fhan14-3.fna&_nc_e2o=s&oh=00_AfAXtzMO5VdJgtmGbjnaIthG5EqGMynk-efNRb7Hvo1i4g&oe=651D1EDE" className='rounded-full ' width={50} alt="" />
                        <div>
                            <p className='text-xl font-semibold'>Đinh Văn Thản</p>
                            <p>0948474*** <span>- Năm sinh : 2003</span></p>
                        </div>
                    </div>
                    <p className='my-3 text-sm font-sans text-gray-500'>Công việc tìm gấp</p>
                    <div className=' font-sans'>
                        <p className='flex items-center justify-between font-normal gap-3'>
                            <span className='flex items-center gap-2'>
                                <CgWorkAlt />
                                <span>Vị trí</span>
                            </span>
                            <span>Fresher</span>
                        </p>
                        <p className='flex items-center justify-between font-normal gap-3' >
                            <span className='flex items-center gap-2'>
                                <CiLocationOn />Địa điểm
                            </span>
                            <span>Cầu giấy- Hà Nội</span>
                        </p>
                        <p className='flex items-center justify-between font-normal gap-3'>
                            <span className='flex items-center gap-2'>
                                <CiMoneyBill /> Mức lương
                            </span>
                            <span>20.000.000đ</span>
                        </p>
                        <hr className='mt-3' />
                        <div className='flex justify-between items-center my-5 font-normal gap-3'>
                            <span className='flex gap-2 items-center'>
                                <CiTimer /> Đăng 8 phút trước
                            </span>
                            <a href="" className='py-2 hover:bg-blue-500 rounded px-5 border border-solid border-blue-500 hover:text-white text-blue-500 font-medium'>Xem ngay</a>
                        </div>
                    </div>
                </div>
                <div className='border p-5 bg-blue-50/50'>
                    <div className='flex items-center gap-3'>
                        <img src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/376659538_1561658551032914_7301006768064783752_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=CtLD5wiczUkAX-z9CxH&_nc_ht=scontent.fhan14-3.fna&_nc_e2o=s&oh=00_AfAXtzMO5VdJgtmGbjnaIthG5EqGMynk-efNRb7Hvo1i4g&oe=651D1EDE" className='rounded-full ' width={50} alt="" />
                        <div>
                            <p className='text-xl font-semibold'>Đinh Văn Thản</p>
                            <p>0948474*** <span>- Năm sinh : 2003</span></p>
                        </div>
                    </div>
                    <p className='my-3 text-sm font-sans text-gray-500'>Công việc tìm gấp</p>
                    <div className=' font-sans'>
                        <p className='flex items-center justify-between font-normal gap-3'>
                            <span className='flex items-center gap-2'>
                                <CgWorkAlt />
                                <span>Vị trí</span>
                            </span>
                            <span>Fresher</span>
                        </p>
                        <p className='flex items-center justify-between font-normal gap-3' >
                            <span className='flex items-center gap-2'>
                                <CiLocationOn />Địa điểm
                            </span>
                            <span>Cầu giấy- Hà Nội</span>
                        </p>
                        <p className='flex items-center justify-between font-normal gap-3'>
                            <span className='flex items-center gap-2'>
                                <CiMoneyBill /> Mức lương
                            </span>
                            <span>20.000.000đ</span>
                        </p>
                        <hr className='mt-3' />
                        <div className='flex justify-between items-center my-5 font-normal gap-3'>
                            <span className='flex gap-2 items-center'>
                                <CiTimer /> Đăng 8 phút trước
                            </span>
                            <a href="" className='py-2 hover:bg-blue-500 rounded px-5 border border-solid border-blue-500 hover:text-white text-blue-500 font-medium'>Xem ngay</a>
                        </div>
                    </div>
                </div>
                <div className='border p-5 bg-blue-50/50'>
                    <div className='flex items-center gap-3'>
                        <img src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/376659538_1561658551032914_7301006768064783752_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=CtLD5wiczUkAX-z9CxH&_nc_ht=scontent.fhan14-3.fna&_nc_e2o=s&oh=00_AfAXtzMO5VdJgtmGbjnaIthG5EqGMynk-efNRb7Hvo1i4g&oe=651D1EDE" className='rounded-full ' width={50} alt="" />
                        <div>
                            <p className='text-xl font-semibold'>Đinh Văn Thản</p>
                            <p>0948474*** <span>- Năm sinh : 2003</span></p>
                        </div>
                    </div>
                    <p className='my-3 text-sm font-sans text-gray-500'>Công việc tìm gấp</p>
                    <div className=' font-sans'>
                        <p className='flex items-center justify-between font-normal gap-3'>
                            <span className='flex items-center gap-2'>
                                <CgWorkAlt />
                                <span>Vị trí</span>
                            </span>
                            <span>Fresher</span>
                        </p>
                        <p className='flex items-center justify-between font-normal gap-3' >
                            <span className='flex items-center gap-2'>
                                <CiLocationOn />Địa điểm
                            </span>
                            <span>Cầu giấy- Hà Nội</span>
                        </p>
                        <p className='flex items-center justify-between font-normal gap-3'>
                            <span className='flex items-center gap-2'>
                                <CiMoneyBill /> Mức lương
                            </span>
                            <span>20.000.000đ</span>
                        </p>
                        <hr className='mt-3' />
                        <div className='flex justify-between items-center my-5 font-normal gap-3'>
                            <span className='flex gap-2 items-center'>
                                <CiTimer /> Đăng 8 phút trước
                            </span>
                            <a href="" className='py-2 hover:bg-blue-500 rounded px-5 border border-solid border-blue-500 hover:text-white text-blue-500 font-medium'>Xem ngay</a>
                        </div>
                    </div>
                </div>
            </Slider>

        </section>
    )

}

export default JobSeekers