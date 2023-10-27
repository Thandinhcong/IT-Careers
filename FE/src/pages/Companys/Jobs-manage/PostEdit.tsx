import { Button, Col, DatePicker, Form, Input, Row, Select, message, } from 'antd';
import { IJobPost } from '../../../interfaces';
import { AiOutlineEye, AiOutlineSend } from 'react-icons/ai';
import { RuleObject } from 'antd/lib/form';
import moment, { Moment } from 'moment';
import { useEditJobPostMutation, useGetInforQuery, useGetJobPostByIdCompanyIdQuery, useGetJobPostSelectByIdQuery } from '../../../api/companies/jobPostCompany';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PostEdit = () => {
    const { id } = useParams();
    const { data } = useGetJobPostSelectByIdQuery();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { data: Infor } = useGetInforQuery();
    const { data: PostData } = useGetJobPostByIdCompanyIdQuery(id || "");

    const [jobPost] = useEditJobPostMutation();

    useEffect(() => {
        form.setFieldsValue({
            // Account
            name: Infor?.company?.name,
            phone: Infor?.company?.phone,
            address: Infor?.company?.address,
            email: Infor?.company?.email,
            id_company: Infor?.company?.id,
            // Post
            // id_company: PostData?.level[0]?.id_company,
            title: PostData?.level[0]?.title,
            working_form_id: PostData?.level[0]?.working_form,
            area_id: PostData?.level[0]?.area_id,
            job_position_id: PostData?.level[0]?.job_position,
            academic_level_id: PostData?.level[0]?.academic_level,
            exp_id: PostData?.level[0]?.experience,
            gender: PostData?.level[0]?.gender,
            major_id: PostData?.level[0]?.major,
            quantity: PostData?.level[0]?.quantity,
            min_salary: PostData?.level[0]?.min_salary,
            max_salary: PostData?.level[0]?.max_salary,
            interest: PostData?.level[0]?.interest,
            require: PostData?.level[0]?.require,
            start_date: PostData?.level[0]?.start_date
                ? moment(PostData?.level[0]?.start_date)
                : null,
            end_date: PostData?.level[0]?.end_date
                ? moment(PostData?.level[0]?.end_date)
                : null,
        });
    }, [Infor, PostData]);

    const onFinish = (values: IJobPost) => {
        if (values.start_date !== undefined && values.end_date !== undefined) {
            const startDate = values.start_date.toDate();
            const endDate = values.end_date.toDate();

            // Định dạng ngày thành chuỗi "YYYY-MM-DD"
            values.start_date = moment(startDate).format('YYYY-MM-DD');
            values.end_date = moment(endDate).format('YYYY-MM-DD');
        }
        console.log(values);

        // jobPost({ ...values, id: Number(id) })
        //     .unwrap()
        //     .then(() => {
        //         message.success(`Cập nhật thành bài đăng thành công`);
        //         navigate("/business/job-manage");
        //     })
        //     .catch((error) => {
        //         message.error("Đăng bài thất bại" + error.message);
        //     });
    };

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
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
            const minEndDate = moment(currentDate).add(5, 'days');
            if (value.isBefore(minEndDate, 'day')) {
                callback('Ngày kết thúc phải sau ngày hiện tại ít nhất 5 ngày');
            } else {
                callback();
            }
        }
    };

    return (
        <div className='bg-gray-100 py-8 px-4'>
            <div className='max-w-[800px] p-5 mx-auto bg-white text-[#526484]'>
                <h2 className="font-bold text-xl text-gray-700 my-3 pb-3">Cập nhật bài đăng tuyển dụng</h2>

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
                                    {data?.data?.working_form.map((options: any) => (
                                        <Select.Option key={options.id} value={options.id}>
                                            {options.working_form}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        {/* Khu vực */}
                        <Col span={12}>
                            <Form.Item<IJobPost>
                                label="Khu vực"
                                name="area_id"
                                rules={[{ required: true }]}
                            >
                                <Select
                                    placeholder="--Chọn--"
                                    style={{ width: '100%' }}
                                    onChange={handleChange}
                                    options={[
                                        { value: '0', label: 'Hà Nội' },
                                        { value: '1', label: 'Hải Phòng' },
                                        { value: '2', label: 'Bình Dương' },
                                    ]}
                                />
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
                                    {data?.data?.level.map((options: any) => (
                                        <Select.Option key={options.id} value={options.id}>
                                            {options.level}
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
                                    {data?.data?.academic_level.map((options: any) => (
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
                                    {data?.data?.exp.map((options: any) => (
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
                                    {data?.data?.major_id.map((options: any) => (
                                        <Select.Option key={options.id} value={options.id}>
                                            {options.major}
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
                    </Row>
                    {/* Mức lương */}
                    <Form.Item
                        label="Mức lương"
                        rules={[{ required: true }]}
                        style={{ marginBottom: 0 }}
                    >
                        <Form.Item<IJobPost>
                            name="min_salary"
                            rules={[{ required: true }, { message: "Nhập mức lương tối thiểu" }]}
                            style={{ display: 'inline-block', width: '48.5%', marginRight: '16px' }}
                        >
                            <Input placeholder="Mức lương tối thiểu" />
                        </Form.Item>
                        <Form.Item<IJobPost>
                            name="max_salary"
                            rules={[{ required: true }, { message: "Nhập mức lương tối đa" }]}
                            style={{ display: 'inline-block', width: '48.5%' }}
                        >
                            <Input placeholder="Mức lương tối đa" />
                        </Form.Item>
                    </Form.Item>

                    {/* Mô tả công việc/Quyền lợi */}
                    <Form.Item<IJobPost>
                        name="interest"
                        label="Mô tả công việc/Quyền lợi"
                        rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}

                    >
                        <Input.TextArea showCount maxLength={1000} style={{ width: '100%' }} rows={5} />
                    </Form.Item>

                    {/* Yêu cầu*/}
                    <Form.Item<IJobPost>
                        name="require"
                        label="Yêu cầu"
                        rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}

                    >
                        <Input.TextArea showCount maxLength={1000} style={{ width: '100%' }} rows={5} />
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
                    {/* <Form.Item<IJobPost>
                        label="company_id"
                        name="company_id"
                        initialValue={Infor?.company?.id}
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                        ]}

                    >
                        <Input placeholder='Ví dụ: Tuyển gấp vị trí kinh doanh' />
                    </Form.Item> */}
                    <div className='flex justify-between mt-4'>
                        <Button className='bg-gray-100 h-10 flex items-center gap-1'>
                            <AiOutlineEye /> <span>Xem trước bài đăng</span>
                        </Button>
                        <Form.Item labelAlign="right">
                            <Button type="primary" htmlType="submit" className='bg-blue-500 h-10 flex items-center gap-1'>
                                <span>Đăng bài</span> <AiOutlineSend />
                            </Button>
                        </Form.Item>
                    </div>

                </Form>
            </div >
        </div >

    )
}


export default PostEdit