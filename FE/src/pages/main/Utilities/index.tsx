import React from 'react'
import { Link } from 'react-router-dom'

const Utilities = () => {
    return (
        <div className='my-10'>
            <h2 className='text-xl md:text-2xl my-5'><span className='text-blue-500'>Tiện ích</span> hỗ trợ</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
                <div className='flex gap-3 items-center rounded shadow-lg p-4' >
                    <img src="https://123job.vn/images/recruit/resume_color.png" width={90} alt="" />
                    <Link to="">
                        <p className='font-semibold hover:text-blue-500'>Công cụ viết CV</p>
                    </Link>

                </div>
                <div className='flex gap-3 items-center rounded shadow-lg p-4' >
                    <img src="https://www.123job.vn/images/recruit/review.png" width={90} alt="" />
                    <Link to="">
                        <p className='font-semibold hover:text-blue-500'>Viết review công ty</p>
                    </Link>

                </div>
                <div className='flex gap-3 items-center rounded shadow-lg p-4' >
                    <img src="https://www.123job.vn/images/recruit/mbti.png" width={90} alt="" />
                    <Link to="">
                        <p className='font-semibold hover:text-blue-500'>Trắc nghiệm tính cách</p>
                    </Link>

                </div>
                <div className='flex gap-3 items-center rounded shadow-lg p-4' >
                    <img src="https://www.123job.vn/images/recruit/calculartor.png" width={90} alt="" />
                    <Link to="">
                        <p className='font-semibold hover:text-blue-500'>Chuyển lương gross to net</p>
                    </Link>

                </div>

            </div>
        </div>
    )
}

export default Utilities