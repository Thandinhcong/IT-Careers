// import { MenuProps } from '@headlessui/react'
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import React, { useState } from 'react'
import { AiOutlineUser, AiOutlineLock, AiOutlineFile, AiOutlineQuestionCircle } from 'react-icons/ai'
import { BsPencil } from 'react-icons/bs'
import { LuActivitySquare } from 'react-icons/lu'
import { Link, Outlet } from 'react-router-dom'

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
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [formVisible, setFormVisible] = useState(false);
    const [formData, setFormData] = useState(() => {
        const savedUserInfo = localStorage.getItem('userInfo');
        return savedUserInfo ? JSON.parse(savedUserInfo) : {
            fullName: '',
            email: '',
            phoneNumber: '',
            password: ''
        };
    });
    const handleChangeInfo = (key: string, value: string) => {
        setFormData((prevState: any) => ({
            ...prevState,
            [key]: value,
        }));
    };
    const hidePassword = (password: string | any[]) => {
        return '*'.repeat(password.length);
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
                    <div>
                        <h2 className='font-bold flex items-center'>Họ và tên <AiOutlineQuestionCircle /></h2>
                        {formVisible ? (
                            <div className='flex justify-between items-center'>
                                <input
                                    type='text'
                                    value={formData.fullName}
                                    onChange={e => handleChangeInfo('fullName', e.target.value)}
                                />
                                <Button
                                    type='text'
                                    className='bg-gray-50 flex items-center'
                                    onClick={() => {
                                        // Lưu thông tin đã thay đổi và ẩn form
                                        localStorage.setItem('userInfo', JSON.stringify(formData));
                                        setFormVisible(false);
                                    }}
                                >
                                    Lưu
                                </Button>
                            </div>
                        ) : (
                            <div className='flex justify-between items-center'>
                                <p>{formData.fullName}</p>
                                <Button
                                    type='text'
                                    className='bg-gray-50 flex items-center'
                                    onClick={() => {
                                        // Hiển thị form khi người dùng ấn nút "Thay đổi"
                                        setFormVisible(true);
                                    }}
                                >
                                    <BsPencil />
                                    Thay đổi
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className='my-10'>
                        <h2 className='font-bold flex items-center'>Địa chỉ email <AiOutlineQuestionCircle /></h2>
                        {formVisible ? (
                            <div className='flex justify-between items-center'>
                                <input
                                    type='text'
                                    value={formData.email}
                                    onChange={e => handleChangeInfo('email', e.target.value)}
                                />
                                <Button
                                    type='text'
                                    className='bg-gray-50 flex items-center'
                                    onClick={() => {
                                        // Lưu thông tin đã thay đổi và ẩn form
                                        localStorage.setItem('userInfo', JSON.stringify(formData));
                                        setFormVisible(false);
                                    }}
                                >
                                    Lưu
                                </Button>
                            </div>
                        ) : (

                            <div className='flex justify-between items-center'>
                                <p>{formData.email}</p>
                                <Button
                                    type='text'
                                    className='bg-gray-50 flex items-center'
                                    onClick={() => {
                                        // Hiển thị form khi người dùng ấn nút "Thay đổi"
                                        setFormVisible(true);
                                    }}
                                >
                                    <BsPencil />
                                    Thay đổi
                                </Button>
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className='font-bold flex items-center'>Số điện thoại<AiOutlineQuestionCircle /></h2>
                        {formVisible ? (
                            <div className='flex justify-between items-center'>
                                <input
                                    type='text'
                                    value={formData.phoneNumber}
                                    onChange={e => handleChangeInfo('phoneNumber', e.target.value)}
                                />
                                <Button
                                    type='text'
                                    className='bg-gray-50 flex items-center'
                                    onClick={() => {
                                        // Lưu thông tin đã thay đổi và ẩn form
                                        localStorage.setItem('userInfo', JSON.stringify(formData));
                                        setFormVisible(false);
                                    }}
                                >
                                    Lưu
                                </Button>
                            </div>
                        ) : (
                            <div className='flex justify-between items-center'>
                                <p>{formData.phoneNumber}</p>
                                <Button
                                    type='text'
                                    className='bg-gray-50 flex items-center'
                                    onClick={() => {
                                        // Hiển thị form khi người dùng ấn nút "Thay đổi"
                                        setFormVisible(true);
                                    }}
                                >
                                    <BsPencil />
                                    Thay đổi
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className='my-10'>
                        <h2 className='font-bold'>Mật khẩu</h2>
                        {formVisible ? (
                            <div className='flex justify-between items-center'>
                                <input
                                    type='text'
                                    value={formData.password}
                                    onChange={e => handleChangeInfo('password', e.target.value)}
                                />
                                <Button
                                    type='text'
                                    className='bg-gray-50 flex items-center'
                                    onClick={() => {
                                        // Lưu thông tin đã thay đổi và ẩn form
                                        localStorage.setItem('userInfo', JSON.stringify(formData));
                                        setFormVisible(false);
                                    }}
                                >
                                    Lưu
                                </Button>
                            </div>
                        ) : (
                            <div className='flex justify-between items-center'>
                                <p>{hidePassword(formData.password)}</p>
                                <Button
                                    type='text'
                                    className='bg-gray-50 flex items-center'
                                    onClick={() => {
                                        // Hiển thị form khi người dùng ấn nút "Thay đổi"
                                        setFormVisible(true);
                                    }}
                                >
                                    <BsPencil />
                                    Thay đổi
                                </Button>
                            </div>
                        )}
                    </div>
                </Content>
            </Layout>
        </Content>
    )
}

export default Account