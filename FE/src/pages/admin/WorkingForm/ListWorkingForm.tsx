import { Button, Popconfirm, Result, Skeleton, Table } from 'antd';
import { useDeleteWorkingFormMutation, useGetWorkingFormQuery } from '../../../api/workingFormApi';
import { Link } from 'react-router-dom';
import { IWorkingForm } from '../../../interfaces';



const ListWorkingForm = () => {
    const { data, isLoading, error } = useGetWorkingFormQuery();
    const [removeWorking, { isLoading: isRemoveLoading }] = useDeleteWorkingFormMutation();
    if (isLoading) return <Skeleton loading />;
    if (isRemoveLoading) return <Skeleton />
    console.log(data);

    // if (error) {
    //     if (error.status === 404) {
    //         return (
    //             <Result
    //                 status="404"
    //                 title="404"
    //                 subTitle="Forbidden: You do not have permission to access this resource."
    //                 extra={<Button type="primary">Back Home</Button>}
    //             />
    //         );
    //     } else {
    //         return (
    //             <Result
    //                 status="500"
    //                 title="500"
    //                 subTitle="Sorry, something went wrong."
    //                 extra={<Button type="primary">Back Home</Button>}
    //             />
    //         );
    //     }
    // }
    const dataSource = data?.workingForm?.map(({ id, working_form, description }: IWorkingForm) => {
        console.log(data);
        return {
            key: id,
            working_form,
            description,
        }
    })
    console.log(dataSource);

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
                            onConfirm={() => removeWorking(id)}
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