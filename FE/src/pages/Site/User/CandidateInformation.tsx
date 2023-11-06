import { Button, Form, Input, Select, Upload } from 'antd'
import { useEffect } from 'react'
import { IAccount } from '../../../interfaces'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useEditCandidateMutation, useGetCandidatesQuery } from '../../../api/accountApi'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { IoCloudUploadOutline } from 'react-icons/io5'



const CandidateInformation = () => {
    const { data: candidateData } = useGetCandidatesQuery();
    const [form] = Form.useForm();

    const [editCandidate, { isLoading: isUpdateLoading }] = useEditCandidateMutation();
    const navigate = useNavigate();

    useEffect(() => {
        form.setFieldsValue({
            name: candidateData?.candidate?.name,
            email: candidateData?.candidate?.email,
            phone: candidateData?.candidate?.phone,
            password: candidateData?.candidate?.password,
            avatar: candidateData?.candidate?.avatar,
            address: candidateData?.candidate?.address,
            gender: candidateData?.candidate?.gender,
            type: candidateData?.candidate?.type,
            coin: candidateData?.candidate?.coin,
        });
    }, [candidateData]);

    const onFinish = (values: IAccount) => {
        editCandidate({ ...values })
            .unwrap()
            .then(async () => {
                navigate("/account");
                message.success('Cập nhật thành công')
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div><h1 className='font-bold text-base mb-8'>Thông tin tài khoản</h1>
            {/* <div>
                <h2 className='font-bold'>ID tài khoản</h2>
                <p>1231390</p>
            </div> */}
            <Form
                // className="mx-40"
                form={form}
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 400 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                labelWrap={true}
                autoComplete="off">
                <div>
                    <h2 className='font-bold flex items-center'>Họ và tên</h2>
                    <Form.Item<IAccount>
                        // label=""
                        name="name"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <h2 className='font-bold flex items-center'>Email</h2>
                    <Form.Item<IAccount>
                        // label=""
                        name="email"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <h2 className='font-bold flex items-center'>Avatar</h2>
                    <Form.Item<IAccount>
                        // label=""
                        name="avatar"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                        ]}
                    >
                        <Upload>
                            <Button icon={<IoCloudUploadOutline />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <h2 className='font-bold flex items-center'>Số điện thoại</h2>
                    <Form.Item<IAccount>
                        // label=""
                        name="phone"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <h2 className='font-bold flex items-center'>Địa chỉ</h2>
                    <Form.Item<IAccount>
                        // label=""
                        name="address"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <h2 className='font-bold flex items-center'>Giới tính</h2>
                    <Form.Item<IAccount>
                        // label=""
                        name="gender"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                        ]}
                    >
                        <Select>
                            <Select.Option value={0}>Không xác định</Select.Option>
                            <Select.Option value={1}>Nam</Select.Option>
                            <Select.Option value={2}>Nữ</Select.Option>
                        </Select>
                    </Form.Item>
                    <h2 className='font-bold flex items-center'>Loại</h2>
                    <Form.Item<IAccount>
                        // label=""
                        name="type"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <h2 className='font-bold flex items-center'>Xu</h2>
                    <Form.Item<IAccount>
                        // label=""
                        name="coin"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item labelAlign="left">
                        <Button type="primary" htmlType="submit" className="bg-blue-500">
                            {isUpdateLoading ? (
                                <AiOutlineLoading3Quarters className="animate-spin" />
                            ) : (
                                "Cập nhật thông tin"
                            )}
                        </Button>
                    </Form.Item>
                </div>
            </Form></div>
    )
}

export default CandidateInformation