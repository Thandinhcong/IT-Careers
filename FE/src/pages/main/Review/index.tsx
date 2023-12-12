import { Link } from 'react-router-dom'

const Reviews = () => {
    return (
        <section>
            <h2 className='text-xl md:text-2xl mt-10 my-5'><span className='text-blue-500'>BEWORK</span>  có thể giúp bạn những gì?</h2>
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
                        <Link to="/user/listcv" className='px-7 bg-blue-500 rounded-full py-2 text-white  '>Tạo CV miễn phí</Link>
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
                        <h5 className='font-medium text-xl mt-6 mb-3 text-center'>Tìm kiếm việc làm nhanh</h5>
                        <p className='text-center'>Bạn cần tìm kiếm việc làm gấp. Bework chúng tôi sẽ giúp bạn tìm kiếm công việc phù hợp với bạn thật nhanh. Chỉ mất có hồ sơ trên website của chúng tôi, bạn sẽ được ứng tuyển các công việc vafbanj mong muốn nhất, chúng tôi sẽ tự động ứng tuyển cho bạn.</p>
                    </div>
                    <div className='flex justify-center'>
                        <Link to="/find-job-fast" className='px-7 bg-blue-500 rounded-full py-2 text-white  '>Tìm việc nhanh</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Reviews