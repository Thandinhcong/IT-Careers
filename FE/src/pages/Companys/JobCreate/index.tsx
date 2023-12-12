import { Button, Col, DatePicker, Form, Input, Row, Select, Spin, message, } from 'antd';
import { IJobPost } from '../../../interfaces';
import { AiOutlineLoading3Quarters, AiOutlineSend } from 'react-icons/ai';
import { RuleObject } from 'antd/lib/form';
import moment, { Moment } from 'moment';
import { useAddJobPostMutation, useGetInforQuery, useGetJobPostSelectByIdQuery } from '../../../api/companies/jobPostCompany';
import React, { useEffect, useState } from 'react';
import DescPackage from './DescPackage';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './style.css';

const JobCreate = React.memo(() => {
    const { data } = useGetJobPostSelectByIdQuery();
    const { data: Infor, isLoading } = useGetInforQuery();
    const [form] = Form.useForm();
    const [jobPost, { isLoading: isCreatePost }] = useAddJobPostMutation();
    const [selectedProvinceId, setSelectedProvincetId] = useState<string | number | null>(null); //lưu id Tỉnh Thành phố

    useEffect(() => {
        form.setFieldsValue({
            name: Infor?.company?.name,
            phone: Infor?.company?.phone,
            address: Infor?.company?.address,
            email: Infor?.company?.email,
            id: Infor?.company?.id,
        });
    }, [Infor]);

    const handleSelectProvinceId = (rovinceId: number | string) => {
        setSelectedProvincetId(rovinceId);
    }

    const onFinish = (values: IJobPost | any) => {
        if (values.start_date !== undefined && values.end_date !== undefined) {
            const startDate = values.start_date.toDate();
            const endDate = values.end_date.toDate();

            // Định dạng ngày thành chuỗi "YYYY-MM-DD"
            values.start_date = moment(startDate).format('YYYY-MM-DD');
            values.end_date = moment(endDate).format('YYYY-MM-DD');
        }

        if (values.min_salary !== undefined) {
            values.min_salary = parseFloat(values.min_salary);
        }

        if (values.max_salary !== undefined) {
            values.max_salary = parseFloat(values.max_salary);
        }

        if (!isNaN(values.min_salary) && !isNaN(values.max_salary)) {
            // Kiểm tra nếu giá trị min_salary và max_salary là số và thực hiện so sánh
            if (values.min_salary >= values.max_salary || values.min_salary === values.max_salary) {
                message.error('Mức lương tối đa phải lớn hơn mức lương tối thiểu');
                return; // Dừng việc đăng bài nếu kiểm tra không thành công
            }
        }
        jobPost(values)

            .unwrap()
            .then(() => {
                message.success('Đăng bài thành công');
                window.location.href = '/business/jobs-manage';
            })
            .catch((error) => {
                message.error(error?.data?.errors);
            });
    };

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    // Hàm kiểm tra ngày bắt đầu 
    const validateStartDate = (_rule: RuleObject, value: Moment, callback: (message?: string) => void) => {
        if (value) {
            const currentDate = moment();
            if (value.isBefore(currentDate, 'day')) {
                callback('Ngày bắt đầu phải sau hoặc cùng ngày hiện tại');
            } else {
                callback();
            }
        }
    };

    // Hàm kiểm tra ngày kết thúc
    const validateEndDate = (_rule: RuleObject, value: Moment, callback: (message?: string) => void) => {
        if (value) {
            const currentDate = moment();
            const minEndDate = moment(currentDate).add(9, 'days');
            if (value.isBefore(minEndDate, 'day')) {
                callback('Ngày kết thúc phải sau ngày hiện tại ít nhất 10 ngày');
            } else {
                callback();
            }
        }
    };
    return (
        <div className='bg-gray-100 py-8 px-4 flex justify-between'>
            <div className='max-w-[800px] p-5 mx-auto bg-white text-[#526484] w-3/5'>
                <h2 className="font-bold text-xl text-gray-700 my-3 pb-3">Đăng bài tuyển dụng</h2>
                <Spin spinning={isLoading}>
                    <Form
                        form={form}
                        className='mx-auto'
                        name="basic"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ maxWidth: 700 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <h2 className="font-bold text-xl text-gray-700 my-3 pb-3">Thông tin cơ bản</h2>

                        {/* Tiêu đề */}
                        <Form.Item<IJobPost>
                            label="Tiêu đề tuyển dụng"
                            name="title"

                            rules={[
                                { required: true, message: 'Trường này không được bỏ trống !' },
                                { pattern: /^(?=\S)(\S\s?){5,}$/u, message: "Tiêu đề phải trên 5 kí tự !" }
                            ]}
                        >
                            <Input placeholder='Ví dụ: Tuyển gấp vị trí kinh doanh' />
                        </Form.Item>
                        {/* Select*/}
                        <Row gutter={16}>
                            {/* Hình thức làm việc */}
                            <Col span={12}>
                                <Form.Item<IJobPost>
                                    label="Hình thức làm việc"
                                    name="working_form_id"
                                    rules={[{ required: true }]}
                                >
                                    <Select placeholder="--Chọn--" style={{ width: '100%' }} onChange={handleChange}>
                                        {data?.data?.working_form.map((options: IJobPost) => (
                                            <Select.Option key={options.id} value={options.id}>
                                                {options.working_form}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            {/* Cấp bậc */}
                            <Col span={12}>
                                <Form.Item<IJobPost>
                                    label="Cấp bậc"
                                    name="job_position_id"
                                    rules={[{ required: true }]}
                                >
                                    <Select placeholder="--Chọn--" style={{ width: '100%' }} onChange={handleChange}>
                                        {data?.data?.job_position.map((options: IJobPost) => (
                                            <Select.Option key={options.id} value={options.id}>
                                                {options.job_position}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            {/* Tỉnh/Thành phố */}
                            <Col span={12}>
                                <Form.Item<IJobPost>
                                    label="Tỉnh/Thành phố"

                                    rules={[{ required: true }]}
                                >
                                    <Select placeholder="--Chọn--" style={{ width: '100%' }} onChange={handleSelectProvinceId}>
                                        {data?.data?.province_id.map((options: IJobPost) => (
                                            <Select.Option key={options.id} rovinceId={options.id}>
                                                {options.province}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            {/* Quận/Huyện*/}
                            <Col span={12}>
                                <Form.Item<IJobPost>
                                    label="Quận/Huyện"
                                    name="area_id"
                                    rules={[{ required: true }]}
                                >
                                    <Select placeholder="--Chọn--" style={{ width: '100%' }} onChange={handleChange}>
                                        {data?.data?.district_id
                                            ?.filter((options: {
                                                province_id: string | number | null; id: string | number;
                                            }) => options.province_id == selectedProvinceId)
                                            .map((options: IJobPost) => (
                                                <Select.Option key={options.id} value={options.id}>
                                                    {options.name}
                                                </Select.Option>
                                            ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            {/* Trình độ  học vấn*/}
                            <Col span={12}>
                                <Form.Item<IJobPost>
                                    label="Trình độ học vấn"
                                    name="academic_level_id"
                                    rules={[{ required: true }]}
                                >
                                    <Select placeholder="--Chọn--" style={{ width: '100%' }} onChange={handleChange}>
                                        {data?.data?.academic_level.map((options: IJobPost) => (
                                            <Select.Option key={options.id} value={options.id}>
                                                {options.academic_level}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            {/* Kinh nghiệm */}
                            <Col span={12}>
                                <Form.Item<IJobPost>
                                    label="Kinh nghiệm"
                                    name="exp_id"
                                    rules={[{ required: true }]}
                                >
                                    <Select placeholder="--Chọn--" style={{ width: '100%' }} onChange={handleChange}>
                                        {data?.data?.exp.map((options: IJobPost) => (
                                            <Select.Option key={options.id} value={options.id}>
                                                {options.experience}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            {/* Giới tính */}
                            <Col span={12}>
                                <Form.Item<IJobPost>
                                    label="Giới tính"
                                    name="gender"
                                    rules={[{ required: true }]}
                                >
                                    <Select
                                        placeholder="--Chọn--"
                                        style={{ width: '100%' }}
                                        onChange={handleChange}
                                        options={[
                                            { value: '0', label: 'Nam' },
                                            { value: '1', label: 'Nữ' },
                                            { value: '2', label: 'Không yêu cầu' },
                                        ]}

                                    />
                                </Form.Item>
                            </Col>
                            {/* Chuyên ngành hẹp */}
                            <Col span={12}>
                                <Form.Item<IJobPost>
                                    label="Chuyên ngành hẹp"
                                    name="major_id"
                                    rules={[{ required: true }]}
                                >
                                    <Select placeholder="--Chọn--" style={{ width: '100%' }} onChange={handleChange}>
                                        {data?.data?.major_id.map((options: IJobPost) => (
                                            <Select.Option key={options.id} value={options.id}>
                                                {options.major}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            {/* Gói bài đăng */}
                            <Col span={12}>
                                <Form.Item<IJobPost>
                                    label="Loại tin"
                                    name="type_job_post_id"
                                    rules={[{ required: true }]}
                                >
                                    <Select placeholder="--Chọn--" style={{ width: '100%' }} onChange={handleChange}>
                                        {data?.data?.type_job_post.map((options: IJobPost) => (
                                            <Select.Option key={options.id} value={options.id}>
                                                {options.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            {/* Số lượng */}
                            <Col span={12}>
                                <Form.Item<IJobPost>
                                    label="Số lượng tuyển"
                                    name="quantity"
                                    rules={[
                                        { required: true, message: 'Trường này không được bỏ trống !' },
                                        { pattern: /^(0|[1-9]\d{0,1}|100)$/, message: "Số phải là số không âm và nhỏ hơn hoặc bằng 100." }
                                    ]}
                                >
                                    <Input placeholder='Ví dụ: Tuyển gấp vị trí kinh doanh' style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            {/* Mức lương tối thiểu*/}
                            <Col span={12}>
                                <Form.Item<IJobPost>
                                    label="Mức lương tối thiểu"
                                    name="min_salary"
                                    rules={[{ required: true, message: "Nhập mức lương tối thiểu" }]}
                                    style={{ display: 'inline-block', width: '100%', marginRight: '16px' }}
                                >
                                    <Input placeholder="Mức lương tối thiểu" />
                                </Form.Item>
                            </Col>
                            {/* Mức lương tối đa*/}
                            <Col span={12}>
                                <Form.Item<IJobPost>
                                    label="Mức lương tối đa"
                                    name="max_salary"
                                    rules={[{ required: true, message: "Nhập mức lương tối đa" }]}
                                    style={{ display: 'inline-block', width: '100%' }}
                                >
                                    <Input placeholder="Mức lương tối đa" />
                                </Form.Item>
                            </Col>
                        </Row>
                        {/*Quyền lợi */}
                        <Form.Item<IJobPost>
                            name="interest"
                            label="Quyền lợi"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                        >
                            <CKEditor
                                editor={ClassicEditor}
                                onChange={(_event, editor) => {
                                    const data = editor.getData();
                                    form.setFieldsValue({
                                        interest: data
                                    });
                                }}
                            />
                        </Form.Item>
                        {/* Mô tả */}
                        <Form.Item<IJobPost>
                            name="desc"
                            label="Mô tả công việc"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                        >
                            <CKEditor
                                editor={ClassicEditor}
                                onChange={(_event, editor) => {
                                    const data = editor.getData();
                                    form.setFieldsValue({
                                        desc: data
                                    });
                                }}
                            />
                        </Form.Item>
                        {/* Yêu cầu */}
                        <Form.Item<IJobPost>
                            name="requirement"
                            label="Yêu cầu"
                            rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                        >
                            <CKEditor
                                editor={ClassicEditor}
                                onChange={(_event, editor) => {
                                    const data = editor.getData();
                                    form.setFieldsValue({
                                        requirement: data
                                    });
                                }}
                            />
                        </Form.Item>
                        {/* Date */}
                        <Row gutter={16}>
                            {/* Ngay bat dau */}
                            <Col span={12}>
                                <Form.Item<IJobPost>
                                    name="start_date"
                                    label="Ngày bắt đầu"
                                    rules={[
                                        { required: true, message: 'Vui lòng không bỏ trống' },
                                        { validator: validateStartDate },
                                    ]}
                                >
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            {/* Ngay ket thuc */}
                            <Col span={12}>
                                <Form.Item<IJobPost>
                                    name="end_date"
                                    label="Ngày kết thúc"
                                    rules={[
                                        { required: true, message: 'Vui lòng không bỏ trống' },
                                        { validator: validateEndDate },

                                    ]}
                                >
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <h2 className="font-bold text-xl text-gray-700 my-3 pb-3">Thông tin liên hệ</h2>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Họ và tên"
                                    name="name"
                                    rules={[
                                        { required: true, message: 'Trường này không được bỏ trống !' },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Email liên hệ"
                                    name="email"
                                    rules={[
                                        { required: true, message: 'Trường này không được bỏ trống !' },
                                        { type: 'email', message: "Email không đúng định dạng!" }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Số điện thoại"
                                    name="phone"
                                    rules={[
                                        { required: true, message: 'Trường này không được bỏ trống !' },
                                        { pattern: /^(0[0-9]{9,10})$/, message: "Số điện thoại không đúng định dạng" }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Địa chỉ"
                                    name="address"
                                    rules={[
                                        { required: true, message: 'Trường này không được bỏ trống !' },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item<IJobPost>
                            label="company_id"
                            name="company_id"
                            initialValue={Infor?.company?.id}
                            hidden
                        >
                            <Input placeholder='Ví dụ: Tuyển gấp vị trí kinh doanh' />
                        </Form.Item>
                        <div className='flex justify-between mt-4'>
                            <Form.Item labelAlign="right">
                                <Button type="primary" htmlType="submit" className='bg-blue-500 h-10 flex items-center gap-1'>
                                    {isCreatePost ? (
                                        <AiOutlineLoading3Quarters className="animate-spin" />
                                    ) : (
                                        <div className='flex items-center gap-1'>
                                            <span>Đăng bài</span> <AiOutlineSend />
                                        </div>
                                    )}
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </Spin>
            </div >
            <DescPackage />
        </div >

    )
});

export default JobCreate