import React from 'react'
import { BsArrowRight, BsCurrencyDollar } from 'react-icons/bs'
import { MdFavoriteBorder, MdRoom } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Recruitment = () => {
    return (
        <div>
            <div className='mb-10   lg:p-1'>
                <div className='flex justify-between'>
                    <h2 className='font-bold md:text-2xl'>
                        Tuyển dụng, việc làm
                        <span className='text-blue-500'> tốt nhất</span>
                    </h2>
                    <Link to="#" className='flex items-center gap-2  hover:text-blue-500'>Xem tất cả  <BsArrowRight /> </Link>
                </div>
                <div className='my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 '>
                    <div className='shadow-lg p-2'>
                        <div className='flex gap-2'>
                            <img src="https://cdn.123job.vn/123job/uploads/2023/09/18/2023_09_18______57489ca66e204611c4df5e4c8c4c3ed0.png" alt="" className='border rounded-md p-2' width={70} />
                            <div>
                                <Link to="/">
                                    <p className='text-slate-500 font-semibold text-base'>Thực tập sinh ReactJS</p>
                                </Link>
                                <p>FPT Software</p>
                            </div>
                        </div>
                        <p className='flex items-center gap-1 my-2'> <MdRoom /> <span>Cầu giấy, Hà Nội</span> </p>
                        <div className='flex justify-between items-center mb-2'>
                            <p className='flex items-center gap-1'> <BsCurrencyDollar /><span>200.000.000-400.000.000/tháng</span></p>
                            <i className='border p-1'><MdFavoriteBorder /></i>
                        </div>

                    </div>
                    <div className='shadow-lg p-2'>
                        <div className='flex gap-2'>
                            <img src="https://cdn.123job.vn/123job/uploads/2023/09/18/2023_09_18______57489ca66e204611c4df5e4c8c4c3ed0.png" alt="" className='border rounded-md p-2' width={70} />
                            <div>
                                <p className='text-slate-500 font-semibold text-base'>Thực tập sinh ReactJS</p>
                                <p>FPT Software</p>
                            </div>
                        </div>
                        <p className='flex items-center gap-1 my-2'> <MdRoom /> <span>Cầu giấy, Hà Nội</span> </p>
                        <div className='flex justify-between items-center mb-2'>
                            <p className='flex items-center gap-1'> <BsCurrencyDollar /><span>200.000.000-400.000.000/tháng</span></p>
                            <i className='border p-1'><MdFavoriteBorder /></i>
                        </div>

                    </div>
                    <div className='shadow-lg p-2'>
                        <div className='flex gap-2'>
                            <img src="https://cdn.123job.vn/123job/uploads/2023/09/18/2023_09_18______57489ca66e204611c4df5e4c8c4c3ed0.png" alt="" className='border rounded-md p-2' width={70} />
                            <div>
                                <p className='text-slate-500 font-semibold text-base'>Thực tập sinh ReactJS</p>
                                <p>FPT Software</p>
                            </div>
                        </div>
                        <p className='flex items-center gap-1 my-2'> <MdRoom /> <span>Cầu giấy, Hà Nội</span> </p>
                        <div className='flex justify-between items-center mb-2'>
                            <p className='flex items-center gap-1'> <BsCurrencyDollar /><span>200.000.000-400.000.000/tháng</span></p>
                            <i className='border p-1'><MdFavoriteBorder /></i>
                        </div>

                    </div>
                    <div className='shadow-lg p-2'>
                        <div className='flex gap-2'>
                            <img src="https://cdn.123job.vn/123job/uploads/2023/09/18/2023_09_18______57489ca66e204611c4df5e4c8c4c3ed0.png" alt="" className='border rounded-md p-2' width={70} />
                            <div>
                                <p className='text-slate-500 font-semibold text-base'>Thực tập sinh ReactJS</p>
                                <p>FPT Software</p>
                            </div>
                        </div>
                        <p className='flex items-center gap-1 my-2'> <MdRoom /> <span>Cầu giấy, Hà Nội</span> </p>
                        <div className='flex justify-between items-center mb-2'>
                            <p className='flex items-center gap-1'> <BsCurrencyDollar /><span>200.000.000-400.000.000/tháng</span></p>
                            <i className='border p-1'><MdFavoriteBorder /></i>
                        </div>

                    </div>
                </div>
            </div>

        </div>

    )
}

export default Recruitment