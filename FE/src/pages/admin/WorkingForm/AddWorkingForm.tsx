import { Button, Form, Input, Skeleton } from 'antd';
import { useAddWorkingFormMutation } from '../../../api/workingFormApi';
import { useNavigate } from 'react-router-dom';



const AddWorkingForm = () => {
    const [addWorkForm, { isLoading }] = useAddWorkingFormMutation();
    const navigate = useNavigate();

    if (isLoading) return <Skeleton />
    const onFinish = (values: any) => {
        addWorkForm(values)
            .unwrap()
            .then(() => {
                return navigate({
                    pathname: "/admin/working-form"
                })
            });
    }


    type FieldType = {
        working_form?: string;
        description?: string;
    };
    return (
        <Form

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
    )
}

export default AddWorkingForm