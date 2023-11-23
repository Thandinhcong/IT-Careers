import { BsArrowRight, BsCurrencyDollar } from 'react-icons/bs'
import { MdOutlineFavorite, MdOutlineFavoriteBorder, MdRoom } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useGetAllJobsQuery } from '../../../api/jobApi'
import { VND } from '../../../components/upload'
import { Pagination, Skeleton } from 'antd'
import React, { useState } from 'react'
import { useAddSaveJobsMutation, useUnsaveJobMutation } from '../../../api/savejobpostapi'
import { useGetInfoUserQuery } from '../../../api/auths'
import { Notyf } from 'notyf'
const Recruitment = React.memo(() => {
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
    const { data, isLoading } = useGetAllJobsQuery();
    const listJobs = data?.job_list;


    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    // Tính toán chỉ mục bắt đầu và kết thúc của danh sách công việc hiển thị trên trang hiện tại
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    // Lọc và phân trang danh sách công việc
    const filteredJobs = listJobs?.filter((item) => {
        return (item.status !== 0 && item.status !== 2) || (new Date() <= new Date(item?.end_date));
    });
    const displayedJobs = filteredJobs?.slice(startIndex, endIndex);
    const [savedJobs, setSavedJobs] = useState<any>({});
    //lưu việc làm
    const { data: infoUser } = useGetInfoUserQuery();
    const user = infoUser?.candidate;
    const idUser: any = user?.id;
    const [saveJob] = useAddSaveJobsMutation();
    const [cancelSaveJob] = useUnsaveJobMutation();
    const handleSaveJob = async (id: any) => {
        try {
            await saveJob({
                idUser,
                id,
            }).unwrap();
            setSavedJobs((prevSavedJobs: any) => ({ ...prevSavedJobs, [id]: true }));
            notyf.success("Lưu việc làm thành công!")

        } catch (error: any) {
            notyf.error(error?.data?.error)
        }
    }
    //hủy lưu
    const handleCancelSaveJob = async (id: any) => {
        try {
            await cancelSaveJob({
                idUser,
                id
            }).unwrap();
            notyf.success("Hủy Lưu việc làm thành công!")
            setSavedJobs((prevSavedJobs: any) => ({ ...prevSavedJobs, [id]: false }));

        } catch (error: any) {
            notyf.error(error?.data?.error);
        }
    }

    if (isLoading) return <Skeleton />
    return (
        <div>
            <div className='mb-10   lg:p-1 mt-2'>
                <div className='flex justify-between'>
                    <h2 className='font-bold md:text-2xl'>
                        Tuyển dụng, việc làm
                        <span className='text-blue-500'> tốt nhất</span>
                    </h2>
                    <Link to="/jobs" className='flex items-center gap-2  hover:text-blue-500'>Xem tất cả  <BsArrowRight /></Link>
                </div>
                <div className='my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 '>
                    {displayedJobs?.map((item: any) => {
                        const isJobSaved = savedJobs[item?.id] || false;
                        return (
                            <div key={item?.id}>
                                <div className='shadow-lg p-2 rounded'>
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
                                    <div className='flex justify-between items-center mb-2'>
                                        <p className='flex items-center gap-1'> <BsCurrencyDollar /><span>{VND.format(item?.min_salary)} - {VND.format(item?.max_salary)}</span></p>
                                        <button
                                            key={item?.id}
                                            onClick={() => isJobSaved ? handleCancelSaveJob(item?.id) : handleSaveJob(item?.id)}
                                        >
                                            {isJobSaved ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );

                    })}

                </div>
                {/* Hiển thị Pagination */}
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
    )
});

export default Recruitment


