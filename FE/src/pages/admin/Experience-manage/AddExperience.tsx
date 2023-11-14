import { Link, useNavigate } from "react-router-dom"
import { EnterOutlined } from "@ant-design/icons"
import { Button, Form, Input, message } from 'antd';
import { IExperience } from "../../../interfaces";
import { pause } from "../../../utils/pause";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAddExperienceMutation } from "../../../api/experienceApi";

const AddExperience = () => {
    const [addExperience, { isLoading }] = useAddExperienceMutation();
    const navigate = useNavigate();

    const onFinish = (values: IExperience) => {
        addExperience(values)
            .unwrap()
            .then(async () => {
                await pause(3000);
                message.success("Thêm thành công")
                navigate("/admin/experience-manage");
            });
    };


    return (
        <div>
            <Link to="/admin/experience-manage">Quay lại <EnterOutlined /></Link>
            <h2 className="m-6 text-2xl font-semibold">Tạo kinh nghiệm</h2>
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
                <Form.Item<IExperience>
                    label="Tên kinh nghiệm"
                    name="experience"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { min: 6, message: "Tên kinh nghiệm phải trên 6 kí tự" }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<IExperience>
                    label="Mô tả kinh nghiệm"
                    name="description"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { min: 6, message: "Tên kinh nghiệm phải trên 6 kí tự" }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item labelAlign="left">
                    <Button type="primary" htmlType="submit" className="bg-blue-500">
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Thêm kinh nghiệm"
                        )}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddExperience