import { Link, useNavigate, useParams } from "react-router-dom"
import { EnterOutlined } from "@ant-design/icons"
import { Button, Form, Input, message } from 'antd';
import { useEditSkillMutation, useGetSkillByIdQuery } from "../../../api/skill";
import { ISkill } from "../../../interfaces";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect } from "react";

const AddSkill = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [editSkill, { isLoading: isUpdateLoading }] = useEditSkillMutation();
    const { data: skillData } = useGetSkillByIdQuery(id || "");
    const [form] = Form.useForm();


    useEffect(() => {
        form.setFieldsValue({
            skill: skillData?.skill?.skill,
            description: skillData?.skill?.description,
        });
    }, [skillData]);
    const onFinish = (values: ISkill) => {
        editSkill({ ...values, id: Number(id) })
            .unwrap()
            .then(() => {
                message.success(`Cập nhật thành công`);
                navigate("/admin/skill-manage");
            });
    };
    return (
        <div>
            <Link to="/admin/skill-manage">Quay lại <EnterOutlined /></Link>
            <h2 className="m-6 text-2xl font-semibold">Sửa kĩ năng</h2>
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
                <Form.Item<ISkill>
                    label="Tên kĩ năng"
                    name="skill"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item labelAlign="left">
                    <Button type="primary" htmlType="submit" className="bg-blue-500">
                        {isUpdateLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Sửa kỹ năng"
                        )}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddSkill