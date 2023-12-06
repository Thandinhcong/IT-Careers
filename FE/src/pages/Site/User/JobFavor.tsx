import { Pagination, Skeleton } from 'antd'
import { AiFillHeart } from 'react-icons/ai'
import { MdRoom } from 'react-icons/md'
import { useGetAllSaveJobsQuery, useUnsaveJobMutation } from '../../../api/savejobpostapi'
import { Link } from 'react-router-dom'
import { BsCurrencyDollar } from 'react-icons/bs'
import { VND } from '../../../components/upload'
import React, { useState } from 'react'
import { Notyf } from 'notyf'
import { useGetInfoUserQuery } from '../../../api/auths'

const JobFavor = React.memo(() => {
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
    const { data, isLoading } = useGetAllSaveJobsQuery();
    const listsaveJobs = data?.data;


    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    // Lọc và phân trang danh sách công việc
    const filteredJobs = listsaveJobs?.filter((item: any) => {
        return (item.status !== 0 && item.status !== 2) || (new Date() <= new Date(item?.end_date));
    });
    const displayedJobs = filteredJobs?.slice(startIndex, endIndex);

    const { data: infoUser } = useGetInfoUserQuery();
    const user = infoUser?.candidate;
    const idUser: number = user?.id;

    const [cancelSaveJob] = useUnsaveJobMutation();
    const handleCancelSaveJob = async (id: number) => {
        try {
            await cancelSaveJob({
                idUser,
                id
            }).unwrap();
            notyf.success("Hủy Lưu việc làm thành công!")

        } catch (error: any) {
            notyf.error(error?.data?.error);
        }
    }
    if (isLoading) return <Skeleton />

    return (
        <div>
            <h1 className='mb-5 ml-6 text-2xl font-bold'>Việc làm đã lưu</h1>
            {displayedJobs && displayedJobs?.length ? (
                <div>
                    <div className='   w-[800px] h-auto grid gap-5'>
                        {displayedJobs?.map((item: any) => {

                            return (
                                <div key={item?.id}>
                                    <div className='border p-3 rounded  '>
                                        <Link to={`/job-detail/${item?.title}/${item?.id}`} key={item?.id}>
                                            <div className='flex gap-2'>
                                                <img src={item?.logo} className='border rounded-md p-2' width={70} />
                                                <div>
                                                    <Link to="/">
                                                        <p className='text-slate-500 font-semibold text-lg'>{item?.title}</p>
                                                    </Link>
                                                    <p className='text-lg'>{item?.company_name}</p>
                                                </div>
                                            </div>
                                            <p className='flex items-center gap-1 my-2'> <MdRoom /> <span>{item?.province} - {item?.district}</span> </p>
                                        </Link>
                                        <div className='flex justify-between items-center mb-3'>
                                            <p className='flex items-center gap-1'> <BsCurrencyDollar /><span>{VND.format(item?.min_salary)} - {VND.format(item?.max_salary)}</span></p>
                                            <button
                                                onClick={() => handleCancelSaveJob(item?.id)}
                                                className={'border p-1 text-red-500'}>
                                                <AiFillHeart />
                                            </button>
                                        </div>
                                        <Link to={`/job-detail/${item?.title}/${item?.id}`} className='px-2 py-2 bg-blue-500 text-white rounded-md'>Xem chi tiết</Link>
                                    </div>
                                </div>
                            );

                        })}

                    </div>
                    {/* Hiển thị Pagination */}
                    <div className="pagination-container flex justify-center items-center mt-4">
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={filteredJobs?.length}
                            onChange={handlePageChange}
                        />
                    </div>

                </div>
            ) : (
                <div className='mx-5'>
                    <p className='text-blue-500 text-2xl mb-10 text-center'>
                        Bạn chưa lưu công việc nào!
                    </p>
                    <Link to='/recruit' className='border px-5 py-2 bg-blue-500 text-white rounded' >Tìm việc ngay</Link>
                </div>
            )}
        </div>
    )
});

export default JobFavor