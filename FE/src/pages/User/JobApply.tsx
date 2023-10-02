import { Button } from 'antd'

const JobApply = () => {
    return (
        <div>
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
        </div>
    )
}

export default JobApply