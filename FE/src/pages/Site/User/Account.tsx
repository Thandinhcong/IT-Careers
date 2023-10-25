import { Button, Form, Input, Layout, Menu, Select, theme } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import React, { useEffect } from 'react'
import { AiOutlineUser, AiOutlineLock, AiOutlineFile, AiOutlineQuestionCircle, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { LuActivitySquare } from 'react-icons/lu'
import { Link, useNavigate } from 'react-router-dom';
import { useEditCandidateMutation, useGetCandidatesQuery } from '../../../api/accountApi'
import { IAccount } from '../../../interfaces'
import { pause } from '../../../utils/pause'

type Props = {}
interface MenuItem {
    key: React.Key;
    icon?: React.ReactNode;
    children?: MenuItem[];
    label: React.ReactNode;
}

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items: MenuItem[] = [
    getItem('Thông tin liên hệ', '/account', <AiOutlineUser />),
    getItem('Đổi mật khẩu', '', <AiOutlineLock />),
    getItem('Thiết lập công ty', '', <LuActivitySquare />),
    getItem('Giấy phép kinh doanh', '', <AiOutlineFile />),
];
const Account = (props: Props) => {
    const [editCandidate, { isLoading: isUpdateLoading }] = useEditCandidateMutation();
    const navigate = useNavigate();
    const { data: candidateData } = useGetCandidatesQuery();
    const [form] = Form.useForm();

    const genderValues = {
        0: 'Không xác định',
        1: 'Nam',
        2: 'Nữ',
    };

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    useEffect(() => {
        form.setFieldsValue({
            name: candidateData?.candidate?.name,
            email: candidateData?.candidate?.email,
            phone: candidateData?.candidate?.phone,
            address: candidateData?.candidate?.address,
            gender: genderValues[candidateData?.candidate?.gender],
            type: candidateData?.candidate?.type,
            coin: candidateData?.candidate?.coin,
        });
    }, [candidateData]);

    const onFinish = (values: IAccount) => {
        editCandidate({ ...values })
            .unwrap()
            .then(async () => {
                console.log(values);
                await pause(3000);
                navigate("/account");
            });
    };
    console.log(candidateData);



    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <Content style={{ padding: '0 20px' }} className='max-w-screen-xl'>
            <Layout style={{ background: colorBgContainer }}>
                <Sider style={{ background: colorBgContainer, margin: '0 120px' }} width={200}>
                    <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%' }}>
                        {items.map(item => (
                            <Menu.Item key={item.key} icon={item.icon}>
                                <Link to={`${item.key}`}>{item.label}</Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Sider>
                <Content style={{ padding: '0 24px', minHeight: 280 }} className='leading-8'>
                    <h1 className='font-bold text-base mb-8'>Thông tin tài khoản</h1>
                    <div>
                        <h2 className='font-bold'>ID tài khoản</h2>
                        <p>1231390</p>
                    </div>
                    <Form
                        // className="mx-40"
                        form={form}
                        name="basic"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ maxWidth: 400 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        labelWrap={true}
                        autoComplete="off">
                        <div>
                            <h2 className='font-bold flex items-center'>Họ và tên <AiOutlineQuestionCircle /></h2>
                            <Form.Item<IAccount>
                                // label=""
                                name="name"
                                rules={[
                                    { required: true, message: 'Trường này không được bỏ trống !' },
                                    { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <h2 className='font-bold flex items-center'>Email<AiOutlineQuestionCircle /></h2>
                            <Form.Item<IAccount>
                                // label=""
                                name="email"
                                rules={[
                                    { required: true, message: 'Trường này không được bỏ trống !' },
                                    { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <h2 className='font-bold flex items-center'>Số điện thoại<AiOutlineQuestionCircle /></h2>
                            <Form.Item<IAccount>
                                // label=""
                                name="phone"
                                rules={[
                                    { required: true, message: 'Trường này không được bỏ trống !' },
                                    { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <h2 className='font-bold flex items-center'>Địa chỉ<AiOutlineQuestionCircle /></h2>
                            <Form.Item<IAccount>
                                // label=""
                                name="address"
                                rules={[
                                    { required: true, message: 'Trường này không được bỏ trống !' },
                                    // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <h2 className='font-bold flex items-center'>Giới tính<AiOutlineQuestionCircle /></h2>
                            <Form.Item<IAccount>
                                // label=""
                                name="gender"
                                rules={[
                                    { required: true, message: 'Trường này không được bỏ trống !' },
                                    // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                                ]}
                            >
                                <Select>
                                    <Select.Option value={0}>Không xác định</Select.Option>
                                    <Select.Option value={1}>Nam</Select.Option>
                                    <Select.Option value={2}>Nữ</Select.Option>
                                </Select>
                            </Form.Item>
                            <h2 className='font-bold flex items-center'>Loại<AiOutlineQuestionCircle /></h2>
                            <Form.Item<IAccount>
                                // label=""
                                name="type"
                                rules={[
                                    { required: true, message: 'Trường này không được bỏ trống !' },
                                    // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <h2 className='font-bold flex items-center'>Xu<AiOutlineQuestionCircle /></h2>
                            <Form.Item<IAccount>
                                // label=""
                                name="coin"
                                rules={[
                                    { required: true, message: 'Trường này không được bỏ trống !' },
                                    // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item labelAlign="left">
                                <Button type="primary" htmlType="submit" className="bg-blue-500">
                                    {isUpdateLoading ? (
                                        <AiOutlineLoading3Quarters className="animate-spin" />
                                    ) : (
                                        "Cập nhật thông tin"
                                    )}
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </Content>
            </Layout>
        </Content>
    )
}

export default Account