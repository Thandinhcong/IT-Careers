import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import { EnterOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, Row, Skeleton } from 'antd';

const Editcompany = () => {
    // const [addjobposition, { isLoading }] = useAddjobpositionMutation();
    // const navigate = useNavigate();

    // if (isLoading) return <Skeleton />
    // const onFinish = (values: any) => {
    //     addjobposition(values)
    //         .unwrap()
    //         .then(() => {
    //             return navigate({
    //                 pathname: "/admin/jobposition-manage"
    //             })
    //         });
    // }

    type FieldType = {
        namecompany?: string;
        taxcode?: number;
        address?: string;
        name?: string;
        founded_in?: Date;
        phone?: number;
        email?: string;
        office?: string;
        password: string;
        logo: string;
        web: string;
        desc: string;
        status: number;
    };
    return (
        <div >
            <Link to="/admin/company-manage">Quay lại <EnterOutlined /></Link>
            <h2 className="m-6 text-2xl font-semibold">Thêm Công Ty </h2>
            <Form className="mx-40"
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 400 }}
                initialValues={{ remember: true }}
                // onFinish={onFinish}
                labelWrap={true}
                autoComplete="off"
            >
                <Row gutter={60}>
                    <Col span={20}>
                        <Form.Item<FieldType>
                            label="Tên Công Ty "
                            name="namecompany"
                            rules={[
                                { required: true, message: 'Trường này không được bỏ trống !' },
                                { min: 6, message: " Phải trên 6 kí tự" }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Mã Số Thuế "
                            name="taxcode"
                            rules={[
                                { required: true, message: 'Trường này không được bỏ trống !' },
                                { min: 6, message: "Phải trên 6 kí tự" }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Địa Chỉ "
                            name="address"
                            rules={[
                                { required: true, message: 'Trường này không được bỏ trống !' },
                                { min: 6, message: " Phải trên 6 kí tự" }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={20}>
                        <Form.Item<FieldType>
                            label="Tên  "
                            name="name"
                            rules={[
                                { required: true, message: 'Trường này không được bỏ trống !' },
                                { min: 6, message: "Phải trên 6 kí tự" }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Ngày Thành Lập "
                            name="namecompany"
                            rules={[
                                { required: true, message: 'Trường này không được bỏ trống !' },
                                { min: 6, message: " Phải trên 6 kí tự" }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item<FieldType>
                            label="Số Điện Thoại "
                            name="phone"
                            rules={[
                                { required: true, message: 'Trường này không được bỏ trống !' },
                                { min: 6, message: "Phải trên 6 kí tự" }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Form.Item<FieldType>
                        label="Email "
                        name="email"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            { min: 6, message: " Phải trên 6 kí tự" }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Văn Phòng  "
                        name="office"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            { min: 6, message: "Phải trên 6 kí tự" }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Mật Khẩu"
                        name="password"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            { min: 6, message: " Phải trên 6 kí tự" }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Logo"
                        name="logo"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            { min: 6, message: "Phải trên 6 kí tự" }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Giấy Phép Kinh Doanh "
                        name="email"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            { min: 6, message: " Phải trên 6 kí tự" }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Website  "
                        name="web"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            { min: 6, message: "Phải trên 6 kí tự" }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Desc  "
                        name="desc"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            { min: 6, message: "Phải trên 6 kí tự" }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Trạng Thái  "
                        name="status"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            { min: 6, message: "Phải trên 6 kí tự" }
                        ]}
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item labelAlign="left">
                        <Button type="primary" htmlType="submit" className="bg-blue-500">
                            Update
                        </Button>
                    </Form.Item>
                </Row>
            </Form>
        </div>
    )
}

export default Editcompany