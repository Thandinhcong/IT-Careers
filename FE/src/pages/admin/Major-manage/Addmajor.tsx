import { Link, useNavigate } from "react-router-dom"
import { EnterOutlined } from "@ant-design/icons"
import { Button, Form, Input, Skeleton, message } from 'antd';
import { IMajors } from "../../../interfaces";
import { useAddMajorMutation } from "../../../api/majorApi";



const AddMajors = () => {
    const [addMajor, { isLoading }] = useAddMajorMutation();
    const navigate = useNavigate();
    if (isLoading) return <Skeleton />
    const onFinish = (values: IMajors) => {
        addMajor(values)
            .unwrap()
            .then(() => {
                message.success("Thêm thành công")
                return navigate({
                    pathname: "/admin/major-manage"
                })
            });
    }

    return (
        <div>
            <Link to="/admin/jobposition-manage">Quay lại <EnterOutlined /></Link>
            <h2 className="m-6 text-2xl font-semibold">Thêm Chuyên Ngành</h2>
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
                <Form.Item<IMajors>
                    label="Chuyên Ngành "
                    name="major"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { min: 3, message: "Tối thiểu 3 ký tự" }
                    ]}
                >
                    <Input />
                </Form.Item>
                {/* <Form.Item<IMajors>
                    label="Mô tả "
                    name="description"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        // { pattern: /^\S{3,}$/, message: "Tên Chuyên Ngành phải trên 3 kí tự" }
                    ]}
                >
                    <Input />
                </Form.Item> */}


                <Form.Item labelAlign="left">
                    <Button type="primary" htmlType="submit" className="bg-blue-500">
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddMajors