import { Link } from 'react-router-dom';
import { ICompanys } from '../../../interfaces';
import React, { useState } from 'react';
import { Pagination } from 'antd';

const ContentCompany = React.memo(({ data }: any) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;

    const filteredJobs = data?.filter((item: any) => {
        return item;
    });
    const displayedJobs = filteredJobs?.slice(startIndex, endIndex);

    return (
        <div className='bg-gray-100'>
            <div className='max-w-screen-xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 py-6'>
                <div className='grid grid-cols-1 gap-7 md:col-span-2'>
                    {displayedJobs?.map((item: ICompanys) => (
                        <Link
                            to={`/company/detail/${item?.id}`}
                            key={item.id}
                            className='bg-white p-6 shadow-md hover:shadow-xl mb-8 md:mb-0'
                        >
                            <div className='flex justify-between gap-4'>
                                <div className='w-1/6'>
                                    {!item?.logo ? (
                                        <img
                                            className='w-full border rounded border-gray-300'
                                            src="https://res.cloudinary.com/dxzlnojyv/image/upload/v1700739389/aa_ymumup.jpg"
                                            alt=""
                                        />
                                    ) : (
                                        <img
                                            className='w-full border rounded border-gray-300'
                                            src={item.logo}
                                            alt=""
                                        />
                                    )}
                                </div>
                                <div className='w-1/2'>
                                    <p className='font-semibold text-lg'>{item.company_name}</p>
                                </div>
                                <div className='grid grid-cols-2 gap-6 mx-4 mt-4'>
                                    <div className='flex-col text-center'>
                                        <p className='py-3 font-semibold text-xl'>{item?.job_post_company}</p>
                                        <p className='text-gray-600'>Việc làm</p>
                                    </div>
                                </div>
                            </div>



                            <div className='grid lg:grid-cols-3 grid-cols-2 gap-8 py-5 mt-4'>
                                <div>
                                    <p className='font-bold'>Địa chỉ</p>
                                    <p className='text-gray-500'>{item.address}</p>
                                </div>
                                <div>
                                    <p className='font-bold'>Quy mô</p>
                                    <p className='text-gray-500'>
                                        {item?.company_size_min} - {item?.company_size_max}
                                    </p>
                                </div>
                                <div>
                                    <p className='font-bold'>Văn phòng</p>
                                    <p className='text-gray-500'>{item?.office}</p>
                                </div>
                                <div className="max-w-full lg:mt-4">
                                    <p className="font-bold">Giới thiệu</p>
                                    <div className="line-clamp-2">
                                        <p className="text-gray-500">{item?.description}</p>
                                    </div>
                                </div>
                            </div>


                        </Link>
                    ))}
                    <div className="pagination-container flex justify-center items-center">
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={filteredJobs?.length}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ContentCompany;
