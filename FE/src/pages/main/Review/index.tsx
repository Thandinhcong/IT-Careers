import React from 'react'
import { Link } from 'react-router-dom'

const Reviews = () => {
    return (
        <section>
            <h2 className='text-xl md:text-2xl mt-10 my-5'><span className='text-blue-500'>IT Careers</span>  có thể giúp bạn những gì?</h2>
            <div className='grid grid-cols-3 gap-4 mt-10'>
                <div className='shadow-xl p-5 mb-8'>
                    <img
                        src="https://www.123job.vn/images/recruit/find_job.png"
                        alt=""
                        width={150}
                        className='mx-auto'
                    />
                    <div className='mb-10'>
                        <h5 className='font-medium text-xl mt-6 mb-3 text-center'>Tìm việc làm</h5>
                        <p className='text-center'>Với hơn 1 triệu + việc làm tại Việt Nam có trên trang web, Bạn có thể dễ dàng tìm kiếm việc làm mọi lúc, mọi nơi. Bạn có thể nhanh chóng ứng tuyển vào công ty hàng đầu có chế độ phúc lợi, môi trường làm việc tốt nhất.</p>
                    </div>
                    <div className='flex justify-center'>
                        <Link to="" className='px-7 bg-blue-500 rounded-full py-2 text-white  '>Tìm việc làm</Link>
                    </div>
                </div>
                <div className='shadow-xl p-5 mb-8'>
                    <img
                        src="https://www.123job.vn/images/recruit/resume.png"
                        alt=""
                        width={150}
                        className='mx-auto'
                    />
                    <div className='mb-10'>
                        <h5 className='font-medium text-xl mt-6 mb-3 text-center'>Mẫu CV đẹp</h5>
                        <p className='text-center'>Để giữ cho đơn xin việc của bạn nhất quán và chuyên nghiệp, các mẫu CV xin việc của chúng tôi hoàn toàn phù hợp với các mẫu Sơ yếu lý lịch. Tạo và tải xuống Sơ yếu lý lịch chuyên nghiệp của bạn trong vòng chưa đầy 5 phút..</p>
                    </div>
                    <div className='flex justify-center'>
                        <Link to="" className='px-7 bg-blue-500 rounded-full py-2 text-white  '>Tạo CV miễn phí</Link>
                    </div>
                </div>
                <div className='shadow-xl p-5 mb-8'>
                    <img
                        src="https://www.123job.vn/images/recruit/cover_letter.png"
                        alt=""
                        width={150}
                        className='mx-auto'
                    />
                    <div className='mb-10'>
                        <h5 className='font-medium text-xl mt-6 mb-3 text-center'>Mẫu Cover letters</h5>
                        <p className='text-center'>Cho dù bạn ứng tuyển vào một ngành bảo thủ như ngân hàng hay một công ty khởi nghiệp cường điệu, bạn có thể điều chỉnh các mẫu thư xin việc của chúng tôi để phù hợp với nhu cầu chính xác của bạn.</p>
                    </div>
                    <div className='flex justify-center'>
                        <Link to="" className='px-7 bg-blue-500 rounded-full py-2 text-white  '>Tạo cover letter</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Reviews