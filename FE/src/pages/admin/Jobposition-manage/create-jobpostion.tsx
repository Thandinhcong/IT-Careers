import { Link, useNavigate } from "react-router-dom"
import { EnterOutlined } from "@ant-design/icons"
import { Button, Form, Input, Skeleton } from 'antd';
import { useAddjobpositionMutation } from "../../../api/jobpositionApi";



const AddJobposition = () => {
    const [addjobposition, { isLoading }] = useAddjobpositionMutation();
    const navigate = useNavigate();

    if (isLoading) return <Skeleton />
    const onFinish = (values: any) => {
        addjobposition(values)
            .unwrap()
            .then(() => {
                return navigate({
                    pathname: "/admin/jobposition-manage"
                })
            });
    }

    type FieldType = {
        job_position?: string;
        description?: string;
    };
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
                labelWrap={true}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Chức Vụ "
                    name="job_position"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { min: 6, message: " Phải trên 6 kí tự" }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Description "
                    name="description"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { min: 6, message: "Phải trên 6 kí tự" }
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