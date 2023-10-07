import { Button } from 'antd'
import React from 'react'
import { AiOutlineCheckCircle, AiOutlinePhone, AiOutlinePlus } from 'react-icons/ai'

type Props = {}

const Brand_Refer = (props: Props) => {
    return (
        <div className='grid grid-cols-2 mt-3 mx-6'>
            <div className='leading-7 col-span-1 mt-28'>
                <h1 className='text-4xl'>Brand công ty</h1>
                <p className='text-gray-600'>Chuyên trang tuyển dụng dành cho nhà tuyển dụng chuyên nghiệp hàng đầu với 5 ưu điểm vượt trội dưới đây:</p>
                <div className='w-96 pl-3 border-b'>
                    <p className='text-xm'><AiOutlineCheckCircle className='w-7 inline-block items-baseline text-green-600 ' />Xây dựng thương hiệu tuyển dụng ấn tượng trong mắt ứng viên</p>
                </div>
                <div className='w-96 pl-3 border-b'>
                    <p className='text-xm'><AiOutlineCheckCircle className='w-7 inline-block items-baseline text-green-600 ' />Nâng cao hiệu quả hoạt động tuyển dụng của công ty</p>
                </div>
                <div className='w-96 pl-3 border-b'>
                    <p className='text-xm'><AiOutlineCheckCircle className='w-7 inline-block items-baseline text-green-600 ' />Dễ dàng tùy chỉnh giao diện màu sắc mong muốn</p>
                </div>
                <div className='w-96 pl-3 border-b'>
                    <p className='text-xm'><AiOutlineCheckCircle className='w-7 inline-block items-baseline text-green-600 ' />Giao diện hiện đại, hiển thị nổi bật. Tạo ấn tượng với ứng viên ngay lần đầu tiếp cận.</p>
                </div>
                <div className='w-96 pl-3 border-b'>
                    <p className='text-xm'><AiOutlineCheckCircle className='w-7 inline-block items-baseline text-green-600 ' />Tiếp cận ứng với thông qua tất cả thiết bị: di động, table, máy tính</p>
                </div>
                <Button
                    type={'text'}
                    className='bg-red-500 text-white flex items-center mt-5 h-10'
                > <AiOutlinePlus />Tạo brand công ty ngay
                </Button>
                <Button
                    type='primary'
                    className=' bg-blue-500 text-white flex items-center mt-5 h-10 pr-5'
                > <AiOutlinePhone /> Nhờ tư vấn viên hỗ trợ
                </Button>
            </div>
            <div className='col-span-1  mt-4'>
                <img src="https://business.123job.vn/imgs/recruit-brand.png" alt="" />
            </div>
        </div>
    )
}

export default Brand_Refer