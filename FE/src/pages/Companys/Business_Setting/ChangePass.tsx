import { Notyf } from 'notyf';
import { useRefeshPasswordMutation } from '../../../api/auth/Companies';
import { Button, Form, Input } from 'antd';
import React from 'react';


const ChangePassCompany = React.memo(() => {
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
    const [refeshPassword] = useRefeshPasswordMutation();

    const onFinish = async (values: any) => {
        try {
            await refeshPassword(values).unwrap();
            return notyf.success("Đổi mật khẩu thành công!")

        } catch (error: any) {
            return notyf.error(error.data.message)
        }
    };

    type FieldType = {
        password_old?: string;
        password?: string;
        re_password?: string;
    };
    return (


        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <h1 className='text-2xl'>Thay đổi mật khẩu</h1>
            <p className='w-4/5 text-sm text-gray-600 my-3'>Bạn quên mật khẩu cũ? Vui lòng <a href="">đăng xuất tài khoản</a> sau đó sử dụng chức năng quên mật khẩu.</p>
            <Form.Item<FieldType>
                label="Mật khẩu cũ"
                name="password_old"
                rules={[
                    { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
                ]}
                labelCol={{ span: 24 }}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
                labelCol={{ span: 24 }}
                label="Mật khẩu mới"
                name="password"
                rules={[
                    { required: true, message: 'Vui lòng nhập lại mật khẩu mới!' },
                    { min: 8, message: "Tối thiểu 8 ký tự" }
                ]}
            >

                <Input.Password />
            </Form.Item>
            <Form.Item
                labelCol={{ span: 24 }}
                label="Nhập lại mật khẩu mới"
                name="re_password"
                rules={[
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Mật khẩu không khớp!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>


            <Form.Item
                labelAlign="left"
            >
                <Button type="primary" className='bg-blue-500' htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form >
    );


});

export default ChangePassCompany