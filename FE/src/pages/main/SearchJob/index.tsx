import React from 'react'
import { BsSearch } from "react-icons/bs";
import { MdRoom } from "react-icons/md";
import { AiOutlineArrowRight } from "react-icons/ai"
const SearchJob = () => {
    return (
        <section className=' px-5 lg:px-12  bg-blue-100/50 pb-10 lg:pb-36' >
            <h2 className='text-2xl mb-2'>Khám phá cơ hội nghề nghiệp</h2>
            <p>Dễ dàng tìm một công việc mơ ước tại công ty hàng đầu Việt Nam</p>
            <form className='lg:flex gap-2 my-5 '>
                <div className='border rounded-xl bg-white justify-between px-2 my-7 flex items-center lg:py-3 py-2 '>
                    <label htmlFor="tìm kiếm" className='lg:pl-4 pl-2'>Tìm kiếm</label>
                    <input type="text" className='outline-none ml-3  lg:w-[350px]' placeholder='Chức danh, từ khóa hoặc công ty' />
                    <span className='pr-5'><BsSearch /></span>
                </div>
                <div
                    className='border rounded-xl bg-white justify-between px-2 my-7 flex items-center lg:py-3 py-2'>
                    <label className='lg:pl-4 pl-2' htmlFor="">Địa điểm</label>
                    <input type="text" className='outline-none lg:ml-3 lg:w-[350px]' placeholder='Tỉnh hoặc thành phố' />
                    <span className='pr-5'><MdRoom /></span>
                </div>
                <button className='bg-blue-600 px-10 lg:my-7 lg:ml-2 rounded-full text-white font-semibold  w-full lg:w-auto  py-2'>Tìm việc</button>

            </form>
            <div className='hidden lg:flex lg:gap-2 lg:my-5'>
                <div className='px-4 rounded-lg py-5 bg-violet-100/50  w-[600px]'>
                    <h2 className='text-xl mb-2'>Tạo CV online ấn tượng</h2>
                    <p className='mb-6'>ITcareers hiện có 100+ mẫu CV chuyên nghiệp, độc đáo phù hợp với mọi ngành nghề</p>
                    <div className='flex items-center justify-between '>
                        <a className='flex items-center text-blue-500 rounded-full bg-white gap-1 px-4 py-3' href="">Tạo cv ngay  <AiOutlineArrowRight /> </a>
                        <img src="https://123job.vn/images/recruit/resume.png" width={60} alt="" />
                    </div>
                </div>
                <div className='px-4 rounded-lg py-5  bg-violet-100/50 w-[600px]'>
                    <h2 className='text-xl mb-2'>Nhà tuyển dụng</h2>
                    <p className='mb-6'>Đăng tin tuyển dụng việc làm miễn phí, tìm kiếm nhiều ứng viên tiềm năng phù hợp với doanh nghiệp của bạn</p>
                    <div className='flex items-center justify-between'>
                        <a className='flex items-center text-blue-500 rounded-full bg-white gap-1 px-4 py-3' href="">Đăng tin ngay  <AiOutlineArrowRight /> </a>
                        <img src="https://123job.vn/images/recruit/cover_letter.png" width={60} alt="" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SearchJob