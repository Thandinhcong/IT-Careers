import { Link } from "react-router-dom"
import { EnterOutlined } from "@ant-design/icons"
import { Button, Form, Input, Select } from 'antd';
import { Option } from "antd/es/mentions";

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type FieldType = {
    title?: string;
    coin?: number;
    price?: number;
    reduced_price?: number;
    status?: string[];
    type_account?: string;
};
const AddPackage = () => {
    return (
        <div>
            <Link to="/admin/skill-manage">Quay lại <EnterOutlined /></Link>
            <h2 className="my-6 mx-28 text-2xl font-semibold">Tạo Gói nạp</h2>
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
                    label="Tên gói nạp"
                    name="title"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { pattern: /^\S{6,}$/, message: "Gói nạp phải trên 6 kí tự" }

                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Xu gói nạp"
                    name="coin"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { pattern: /^[1-9]\d*$/, message: 'Xu phải là số và không âm !' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Giá gói nạp"
                    name="price"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { pattern: /^[1-9]\d*$/, message: 'Giá phải là số và không âm !' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Giá giảm gói nạp"
                    name="type_account"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { pattern: /^[1-9]\d*$/, message: 'Giảm giá phải là số và không âm !' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="status"
                    rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                >
                    <Select placeholder="Chọn trạng thái gói nạp">
                        <Option value="a">A</Option>
                        <Option value="b">B</Option>
                    </Select>
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

export default AddPackage