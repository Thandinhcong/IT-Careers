import { Link, useNavigate } from "react-router-dom"
import { EnterOutlined } from "@ant-design/icons"
import { Button, Form, Input, Select, message } from 'antd';
import { useAddPackageMutation } from "../../../api/package";
import { IPackages } from "../../../interfaces";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const AddPackage = () => {
    const [addPackage, { isLoading }] = useAddPackageMutation();
    const navigate = useNavigate();
    const onFinish = (values: IPackages) => {
        addPackage(values)
            .unwrap()
            .then(() => {
                message.success(`Thêm thành công`);
                navigate("/admin/package-manage");
            });
    };

    const initialValues: IPackages = {
        title: "",
        coin: 0,
        price: 0,
        reduced_price: "1",
        type_account: "",
        invoice_id: 0
    };

    return (
        <div>
            <Link to="/admin/package-manage">Quay lại <EnterOutlined /></Link>
            <h2 className="my-6 mx-28 text-2xl font-semibold">Tạo Gói nạp</h2>
            <Form className="mx-60"
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 400 }}
                initialValues={initialValues}
                onFinish={onFinish}
                labelWrap={true}
                autoComplete="off"
            >
                <Form.Item<IPackages>
                    label="Tên gói nạp"
                    name="title"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { min: 3, message: "Tối thiểu 3 ký tự!" }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<IPackages>
                    label="Xu gói nạp"
                    name="coin"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { pattern: /^[1-9]\d*$/, message: 'Xu phải là số và không âm !' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<IPackages>
                    label="Giá gói nạp"
                    name="price"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { pattern: /^[1-9]\d*$/, message: 'Giá phải là số và không âm !' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<IPackages>
                    label="Giá gói nạp"
                    name="reduced_price"
                    hidden
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { pattern: /^[1-9]\d*$/, message: 'Giá phải là số và không âm !' },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Loại gói nạp"
                    name="type_account"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                    ]}
                >
                    <Select>
                        <Select.Option value="0">Nhà tuyển dụng</Select.Option>
                        <Select.Option value="1">Ứng viên</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item labelAlign="left">
                    <Button type="primary" htmlType="submit" className="bg-blue-500">
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Thêm"
                        )}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddPackage