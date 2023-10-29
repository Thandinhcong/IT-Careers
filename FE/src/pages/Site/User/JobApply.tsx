import { Button } from 'antd'
import { useGetJobApplyQuery } from '../../../api/jobPostApply'

const JobApply = () => {
    const { data } = useGetJobApplyQuery();
    const listJob = data?.job_list;


    return (
        <div>
            {listJob ? (
                <div>
                    <h2 className='text-2xl font-semibold'>Việc làm đã ứng tuyển</h2>
                    {listJob?.map((item: any) => {
                        return (
                            <div key={item?.id} className='mt-5 flex gap-5 border mb-5 w-full  shadow-sm shadow-blue-300 h-auto py-4 px-5 '>
                                <img src={item?.logo} alt="Anh logo" />
                                <div>
                                    <p>{item?.title}</p>
                                    <p>{item?.company_name}</p>
                                    <p>{item?.district}</p>
                                    <p>Ứng tuyển: {item?.time_apply}</p>
                                </div>
                            </div>)

                    })}

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
}

export default JobApply