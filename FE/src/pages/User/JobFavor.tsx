import { Button } from 'antd'

const JobFavor = () => {
    return (
        <div>
            <div className='flex justify-between shadow-sm shadow-blue-300 h-auto py-4'>
                <div className='mb-5 w-5/6 ml-10'>
                    <b className='text-2xl'>Bạn chưa lưu việc làm nào!</b>
                    <p className='text-lg'>Bạn muốn có việc làm phù hợp với năng lực bản thân?</p>
                    <p className='text-lg'>Hãy tạo ngay CV trên IT Careers, chúng tôi sẽ gợi ý cho bạn những việc làm phù hợp nhất.</p>
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

export default JobFavor