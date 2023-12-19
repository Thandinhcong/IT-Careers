import { Table, message, Skeleton, Tag, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IAccount } from "../../../interfaces";
import { useDeleteCandidateMutation, useGetCandidatesQuery } from '../../../api/candidateApi';

const cancel = () => {
    message.info('Huỷ xoá');
};
const AccountManage = () => {
    const { data, isLoading } = useGetCandidatesQuery();
    const [removeAccount] = useDeleteCandidateMutation();
    if (isLoading) return <Skeleton loading />;



    const accountData = data?.data?.map(({ id, name, email, phone, address, image, status, coin }: IAccount) => {
        return {
            key: id,
            name,
            email,
            address,
            phone,
            image,
            status,
            coin,
        }
    })
    const confirm = (id: number | string) => {
        removeAccount(id);
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
            title: 'Tên người dùng',
            dataIndex: 'name',
            key: 'name',
            width: 50,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 50,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            width: 50,
        },
        {
            title: 'Ảnh đại diện',
            dataIndex: 'image',
            key: 'image',
            width: 50,
            render: (image: string) => <Image src={image} alt="Avatar" width={50} />
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 50,
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (status: number | undefined | string) => {
                let color;
                let text;

                if (status === 1 || status === "1") {
                    color = 'green';
                    text = 'Active';

                } else if (status === 0 || status === "0") {
                    color = 'volcano';
                    text = 'Inactive';
                }
                return (
                    <Tag color={color}>
                        {text}
                    </Tag>
                );
            },
        },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     fixed: 'right',
        //     width: 100,
        //     render: ({ key: id }: { key: string | number }) => (
        //         <div className="flex gap-2">
        //             {/* <Popconfirm
        //                 title="Delete the task"
        //                 description="Are you sure to delete this task?"
        //                 onConfirm={() => confirm(id)}
        //                 onCancel={cancel}
        //                 okText="Yes"
        //                 okType="default"
        //                 cancelText="No"
        //             >
        //                 <Button type="primary" danger> <AiOutlineDelete className="inline-block mr-2 text-xl" />
        //                     {isRemoveLoading ? (
        //                         <AiOutlineLoading3Quarters className="animate-spin inline-block" />
        //                     ) : (
        //                         "Xóa"
        //                     )}
        //                 </Button >
        //             </Popconfirm> */}
        //             {/* <Button className="bg-yellow-400 border-none hover:bg-yellow-300" href={`level-manage/edit/${id}`}>
        //                 <p className="text-white"><AiOutlineEdit className="inline-block mr-2 text-xl " />Sửa</p>
        //             </Button> */}
        //         </div>
        //     ),
        // },

    ];
    return (
        <div>
            <div className="flex justify-between mb-6 w-full">
                <h2 className="text-2xl font-semibold">Quản lý ứng viên </h2>
                {/* <Button type="primary" className="bg-blue-500">
                    <Link to="add">Thêm tài khoản</Link>
                </Button> */}
            </div>

            <Table columns={columns} dataSource={accountData} />

        </div>
    )
}

export default AccountManage