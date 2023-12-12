import { Avatar, Col, InputNumber } from 'antd'
import { useGetInfoUserQuery } from '../../../api/auths';
import React, { useEffect, useState } from 'react';
import { useGetDataFindJobQuery, useGetInfoFindJobQuery, useSaveInfoFindJobMutation } from '../../../api/find-Job/find_jobApi';
import { useGetExperienceQuery } from '../../../api/manageWebsiteApi/manageWebApi';
import { Notyf } from 'notyf';
import { Button, Select, Form, Input } from 'antd';

const Profile = React.memo(() => {

    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
    const { data } = useGetInfoUserQuery();
    const [selectedProvinceId, setSelectedProvincetId] = useState<string | number | null>(null);
    const handleSelectProvinceId = (rovinceId: number | string) => {
        setSelectedProvincetId(rovinceId);
    }
    const listInfo = data?.candidate;
    const listImage = data?.candidate?.image;
    const [SaveInfoFindJob] = useSaveInfoFindJobMutation();
    // exp
    const { data: Exp } = useGetExperienceQuery();
    const listExp = Exp?.data;
    const [form] = Form.useForm();
    //districs
    const { data: dataFindJob } = useGetDataFindJobQuery();
    const province = dataFindJob?.data?.province;
    const districts = dataFindJob?.data?.district;
    const { data: info } = useGetInfoFindJobQuery();
    const infoFindJob = info?.info_find_job?.info_find_job;

    useEffect(() => {
        form.setFieldsValue({
            major: infoFindJob?.major,
            desired_salary: infoFindJob?.desired_salary,
            experience_id: infoFindJob?.experience,
            district_id: infoFindJob?.work_location
        })
    }, [form, infoFindJob])

    const onFinish = (values: any) => {
        const results = SaveInfoFindJob(values).unwrap();
        console.log("results", results);
        notyf.success("Cập nhật thành công")
    };

    const onFinishFailed = () => {
        notyf.error("Cập nhật thất bại")
    };

    type FieldType = {
        experience_id?: string;
        major?: string;
        desired_salary?: string;
        district_id?: string;
    };

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
                        <div className='flex flex-col gap-2  '>
                            <p >Họ tên</p>
                            <input type="text" value={listInfo?.name} className='border rounded-lg outline-none px-2 py-1 ' />
                        </div>
                        <div className='flex flex-col gap-2  '>
                            <p >Số điện thoại</p>
                            <input type="text" disabled value={listInfo?.phone} placeholder='Số điện thoại' className='border rounded-lg outline-none px-2 py-1 ' />
                        </div>
                        <div className='flex flex-col gap-2  '>
                            <p >Email</p>
                            <input type="text" disabled value={listInfo?.email} placeholder='' className='border rounded-lg outline-none px-2 py-1 ' />
                        </div>
                        <Form
                            form={form}
                            name="basic"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>

                                label="Ngành nghề muốn quan tâm"
                                name="major"
                                rules={[{ required: true, message: 'Vui lòng nhập ngành nghề muốn tìm việc!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<FieldType>
                                label="Mức lương"
                                name="desired_salary"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mức lương!' },
                                    // { min: 5, message: "Tối thiểu 5 số" },

                                ]}
                            >
                                <InputNumber className='w-full' min={1} />
                            </Form.Item>
                            <Col >
                                <Form.Item<any>
                                    label="Tỉnh/Thành phố"
                                    rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố" }]}
                                >
                                    <Select placeholder="--Chọn--" style={{ width: '100%' }} onChange={handleSelectProvinceId}>
                                        {province?.map((options: any) => (
                                            <Select.Option key={options.id} rovinceId={options.id}>
                                                {options.province}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            {/* Quận/Huyện*/}
                            <Col >
                                <Form.Item<any>
                                    label="Quận/Huyện"
                                    name="district_id"
                                    rules={[{ required: true, message: "Vui lòng chọn địa chỉ làm việc" }]}
                                >
                                    <Select placeholder="--Chọn--" style={{ width: '100%' }} >
                                        {districts?.filter((options: {
                                            province_id: string | number | null; id: string | number;
                                        }) => options.province_id == selectedProvinceId)
                                            .map((options: any) => (
                                                <Select.Option key={options.id} value={options.id}>
                                                    {options.name}
                                                </Select.Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                            </Col>

                            <Col >
                                <Form.Item<any>
                                    label="Số năm kinh nghiệm"
                                    name="experience_id"
                                >
                                    <Select placeholder="--Chọn--" style={{ width: '100%' }} >
                                        {
                                            listExp?.map((options: any) => {
                                                return <Select.Option key={options.id} value={options.id}>
                                                    {options?.experience}
                                                </Select.Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" className='bg-blue-500 mb-10 mx-auto' htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>


            </div >
        </div >
    )
});

export default Profile