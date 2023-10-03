import React from 'react'
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md'
import { Link } from 'react-router-dom'

const RecruimentCampaign = () => {

    return (
        <div className='mt-16'>
            <p className='text-sm p-3 '>
                <Link to="/companys/dashboard" className='hover:text-blue-500'>Bảng tin</Link> /
                <Link to="" className='text-gray-700 hover:text-blue-400'> Chiến dịch tuyển dụng</Link> /
                <span className='text-gray-500'> Tạo mới chiến dịch</span>
            </p>
            <h1 className='text-3xl p-3 font-semibold ' >Tạo chiến dịch tuyển dụng của bạn</h1>
            <div className='border shadow p-3 m-3 '>
                <h2 className='flex items-center gap-2'> <span className='border bg-blue-500 rounded-full px-3 text-2xl text-white'>1</span> <span className='text-xl  font-semibold'>Khởi động một chiến dịch tuyển dụng mới</span></h2>
                <p className='py-4 text-gray-600 text-sm'>Hoạt động tuyển dụng của doanh nghiệp được tiến hành theo từng giai đoạn với các mục tiêu tuyển dụng khác nhau. Chiến dịch tuyển dụng là nơi tổng hợp các hoạt động khác nhau của một đợt tuyển dụng được thực hiện trên nền tảng IT Careers.</p>
                <div className='flex   gap-10  p-4 border shadow '>
                    <img
                        src="https://business.123job.vn/images/campaign-create.png"
                        alt=""
                        className=''
                        width={400}
                    />

                    <div className=' w-2/3'>
                        <p className='font-semibold'>Tài liệu nên xem</p>
                        <Link to={''} className='flex justify-between items-center bg-blue-100/50 px-3 py-4 my-5'>
                            <a href="" className='text-blue-500 hover:underline'>Khái niệm về Chiến dịch tuyển dụng</a>
                            <span className='text-blue-500 text-2xl'> <MdOutlineKeyboardDoubleArrowRight /></span>
                        </Link>
                        <Link to={''} className='flex justify-between items-center bg-blue-100/50 px-3 py-4 my-5'>
                            <a href="" className='text-blue-500 hover:underline'>Tạo một chiến dịch tuyển dụng hiệu quả</a>
                            <span className='text-blue-500 text-2xl'> <MdOutlineKeyboardDoubleArrowRight /></span>
                        </Link>
                        <Link to={''} className='flex justify-between items-center bg-blue-100/50 px-3 py-4 my-5'>
                            <a href="" className='text-blue-500 hover:underline'>Mẹo để chiến dịch tuyển dụng thu hút hơn</a>
                            <span className='text-blue-500 text-2xl'> <MdOutlineKeyboardDoubleArrowRight /></span>
                        </Link>
                    </div>
                </div>
                <p className='py-4 text-gray-600 text-sm'>
                    Hiểu về cách chiến dịch tuyển dụng hoạt động sẽ giúp bạn tối ưu tốt hơn hoạt động tuyển dụng của doanh nghiệp trên 123job. Hãy chắc chắn bạn đã tìm hiểu thông tin về chiến dịch tuyển dụng từ các nội dung phía trên.
                </p>
            </div>
            <div className='border shadow m-3 p-3'>
                <h4 className='flex items-center gap-2  text-xl  font-semibold'>
                    <span className='text-white bg-blue-400 px-2 rounded-full'>2</span>
                    <span>Tạo chiến dịch tuyển dụng của bạn</span>
                </h4>
                <hr className='my-5' />
                <form action="">
                    <div>
                        <label htmlFor="" className='font-semibold'>Tên chiến dịch tuyển dụng <span className='text-red-500'>*</span></label>
                        <input type="text" className='px-2 border py-2' placeholder='Vd: Tuyển dụng developer, thực tập sinh ReactJs...' />
                    </div>
                    <div>
                        <label htmlFor="" className='font-semibold'>Vị trí tuyển dụng <span className='text-red-500'>*</span></label>
                        <input type="text" className='px-2 border py-2' placeholder='Vd: Tuyển dụng developer, thực tập sinh ReactJs...' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RecruimentCampaign