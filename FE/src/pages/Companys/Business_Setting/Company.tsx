import { Button, theme } from 'antd'
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import { AiFillEdit, AiOutlineUpload } from 'react-icons/ai';

type Props = {}
// const { Header, Content, Footer } = Layout;


const CompanySetting = (props: Props) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <div>
            <h1 className='text-2xl'>Thông tin công ty</h1>
            <p className='w-4/5 text-sm text-gray-600 my-3'>Mô tả chi tiết thông tin về công ty của bạn đang làm việc giúp ứng viên nắm được về công ty</p>
            <span className='text-gray-500 text-lg'>Ảnh đại diện</span>
            <div className='flex justify-between items-center border-b pb-3'>
                <div className='w-20'>
                    <img src="https://cdn.123job.vn/123job/uploads/2023/09/26/2023_09_26______60b88f50ef873507c6867670c68b6aff.jpg" alt="" className='rounded-full border p-1' />

                </div>
                <Button
                    className='flex items-center'
                > <AiOutlineUpload /> Thay đổi ảnh
                </Button>
            </div>
            <div className='my-2'>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-500 text-lg'>Tên công ty</span>
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
                    <span className='text-gray-500 text-lg'>Mã số thuế</span>
                    <Button
                        className='flex items-center border-none'
                    > <AiFillEdit /> Chỉnh sửa
                    </Button>
                </div>
                <div className='flex justify-between items-center border-b pb-3'>
                    <div className='w-32'>
                        <p>31923817203102</p>
                    </div>

                </div>
            </div>
            <div className='my-2'>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-500 text-lg'>Trụ sở</span>
                    <Button
                        className='flex items-center border-none'
                    > <AiFillEdit /> Chỉnh sửa
                    </Button>
                </div>
                <div className='flex justify-between items-center border-b pb-3'>
                    <div className='w-32'>
                        <p>HN</p>
                    </div>

                </div>
            </div>
            <div className='my-2'>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-500 text-lg'>Điện thoại liên hệ</span>
                    <Button
                        className='flex items-center border-none'
                    > <AiFillEdit /> Chỉnh sửa
                    </Button>
                </div>
                <div className='flex justify-between items-center border-b pb-3'>
                    <div className='w-32'>
                        <p>0391203102</p>
                    </div>

                </div>
            </div>
            <div className='my-2'>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-500 text-lg'>Quy mô nhân sự</span>
                    <Button
                        className='flex items-center border-none'
                    > <AiFillEdit /> Chỉnh sửa
                    </Button>
                </div>
                <div className='flex justify-between items-center border-b pb-3'>
                    <div className='w-32'>
                        <p>Dưới 10</p>
                    </div>

                </div>
            </div>
            <div className='my-2'>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-500 text-lg'>Ngày làm việc</span>
                    <Button
                        className='flex items-center border-none'
                    > <AiFillEdit /> Chỉnh sửa
                    </Button>
                </div>
                <div className='flex justify-between items-center border-b pb-3'>
                    <div className='w-32'>
                        <p>Thứ 2 - Thứ 6</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CompanySetting