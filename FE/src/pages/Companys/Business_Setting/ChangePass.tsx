import { Button, theme } from 'antd';
import React from 'react'
import { AiFillEdit, AiOutlineUpload } from 'react-icons/ai';
import { BiSave } from 'react-icons/bi';

type Props = {}

const ChangePassCompany = (props: Props) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <div>
            <h1 className='text-2xl'>Thay đổi mật khẩu</h1>
            <p className='w-4/5 text-sm text-gray-600 my-3'>Bạn quên mật khẩu cũ? Vui lòng <a href="">đăng xuất tài khoản</a> sau đó sử dụng chức năng quên mật khẩu.</p>
            <div>
                <p className='font-bold text-gray-500'>Mật khẩu cũ</p>
                <input type="text" name="" id="" placeholder='Mật khẩu cũ' className='border border-gray-400 w-1/2 h-7  pl-3' />
            </div>
            <div className='my-5'>
                <p className='font-bold text-gray-500'>Mật khẩu mới</p>
                <input type="text" name="" id="" placeholder='Mật khẩu mới' className='border border-gray-400 w-1/2 h-7  pl-3' />
            </div>
            <div>
                <p className='font-bold text-gray-500'>Nhập lại mật khẩu</p>
                <input type="text" name="" id="" placeholder='Nhập lại mật khẩu' className='border border-gray-400 w-1/2 h-7  pl-3' />
            </div>
            <div className='flex gap-2'>
                <Button
                    type='primary'
                    className='flex items-center gap-1 bg-blue-500 text-white mt-5'>
                    <BiSave />
                    Cập nhật
                </Button>
                <Button
                    className='flex items-center gap-1 mt-5'>
                    <BiSave />
                    Hủy bỏ
                </Button>
            </div>
        </div>
    )
}

export default ChangePassCompany