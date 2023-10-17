import { Link, useNavigate, useParams } from "react-router-dom"
import { EnterOutlined } from "@ant-design/icons"
import { Button, Form, Input, message } from 'antd';
import { ISalaryType } from "../../../interfaces";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect } from "react";
import { useEditSalaryTypeMutation, useGetSalaryTypeByIdQuery } from "../../../api/salaryType";

const EditSalary = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [EditSalaryType, { isLoading: isUpdateLoading }] = useEditSalaryTypeMutation();
    const { data: salaryTypeData } = useGetSalaryTypeByIdQuery(id || "");
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            salary_type: salaryTypeData?.salaryType?.salary_type,
        });
    }, [salaryTypeData]);
    const onFinish = (values: ISalaryType) => {
        EditSalaryType({ ...values, id: Number(id) })
            .unwrap()
            .then(() => {
                message.success(`Cập nhật thành công`);
                navigate("/admin/salary-type-manage");
            });
    };
    return (
        <div>
            <Link to="/admin/salary-type-manage">Quay lại <EnterOutlined /></Link>
            <h2 className="m-6 text-2xl font-semibold">Cập nhật loại lương</h2>
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
                        {isUpdateLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Cập nhật loại lương"
                        )}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditSalary