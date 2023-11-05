import { Button, Form, Input } from 'antd'
import { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { useChangePassCandidateMutation, useGetCandidatesQuery } from '../../../api/accountApi'
import { IAccount } from '../../../interfaces'
import { message } from 'antd'

const ChangePassCandidate = () => {
    const { data: candidateData } = useGetCandidatesQuery();
    // const [isPasswordMatched, setIsPasswordMatched] = useState(true);
    const [form] = Form.useForm();

    const [changePassCandidate, { isLoading: isUpdateLoading }] = useChangePassCandidateMutation();
    const navigate = useNavigate();

    useEffect(() => {
        form.setFieldsValue({
            password: candidateData?.candidate?.password,
            password_old: candidateData?.candidate?.password_old,
            re_password: candidateData?.candidate?.re_password,
        });
    }, [candidateData]);

    const onFinish = (values: IAccount) => {
        // if (values.password !== candidateData?.candidate?.password) {
        //     setIsPasswordMatched(true);
        //     return;
        // }
        changePassCandidate({ ...values })
            .unwrap()
            .then(async () => {
                navigate("/account/change_pass");
                message.success('Đổi mật khẩu thành công')
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
                    <h2 className='font-bold flex items-center'>Mật khẩu cũ</h2>
                    <Form.Item<IAccount>
                        name="password_old"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            { min: 6, message: "Phải trên 6 kí tự" }
                        ]}
                    >
                        <Input.Password />
                        {/* {!isPasswordMatched && (
                            <p className="text-red-500">Mật khẩu cũ không đúng</p>
                        )} */}
                    </Form.Item>


                    <h2 className='font-bold flex items-center'>Mật khẩu mới</h2>
                    <Form.Item<IAccount>
                        name="password"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            { min: 6, message: "Phải trên 6 kí tự" }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <h2 className='font-bold flex items-center'>Nhập lại mật khẩu mới</h2>
                    <Form.Item<IAccount>
                        name="re_password"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            { min: 6, message: "Phải trên 6 kí tự" }
                        ]}
                    >
                        <Input.Password />
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
            </Form>
        </div>
    )
}

export default ChangePassCandidate