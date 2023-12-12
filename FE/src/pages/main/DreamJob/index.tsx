import { Link } from 'react-router-dom'

const DreamJob = () => {
    return (
        <div className=''>
            <h2 className='text-2xl mb-5'>
                Ứng tuyển công việc
                <span className='text-blue-500'> mơ ước</span>
            </h2>
            <div className='flex'>
                <img src="https://www.123job.vn/images/banner/boy-large.png"
                    alt=""
                    className='mr-14 hidden lg:block'
                />
                <div className='  grid   lg:grid-cols-2 gap-6 lg:gap-20 p-4 lg:pt-0'>
                    <div className='relative'>
                        <img
                            src="https://www.123job.vn/images/icon/icon1.png"
                            alt=""
                            className='p-2 w-[80px]  shadow-xl flex justify-center items-center rounded-xl absolute z-20 bg-white top-5 -left-5 lg:-left-10'
                        />
                        <div className='rounded-xl bg-blue-200 p-5 shadow-xl'>
                            <p className='text-6xl text-blue-400 flex justify-end '>01</p>
                            <Link to="">
                                <h4 className='text-center font-semibold text-xl my-5 hover:text-blue-500' >Đăng ký tài khoản</h4>
                            </Link>
                            <span className='font-sans '>Tạo tài khoản để tìm kiếm công việc dễ dàng, nhanh chóng và phù hợp nhất.</span>
                        </div>
                    </div>
                    <div className='relative'>
                        <img
                            src="https://www.123job.vn/images/icon/icon4.png"
                            alt=""
                            className='p-2 w-[80px]  shadow-xl flex justify-center items-center rounded-xl absolute z-20 bg-white top-5 -left-5 lg:-left-10'
                        />
                        <div className='rounded-xl bg-orange-200 p-5 shadow-xl'>
                            <p className='text-6xl text-orange-500 flex justify-end '>02</p>
                            <Link to="">
                                <h4 className='text-center font-semibold text-xl my-5 hover:text-orange-500' >Tìm kiếm công việc</h4>
                            </Link>
                            <span className='font-sans '>Tìm kiếm những vị trí công việc tốt nhất và phù hợp với kỹ năng của bạn.</span>
                        </div>
                    </div>
                    <div className='relative'>
                        <img
                            src="https://www.123job.vn/images/icon/icon3.png"
                            alt=""
                            className='p-2 w-[80px]  shadow-xl flex justify-center items-center rounded-xl absolute z-20 bg-white top-5 -left-5 lg:-left-10'
                        />
                        <div className='rounded-xl bg-violet-200 p-5 shadow-xl'>
                            <p className='text-6xl text-violet-400 flex justify-end '>03</p>
                            <Link to="">
                                <h4 className='text-center font-semibold text-xl my-5 hover:text-violet-500' >Tạo hồ sơ online</h4>
                            </Link>
                            <span className='font-sans '>Tạo hồ sơ online chính xác, hấp dẫn nhà tuyển dụng.</span>
                        </div>
                    </div>
                    <div className='relative'>
                        <img
                            src="https://www.123job.vn/images/icon/icon3.png"
                            alt=""
                            className='p-2 w-[80px]  shadow-xl flex justify-center items-center rounded-xl absolute z-20 bg-white top-5 -left-5 lg:-left-10'
                        />
                        <div className='rounded-xl bg-blue-200 p-5 shadow-xl'>
                            <p className='text-6xl text-blue-400 flex justify-end '>04</p>
                            <Link to="">
                                <h4 className='text-center font-semibold text-xl my-5 hover:text-blue-400' >Nộp hồ sơ online</h4>
                            </Link>
                            <span className='font-sans '>Nộp hồ sơ online ngay khi tìm được công việc yêu thích để nhà tuyển dụng liên hệ nhanh nhất với bạn.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DreamJob