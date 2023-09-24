import React from 'react'

const Connect = () => {
    return (
        <section className=' font-medium  relative'>
            <div className='bg-blue-500 rounded-2xl p-10 text-white'>
                <h3 className='text-2xl  my-5'>IT Careers</h3>
                <h1 className='text-5xl mb-10 font-semibold'>Kết nối nhà tuyển dụng</h1>
                <p>Chúng tôi giúp bạn kết nối với nhà tuyển dụng nhanh nhất, <br /> tiện lợi nhất, giúp bạn có công việc mơ ước.</p>
                <div className='grid grid-cols-3 gap-6 my-10 w-2/3'>
                    <div>
                        <p className='text-yellow-300 text-5xl'>50k+</p>
                        <p>Người dùng hoạt động hằng ngày</p>
                    </div>
                    <div>
                        <p className='text-5xl text-teal-300'>9k+</p>
                        <p>Cuộc trò chuyện tạo mỗi ngày</p>

                    </div>
                    <div>
                        <p className='text-5xl text-violet-300'>2M+</p>
                        <p>Tin nhắn được gửi đi</p>
                    </div>
                </div>
            </div>

            <img
                src="https://www.123job.vn/images/banner/gir-large.png"
                alt=""
                className='absolute top-10 left-2/3  '
            />
        </section>
    )
}

export default Connect