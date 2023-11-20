import { Button, Pagination, Skeleton } from 'antd'
import { AiFillHeart } from 'react-icons/ai'
import { MdRoom } from 'react-icons/md'
import { useGetAllSaveJobsQuery } from '../../../api/savejobpostapi'
import { Link } from 'react-router-dom'
import { BsCurrencyDollar } from 'react-icons/bs'
import { VND } from '../../../components/upload'
import { useState } from 'react'

const JobFavor = () => {

    const { data, isLoading } = useGetAllSaveJobsQuery();
    const listsaveJobs = data?.listsave
    console.log(listsaveJobs);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12; // Số mục hiển thị trên mỗi trang
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    // Tính toán chỉ mục bắt đầu và kết thúc của danh sách công việc hiển thị trên trang hiện tại
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    // Lọc và phân trang danh sách công việc
    const filteredJobs = listsaveJobs?.filter((item) => {
        return (item.status !== 0 && item.status !== 2) || (new Date() <= new Date(item?.end_date));
    });
    const displayedJobs = filteredJobs?.slice(startIndex, endIndex);

    if (isLoading) return <Skeleton />

    return (
        <div>
            <h1 className='mb-5 w-5/6 ml-6 text-2xl font-bold'>Việc làm đã lưu</h1>
            <div className='flex justify-between shadow-sm shadow-blue-300 h-auto py-4 ml-5'>
                {displayedJobs?.map((item: any) => {
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
                                    <Button className={'border p-1 text-red-500'}>
                                        <AiFillHeart />
                                    </Button>
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
    )
}

export default JobFavor