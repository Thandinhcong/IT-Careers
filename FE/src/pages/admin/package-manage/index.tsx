import { Link } from "react-router-dom"
import { Button, Space, Table, Dropdown, Popconfirm, message, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMore, AiOutlineCheck } from "react-icons/ai";

interface DataType {
    key: string;
    title: string;
    coin: number;
    price: number;
    reduced_price: number;
    status: string[];
    type_account: string;
}
const confirm = () => {

    message.success('Click on Yes');
};

const cancel = () => {

    message.error('Click on No');
};
const items: MenuProps['items'] = [
    {
        label: <Button className="bg-yellow-400 border-none hover:bg-yellow-300 w-full" href="#">
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
            <Button type="primary" className="w-full" danger> <AiOutlineDelete className="inline-block mr-2 text-xl" />Xoá</Button >
        </Popconfirm>, key: '1'
    },
    {
        label: <Button className="bg-green-400 border-none hover:bg-green-300">
            <p className="text-white"><AiOutlineCheck className="inline-block mr-2 text-xl " />Duyệt</p>
        </Button>,
        key: '3'
    },

];
const PackageManage = () => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: 'title',
            key: 'title',

        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',

        },
        {
            title: 'Xu',
            dataIndex: 'coin',
            key: 'coin',

        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',

        },
        {
            title: 'Giảm giá',
            dataIndex: 'reduced_price',
            key: 'reduced_price',

        },
        {
            title: 'Loại tài khoản',
            dataIndex: 'type_account',
            key: 'type_account',

        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            render: (_, { status }) => (
                <>
                    {status.map((status) => {
                        let color = status.length > 10 ? 'geekblue' : 'green';
                        if (status === 'Chưa duyệt') {
                            color = 'geekblue';
                        }
                        if (status === 'Đã duyệt') {
                            color = 'green';
                        }
                        return (
                            <Tag color={color} key={status}>
                                {status.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
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
            title: 'John Brown',
            coin: 12345,
            price: 23456,
            reduced_price: 1234,
            status: ["Chưa duyệt"],
            type_account: "Ahihi",

        },
        {
            key: '2',
            title: 'John Brown',
            coin: 12345,
            price: 23456,
            reduced_price: 1234,
            status: ["Đã duyệt"],
            type_account: "Ahihi",

        },

    ];
    return (
        <div>
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold">Quản lý gói nạp</h2>
                <Button type="primary" className="bg-blue-500">
                    <Link to="add">Tạo gói nạp</Link>
                </Button>
            </div>
            <Table columns={columns} dataSource={data} />; {/* Chỉnh độ rộng của bảng  scroll={{ x: 1300 }}*/}
        </div>
    )
}

export default PackageManage