import { Link } from 'react-router-dom'
import { ICompanys } from '../../../interfaces';
import React from 'react';
const ContentCompany = React.memo(({ data }: any) => {

    return (
        <div className='bg-gray-100'>
            <div className='max-w-screen-xl mx-auto px-8 grid grid-cols-3 gap-8 py-6'>
                <div className='grid grid-cols-1 gap-7 col-span-2'>
                    {data?.map((item: ICompanys) => {

                        return <Link to={`/company/detail/${item.id}`} key={item.id} className='bg-white p-6 shadow-md hover:shadow-xl h-[320px]'>
                            <div className='flex justify-between gap-8'>
                                <div className='flex justify-normal gap-4'>
                                    <div className='w-1/6'>
                                        {!item?.logo ? (
                                            <img className='w-full border rounded border-gray-300' src="https://res.cloudinary.com/dxzlnojyv/image/upload/v1700739389/aa_ymumup.jpg" alt="" />
                                        ) : (
                                            <img className='w-full border rounded border-gray-300' src={item.logo} alt="" />
                                        )}
                                    </div>
                                    <div className='w-1/2'><p className='font-semibold text-lg'>{item.company_name}</p></div>
                                </div>
                                <div className='grid grid-cols-2 gap-6 mx-4'>

                                    <div className='flex-col text-center'>
                                        <p className='py-3 font-semibold text-xl'>787</p>
                                        <p className='text-gray-600'>Việc làm</p>
                                    </div>
                                </div>
                            </div>

                            <div className='grid grid-cols-3 gap-8 py-5'>
                                <div>
                                    <p className='font-bold'>Địa chỉ</p>
                                    <p className='text-gray-500'>{item.address}</p>
                                </div>
                                <div>
                                    <p className='font-bold'>Quy mô</p>
                                    <p className='text-gray-500'>{item?.company_size_min} - {item?.company_size_max
                                    }</p>
                                </div>
                                <div>
                                    <p className='font-bold'>Văn phòng</p>
                                    <p className='text-gray-500'>{item?.office}</p>
                                </div>

                            </div>
                            <div className="max-w-full">
                                <p className="font-bold">Giới thiệu</p>
                                <div className="line-clamp-2">
                                    <p className="text-gray-500">
                                        {item?.description}
                                    </p>
                                </div>
                            </div>
                        </Link>

                    }
                    )}
                </div>

            </div>
        </div>
    )
})

export default ContentCompany