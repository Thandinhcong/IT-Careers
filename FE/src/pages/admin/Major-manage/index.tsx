import { Link } from "react-router-dom"
import { Button, Table, Popconfirm, Skeleton } from 'antd';
import { ColumnsType } from "antd/es/table";
import { useDeleteMajorMutation, useGetMajorQuery } from "../../../api/majorApi";
import { IMajors } from "../../../interfaces";

const MajorManage = () => {
    const { data, isLoading } = useGetMajorQuery();

    const [deleteMajor, { isLoading: isRemoveLoading }] = useDeleteMajorMutation();
    if (isLoading) return <Skeleton loading />;
    if (isRemoveLoading) return <Skeleton />
    const dataSource = data?.major?.map((item: IMajors) => {

        return {
            key: item?.id,
            ...item,
        }
    })
    const columns: ColumnsType<any> = [
        {
            key: "major",
            title: 'Chức Vụ',
            dataIndex: 'major',
            width: 50,
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: ({ key: id }: { key: number | string }) => {
                return (
                    <>
                        <Popconfirm
                            placement='topLeft'
                            title={"Bạn Chắc Chắn Xóa k?"}
                            onConfirm={() => deleteMajor(id as number)}
                            okText="yes"
                            okType="default"
                            cancelText="no"
                        >
                            <Button danger type='primary' className='m-2'>
                                Xoá
                            </Button>
                        </Popconfirm >
                        <Button type='primary' className='bg-yellow-500'><Link to={{
                            pathname: `/admin/major-manage/edit-major/${id}`
                        }
                        }>Sửa</Link></Button>
                    </>
                )
            }
        },
    ];

    return (
        <div>
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold">Quản lý Chuyên Ngành </h2>
                <Button type="primary" className="bg-blue-500">
                    <Link to="create-major">Thêm Chuyên Ngành</Link>
                </Button>
            </div>

            <Table columns={columns} dataSource={dataSource} />

        </div>
    )
}

export default MajorManage