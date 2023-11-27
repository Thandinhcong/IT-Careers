import { Link, useNavigate, useParams } from "react-router-dom"
import { EnterOutlined } from "@ant-design/icons"
import { Button, Form, Input, Skeleton, message } from 'antd';
import { useGetjobpositionByIdQuery, useUpdatejobpositionMutation } from "../../../api/jobpositionApi";
import { useEffect } from "react";
import { IJobposition } from "../../../interfaces";

const EditJobposition = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [messageApi] = message.useMessage();
    const [UpdateJobposition, { isLoading: isUpdateLoading }] = useUpdatejobpositionMutation();
    const { data, isLoading } = useGetjobpositionByIdQuery(id || '');
    const [form] = Form.useForm();


    useEffect(() => {
        form.setFieldsValue({
            job_position: data?.Job_position?.job_position,
            description: data?.Job_position?.description
        })
    }, [data])
    if (isUpdateLoading) return <Skeleton loading />
    const onFinish = (values: IJobposition) => {
        UpdateJobposition({
            ...values,
            id: Number(id)
        })
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "Cập nhật thành công!",
                });
                return navigate("/admin/jobposition-manage")
            })
            .catch()
    }
    if (isLoading) return <Skeleton />
    type FieldType = {
        job_position?: string;
        description?: string;
    };

    return (
        <div>
            <Link to="/admin/jobposition-manage">Quay lại <EnterOutlined /></Link>
            <h2 className="m-6 text-2xl font-semibold">Cập Nhật  Chức Vụ  </h2>
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
                    label="Chức Vụ "
                    name="job_position"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { pattern: /^(?=\S)(\S\s?){3,}$/u, message: "Tên chức vụ phải trên 3 kí tự" }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Description "
                    name="description"
                >
                    <Input />
                </Form.Item>

                <Form.Item labelAlign="left">
                    <Button type="primary" htmlType="submit" className="bg-blue-500">
                        Sửa
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditJobposition  