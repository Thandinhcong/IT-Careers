import { Link, useNavigate, useParams } from "react-router-dom"
import { EnterOutlined } from "@ant-design/icons"
import { Button, Form, Input, Select, Skeleton, message } from 'antd';
import { useEditPackageMutation, useGetPackageByIdQuery } from "../../../api/package";
import { IPackages } from "../../../interfaces";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect } from "react";
import { Option } from "antd/es/mentions";


const EditPackage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [editPackage, { isLoading }] = useEditPackageMutation();

    const { data: packageData } = useGetPackageByIdQuery(id || "");
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            title: packageData?.package?.title,
            coin: packageData?.package?.coin,
            price: packageData?.package?.price,
            status: packageData?.package?.status,
        });
    }, [packageData]);
    console.log(status);

    if (isLoading) return <Skeleton />
    const onFinish = (values: IPackages) => {
        editPackage({ ...values, id: Number(id) })
            .unwrap()
            .then(() => {
                message.success(`Cập nhật thành công`);
                navigate("/admin/package-manage");
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <div>
            <Link to="/admin/package-manage">Quay lại <EnterOutlined /></Link>
            <h2 className="my-6 mx-28 text-2xl font-semibold">Cập nhật Gói nạp</h2>
            <Form className="mx-60"
                form={form}
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

                <Form.Item
                    name="status"
                    label="Trạng thái gói nạp"
                >
                    <Select placeholder="Kích hoạt" value={0} >
                        <Option value="0">Chưa kích hoạt</Option>
                        <Option value="1">Kích hoạt</Option>
                    </Select>
                </Form.Item>
                <Form.Item labelAlign="left">
                    <Button type="primary" htmlType="submit" className="bg-blue-500">
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Cập nhật"
                        )}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditPackage