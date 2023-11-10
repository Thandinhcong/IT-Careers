import { Button } from 'antd'
import { AiOutlineUpload } from 'react-icons/ai';

import { AiOutlineCheckCircle } from 'react-icons/ai';




const BusinessSetting = () => {

    return (
        <div className='leading-7'>
            <h1 className='text-2xl'>Giấy phép kinh doanh</h1>
            <p className='font-bold text-sm my-3'>Tôi tải lên file giấy phép kinh doanh thì có quyền lợi gì?</p>
            <p className='text-gray-500 flex items-baseline'><AiOutlineCheckCircle className='text-green-500' />Tin sẽ được duyệt nhanh hơn đối với nhà tuyển dụng chưa xác thực.</p>
            <p className='text-gray-500 flex items-baseline'><AiOutlineCheckCircle className='text-green-500' />Tài khoản của bạn được tích xác thực. Giúp tin tuyển dụng của bạn xuất hiện uy tín với người tìm việc.</p>
            <p className='text-gray-500 flex items-baseline'><AiOutlineCheckCircle className='text-green-500' />Ưu tiên thứ hạng hiển thị trên kết quả tìm kiếm khi người dùng lọc tin nhà tuyển dụng xác thực.</p>
            <p className='font-bold text-sm my-3'>File tải lên gồm gì?</p>
            <p className='text-gray-500'>Giấy phép kinh doanh của công ty</p>
            <p className='font-bold text-sm my-3'>Trạng thái nhà tuyển dụng hiện tại.</p>
            <p className='text-gray-500'>Chưa xác thực</p>
            <p className='text-gray-500'>File tải lên (Dung lượng file không vượt quá 3MB)</p>
            <input type="file" className='my-3 border w-full p-2' />
            <div>
                <Button className='flex items-center border-blue-500 text-blue-500 text-base h-10'>
                    <AiOutlineUpload />
                    Cập nhật giấy phép
                </Button>
            </div>
        </div>
    )
}

export default BusinessSetting