import { Link } from "react-router-dom"
import { Button, Space, Table, Tag, Dropdown, message, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FolderViewOutlined, CheckOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMore } from "react-icons/ai";
interface DataType {
    key: string;
    name: string;
    email: string;
    phone_number: string;
    password: string;
    avatar: string;
    // status: number;
    // remember_token: boolean;
}

const confirm = () => {

    message.success('Click on Yes');
};

const cancel = () => {

    message.error('Click on No');
};

const items: MenuProps['items'] = [
    {
        label: <Button className="bg-blue-400 border-none hover:bg-blue-300" href="#">
            <p className="text-white"><AiOutlineEdit className="inline-block mr-2 text-xl " />Sửa</p>
        </Button>,
        key: '0'
    },
    {
        label: <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            okType="default"
            cancelText="No"
        >
            <Button type="primary" danger> <AiOutlineDelete className="inline-block mr-2 text-xl" />Xoá</Button >
        </Popconfirm>, key: '1'
    },
];
const AccountManage = () => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'Username',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'password',
            key: 'password',
        },
        {
            title: 'Ảnh đại diện',
            dataIndex: 'avatar',
            key: 'avatar',
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: () => (
                <Dropdown menu={{ items }} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()} className="text-center" >
                        <Space>
                            <AiOutlineMore />
                        </Space>
                    </a>
                </Dropdown>

            ),
        },
    ];
    const data: DataType[] = [
        {
            key: '1',
            name: 'Le Quoc Dat',
            email: 'dat123@gmail.com',
            phone_number: '012345678',
            password: 'password',
            avatar: '1.jpg',
        },
        {
            key: '2',
            name: 'Nguyen Duy Trung',
            email: 'trung123@gmail.com',
            phone_number: '012345678',
            password: 'password',
            avatar: '2.jpg',
        },
        {
            key: '3',
            name: 'Nguyen Duy Tu',
            email: 'tu123@gmail.com',
            phone_number: '012345678',
            password: 'password',
            avatar: '3.jpg',
        },
    ];
    return (
        <div>
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold">Quản lý tài khoản</h2>
                <Button type="primary" className="bg-blue-500">
                    <Link to={"create-account"}>Thêm tài khoản</Link>
                </Button>
            </div>

            <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} /> {/* Chỉnh độ rộng của bảng */}

        </div>
    )
}

export default AccountManage