import { Button, Col, DatePicker, Form, Input, Row, Select, Skeleton, message, } from 'antd';
import { IJobPost } from '../../../interfaces';
import { AiOutlineLoading3Quarters, AiOutlineSend } from 'react-icons/ai';
import moment from 'moment';
import { useEditJobPostMutation, useGetInforQuery, useGetJobPostByIdCompanyIdQuery, useGetJobPostSelectByIdQuery } from '../../../api/companies/jobPostCompany';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DescPackage from '../JobCreate/DescPackage';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../JobCreate/style.css';


const PostEdit = () => {
    const { id } = useParams();
    const { data } = useGetJobPostSelectByIdQuery();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { data: Infor } = useGetInforQuery();
    const { data: PostData, isLoading } = useGetJobPostByIdCompanyIdQuery(id || "");
    console.log(PostData);
    const [jobPost, { isLoading: isUpdatePost }] = useEditJobPostMutation();
    const [selectedProvinceId, setSelectedProvincetId] = useState<string | number | null>(null); //lưu id Tỉnh Thành phố

    useEffect(() => {
        form.setFieldsValue({
            // Account  
            name: Infor?.company?.name,
            phone: Infor?.company?.phone,
            address: Infor?.company?.address,
            email: Infor?.company?.email,
            id_company: Infor?.company?.id,
            // Post
            title: PostData?.level?.title,
            working_form_id: PostData?.level?.working_form_id,
            job_position_id: PostData?.level?.job_position_id,
            academic_level_id: PostData?.level?.academic_level_id,
            exp_id: PostData?.level?.exp_id,
            major_id: PostData?.level?.major_id,
            min_salary: PostData?.level?.min_salary,
            max_salary: PostData?.level?.max_salary,
            area_id: PostData?.level?.province_id,
            district_id: PostData?.level?.district_id,
            gender: PostData?.level?.gender,
            quantity: PostData?.level?.quantity,
            interest: PostData?.level?.interest,
            requirement: PostData?.level?.requirement,
            desc: PostData?.level?.desc,
            type_job_post_id: PostData?.level?.type_job_post_id,
            start_date: PostData?.level?.start_date
                ? moment(PostData?.level?.start_date)
                : null,
            end_date: PostData?.level?.end_date
                ? moment(PostData?.level?.end_date)
                : null,

        });
        if (PostData?.level?.province_id) {
            setSelectedProvincetId(PostData?.level?.province_id);
        }

    }, [Infor, PostData]);

    const onFinish = (values: IJobPost) => {
        if (values.start_date !== undefined && values.end_date !== undefined && moment.isMoment(values.end_date) && moment.isMoment(values.start_date)) {
            const startDate = values.start_date.toDate();
            const endDate = values.end_date.toDate();

            // Định dạng ngày thành chuỗi "YYYY-MM-DD"
            values.start_date = moment(startDate).format('YYYY-MM-DD');
            values.end_date = moment(endDate).format('YYYY-MM-DD');
        }
        jobPost({ ...values, id: Number(id) })
            .unwrap()
            .then(() => {
                message.success(`Cập nhật thành bài đăng thành công`);
                navigate("/business/jobs-manage");
            })
            .catch((error) => {
                message.error(error?.data?.errors);
            });
    };

    const handleSelectProvinceId = (rovinceId: number | string) => { // Hàm lưu ID của tỉnh thành phố vào state
        setSelectedProvincetId(rovinceId); // Lưu ID của tỉnh thành phố vào state selectedProvinceId
    }
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    if (isLoading) return <Skeleton loading />;
    return (
        <div className='bg-gray-100 py-8 px-4 flex justify-between'>
            <div className='max-w-[800px] p-5 mx-auto bg-white text-[#526484] w-3/5'>
                <h2 className="font-bold text-xl text-gray-700 my-3 pb-3">Cập nhật bài đăng tuyển dụng</h2>
                <Form
                    form={form}
                    className='mx-auto'
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 700 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    onFinish={onFinish}
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
                                name="district_id"
                                rules={[{ required: true, message: "Vui lòng chọn" }]}
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
                                initialValue={PostData?.level?.gender}
                                rules={[{ required: true }]}
                            >
                                <Select placeholder="--Chọn--"
                                    style={{ width: '100%' }} onChange={handleChange}>
                                    <Select.Option value={2}>Không yêu cầu</Select.Option>
                                    <Select.Option value={0}>Nam</Select.Option>
                                    <Select.Option value={1}>Nữ</Select.Option>
                                </Select>
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
                        {/* Loại bài đăng */}
                        <Col span={12}>
                            <Form.Item<IJobPost>
                                label="Loại tin đăng"
                                name="type_job_post_id"
                            >
                                <Select placeholder="--Chọn--" style={{ width: '100%' }} onChange={handleChange} disabled>
                                    {data?.data?.type_job_post.map((options: IJobPost) => (
                                        <Select.Option key={options.id} value={options.id}>
                                            {options.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        {/* Mức lương tối thiểu*/}
                        <Col span={12}>
                            <Form.Item<IJobPost>
                                label="Mức lương tối thiểu"
                                name="min_salary"
                                rules={[
                                    { required: true, message: "Nhập mức lương tối thiểu!" },
                                ]}
                            >
                                <Input placeholder="Mức lương tối thiểu" style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        {/* Mức lương tối đa*/}
                        <Col span={12}>
                            <Form.Item<IJobPost>
                                label="Mức lương tối đa"
                                name="max_salary"
                                rules={[
                                    { required: true, message: "Nhập mức lương tối đa!" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('min_salary') === undefined) {
                                                return Promise.resolve();
                                            }
                                            if (parseFloat(value) > parseFloat(getFieldValue('min_salary'))) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('Mức lương tối đa phải lớn hơn mức lương tối thiểu.');
                                        },
                                    }),
                                ]}
                            >
                                <Input placeholder="Mức lương tối đa" style={{ width: '100%' }} />
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
                    {/*Quyền lợi */}
                    <Form.Item<IJobPost>
                        name="interest"
                        label="Quyền lợi"
                        rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
                    >
                        <CKEditor
                            data={PostData?.level?.interest}
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
                            data={PostData?.level?.desc}
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
                            data={PostData?.level?.requirement}
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
                            >
                                <DatePicker style={{ width: '100%' }} disabled />
                            </Form.Item>
                        </Col>
                        {/* Ngay ket thuc */}
                        <Col span={12}>
                            <Form.Item<IJobPost>
                                name="end_date"
                                label="Ngày kết thúc"
                            >
                                <DatePicker style={{ width: '100%' }} disabled />
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
                    <div className='flex justify-between mt-4'>
                        <Form.Item labelAlign="right">
                            <Button type="primary" htmlType="submit" className='bg-blue-500 h-10 flex items-center gap-1'>
                                {isUpdatePost ? (
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
            </div >
            <DescPackage />
        </div >

    )
}


export default PostEdit