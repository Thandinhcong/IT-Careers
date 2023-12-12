import { AiOutlineArrowRight } from "react-icons/ai"
import SearchJobs from '../../Site/Recruit/SearchJobs';
import { Link } from "react-router-dom";
const Banner = () => {
    return (
        <div className='bg-blue-100/50'>
            <section className=' max-w-screen-xl mx-auto  pb-10 lg:pb-36 pt-10' >
                <h2 className='text-2xl mb-2'>Khám phá cơ hội nghề nghiệp</h2>
                <p>Dễ dàng tìm một công việc mơ ước tại công ty hàng đầu Việt Nam</p>
                <SearchJobs />
                <div className='hidden lg:flex lg:gap-2 lg:my-5'>
                    <div className='px-4 rounded-lg py-5 bg-violet-100/50  w-[600px]'>
                        <h2 className='text-xl mb-2'>Tạo CV online ấn tượng</h2>
                        <p className='mb-6'>BEWORK hiện có  mẫu CV chuyên nghiệp và độc đáo</p>
                        <div className='flex items-center justify-between '>
                            <Link to={`/user/listcv`} className='flex items-center text-blue-500 rounded-full bg-white gap-1 px-4 py-3' >Tạo cv ngay  <AiOutlineArrowRight /> </Link>
                            <img src="https://123job.vn/images/recruit/resume.png" width={60} alt="" />
                        </div>
                    </div>
                    <div className='px-4 rounded-lg py-5  bg-violet-100/50 w-[600px]'>
                        <h2 className='text-xl mb-2'>Tìm kiếm việc làm nhanh</h2>
                        <p className='mb-6'>Bạn có nhu cầu tìm kiếm việc làm nhanh, chỉ cần tìm kiếm và kết quả hiển thị chúng tôi sẽ tự động ứng tuyển cho bạn</p>
                        <div className='flex items-center justify-between'>
                            <Link className='flex items-center text-blue-500 rounded-full bg-white gap-1 px-4 py-3' to="/find-job-fast">Tìm việc ngay <AiOutlineArrowRight /> </Link>
                            <img src="https://123job.vn/images/recruit/cover_letter.png" width={60} alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default Banner