import React from 'react'
import { BsArrowRight, BsCurrencyDollar } from 'react-icons/bs'
import { MdFavoriteBorder, MdRoom } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useGetAllJobsQuery } from '../../../api/jobApi'
import { IJobPost, IListJobs } from '../../../interfaces'

const Recruitment = () => {
    const { data } = useGetAllJobsQuery();
    const listJobs = data?.major;
    console.log(listJobs);

    return (
        <div>
            <div className='mb-10   lg:p-1'>
                <div className='flex justify-between'>
                    <h2 className='font-bold md:text-2xl'>
                        Tuyển dụng, việc làm
                        <span className='text-blue-500'> tốt nhất</span>
                    </h2>
                    <Link to="" className='flex items-center gap-2  hover:text-blue-500'>Xem tất cả  <BsArrowRight /></Link>
                </div>
                <div className='my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 '>
                    {listJobs?.map((item: IJobPost) => {
                        if (item.status === 0 || item.status === 2) {
                            return null;
                        } else {
                            return (
                                <Link to={`job-detail/${item?.id}`} className='shadow-lg p-2' key={item?.id}>
                                    <div className='flex gap-2'>
                                        <img src={item?.logo} className='border rounded-md p-2' width={70} />
                                        <div>
                                            <Link to="/">
                                                <p className='text-slate-500 font-semibold text-base'>{item?.title}</p>
                                            </Link>
                                            <p>{item?.company_id}</p>
                                        </div>
                                    </div>
                                    <p className='flex items-center gap-1 my-2'> <MdRoom /> <span></span> </p>
                                    <div className='flex justify-between items-center mb-2'>
                                        <p className='flex items-center gap-1'> <BsCurrencyDollar /><span>{item.min_salary} - {item.max_salary}</span></p>
                                        <i className='border p-1'><MdFavoriteBorder /></i>
                                    </div>
                                </Link>
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default Recruitment