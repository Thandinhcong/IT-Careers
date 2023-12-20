import { useEffect } from 'react';
import { Button, Form, Input, Skeleton, message } from 'antd';
import { useGetWorkingFormByIdQuery, useUpdateWorkingFormMutation } from '../../../api/workingFormApi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { EnterOutlined } from "@ant-design/icons";
import { IWorkingForm } from '../../../interfaces';


const UpdateWorkingForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [UpdateWorking, { isLoading: isUpdateLoading }] = useUpdateWorkingFormMutation();
    const { data, isLoading } = useGetWorkingFormByIdQuery(id || '');
    const [form] = Form.useForm();


    useEffect(() => {
        form.setFieldsValue({
            working_form: data?.workingForm?.working_form,
            description: data?.workingForm?.description
        })
    }, [data])
    if (isUpdateLoading) return <Skeleton loading />
    const onFinish = (values: IWorkingForm) => {
        UpdateWorking({
            ...values,
            id: Number(id)
        })
            .unwrap()
            .then(() => {
                message.success("Cập nhật thành công")
                return navigate("/admin/working-form")
            })
            .catch((error) => console.log(error))
    }

    if (isLoading) return <Skeleton />
    type FieldType = {
        working_form?: string;
        description?: string;
    };
    return (
        <div>
            <Link to="/admin/working-form">Quay lại <EnterOutlined /></Link>
            <h2 className="m-6 text-2xl font-semibold">Sửa kĩ năng</h2>
            <Form
                className="mx-40"
                form={form}
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 400 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Name"
                    name="working_form"
                    rules={[
                        { required: true, message: 'Vui lòng nhập hình thức làm việc!' },
                        { pattern: /^(?=\S)(\S\s?){3,}$/u, message: "Kỹ năng phải trên 3 kí tự" }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Description"
                    name="description"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mô tả!' },
                        { pattern: /^(?=\S)(\S\s?){5,}$/u, message: "Kỹ năng phải trên 5 kí tự" }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item labelAlign="left">
                    <Button type='primary' htmlType="submit" className='bg-blue-500'>
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UpdateWorkingForm