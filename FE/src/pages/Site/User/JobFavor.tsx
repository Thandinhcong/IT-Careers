import { Button } from 'antd'
import { AiFillHeart } from 'react-icons/ai'
import { CiClock2, CiLocationOn } from 'react-icons/ci'
import { MdAttachMoney } from 'react-icons/md'

const JobFavor = () => {
    return (
        <div>
            <h1 className='mb-5 w-5/6 ml-6 text-2xl font-bold'>Việc làm đã lưu</h1>
            <div className='flex justify-between shadow-sm shadow-blue-300 h-auto py-4 ml-5'>
                <div className='w-48'>
                    <img src="https://cdn.123job.vn/123job/uploads/2023/09/26/2023_09_26______60b88f50ef873507c6867670c68b6aff.jpg" alt="" />
                </div>
                <div className='mb-5 w-5/6 ml-6'>
                    <b className='text-2xl'>Tuyển thực tập sinh ReactJS</b>
                    <p className='text-lg'>CÔNG TY CỔ PHẦN CÔNG NGHỆ ITSM</p>
                    <p className='text-lg flex items-center'><CiLocationOn />Cầu giấy, Hà Nội</p>
                    <p className='text-lg flex items-center mt-2'><MdAttachMoney />2 - 4 triệu/tháng</p>
                    <div className='flex justify-between'>
                        <p className='text-lg flex items-center'><CiClock2 />Đã lưu: 2023-10-05 17:50:19</p>
                        <Button
                            className='bg-white text-blue-500 text-lg h-12 ml-60 mr-5'
                        >
                            <AiFillHeart className='text-red-500' />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobFavor