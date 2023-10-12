import { useEffect } from 'react';
import { Button, Form, Input, Skeleton, message } from 'antd';
import { useGetWorkingFormByIdQuery, useUpdateWorkingFormMutation } from '../../../api/workingFormApi';
import { useNavigate, useParams } from 'react-router-dom';


const UpdateWorkingForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
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
    const onFinish = (values: any) => {
        UpdateWorking({
            ...values,
            id: id
        })
            .unwrap()
            .then(() => {
                messageApi.open({
                    type: "success",
                    content: "Cập nhật thành công!",
                });
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
        <>
            <h2 className='text-center my-5 text-2xl font-semibold'>Cập nhật Hình thức làm việc</h2>
            {contextHolder}
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Name"
                    name="working_form"
                    rules={[
                        { required: true, message: 'Vui lòng nhập hình thức làm việc!' },
                        { min: 3, message: 'Tối thiểu 3 ký tự!' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Description"
                    name="description"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mô tả!' },
                        { min: 10, message: 'Tối thiểu 10 ký tự!' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button danger htmlType="submit">

                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default UpdateWorkingForm