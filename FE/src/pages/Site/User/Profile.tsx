import { Avatar } from 'antd'
import { useGetInfoUserQuery } from '../../../api/auths';
import React from 'react';


const Profile = React.memo(() => {

    const { data } = useGetInfoUserQuery();
    const listInfo = data?.candidate;
    const listImage = data?.candidate?.image;
    return (
        <div className='h-[1240px]'>
            <div className='shadow-sm shadow-blue-300 h-[450px]'>
                <div className="relative h-[250px]">
                    <div className="relative w-full h-full">
                        <img src="https://123job.vn/images/profile/background_profile.png" alt="" className='w-[832px]' />
                        <div className="absolute bottom-0 left-0 translate-x-[35%] translate-y-[70%]">
                            {listImage ? (
                                <Avatar
                                    size={100}
                                    src={data?.candidate?.image}
                                    className="avatar"
                                />
                            ) : (
                                <img src="https://res.cloudinary.com/dxzlnojyv/image/upload/v1700739389/aa_ymumup.jpg" width={100} alt="icon" className='rounded-full' />
                            )}
                        </div>
                    </div>
                </div>
                <div className='absolute translate-x-[15%] translate-y-[80%]'>
                    <p className='text-2xl  mt-10'>{listInfo?.name}</p>
                </div>
            </div>
            <div>
                <div className='shadow-sm shadow-blue-300 mt-8'>
                    <div className='m-5'>
                        <h1 className='text-2xl text-gray-700'><b></b></h1>
                        <div className='text-center'>
                            <p className='text-gray-500 mt-7'>
                                Cập nhật thông tin cá nhân giúp NTD dễ dàng liên lạc với bạn khi bạn là người được chọn.
                            </p>

                        </div>
                        <div className='flex flex-col gap-2  p-2'>
                            <p >Họ tên</p>
                            <input type="text" value={listInfo?.name} className='border border-blue-500 rounded outline-none px-2 py-1 ' />
                        </div>
                        <div className='flex flex-col gap-2  p-2'>
                            <p >Số điện thoại</p>
                            <input type="text" value={listInfo?.phone} placeholder='Số điện thoại' className='border border-blue-500 rounded outline-none px-2 py-1 ' />
                        </div>
                        <div className='flex flex-col gap-2  p-2'>
                            <p >Email</p>
                            <input type="text" value={listInfo?.email} placeholder='' className='border border-blue-500 rounded outline-none px-2 py-1 ' />
                        </div>

                        <div className='flex flex-col gap-2  p-2'>
                            <p >Địa điểm làm việc
                            </p>
                            <input type="text" placeholder='vd: Hà Nội' className='border border-blue-500 rounded outline-none px-2 py-1 ' />
                        </div>
                        <div className='flex flex-col gap-2  p-2'>
                            <p >Ngành nghề muốn quan tâm</p>
                            <input type="text" placeholder='' className='border border-blue-500 rounded outline-none px-2 py-1 ' />
                        </div>
                        <div className='flex flex-col gap-2  p-2'>
                            <label>Kinh nghiệm ngành nghề</label>
                            <input type="text" placeholder='' className='border border-blue-500 rounded outline-none px-2 py-1 ' />
                        </div>
                        <div className='flex flex-col gap-2  p-2'>
                            <label>Mức lương mong muốn</label>
                            <input type="text" placeholder='' className='border border-blue-500 rounded outline-none px-2 py-1 ' />
                        </div>
                        <div className='flex justify-center mb-2'>

                            <button className='bg-blue-500 px-5 py-2 text-white  rounded '>Lưu</button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
});

export default Profile