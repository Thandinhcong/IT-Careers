import { Link, useNavigate, useParams } from "react-router-dom"
import { EnterOutlined } from "@ant-design/icons"
import { Button, Form, Input, message } from 'antd';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useEffect } from "react";
import { useGetOneTypeJobPostQuery, useUpdateTypeJobPostMutation } from "../../../api/admin/postingPackage";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const UpdatePostingPackages = () => {
    const { id } = useParams();
    const [updatePostingPackages] = useUpdateTypeJobPostMutation();
    const navigate = useNavigate();
    const { data, isLoading } = useGetOneTypeJobPostQuery(id || "");
    const listOne = data?.typejob
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            name: listOne?.name,
            salary: listOne?.salary,
            desc: listOne?.desc
        })
    }, [listOne])
    const onFinish = (values: any) => {
        updatePostingPackages({
            ...values,
            id: id,
        })
            .unwrap()
            .then(() => {
                message.success(`Thêm thành công`);
                navigate("/admin/posting-packages");
            });
        console.log("Dữ loeuej gửi lên", values)
    };



    return (
        <div>
            <Link to="/admin/posting-packages">Quay lại <EnterOutlined /></Link>
            <h2 className="m-6 text-2xl font-semibold">Cập nhật gói đăng</h2>
            <Form className="mx-40"
                name="basic"
                form={form}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 400 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                labelWrap={true}
                autoComplete="off"
            >
                <Form.Item
                    label="name"
                    name="name"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Giá"
                    name="salary"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                        { pattern: /^[1-9]\d*$/, message: 'Lương phải là số và không âm !' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Mô tả"
                    name="desc"
                    rules={[
                        { required: true, message: 'Trường này không được bỏ trống !' },
                    ]}
                    className="w-[800px]"
                >
                    <CKEditor
                        editor={ClassicEditor}
                        data={listOne?.desc}
                        onChange={(_event, editor) => {
                            const data = editor.getData();
                            form.setFieldsValue({
                                desc: data
                            });
                        }}
                    />
                </Form.Item>
                <Form.Item labelAlign="left">
                    <Button type="primary" htmlType="submit" className="bg-blue-500">
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            "Cập nhật kĩ năng"
                        )}
                    </Button>
                </Form.Item>
            </Form>
        </div >
    )
}

export default UpdatePostingPackages