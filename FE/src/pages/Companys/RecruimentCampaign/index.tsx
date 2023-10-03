import React from 'react'
import { Link } from 'react-router-dom'
import { FiChevronsRight } from "react-icons/fi"


const RecruimentCampaign = () => {
    return (
        <div className='mt-16 ml-3 py-2'>
            <p className='text-sm'>
                <Link className='text-gray-600' to="/companys/dashboard">Bảng tin</Link> /
                <Link className='text-gray-600' to={'#'}> Chiến dịch tuyển dụng</Link> /
                <span className='text-gray-400'> Tạo chiến dịch mới</span>
            </p>
            <h1 className='text-3xl my-5 font-semibold'>Tạo chiến dịch tuyển dụng của bạn</h1>
            <div className='border shadow p-3'>
                <h3 className='flex gap-2 items-center'>
                    <span className='px-2 text-2xl rounded-full  bg-blue-500 text-white'>1</span>
                    <span className='text-xl font-semibold'>Khởi động một chiến dịch tuyển dụng mới</span>
                </h3>
                <p className='my-4 text-base text-gray-600'>Hoạt động tuyển dụng của doanh nghiệp được tiến hành theo từng giai đoạn với các mục tiêu tuyển dụng khác nhau. Chiến dịch tuyển dụng là nơi tổng hợp các hoạt động khác nhau của một đợt tuyển dụng được thực hiện trên nền tảng IT Carees.</p>
                <div className='border shadow p-4 flex gap-3'>
                    <img src="https://business.123job.vn/images/campaign-create.png"
                        alt=""
                        className='w-[400px] xl:w-[45%]'
                    />
                    <div className='w-2/3'>
                        <h5 className='font-semibold text-lg'>Tài liệu nên xem</h5>
                        <div className='flex justify-between items-center my-5 bg-blue-100 px-5 py-3 text-blue-500 hover:underline'>
                            <Link to={'#'}>Khái niệm về Chiến dịch tuyển dụng</Link>
                            <div className='text-3xl'>
                                <FiChevronsRight />
                            </div>
                        </div>
                        <div className='flex justify-between items-center my-5 bg-blue-100 px-5 py-3 text-blue-500 hover:underline'>
                            <Link to={'#'}>Tạo một chiến dịch tuyển dụng hiệu quả</Link>
                            <div className='text-3xl'>

                                <FiChevronsRight />
                            </div>
                        </div>
                        <div className='flex justify-between items-center my-5 bg-blue-100 px-5 py-3 text-blue-500 hover:underline'>
                            <Link to={'#'}>Mẹo để chiến dịch tuyển dụng thu hút hơn</Link>
                            <div className='text-3xl'>

                                <FiChevronsRight />
                            </div>
                        </div>

                    </div>
                </div>
                <p className='my-4 text-base text-gray-600'>Hiểu về cách chiến dịch tuyển dụng hoạt động sẽ giúp bạn tối ưu tốt hơn hoạt động tuyển dụng của doanh nghiệp trên IT Carees. Hãy chắc chắn bạn đã tìm hiểu thông tin về chiến dịch tuyển dụng từ các nội dung phía trên.</p>
            </div>
            <div className='my-5 border shadow p-3'>
                <h1 className='flex items-center gap-2'>
                    <span className='px-2 bg-blue-500 text-white text-2xl rounded-full'>2</span>
                    <span className='text-xl font-semibold'>Tạo chiến dịch tuyển dụng của bạn</span>
                </h1>
                <hr className='my-5 w-full' />
                <form >
                    <div>
                        <label htmlFor="" className='font-semibold '>Tên chiến dịch tuyển dụng <span className='text-red-500'>*</span></label> <br />
                        <input type="text" className=' mt-2 border outline-none border-solid border-blue-500 px-3 py-1' />
                    </div>
                    <select name="" id="">
                        <option value="">
                            --Vị trí tuyển dụng
                        </option>
                    </select>
                </form>
            </div>
        </div>
    )
}

export default RecruimentCampaign