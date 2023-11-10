import { Link, useNavigate, useParams } from "react-router-dom"
import { EnterOutlined } from "@ant-design/icons"
import { Button, Form, Input, message } from 'antd';
import { ILevel } from "../../../interfaces";
import { pause } from "../../../utils/pause";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect } from "react";
import { useEditLevelMutation, useGetLevelByIdQuery } from "../../../api/levelApi";

const EditLevel = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [editLevel, { isLoading: isUpdateLoading }] = useEditLevelMutation();
    const { data: levelData } = useGetLevelByIdQuery(id || "");
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            level: levelData?.level?.level,
            description: levelData?.level?.description
        });
    }, [levelData]);

    const onFinish = (values: ILevel) => {
        editLevel({ ...values, id: Number(id) })
            .unwrap()
            .then(async () => {
                await pause(3000);
                message.success("Cập nhật thành công")
                navigate("/admin/level-manage");
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div>
            <Link to="/admin/level-manage">Quay lại <EnterOutlined /></Link>
            <h2 className="m-6 text-2xl font-semibold">Sửa trình độ</h2>
            <Form className="mx-40"
                form={form}
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
                <Form.Item<ILevel>
                    label="Tên trình độ"
                    name="level"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<ILevel>
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
                            "Sửa trình độ"
                        )}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditLevel