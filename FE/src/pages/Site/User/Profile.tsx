import { Avatar } from 'antd'
import { useGetInfoUserQuery } from '../../../api/auths';
import React, { useState } from 'react';
import { useGetDataFindJobQuery, useSaveInfoFindJobMutation } from '../../../api/find-Job/find_jobApi';
import { useForm } from 'react-hook-form';
import { useGetExperienceQuery, useGetMajorQuery } from '../../../api/manageWebsiteApi/manageWebApi';



const Profile = React.memo(() => {
    const [filterProvince, setFilterProvince] = useState('');
    const [filterDistrict, setFilterDistrict] = useState('');

    const { data } = useGetInfoUserQuery();
    const listInfo = data?.candidate;
    const idUser = listInfo?.id;
    const listImage = data?.candidate?.image;
    const [SaveInfoFindJob] = useSaveInfoFindJobMutation();
    const { data: DataMajor } = useGetMajorQuery();
    const listMajor = DataMajor?.major;
    // exp
    const { data: Exp } = useGetExperienceQuery();
    const listExp = Exp?.data;
    //districs

    const { data: dataFindJob } = useGetDataFindJobQuery();
    const province = dataFindJob?.data?.province;
    const district = dataFindJob?.data?.district;
    console.log("dataFindJob", district);

    const { register, handleSubmit, formState } = useForm();
    const onHandleSubmit = async (data: any) => {
        try {
            const results = await SaveInfoFindJob({
                idUser,
                ...data
            }).unwrap();
            console.log("Thêm thành công", results);

        } catch (error) {
            console.log(error);

        }
    }

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
                            <input type="text" disabled value={listInfo?.phone} placeholder='Số điện thoại' className='border border-blue-500 rounded outline-none px-2 py-1 ' />
                        </div>
                        <div className='flex flex-col gap-2  p-2'>
                            <p >Email</p>
                            <input type="text" disabled value={listInfo?.email} placeholder='' className='border border-blue-500 rounded outline-none px-2 py-1 ' />
                        </div>
                        <form onSubmit={handleSubmit(onHandleSubmit)}>
                            <div className='flex flex-col gap-2  p-2'>
                                <p >Địa điểm làm việc</p>
                                <select
                                    {...register('province_id')}
                                    className='border border-blue-500 rounded outline-none px-2 py-1 '
                                >
                                    <option value="">Tỉnh/Thành phố</option>
                                    {province?.map((item: any) => {
                                        return (
                                            <option key={item?.id} value={item?.id}>{item?.province}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='flex flex-col gap-2  p-2'>
                                <p >Địa điểm làm việc</p>
                                <select
                                    {...register('province_id')}
                                    className='border border-blue-500 rounded outline-none px-2 py-1 '
                                >
                                    <option value="">Quận/ Huyện</option>
                                    {district?.map((item: any) => {
                                        return (
                                            <option key={item?.id} value={item?.id}>{item?.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='flex flex-col gap-2  p-2'>
                                <p >Ngành nghề muốn quan tâm</p>
                                <select
                                    {...register('major_id')}
                                    className='border border-blue-500 rounded outline-none px-2 py-1 '
                                >
                                    <option value="">Vui lòng chọn</option>
                                    {listMajor?.map((item: any) => {
                                        return (
                                            <option key={item?.id} value={item?.id}>{item?.major}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='flex flex-col gap-2  p-2'>
                                <label>Kinh nghiệm ngành nghề</label>
                                <select
                                    {...register('experience_id')}
                                    className='border border-blue-500 rounded outline-none px-2 py-1 '
                                >
                                    <option>Vui lòng chọn</option>
                                    {listExp?.map((item: any) => {
                                        return (
                                            <option key={item?.id} value={item?.id}>{item?.experience}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='flex flex-col gap-2  p-2'>
                                <label>Mức lương mong muốn</label>
                                <input type="text" placeholder='20000000' {...register('desired_salary')} className='border border-blue-500 rounded outline-none px-2 py-1 ' />
                            </div>
                            <div className='flex justify-center mb-2'>
                                <button className='bg-blue-500 px-5 py-2 text-white  rounded '>Lưu</button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        </div>
    )
});

export default Profile