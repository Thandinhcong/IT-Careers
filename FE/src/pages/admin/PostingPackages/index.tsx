import { Link } from 'react-router-dom';
import { useDeleteTypeJobPostMutation, useGetAllTypeJobPostQuery } from '../../../api/admin/postingPackage'
import { Button, Popconfirm, Skeleton, Table } from 'antd';

const PostingPackages = () => {
    const { data, isLoading } = useGetAllTypeJobPostQuery();

    const listPostingPackegs = data?.data;
    const dataSource = listPostingPackegs?.map((item: any) => {
        return {
            key: item?.id,
            ...item,
        }
    })
    const [remove] = useDeleteTypeJobPostMutation();
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'key',
        },
        {
            title: 'Giá',
            dataIndex: 'salary',
            key: 'key',
        },
        {
            title: 'Mô tả',
            dataIndex: 'desc',
            key: 'key',
            width: '700px', // Hoặc có thể sử dụng lớp Tailwind: w-[400px]
            render: (text: string) => (
                <div className="max-h-[120px] max-w-[700px] overflow-y-auto">
                    <span dangerouslySetInnerHTML={{ __html: text }} />
                </div>
            ),
        },
        {
            key: "actions",
            title: 'actions',
            render: ({ key: id }: { key: number | string }) => {
                return (
                    <>
                        <Popconfirm
                            placement='topLeft'
                            title={"Bạn có muốn xoá không?"}
                            onConfirm={() => remove(id)}
                            okText="yes"
                            cancelText="no"
                        >
                            <Button danger type='primary' className='m-2'>
                                Xoá
                            </Button>
                        </Popconfirm >
                        <Button type='primary' className='bg-blue-500'><Link to={{
                            pathname: `/admin/posting-packages/update/${id}`
                        }
                        }>Cập nhật</Link></Button>
                    </>
                )
            }
        },
    ];
    if (isLoading) return <Skeleton />
    return (
        <div>
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold">Quản lý gói đăng</h2>
                <Button type="primary" className="bg-blue-500">
                    <Link to="/admin/posting-packages/add">Thêm gói đăng </Link>
                </Button>
            </div>

            <Table className='mt-5' columns={columns} dataSource={dataSource} />

        </div>
    )
}

export default PostingPackages