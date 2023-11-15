import { Button, Popconfirm, Skeleton, Table } from 'antd';
import { useDeleteWorkingFormMutation, useGetWorkingFormQuery } from '../../../api/workingFormApi';
import { Link } from 'react-router-dom';
import { IWorkingForm } from '../../../interfaces';
import { ColumnsType } from 'antd/es/table';



const ListWorkingForm = () => {
    const { data, isLoading } = useGetWorkingFormQuery();

    const [removeWorking, { isLoading: isRemoveLoading }] = useDeleteWorkingFormMutation();
    if (isLoading) return <Skeleton loading />;
    if (isRemoveLoading) return <Skeleton />


    const dataSource = data?.workingForm?.map((item: IWorkingForm) => {
        return {
            key: item?.id,
            ...item
        }
    })

    const columns: ColumnsType<any> = [
        {
            key: "working_form",
            title: 'Name',
            dataIndex: 'working_form',
        },
        {
            key: "description",
            title: 'description',
            dataIndex: 'description',
        },
        {
            key: "actions",
            title: 'actions',
            render: ({ key: id }: { key: number | string }) => {
                return (
                    <>
                        <Popconfirm
                            placement='topLeft'
                            title={"Có muốn xóa không em?"}
                            onConfirm={() => removeWorking(id as number)}
                            okText="yes"
                            cancelText="no"
                        >
                            <Button danger type='primary' className='m-2'>
                                Xoá
                            </Button>
                        </Popconfirm >
                        <Button type='primary' className='bg-blue-500'><Link to={{
                            pathname: `/admin/update/working-form/${id}`
                        }
                        }>Cập nhật</Link></Button>
                    </>
                )
            }
        },
    ];

    return (
        <div>
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold">Quản lý hình thức làm việc</h2>
                <Button type="primary" className="bg-blue-500">
                    <Link to="/admin/add/working-form">Thêm hình thức </Link>
                </Button>
            </div>

            <Table className='mt-5' columns={columns} dataSource={dataSource} />

        </div>
    )
}

export default ListWorkingForm