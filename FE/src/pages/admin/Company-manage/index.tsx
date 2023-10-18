import { Link } from "react-router-dom"
import { Button, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FolderViewOutlined, CheckOutlined } from '@ant-design/icons';

interface DataType {
    key: string;
    name: string;
    tax: number;
    phone: number;
    address: string;
    email: string;
    status: number;
}

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
            key: 'status',
            dataIndex: 'status',
            render: (status: number | undefined) => {
                let color;
                let text;

                if (status === 1) {
                    color = 'green';
                    text = 'Kích Hoạt';

                } else if (status === 0) {
                    color = 'volcano';
                    text = 'Chặn';
                } else {
                    color = 'geekblue';
                    text = 'Chưa Kích Hoạt';
                }

                return (
                    <Tag color={color}>
                        {text}
                    </Tag>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: ({ key: id, status }: { key: string | number, status: number }) => (
                <div className="flex -mx-7">
                    {/* <Button type="link" onClick={() => handleUpdateStatus(id, status)}>
                        <CheckOutlined style={{ fontSize: '18px', color: '#4eff3a' }} />
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin inline-block" />
                        ) : (
                            <span className='text-[#49eb47]'>Đổi trạng thái</span>
                        )}
                    </Button > */}
                    <Button type='link' className="text-[#3eb7ee] px-0">
                        <FolderViewOutlined style={{ fontSize: '15px', color: '#3eb7ee' }} />
                        Xem Thêm
                    </Button>
                </div>
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
            status: 1,

        },
        {
            key: '2',
            name: 'TopCV',
            tax: 1234567891231,
            phone: 12334354556477,
            address: 'London No. 1 Lake Park',
            email: 'London@gmail.com',
            status: 2,

        },
        {
            key: '3',
            name: 'ITCassers',
            tax: 123456789012,
            phone: 123132435454,
            address: 'Sydney No. 1 Lake Park',
            email: 'Sydney@gmail.com',
            status: 0,
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

