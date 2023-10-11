import { Button, Popconfirm, Skeleton, Table } from 'antd';
import { useGetWorkingFormQuery } from '../../../api/workingFormApi';
import { Link } from 'react-router-dom';
import { IWorkingForm } from '../../../interfaces';



const ListWorkingForm = () => {
    const { data, isLoading, error } = useGetWorkingFormQuery();

    if (isLoading) return <Skeleton loading />;
    if (error) return <div>error</div>;
    const dataSource = data?.workingForm?.map(({ id, working_form, description }: IWorkingForm) => {
        console.log(data);

        return {
            key: id,
            working_form,
            description,
        }
    })

    const columns: any = [
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
            render: ({ key: id }: any) => {
                return (
                    <>
                        <Popconfirm
                            placement='topLeft'
                            title={"Có muốn xóa không em?"}
                            // onConfirm={() => removeProduct(id)}
                            cancelText="no"
                            okText="yes"
                        >
                            <Button danger type='primary' className='m-2'>
                                Delete
                            </Button>
                        </Popconfirm >
                        <Button type='primary' className='bg-yellow-500'><Link to={{
                            pathname: `/admin/update/working-form/${id}`
                        }
                        }>update</Link></Button>
                    </>
                )
            }
        },
    ];

    return (
        <div className='row row-cols-2 '>
            <div className='mt-5 col-9'>
                <Link className='border px-2 py-1 rounded ' to="/admin/add/working-form">Add Product</Link>
                <Table className='mt-5' columns={columns} dataSource={dataSource} />
            </div>
        </div>
    )
}

export default ListWorkingForm