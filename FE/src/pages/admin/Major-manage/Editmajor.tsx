import { Link, useNavigate, useParams } from "react-router-dom"
import { EnterOutlined } from "@ant-design/icons"
import { Button, Form, Input, Skeleton, message } from 'antd';
import { useEffect } from "react";
import { IMajors } from "../../../interfaces";
import { useGetMajorByIdQuery, useUpdateMajorMutation } from "../../../api/majorApi";

const EditMajors = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [UpdateMajor, { isLoading: isUpdateLoading }] = useUpdateMajorMutation();
    const { data, isLoading } = useGetMajorByIdQuery(id || '');
    const [form] = Form.useForm();


    useEffect(() => {
        form.setFieldsValue({
            major: data?.major?.major,
            // description: data?.major?.description
        })
    }, [data])
    if (isUpdateLoading) return <Skeleton loading />
    const onFinish = (values: IMajors) => {
        UpdateMajor({
            ...values,
            id: Number(id)
        })
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "Cập nhật thành công!",
                });
                return navigate("/admin/major-manage")
            })

    }
    if (isLoading) return <Skeleton />
    type FieldType = {
        major?: string;
        description?: string;
    };

    return (
        <div>
            <Link to="/admin/major-manage">Quay lại <EnterOutlined /></Link>
            <h2 className="m-6 text-2xl font-semibold">Cập Nhật Chuyên ngành </h2>
            {contextHolder}
            <Form className="mx-40"
                form={form}
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 400 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                labelWrap={true}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Chuyên Ngành "
                    name="major"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { min: 2, message: "Tối thiểu 2 ký tự" }
                    ]}
                >
                    <Input />
                </Form.Item>
                {/* <Form.Item<FieldType>
                    label="Description "
                    name="description"
                >
                    <Input />
                </Form.Item> */}

                <Form.Item labelAlign="left">
                    <Button type="primary" htmlType="submit" className="bg-blue-500">
                        Sửa
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditMajors  