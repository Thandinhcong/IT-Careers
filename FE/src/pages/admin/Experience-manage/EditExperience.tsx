import { Link, useNavigate, useParams } from "react-router-dom"
import { EnterOutlined } from "@ant-design/icons"
import { Button, Form, Input, message } from 'antd';
import { IExperience } from "../../../interfaces";
import { pause } from "../../../utils/pause";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect } from "react";
import { useEditExperienceMutation, useGetExperienceByIdQuery } from "../../../api/experienceApi";

const EditExperience = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [editExperience, { isLoading: isUpdateLoading }] = useEditExperienceMutation();
    const { data: experienceData } = useGetExperienceByIdQuery(id || "");
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            experience: experienceData?.experience?.experience,
            description: experienceData?.experience?.description
        });
    }, [experienceData]);

    const onFinish = (values: IExperience) => {
        editExperience({ ...values, id: Number(id) })
            .unwrap()
            .then(async () => {
                await pause(3000);
                message.success("Cập nhật thành công");
                navigate("/admin/experience-manage");
            });
    };



    return (
        <div>
            <Link to="/admin/experience-manage">Quay lại <EnterOutlined /></Link>
            <h2 className="m-6 text-2xl font-semibold">Sửa kinh nghiệm</h2>
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
                <Form.Item<IExperience>
                    label="Tên kinh nghiệm"
                    name="experience"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<IExperience>
                    label="Mô tả"
                    name="description"
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
                            "Sửa kinh nghiệm"
                        )}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditExperience