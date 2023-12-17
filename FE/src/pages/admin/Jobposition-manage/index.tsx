import { Link } from "react-router-dom"
import { Button, Table, Popconfirm, Skeleton } from 'antd';
import { useDeletejobpositionMutation, useGetjobpositionQuery } from "../../../api/jobpositionApi";
import { IJobposition } from "../../../interfaces";
import { ColumnsType } from "antd/es/table";

const JobpositionManage = () => {
    const { data, isLoading } = useGetjobpositionQuery();

    const [deleteJobposition, { isLoading: isRemoveLoading }] = useDeletejobpositionMutation();
    if (isLoading) return <Skeleton loading />;
    if (isRemoveLoading) return <Skeleton />
    const dataSource = data?.Job_position?.map(({ id, job_position, description }: IJobposition) => {
        return {
            key: id,
            job_position,
            description,
        }
    })
    const columns: ColumnsType<any> = [
        {
            key: "job_position",
            title: 'Chức Vụ',
            dataIndex: 'job_position',
            width: 50,
        },
        {
            key: "description",
            title: 'Description',
            dataIndex: 'description',
            width: 150,
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
                            onConfirm={() => deleteJobposition(id as number)}
                            okText="yes"
                            okType="default"
                            cancelText="no"
                        >
                            <Button danger type='primary' className='m-2'>
                                Xoá
                            </Button>
                        </Popconfirm >
                        <Button type='primary' className='bg-yellow-500'><Link to={{
                            pathname: `/admin/jobposition-manage/edit-jobposition/${id}`
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
                <h2 className="text-2xl font-semibold">Quản lý Chức Vụ</h2>
                <Button type="primary" className="bg-blue-500">
                    <Link to="create-jobposition">Thêm Chức Vụ</Link>
                </Button>
            </div>

            <Table columns={columns} dataSource={dataSource} />

        </div>
    )
}

export default JobpositionManage