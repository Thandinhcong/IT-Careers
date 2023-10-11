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
    namejobposition?: string;
};
const AddJobposition = () => {
    return (
        <div>
            <Link to="/admin/jobposition-manage">Quay lại <EnterOutlined /></Link>
            <h2 className="m-6 text-2xl font-semibold">Thêm Chức Vụ</h2>
            <Form className="mx-40"
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
                    label="Chức Vụ "
                    name="namejobposition"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                    ]}
                >
                    <Input />
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

export default AddJobposition