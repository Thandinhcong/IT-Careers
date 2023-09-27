import { Button } from 'antd';

const ListCV = () => {

    return (
        <div className=''>
            <div className='flex justify-between shadow-sm shadow-blue-300 h-auto py-4'>
                <div className='mt-10 pt-5 w-3/5 ml-10 mr-16'>
                    <b className='text-2xl'>Tạo CV đầu tiên trên IT Careers</b>
                    <p className='text-lg'>
                        Bạn đang muốn tạo ấn tượng tốt với nhà tuyển dụng trước lúc đi phỏng vấn?
                    </p>
                    <p className='text-lg'>Hãy dùng thử mẫu cv đẹp chuyên nghiệp và hiện đại trên IT Careers.</p>
                    <p className='text-lg'>Chúng tôi đồng hành cùng tạo cv toả sáng với nhà tuyển dụng</p>
                    <Button
                        type='primary'
                        className='bg-blue-600 text-white text-lg h-12'
                    >
                        Tạo CV đầu tiên
                    </Button>
                </div>
                <div className='w-52 ml-5'>
                    <img src="https://123job.vn/images/banner/create-first-resume-logo.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default ListCV