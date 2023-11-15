import { Link } from 'react-router-dom'

const ToRecruitment = () => {
    return (
        <section className='my-10 flex py-10 px-32  gap-4  items-center bg-blue-100/60 rounded-3xl'>
            <div className='mr-3'>
                <h2 className='font-medium text-4xl my-5'>Bạn có vị trí cần tuyển dụng?</h2>
                <p className='mb-10'>Nền tảng của BEWORK sẽ giúp bạn kết nối với những ứng viên tiềm năng nhanh chóng!</p>
                <Link to="" className='py-3 text-white px-5  bg-blue-500 rounded-lg'>Đăng tin miễn phí</Link>

            </div>
            <img
                src="https://www.123job.vn/images/banner/employer-intro-2.png"
                alt=""
                width={500}
                className='bg-none'
            />
        </section>
    )
}

export default ToRecruitment