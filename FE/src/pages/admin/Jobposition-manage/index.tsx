import { Link } from "react-router-dom"
import { Button, Space, Table, Dropdown, Popconfirm, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineMore } from "react-icons/ai";

interface DataType {
    key: string;
    name: string;
}
const confirm = () => {

    message.success('Click on Yes');
};

const cancel = () => {

    message.error('Click on No');
};
const items: MenuProps['items'] = [
    {
        label: <Button className="bg-yellow-400 border-none hover:bg-yellow-300" href="/admin/jobposition-manage/edit-jobposition">
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
const JobpositionManage = () => {
    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: 'key',
            key: 'key',
            width: 10,
        },
        {
            title: 'Chức Vụ',
            dataIndex: 'name',
            key: 'name',
            width: 50,
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
            name: 'Nhân Viên ',
        },
        {
            key: '2',
            name: 'Trưởng Phòng',
        },
        {
            key: '3',
            name: 'Phó Giám Đốc',
        },
    ];
    return (
        <div>
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold">Quản lý kĩ năng</h2>
                <Button type="primary" className="bg-blue-500">
                    <Link to="create-jobposition">Thêm Chức Vụ</Link>
                </Button>
            </div>

            <Table columns={columns} dataSource={data} />; {/* Chỉnh độ rộng của bảng */}

        </div>
    )
}

export default JobpositionManage