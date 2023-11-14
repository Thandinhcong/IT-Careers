import { Link } from "react-router-dom"
import { Button, Table, Popconfirm, message, Skeleton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineLoading3Quarters } from "react-icons/ai";
import { ILevel } from "../../../interfaces";
import { useDeleteLevelMutation, useGetLevelQuery } from "../../../api/levelApi";

const cancel = () => {
    message.info('Huỷ xoá');
};
const LevelManage = () => {
    const { data, isLoading } = useGetLevelQuery();

    const [removeLevel, { isLoading: isRemoveLoading }] = useDeleteLevelMutation();
    if (isLoading) return <Skeleton loading />;


    const levelData = data?.data?.map(({ id, level, description }: ILevel) => {
        return {
            key: id,
            level,
            description,
        }
    })
    const confirm = (id: number | string) => {
        removeLevel(id);
        setTimeout(() => {
            message.success('Xoá thành công');
        }, 1000);
    };
    const columns: ColumnsType<any> = [
        {
            title: 'STT',
            key: 'index',
            width: 10,
            render: (_text, _record, index) => index + 1,
        },
        {
            title: 'Tên trình độ',
            dataIndex: 'level',
            key: 'level',
            width: 50,
        },
        {
            title: 'Mô tả trình độ',
            dataIndex: 'description',
            key: 'description',
            width: 50,
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: ({ key: id }: { key: string | number }) => (
                <div className="flex gap-2">
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => confirm(id)}
                        onCancel={cancel}
                        okText="Yes"
                        okType="default"
                        cancelText="No"
                    >
                        <Button type="primary" danger> <AiOutlineDelete className="inline-block mr-2 text-xl" />
                            {isRemoveLoading ? (
                                <AiOutlineLoading3Quarters className="animate-spin inline-block" />
                            ) : (
                                "Xóa"
                            )}
                        </Button >
                    </Popconfirm>
                    <Button className="bg-yellow-400 border-none hover:bg-yellow-300" href={`level-manage/edit/${id}`}>
                        <p className="text-white"><AiOutlineEdit className="inline-block mr-2 text-xl " />Sửa</p>
                    </Button>
                </div>
            ),
        },

    ];
    return (
        <div>
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold">Quản lý trình độ</h2>
                <Button type="primary" className="bg-blue-500">
                    <Link to="add">Thêm kinh nghiệm</Link>
                </Button>
            </div>

            <Table columns={columns} dataSource={levelData} />

        </div>
    )
}

export default LevelManage