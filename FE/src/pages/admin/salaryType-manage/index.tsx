import { Link } from "react-router-dom"
import { Button, Table, Popconfirm, message, Skeleton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineLoading3Quarters } from "react-icons/ai";
import { ISalaryType } from "../../../interfaces";
import { useDeleteSalaryTypeMutation, useGetSalaryTypeQuery } from "../../../api/salaryType";

const cancel = () => {
    message.info('Huỷ xoá');
};
const SalaryTypeManage = () => {
    const { data, isLoading } = useGetSalaryTypeQuery();
    const [removeSalaryType, { isLoading: isRemoveLoading }] = useDeleteSalaryTypeMutation();


    if (isLoading) return <Skeleton loading />;
    const salaryTypeData = data?.salaryType?.map(({ id, salary_type }: ISalaryType) => {
        return {
            key: id,
            salary_type: new Intl.NumberFormat('en-US').format(salary_type as any)
        }
    })
    const confirm = (id: number | string) => {
        removeSalaryType(id);
        setTimeout(() => {
            message.success('Xoá thành công');
        }, 1000);
    };
    const columns: ColumnsType<ISalaryType> = [
        {
            title: 'STT',
            key: 'index',
            width: 10,
            render: (_text, _record, index) => index + 1,
        },
        {
            title: 'Loại mức lương',
            dataIndex: 'salary_type',
            key: 'salary_type',
            width: 50,
            render: (text: string | number) => { return <p>{text} VND</p>; }
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
                    <Button className="bg-yellow-400 border-none hover:bg-yellow-300" href={`salary-type-manage/edit/${id}`}>
                        <p className="text-white"><AiOutlineEdit className="inline-block mr-2 text-xl " />Sửa</p>
                    </Button>
                </div>
            ),
        },

    ];
    return (
        <div>
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold">Quản lý loại mức lương</h2>
                <Button type="primary" className="bg-blue-500">
                    <Link to="add">Tạo Loại mức lương</Link>
                </Button>
            </div>

            <Table columns={columns} dataSource={salaryTypeData} />

        </div>
    )
}

export default SalaryTypeManage