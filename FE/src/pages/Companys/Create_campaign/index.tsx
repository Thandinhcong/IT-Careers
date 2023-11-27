import { GoArrowRight, GoFileDiff, GoQuote } from "react-icons/go"

import { Link } from 'react-router-dom'


const CreateCampaign = () => {
    return (

        <div className='mt-16   '>
            <p className='text-sm my-5 ml-3' >
                <Link to="/business">Bảng tin </Link> /
                <Link to=""> Chiến dịch tuyển dụng</Link> /
                <span className='text-gray-500'> Đăng tin chiến dịch</span>
            </p>
            <div className='border shadow p-3 mr-3'>
                <h3 className='text-lg font-semibold py-4'>Bạn muốn đăng tin cho chiến dịch nào?</h3>
                <div className='p-3 my-5 flex items-center justify-between border shadow'>
                    <div className='flex items-center gap-2 text-blue-500 font-sans  '>
                        <div className='text-3xl'>
                            <GoFileDiff />
                        </div>
                        <span>Đăng tin với chiến dịch tuyển dụng mới</span>
                    </div>
                    <div>
                        <Link to="/business/recruitment-campaign/form/create" className='bg-blue-500 px-2 py-2 rounded text-white flex items-center gap-1' >Bắt đầu ngay <span><GoArrowRight /></span> </Link>
                    </div>
                </div>
                <div className='border shadow'>
                    <div className='p-3 flex items-center justify-between '>
                        <div className='flex items-center gap-2 text-blue-500 font-sans  '>
                            <div className='text-3xl text-blue-500'>
                                <GoQuote />
                            </div>
                            <span>Đăng tin cho chiến dịch hiện có</span>

                        </div>
                    </div>
                    <hr className='mx-3' />
                    <div className='p-3 flex justify-between items-center'>
                        <p className='text-sm font-semibold'>Các chiến dịch đang mở & chưa có tin tuyển dụng tương ứng</p>
                        <input type="text" className='border w-[260px] px-6 outline-none rounded py-2 text-sm' placeholder='Tìm kiếm tên hoặc mã tuyển dụng' />
                    </div>
                    <div className='flex justify-between items-center p-3 border mx-3 my-5 py-8 rounded'>
                        <div className=''>
                            <h4 className='font-semibold mb-2'>Thực tập sinh ReactJs</h4>
                            <p className='text-xs text-gray-500 flex gap-2 items-center b'>
                                <span className='border p-1 rounded border-solid border-gray-500 px-2'>#123</span>
                                <span>Tạo ngày 26/09/2023</span>
                            </p>
                        </div>
                        <a href="" className='px-3 py-2 rounded border border-solid border-blue-500 text-blue-500 flex items-center gap-2'>Đăng tin <span><GoArrowRight /></span> </a>
                    </div>
                    <div className='flex justify-between items-center p-3 border mx-3 my-5 py-8 rounded'>
                        <div className=''>
                            <h4 className='font-semibold mb-2'>Thực tập sinh ReactJs</h4>
                            <p className='text-xs text-gray-500 flex gap-2 items-center b'>
                                <span className='border p-1 rounded border-solid border-gray-500 px-2'>#123</span>
                                <span>Tạo ngày 26/09/2023</span>
                            </p>
                        </div>
                        <a href="" className='px-3 py-2 rounded border border-solid border-blue-500 text-blue-500 flex items-center gap-2'>Đăng tin <span><GoArrowRight /></span> </a>
                    </div>
                    <div className='flex justify-between items-center p-3 border mx-3 my-5 py-8 rounded'>
                        <div className=''>
                            <h4 className='font-semibold mb-2'>Thực tập sinh ReactJs</h4>
                            <p className='text-xs text-gray-500 flex gap-2 items-center b'>
                                <span className='border p-1 rounded border-solid border-gray-500 px-2'>#123</span>
                                <span>Tạo ngày 26/09/2023</span>
                            </p>
                        </div>
                        <Link to="" className='px-3 py-2 rounded border border-solid border-blue-500 text-blue-500 flex items-center gap-2'>Đăng tin <span><GoArrowRight /></span> </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCampaign