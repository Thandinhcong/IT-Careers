import { Link } from "react-router-dom"
import { Button, Space, Table, Tag, Dropdown } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FolderViewOutlined, CheckOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { AiOutlineMore } from "react-icons/ai";
interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const items: MenuProps['items'] = [
    { label: <a href="https://www.antgroup.com">Xem chi tiết</a>, key: '0', icon: <FolderViewOutlined style={{ fontSize: '18px', color: '#3eb7ee' }} /> },
    { label: <a href="https://www.aliyun.com">Duyệt bài đăng</a>, key: '1', icon: <CheckOutlined style={{ fontSize: '18px', color: '#4eff3a' }} /> },
];
const PostManage = () => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'Tiêu đề',
            dataIndex: 'name',
            key: 'name',

        },
        {
            title: 'Công ty đăng bài',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Thời gian đăng',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Email',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Status',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'Không duyệt') {
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
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['Chưa duyệt'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['Không duyệt'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['Duyệt'],
        },
    ];
    return (
        <div>
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold">Quản lý bài đăng</h2>
                <Button type="primary" className="bg-blue-500">
                    <Link to={"create-post"}>Tạo bài đăng</Link>
                </Button>
            </div>

            <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />; {/* Chỉnh độ rộng của bảng */}

        </div>
    )
}

export default PostManage