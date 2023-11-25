import { Button, Form, Input, Skeleton } from 'antd'
import { useEffect } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { useChangePassCandidateMutation, useGetCandidatesQuery } from '../../../api/accountApi'
import { IAccount } from '../../../interfaces'
import { Notyf } from 'notyf';

const ChangePassCandidate = () => {
    const { data: candidateData, isLoading } = useGetCandidatesQuery();
    const [form] = Form.useForm();

    const [changePassCandidate, { isLoading: isUpdateLoading }] = useChangePassCandidateMutation();
    const navigate = useNavigate();

    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
    useEffect(() => {
        form.setFieldsValue({
            password: candidateData?.candidate?.password,
            password_old: candidateData?.candidate?.password_old,
            re_password: candidateData?.candidate?.re_password,
        });
    }, [candidateData]);

    const onFinish = (values: IAccount) => {

        changePassCandidate({ ...values })
            .unwrap()
            .then(async () => {
                navigate("/account/change_pass");
                notyf.success('Đổi mật khẩu thành công')
            });
    };


    if (isLoading) return <Skeleton />
    return (
        <div><h1 className='font-bold text-base mb-8'>Thông tin tài khoản</h1>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 400 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
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