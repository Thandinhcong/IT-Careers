import { useState } from 'react';
import { Button, Switch } from 'antd';
import { AiOutlineArrowRight, AiOutlineWarning } from 'react-icons/ai'
import { Outlet } from 'react-router-dom';
import { useGetInfoUserQuery } from '../../../api/auths';
import { useFindJobsMutation } from '../../../api/find-Job/find_jobApi';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const LayoutUser = () => {
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
    const [findJob] = useFindJobsMutation();
    const [isSearchingJob, setIsSearchingJob] = useState(false);

    const onChange = (checked: boolean) => {
        setIsSearchingJob(checked);
        if (checked) {
            findJob();
            notyf.success("Bật tìm việc thành công");
        } else {
            notyf.success("Tắt tìm việc thành công")
        }
    };


    const { data } = useGetInfoUserQuery();
    const listInfo = data?.candidate;

    return (
        <div className='flex justify-between mx-auto max-w-screen-xl gap-8'>
            <Outlet />
            <div className='w-1/3'>
                <div className='sticky top-0'>
                    <div className='shadow-sm shadow-blue-300 px-4'>
                        <div className='flex justify-between'>
                            <div className='w-28'>
                                <img src="https://123job.vn/images/no_user.png" alt="" className='rounded-full' />
                            </div>
                            <div className='text-lg mt-2'>
                                <p>Chào mừng bạn trở lại</p>
                                <div><p className='text-lg font-semibold'>{listInfo?.name}</p></div>
                                <p className="mb-0 ">
                                    <a href="#" className='text-blue-500'>
                                        Cập nhật hồ sơ thu hút NTD
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className=''>
                            <div className='my-5'>
                                <div className="flex justify-between items-baseline mr-14">
                                    <label className="h-0 w-0">
                                        <Switch defaultChecked={isSearchingJob}
                                            onClick={onChange} className='bg-gray-400' />
                                    </label>

                                    <b className="text-gray-600 text-2xl">
                                        Trạng thái tìm việc<span>{isSearchingJob ? ' Bật' : ' Tắt'}</span>
                                    </b>
                                </div>
                                <div>
                                    <p className='w-96 text-gray-600 pr-5 '>
                                        Chế độ Tìm việc sẽ tự tắt sau 2 tuần. Nếu sau 2 tuần bạn chưa nhận được cơ hội việc làm hãy bật lại
                                    </p>
                                </div>
                            </div>
                            <div className='mb-5'>
                                <div className="flex justify-between items-baseline">
                                    <label className="h-0 w-0">
                                        <Switch defaultChecked className='bg-gray-400' />
                                        {/* <span className="slider round"></span> */}
                                    </label>

                                    <b className="text-gray-600 text-2xl w-4/5">Cho phép NTD liên hệ qua bạn</b>
                                </div>
                                <div>
                                    <p className='text-gray-600 pl-3'>
                                        Cho phép các Nhà tuyển dụng đã được 123Job xác thực xem CV hoặc hồ sở Online để có thể liên hệ với bạn
                                    </p>
                                </div>
                            </div>
                            <div className='text-red-500 w-96 pl-3'>
                                <p className='text-xm'><AiOutlineWarning className='w-7 inline-block items-baseline' />Bạn cần hoàn thiện trên 70% IT Career Profile để bắt đầu tiếp cận với nhà tuyển dụng.</p>
                            </div>
                        </div>
                        <div className='mb-9'>
                            <Button
                                type='primary'
                                className='bg-blue-500 mt-5 text-white h-12 mb-8'>
                                <b>Cập nhật profile</b>
                            </Button>
                        </div>
                    </div>
                    <div className='shadow-sm shadow-blue-300 p-8'>
                        <span className='text-2xl text-blue-500'>CV của bạn đã hay chưa ?</span>
                        <p className='text-gray-400 texl-lg'>Bao nhiêu NTD đang quan tâm Hồ sơ của bạn</p>
                        <div className='grid grid-cols-3 my-4'>
                            <div className=' col-span-1 max-w-[96px] max-h-24 h-full bg-blue-500 border rounded-full text-center pt-5'>
                                <div className='text-white'>
                                    <p>0</p>
                                    <p>Lượt</p>
                                </div>
                            </div>
                            <div>
                                <p className='w-60'>Mỗi lượt Nhà tuyển dụng xem CV mang đến một cơ hội để bạn gần hơn với việc làm phù hợp.</p>
                                <Button
                                    type='primary'
                                    className=' mt-3 bg-blue-500 border rounded-full h-12 ml-10'
                                >
                                    Khám phá ngay<AiOutlineArrowRight className='inline-block items-center' />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutUser