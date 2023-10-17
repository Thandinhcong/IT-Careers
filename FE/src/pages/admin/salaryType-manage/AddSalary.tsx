import { Link, useNavigate } from "react-router-dom"
import { EnterOutlined } from "@ant-design/icons"
import { Button, Form, Input, message } from 'antd';
import { ISalaryType } from "../../../interfaces";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAddSalaryTypeMutation } from "../../../api/salaryType";

const AddSalary = () => {
    const [addSalary, { isLoading }] = useAddSalaryTypeMutation();
    const navigate = useNavigate();

    const onFinish = (values: ISalaryType) => {
        addSalary(values)
            .unwrap()
            .then(() => {
                message.success(`Thêm thành công`);
                navigate("/admin/salary-type-manage");
            });
    };

    return (
        <div>
            <Link to="/admin/salary-type-manage">Quay lại <EnterOutlined /></Link>
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
                <Form.Item<ISalaryType>

                    label="Mức lương"
                    name="salary_type"

                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { pattern: /^[1-9]\d*$/, message: 'Lương phải là số và không âm !' },
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

export default AddSalary