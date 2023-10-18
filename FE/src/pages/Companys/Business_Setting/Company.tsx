import { Button, theme } from 'antd'

import React from 'react';
import { AiFillEdit, AiOutlineUpload } from 'react-icons/ai';
import { useGetCompanySettingQuery } from '../../../api/companySettingApi';

type Props = {}
// const { Header, Content, Footer } = Layout;


const CompanySetting = (props: Props) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { data: companys, isLoading, isError } = useGetCompanySettingQuery();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error occurred while fetching company information.</div>;
    }
    // Kiểm tra và xử lý dữ liệu trước khi sử dụng map
    const companyArray = Array.isArray(companys) ? companys : [];
    console.log(companys);
    return (
        <div>
            <h1 className='text-2xl'>Thông tin công ty</h1>
            <p className='w-4/5 text-sm text-gray-600 my-3'>
                Mô tả chi tiết thông tin về công ty của bạn đang làm việc giúp ứng viên nắm được về công ty
            </p>
            {companyArray.map(company => (
                <div>
                    <span className='text-gray-500 text-lg'>Ảnh đại diện</span>
                    <div className='flex justify-between items-center border-b pb-3'>
                        <div className='w-20'>
                            <img src={company.logo} />
                        </div>
                        <Button className='flex items-center'>
                            <AiOutlineUpload /> Thay đổi ảnh
                        </Button>
                    </div>
                    <div key={company.id} className='my-2'>
                        <div className='flex justify-between items-center'>
                            <span className='text-gray-500 text-lg'>Tên công ty</span>
                            <Button className='flex items-center border-none'>
                                <AiFillEdit /> Chỉnh sửa
                            </Button>
                        </div>
                        <div className='flex justify-between items-center border-b pb-3'>
                            <div className='w-32'>
                                <p>{company.company_name}</p>
                            </div>
                        </div>
                        <div className='my-2'>
                            <div className='flex justify-between items-center'>
                                <span className='text-gray-500 text-lg'>Trụ Sở</span>
                                <Button className='flex items-center border-none'>
                                    <AiFillEdit /> Chỉnh sửa
                                </Button>
                            </div>
                            <div className='flex justify-between items-center border-b pb-3'>
                                <div className='w-32'>
                                    <p>{company.office}</p>
                                </div>
                            </div>
                        </div>
                        <div className='my-2'>
                            <div className='flex justify-between items-center'>
                                <span className='text-gray-500 text-lg'>Website</span>
                                <Button className='flex items-center border-none'>
                                    <AiFillEdit /> Chỉnh sửa
                                </Button>
                            </div>
                            <div className='flex justify-between items-center border-b pb-3'>
                                <div className='w-32'>
                                    <p>{company.link_web}</p>
                                </div>
                            </div>
                        </div>
                        <div className='my-2'>
                            <div className='flex justify-between items-center'>
                                <span className='text-gray-500 text-lg'>Số Điện Thoại</span>
                                <Button className='flex items-center border-none'>
                                    <AiFillEdit /> Chỉnh sửa
                                </Button>
                            </div>
                            <div className='flex justify-between items-center border-b pb-3'>
                                <div className='w-32'>
                                    <p>{company.phone_number}</p>
                                </div>
                            </div>
                        </div>
                        <div className='my-2'>
                            <div className='flex justify-between items-center'>
                                <span className='text-gray-500 text-lg'>Mô Tả</span>
                                <Button className='flex items-center border-none'>
                                    <AiFillEdit /> Chỉnh sửa
                                </Button>
                            </div>
                            <div className='flex justify-between items-center border-b pb-3'>
                                <div className='w-32'>
                                    <p>{company.desc}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};


export default CompanySetting