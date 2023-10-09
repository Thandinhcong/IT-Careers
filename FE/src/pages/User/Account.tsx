// import { MenuProps } from '@headlessui/react'
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import React from 'react'
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

interface MenuProps {
    items: MenuItem[];
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
                    <div className='my-10'>
                        <h2 className='font-bold'>Tài khoản đăng nhập</h2>
                        <div className='flex justify-between items-center'>
                            <p>lequocdat2312@gmail.com</p>
                            <Button
                                type='text'
                                className='bg-gray-50 flex items-center'>
                                <BsPencil />
                                Thay đổi
                            </Button>
                        </div>
                    </div>
                    <div>
                        <h2 className='font-bold flex items-center'>Họ và tên <AiOutlineQuestionCircle /></h2>
                        <div className='flex justify-between items-center'>
                            <p>Lê Quốc Đạt</p>
                            <Button
                                type='text'
                                className='bg-gray-50 flex items-center'>
                                <BsPencil />
                                Thay đổi
                            </Button>
                        </div>
                    </div>
                    <div className='my-10'>
                        <h2 className='font-bold flex items-center'>Địa chỉ email <AiOutlineQuestionCircle /></h2>
                        <div className='flex justify-between items-center'>
                            <p>lequocdat2312@gmail.com</p>
                            <Button
                                type='text'
                                className='bg-gray-50 flex items-center'>
                                <BsPencil />
                                Thay đổi
                            </Button>
                        </div>
                    </div>
                    <div>
                        <h2 className='font-bold flex items-center'>Số điện thoại<AiOutlineQuestionCircle /></h2>
                        <div className='flex justify-between items-center'>
                            <p>0398681298</p>
                            <Button
                                type='text'
                                className='bg-gray-50 flex items-center'>
                                <BsPencil />
                                Thay đổi
                            </Button>
                        </div>
                    </div>
                    <div className='my-10'>
                        <h2 className='font-bold'>Mật khẩu</h2>
                        <div className='flex justify-between items-center'>
                            <p>*********</p>
                            <Button
                                type='text'
                                className='bg-gray-50 flex items-center'>
                                <BsPencil />
                                Thay đổi
                            </Button>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Content>
    )
}

export default Account