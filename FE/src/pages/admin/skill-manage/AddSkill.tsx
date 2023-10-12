import { Link, useNavigate } from "react-router-dom"
import { EnterOutlined } from "@ant-design/icons"
import { Button, Form, Input, message } from 'antd';
import { useAddSkillMutation } from "../../../api/skill";
import { ISkill } from "../../../interfaces";
import { pause } from "../../../utils/pause";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { countdown } from "../../../utils/coutdown";

const AddSkill = () => {
    const [addSkill, { isLoading }] = useAddSkillMutation();
    const navigate = useNavigate();

    const onFinish = (values: ISkill) => {
        addSkill(values)
            .unwrap()
            .then(async () => {
                countdown(3, (seconds) => {
                    message.success(`Thêm thành công sẽ chuyển trang sau ${seconds}s`);
                })
                await pause(3000);
                navigate("/admin/skill-manage");
            });
    };

    const onFinishFailed = (errorInfo: unknown) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div>
            <Link to="/admin/skill-manage">Quay lại <EnterOutlined /></Link>
            <h2 className="m-6 text-2xl font-semibold">Tạo kĩ năng</h2>
            <Form className="mx-40"
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 400 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
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
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Thêm kĩ năng"
                        )}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddSkill