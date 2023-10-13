import { Link } from "react-router-dom"
import { Button, Table, Popconfirm, Skeleton } from 'antd';
import { useDeletejobpositionMutation, useGetjobpositionQuery } from "../../../api/jobpositionApi";
import { IJobposition } from "../../../interfaces";

const JobpositionManage = () => {
    const { data, isLoading, error } = useGetjobpositionQuery();
    const [deleteJobposition, { isLoading: isRemoveLoading }] = useDeletejobpositionMutation();
    console.log(data);

    if (isLoading) return <Skeleton loading />;
    if (isRemoveLoading) return <Skeleton />
    if (error) return <div>error</div>;
    const dataSource = data?.Job_position?.map(({ id, job_position, description }: IJobposition) => {
        return {
            key: id,
            job_position,
            description,
        }
    })
    const columns: any = [
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
            render: ({ key: id }: any) => {
                return (
                    <>
                        <Popconfirm
                            placement='topLeft'
                            title={"Bạn Chắc Chắn Xóa k?"}
                            onConfirm={() => deleteJobposition(id)}
                            cancelText="no"
                            okText="yes"
                        >
                            <Button danger type='primary' className='m-2'>
                                Delete
                            </Button>
                        </Popconfirm >
                        <Button type='primary' className='bg-yellow-500'><Link to={{
                            pathname: `/admin/jobposition-manage/edit-jobposition/${id}`
                        }
                        }>update</Link></Button>
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

            <Table columns={columns} dataSource={dataSource} />; {/* Chỉnh độ rộng của bảng */}

        </div>
    )
}

export default JobpositionManage