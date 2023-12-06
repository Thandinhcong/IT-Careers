import { BsArrowRightShort } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Forder = () => {
    return (
        <div className='shadow-inner border p-2 mt-5'>
            <h6 className='font-semibold flex justify-between' >
                Bạn có thể quan tâm
                <Link to="/business/reports" className='flex gap-1 items-center'>
                    Xem báo cáo
                    <span><BsArrowRightShort /></span>
                </Link>
            </h6>
            <div className='grid grid-cols-4 gap-6'>
                <div className='p-2 border shadow mt-3'>
                    <p className='font-medium'>Hồ sơ mới</p>
                    <p className='text-red-500 text-2xl my-2'>0</p>
                    <p className='flex items-center justify-between gap-3 text-gray-400'><span className='font-normal text-sm'>CV ứng tuyển mới </span>  <Link to='/business/cv-apply' className='flex items-center justify-between text-sm gap-1'>Xem <BsArrowRightShort /> </Link> </p>
                </div>
                <div className='p-2 border shadow mt-3'>
                    <p className='font-medium'>Tin tuyển dụng hiển thị</p>
                    <p className='text-red-500 text-2xl my-2'>0</p>
                    <p className='flex items-center gap-3 text-gray-400 justify-between'><span className='font-normal text-sm '>Đang tuyển </span>  <Link to='' className='flex items-center gap-1 text-sm'>Xem <BsArrowRightShort /> </Link> </p>
                </div>
            </div>
        </div>
    )
}

export default Forder