import { Layout, Menu, theme } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import React, { useEffect } from 'react'
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai'
import { Link, Outlet } from 'react-router-dom';

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
    getItem('Đổi mật khẩu', '/account/change_pass', <AiOutlineLock />),
];

const Account = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
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
                    <Outlet />
                </Content>
            </Layout>
        </Content>
    )
}

export default Account