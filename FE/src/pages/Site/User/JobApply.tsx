import { Button, Pagination, Skeleton } from 'antd'
import { useGetJobApplyQuery } from '../../../api/jobPostApply'
import { CiLocationOn, CiTimer } from 'react-icons/ci';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { VND } from '../../../components/upload';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TbStatusChange } from 'react-icons/tb';

const JobApply = React.memo(() => {
    const { data, isLoading } = useGetJobApplyQuery();
    const listJob = data?.job_list;
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;

    const filteredJobs = listJob?.filter((item: any) => {
        return item
    });
    const displayedJobs = filteredJobs?.slice(startIndex, endIndex);
    if (isLoading) return <Skeleton />

    return (
        <div>
            {listJob ? (
                <div className='w-[800px] rounded'>
                    <h2 className='text-2xl font-semibold'>Việc làm đã ứng tuyển</h2>
                    {displayedJobs?.map((item: any) => {
                        return (
                            <div key={item?.id} className='mt-5 grid grid-cols-[30%,70%] items-center gap-5 border mb-5 w-full  shadow-sm shadow-blue-300 h-auto py-4 px-5 '>
                                <img src={item?.logo} alt="Anh logo" width={210} />
                                <div>
                                    <Link to={`/job-detail/${item?.title}/${item?.id}`} className='text-xl font-semibold'>{item?.title}</Link>
                                    <div className='flex gap-2 items-center text-lg'> {item?.company_name}</div>
                                    <p className='flex gap-2 items-center my-1'> <i><i><CiLocationOn /> </i></i>{item?.province} -  {item?.district}</p>
                                    <p className='flex items-center gap-2'><i><MdOutlineAttachMoney /></i> {VND.format(item?.min_salary)} - {VND.format(item?.max_salary
                                    )} </p>
                                    <p className='flex items-center gap-2 mt-1'> <i><CiTimer /> </i> Ứng tuyển: {item?.time_apply}</p>
                                    <p className='flex items-center gap-2 mt-1'> <i><TbStatusChange /> </i> Trạng thái: {item?.status === 1 ? <div className='text-blue-500'>Đã xem</div> : <div className='text-red-500'>Chưa xem</div>}</p>
                                </div>
                            </div>)
                    })}
                    <div className="pagination-container flex justify-center items-center">
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={filteredJobs?.length}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
            ) : (
                <div className='flex justify-between ml-6 shadow-sm shadow-blue-300 h-auto py-4'>
                    <div className='mb-5 w-5/6 ml-5'>
                        <b className='text-2xl'>Bạn chưa ứng tuyển việc làm nào!</b>
                        <p className='text-lg'>Bạn đang tìm kiếm một việc làm phù hợp với khả năng</p>
                        <p className='text-lg'>IT Careers cung cấp cho bạn rất nhiều việc làm chất lượng từ hơn 8000 Nhà tuyển dụng uy tín.</p>
                        <Button
                            type='primary'
                            className='bg-blue-600 text-white text-lg top-4 h-12'
                        >
                            Tìm việc ngay
                        </Button>
                    </div>
                    <div className='w-52 ml-5'>
                        <img src="https://123job.vn/images/banner/create-first-resume-logo.png" alt="" />
                    </div>
                </div>
            )}
        </div>
    )
});

export default JobApply