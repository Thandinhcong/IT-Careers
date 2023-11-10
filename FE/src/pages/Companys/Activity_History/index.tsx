import React from 'react';
import { AiOutlineSetting, AiOutlineUnorderedList } from 'react-icons/ai';
import { LiaExchangeAltSolid } from 'react-icons/lia';
import { FiBriefcase, FiUsers } from 'react-icons/fi';
import { IoIosOptions } from 'react-icons/io';
import { Layout, Menu, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
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
    getItem('Tất cả', '', <AiOutlineUnorderedList />),
    getItem('Giao dịch', 'transaction', <LiaExchangeAltSolid />),
    getItem('Tài khoản', 'account', <AiOutlineSetting />),
    getItem('Tin tuyển dụng', 'recruitment', <FiBriefcase />),
    getItem('Ứng viên', 'candidate', <FiUsers />),
    getItem('Khác', 'other', <IoIosOptions />),
];

const Activity_History = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Content style={{ padding: '0 50px', marginTop: '95px' }}>
            <Layout style={{ background: colorBgContainer }}>
                <Sider style={{ background: colorBgContainer }} width={800}>
                    <Menu mode="horizontal" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
                        {items.map(item => (
                            <Menu.Item key={item.key} icon={item.icon}>
                                <Link to={`/business/activity_history/${item.key}`}>{item.label}</Link>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Sider>
            </Layout>
            <hr />
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                <Outlet />
            </Content>
        </Content>

    )
};

export default Activity_History