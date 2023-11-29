import { Button, Skeleton } from 'antd';
import { AiFillEdit } from 'react-icons/ai';
import { useGetInforQuery } from '../../../api/CompanyInfoApi';


const ContactCompanySetting = () => {
    const { data, isLoading } = useGetInforQuery();
    const listInfo = data?.company;
    if (isLoading) return <Skeleton />

    return (
        <div>
            <h1 className='text-2xl'>Thông tin liên hệ</h1>
            <p className='w-4/5 text-sm text-gray-600 my-3'>Thông tin giúp ứng viên liên hệ với bạn khi ứng tuyển</p>
            <div className='my-2'>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-500 text-lg'>Tên công ty</span>
                    <Button
                        href='/business/business_setting/company'
                        className='flex items-center border-none'
                    > <AiFillEdit /> Chỉnh sửa
                    </Button>
                </div>
                <div className='flex justify-between items-center border-b pb-3'>
                    <div className='w-32'>
                        <p>{listInfo?.company_name}</p>
                    </div>

                </div>
            </div>
            <div className='my-2'>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-500 text-lg'>Email</span>
                    <Button
                        href='/business/business_setting/company'
                        className='flex items-center border-none'
                    > <AiFillEdit /> Chỉnh sửa
                    </Button>
                </div>
                <div className='flex justify-between items-center border-b pb-3'>
                    <div className='w-32'>
                        <p>{listInfo?.email}</p>
                    </div>

                </div>
            </div>
            <div className='my-2'>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-500 text-lg'>Điện thoại</span>
                    <Button
                        href='/business/business_setting/company'
                        className='flex items-center border-none'
                    > <AiFillEdit /> Chỉnh sửa
                    </Button>
                </div>
                <div className='flex justify-between items-center border-b pb-3'>
                    <div className='w-32'>
                        <p>{listInfo?.phone}</p>
                    </div>

                </div>
            </div>
            <div className='my-2'>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-500 text-lg'>Người đại diện</span>
                    <Button
                        href='/business/business_setting/company'
                        className='flex items-center border-none'
                    > <AiFillEdit /> Chỉnh sửa
                    </Button>
                </div>
                <div className='flex justify-between items-center border-b pb-3'>
                    <div className='w-32'>
                        <p>{listInfo?.name}</p>
                    </div>

                </div>
            </div>
            <div className='my-2'>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-500 text-lg'>Ngày thành lập</span>
                    <Button
                        href='/business/business_setting/company'
                        className='flex items-center border-none'
                    > <AiFillEdit /> Chỉnh sửa
                    </Button>
                </div>
                <div className='flex justify-between items-center border-b pb-3'>
                    <div className='w-32'>
                        <p>{listInfo?.founded_in}</p>
                    </div>

                </div>
            </div>
            <div className='my-2'>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-500 text-lg'>Quy mô nhân viên</span>
                    <Button
                        href='/business/business_setting/company'
                        className='flex items-center border-none'
                    > <AiFillEdit /> Chỉnh sửa
                    </Button>
                </div>
                <div className='flex justify-between items-center border-b pb-3'>
                    <div className='w-32'>
                        <p>{listInfo?.company_size_min
                        } - {listInfo?.company_size_max
                            }</p>
                    </div>

                </div>

            </div>
            <div className='my-2'>
                <div className='flex justify-between items-center'>
                    <span className='text-gray-500 text-lg'>Giới thiệu</span>
                    <Button
                        href='/business/business_setting/company'
                        className='flex items-center border-none'
                    > <AiFillEdit /> Chỉnh sửa
                    </Button>
                </div>
                <div className='flex justify-between items-center border-b pb-3'>
                    <div className=''>
                        <p>{listInfo?.description}</p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ContactCompanySetting