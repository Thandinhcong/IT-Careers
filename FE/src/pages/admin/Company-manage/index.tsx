import { Link } from "react-router-dom"
import { Button, Space, Table, Tag, Dropdown } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FolderViewOutlined, CheckOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { AiOutlineEdit, AiOutlineMore } from "react-icons/ai";
interface DataType {
    key: string;
    name: string;
    tax: number;
    phone: number;
    address: string;
    email: string;
    tags: string[];
}

const items: MenuProps['items'] = [
    { label: <a href="#">Xem chi tiết </a>, key: '0', icon: <FolderViewOutlined style={{ fontSize: '18px', color: '#3eb7ee' }} /> },
    {
        label: <Button className="bg-yellow-400 border-none hover:bg-yellow-300" href="company-manage/edit-company">
            <p className="text-white"><AiOutlineEdit className="inline-block mr-2 text-xl " />Sửa</p>
        </Button>,
        key: '0'
    },
];
const PostManage = () => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'Tên Công Ty',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: 'Mã Số Thuế',
            dataIndex: 'tax',
            key: 'tax',
        },
        {
            title: 'Địa Chỉ ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Status',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 9 ? 'geekblue' : 'green';
                        if (tag === 'Chặn') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
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
            name: 'Topdev',
            tax: 12345678924234,
            phone: 1233445446567,
            address: 'New York No. 1 Lake Park',
            email: 'NewYork@gmail.com',
            tags: ['Chưa Kích Hoạt'],
        },
        {
            key: '2',
            name: 'TopCV',
            tax: 1234567891231,
            phone: 12334354556477,
            address: 'London No. 1 Lake Park',
            email: 'London@gmail.com',
            tags: ['Kích Hoạt'],
        },
        {
            key: '3',
            name: 'ITCassers',
            tax: 123456789012,
            phone: 123132435454,
            address: 'Sydney No. 1 Lake Park',
            email: 'Sydney@gmail.com',
            tags: ['Chặn'],
        },
    ];
    return (
        <div>
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold">Quản lý Công Ty</h2>
                <Button type="primary" className="bg-blue-500">
                    <Link to={"create-company"}>Thêm Công Ty</Link>
                </Button>
            </div>

            <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />; {/* Chỉnh độ rộng của bảng */}

        </div>
    )
}

export default PostManage