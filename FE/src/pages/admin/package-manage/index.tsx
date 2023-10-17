import { Link } from "react-router-dom"
import { Button, Table, Popconfirm, message, Tag, Skeleton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDeletePackageMutation, useGetPackageQuery } from "../../../api/package";
import { IPackages } from "../../../interfaces";

const cancel = () => {
    message.info('Huỷ xoá');
};

const PackageManage = () => {
    const { data, isLoading } = useGetPackageQuery();
    const [removePackage, { isLoading: isRemoveLoading }] = useDeletePackageMutation();
    if (isLoading) return <Skeleton loading />;
    const packageData = data?.data?.map(({ id, title, coin, price, reduced_price, status, type_account }: IPackages) => {
        console.log(data);
        return {
            key: id,
            title,
            coin,
            price,
            reduced_price,
            status,
            type_account
        }
    })
    const confirm = (id: number | string) => {
        removePackage(id);
        setTimeout(() => {
            message.success('Xoá thành công');
        }, 1000);
    };
    const columns: ColumnsType<IPackages> = [
        {
            title: 'STT',
            key: 'index',
            width: 10,
            render: (_text, _record, index) => index + 1,
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',

        },
        {
            title: 'Xu',
            dataIndex: 'coin',
            key: 'coin',

        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',

        },
        {
            title: 'Giảm giá',
            dataIndex: 'reduced_price',
            key: 'reduced_price',

        },
        {
            title: 'Loại tài khoản',
            dataIndex: 'type_account',
            key: 'type_account',
            render: (type_account: number | undefined | string) => {
                let text;

                if (type_account === 1 || type_account === "1") {
                    text = 'Ứng viên';

                } else if (type_account === 0 || type_account === "0") {
                    text = 'Nhà tuyển dụng';
                }
                return (
                    <p>
                        {text}
                    </p>
                );
            },

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
                    text = 'Kích hoạt';

                } else if (status === 0 || status === "0") {
                    color = 'volcano';
                    text = 'Chưa kích hoạt';
                }
                return (
                    <Tag color={color}>
                        {text}
                    </Tag>
                );
            },
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
                    <Button className="bg-yellow-400 border-none hover:bg-yellow-300" href={`package-manage/edit/${id}`}>
                        <p className="text-white"><AiOutlineEdit className="inline-block mr-2 text-xl " />Sửa</p>
                    </Button>
                </div>
            ),
        },
    ];
    return (
        <div>
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold">Quản lý gói nạp</h2>
                <Button type="primary" className="bg-blue-500">
                    <Link to="add">Tạo gói nạp</Link>
                </Button>
            </div>
            <Table columns={columns} dataSource={packageData} />; {/* Chỉnh độ rộng của bảng  scroll={{ x: 1300 }}*/}
        </div>
    )
}

export default PackageManage