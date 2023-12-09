import { Link, useNavigate } from "react-router-dom"
import { EnterOutlined } from "@ant-design/icons"
import { Button, Form, Input, message } from 'antd';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAddTypeJobPostMutation } from "../../../api/admin/postingPackage";

const AddPostingPackages = () => {
    const [addSalary, { isLoading }] = useAddTypeJobPostMutation();
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        addSalary(values)
            .unwrap()
            .then(() => {
                message.success(`Thêm thành công`);
                navigate("/admin/posting-packages");
            });
    };

    return (
        <div>
            <Link to="/admin/posting-packages">Quay lại <EnterOutlined /></Link>
            <h2 className="m-6 text-2xl font-semibold">Thêm mức lương</h2>
            <Form className="mx-40"
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 400 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                labelWrap={true}
                autoComplete="off"
            >
                <Form.Item<any>
                    label="name"
                    name="name"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<any>
                    label="Giá"
                    name="salary"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { pattern: /^[1-9]\d*$/, message: 'Lương phải là số và không âm !' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<any>
                    label="Mô tả"
                    name="desc"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },

                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item labelAlign="left">
                    <Button type="primary" htmlType="submit" className="bg-blue-500">
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Thêm kĩ năng"
                        )}
                    </Button>
                </Form.Item>
            </Form>
        </div >
    )
}

export default AddPostingPackages