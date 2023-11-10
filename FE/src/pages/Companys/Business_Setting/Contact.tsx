import { Button } from 'antd';
import { AiFillEdit } from 'react-icons/ai';


const ContactCompanySetting = () => {
    return (
        <div>
            <h1 className='text-2xl'>Thông tin liên hệ</h1>
            <p className='w-4/5 text-sm text-gray-600 my-3'>Thông tin giúp ứng viên liên hệ với bạn khi ứng tuyển</p>
            <div className='my-2'>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-500 text-lg'>Họ và tên</span>
                    <Button
                        className='flex items-center border-none'
                    > <AiFillEdit /> Chỉnh sửa
                    </Button>
                </div>
                <div className='flex justify-between items-center border-b pb-3'>
                    <div className='w-32'>
                        <p>Lê Quốc Đạt</p>
                    </div>

                </div>
            </div>
            <div className='my-2'>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-500 text-lg'>Email</span>
                    <Button
                        className='flex items-center border-none'
                    > <AiFillEdit /> Chỉnh sửa
                    </Button>
                </div>
                <div className='flex justify-between items-center border-b pb-3'>
                    <div className='w-32'>
                        <p>lequocdat2312@gmail.com</p>
                    </div>

                </div>
            </div>
            <div className='my-2'>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-500 text-lg'>Điện thoại</span>
                    <Button
                        className='flex items-center border-none'
                    > <AiFillEdit /> Chỉnh sửa
                    </Button>
                </div>
                <div className='flex justify-between items-center border-b pb-3'>
                    <div className='w-32'>
                        <p>0398681298</p>
                    </div>

                </div>
            </div>
            <div className='my-2'>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-500 text-lg'>Skype</span>
                    <Button
                        className='flex items-center border-none'
                    > <AiFillEdit /> Chỉnh sửa
                    </Button>
                </div>
                <div className='flex justify-between items-center border-b pb-3'>
                    <div className='w-32'>
                        <p>IT Careers</p>
                    </div>

                </div>
            </div>
            <div className='my-2'>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-500 text-lg'>Giới tính</span>
                    <Button
                        className='flex items-center border-none'
                    > <AiFillEdit /> Chỉnh sửa
                    </Button>
                </div>
                <div className='flex justify-between items-center border-b pb-3'>
                    <div className='w-32'>
                        <p>Nam</p>
                    </div>

                </div>
            </div>
            <div className='my-2'>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-500 text-lg'>Chức vụ</span>
                    <Button
                        className='flex items-center border-none'
                    > <AiFillEdit /> Chỉnh sửa
                    </Button>
                </div>
                <div className='flex justify-between items-center border-b pb-3'>
                    <div className='w-32'>
                        <p>Khác</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ContactCompanySetting