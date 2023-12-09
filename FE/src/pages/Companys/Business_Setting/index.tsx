import { Layout, Menu, theme } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import React from 'react'
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai'
import { LuActivitySquare } from 'react-icons/lu'
import { Link, Outlet } from 'react-router-dom'

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
    getItem('Thông tin liên hệ', 'business_setting/contact', <AiOutlineUser />),
    getItem('Đổi mật khẩu', 'business_setting/changepass', <AiOutlineLock />),
    getItem('Thiết lập công ty', 'business_setting/company', <LuActivitySquare />),
    // getItem('Giấy phép kinh doanh', 'business_setting/business', <AiOutlineFile />),
];


const LayoutBusinessSetting = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Content style={{ padding: '0 50px', marginTop: '95px' }}>
            <Layout style={{ background: colorBgContainer }}>
                <Sider style={{ background: colorBgContainer }} width={200}>
                    <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%' }}>
                        {items.map(item => (
                            <Menu.Item key={item.key} icon={item.icon}>
                                <Link to={`/business/${item.key}`}>{item.label}</Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Sider>
                <Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <Outlet />
                </Content>
            </Layout>
        </Content>
    )
}

export default LayoutBusinessSetting