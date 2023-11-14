import { Button, Table, Skeleton, Image } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AiOutlineEdit } from "react-icons/ai";
import { useGetManageWebsiteQuery, IManageWebsite } from "../../../api/admin/manageWebsiteApi";



const Manage_Website = () => {
    const { data, isLoading } = useGetManageWebsiteQuery();

    if (isLoading) return <Skeleton loading />;


    const InfoWebsite = data?.data?.map((item: IManageWebsite) => {
        console.log("info", item);
        return {
            key: item.id,
            ...item
        }

    })

    const columns: ColumnsType<any> = [

        {
            title: 'Tên Website',
            dataIndex: 'name_web',
            key: 'level',

        },
        {
            title: 'Tên Công ty',
            dataIndex: 'company_name',
            key: 'company_name',

        },
        {
            title: 'Logo',
            dataIndex: 'logo',
            render: (text: string) => <Image src={text} width={80} />

        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',

        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',

        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            width: 150
        },
        {
            title: 'Số điện thoại liên hệ',
            dataIndex: 'sdt_lienhe',
            key: 'sdt_lienhe',
            width: 100

        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 100,
            render: ({ key: id }: { key: string | number }) => (
                <div className="flex gap-2">

                    <Button className="bg-yellow-400 border-none hover:bg-yellow-300" href={`manage-website/update/${id}`}>
                        <p className="text-white"><AiOutlineEdit className="inline-block mr-2 text-xl " />Sửa</p>
                    </Button>
                </div>
            ),
        },

    ];
    return (
        <div>
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold">Quản lý Website</h2>

            </div>

            <Table className="overflow-x-auto" columns={columns} dataSource={InfoWebsite} />

        </div>
    )
}

export default Manage_Website