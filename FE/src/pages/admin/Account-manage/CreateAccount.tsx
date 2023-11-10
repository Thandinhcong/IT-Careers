import { Link } from "react-router-dom"
import { EnterOutlined } from "@ant-design/icons"
import { Button, Form, Input } from 'antd';

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type FieldType = {
    name?: string;
    pass?: string;
    email?: string;
    phone_number?: string;
    avatar?: string;
};
const CreateAccount = () => {
    return (
        <div>
            <Link to="/admin/level-manage">Quay lại <EnterOutlined /></Link>
            <h2 className="my-6 mx-28 text-2xl font-semibold">Tạo tài khoản</h2>
            <Form className="mx-60"
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 400 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                labelWrap={true}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Username"
                    name="name"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Mật khẩu"
                    name="pass"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { min: 6, message: "Mật khẩu phải trên 6 kí tự" }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { min: 6, message: "Email phải trên 6 kí tự" }
                    ]}
                >
                    <Input type="email" />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Số điện thoại"
                    name="phone_number"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Ảnh đại diện"
                    name="avatar"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                    ]}
                >
                    <Input type="file" />
                </Form.Item>

                <Form.Item labelAlign="left">
                    <Button type="primary" htmlType="submit" className="bg-blue-500">
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CreateAccount