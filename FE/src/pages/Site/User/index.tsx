import React from 'react';
import { Button, Skeleton, Switch } from 'antd';
import { AiOutlineArrowRight } from 'react-icons/ai'
import { Link, Outlet } from 'react-router-dom';

import { useFindJobsMutation, useGetInfoUserQuery } from '../../../api/find-Job/find_jobApi';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { FaCoins } from 'react-icons/fa';
import { useGetInfoUsersQuery } from '../../../api/payment/paymentCandidate';

const LayoutUser = React.memo(() => {
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
    const { data, isLoading } = useGetInfoUserQuery();
    const [findJob] = useFindJobsMutation();
    const listInfo = data?.candidate;
    const listImage = data?.candidate?.image;
    const isCheckFindJob = listInfo?.find_job;
    const { data: dataCoin } = useGetInfoUsersQuery();
    const listCoin = dataCoin?.candidate?.coin;
    const onChange = async (checked: boolean) => {
        if (checked) {
            await findJob().unwrap();
            notyf.success("Bật tìm việc thành công");
        } else {
            findJob().unwrap();
            notyf.success("Tắt tìm việc thành công")
        }
    };
    if (isLoading) return <Skeleton />
    return (
        <div className='flex justify-between mx-auto max-w-screen-xl gap-8'>
            <Outlet />
            <div className='w-1/3'>
                <div className='sticky top-0'>
                    <div className='shadow-sm shadow-blue-300 px-6'>
                        <div className='flex justify-between'>
                            <div className='w-28'>
                                {listImage ? (
                                    <img src={data?.candidate?.image} alt="" className='h-28 w-28 rounded-full' />

                                ) : (
                                    <img src="https://res.cloudinary.com/dxzlnojyv/image/upload/v1700739389/aa_ymumup.jpg" alt="icon" className='rounded-full' />
                                )
                                }
                            </div>
                            <div className='text-lg mt-2'>
                                <p>Chào mừng bạn trở lại</p>
                                <div><p className='text-lg font-semibold'>{listInfo?.name}</p></div>
                                <div><p className='text-sm  flex item-center gap-2 text-black my-1'> <i><FaCoins /></i>: <span className='text-blue-700'>{listCoin} xu</span> </p></div>

                                <p className="mb-0 ">
                                    <Link to="/account" className='text-blue-500'>
                                        Cập nhật hồ sơ thu hút NTD
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className=''>
                            <div className='my-5'>
                                <div className="flex justify-between items-baseline mr-14">
                                    <label className="h-0 w-0">
                                        <Switch defaultChecked={isCheckFindJob}
                                            onClick={onChange} className='bg-gray-400'
                                        />
                                    </label>

                                    <b className="text-gray-600 text-2xl">
                                        Trạng thái tìm việc<span>{isCheckFindJob === 1 ? ' Bật' : ' Tắt'}</span>
                                    </b>
                                </div>

                            </div>
                            <div className='text-red-500 w-96 pl-3'>

                            </div>
                        </div>

                        <Link to={'/user/profile'} className='mb-9'>
                            <Button

                                type='primary'
                                className='bg-blue-500 mt-5 text-white h-12 mb-8'>
                                <b>Cập nhật profile</b>
                            </Button>

                        </Link>
                        <br />
                        <i className='text-yellow-400'>Lưu ý: Bạn cần nhập thông tin và active CV của mình để nhà tuyển dụng có thể liên hệ với bạn</i>
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
});

export default LayoutUser