import { Button, Modal, Result, Skeleton, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CheckOutlined, FolderViewOutlined } from '@ant-design/icons';

import { ICompanys } from "../../../interfaces";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGetcompanysQuery, useUpdateStatuscompanysMutation } from "../../../api/CompanymanagerApi";
import React from "react";

const CompanyManage = () => {
    const { data, isLoading, error } = useGetcompanysQuery();
    console.log(data)
    const [updateStatus] = useUpdateStatuscompanysMutation();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedCompany, setSelectedCompany] = React.useState<any | null>(null);


    const handleUpdateStatus = (companyId: number | string, currentStatus: number) => {
        // Kiểm tra trạng thái và cập nhật trạng thái mới (đảo ngược)
        const newStatus = currentStatus === 1 ? 2 : 1;

        if (currentStatus === 2) {
            setModalVisible(true);
            setSelectedCompany({ id: companyId, status: newStatus });
        } else {
            // Nếu trạng thái là 1 (Duyệt) hoặc 0 (Không duyệt), gọi mutation để cập nhật trạng thái
            updateStatus({ id: companyId, status: newStatus });
            message.success("Cập nhật trạng thái thành công");
        }
    };

    const handleModalConfirm = (newStatus: number) => {
        if (selectedCompany) {
            const updatedJobPost: any = { ...selectedCompany, status: newStatus };
            updateStatus(updatedJobPost);
            message.success("Cập nhật trạng thái thành công");
        }

        setModalVisible(false);
    };



    if (isLoading) return <Skeleton loading />;
    if (error) {
        if ('status' in error) {
            if (error.status === 404) {
                return (
                    <Result
                        status="404"
                        title="404"
                        subTitle="Forbidden: You do not have permission to access this resource."
                        extra={<Button type="primary">Back Home</Button>}
                    />
                );
            } else {
                return (
                    <Result
                        status="403"
                        title="403"
                        subTitle="Sorry, something went wrong."
                        extra={<Button type="primary" href='/admin/dashboard' className='bg-blue-500'>Back Home</Button>}
                    />
                );
            }
        }
    }
    const dataCompany = data?.data?.map(({ id, status, company_name,
        tax_code,
        address,
        name,
        founded_in,
        phone,
        email,
        office,
        logo,
        link_web,
        image_paper,
        description, }: ICompanys) => {
        return {
            key: id,
            status,
            company_name,
            tax_code,
            address,
            name,
            founded_in,
            phone,
            email,
            office,
            logo,
            link_web,
            description,
            image_paper,
        }
    })
    const columns: ColumnsType<any> = [
        {
            title: 'Tên Công Ty',
            dataIndex: 'company_name',
            key: 'company_name',

        },
        {
            title: 'Mã Số Thuế',
            dataIndex: 'tax_code',
            key: 'tax_code',
            render: (tax_code: string | undefined) => (
                <span>
                    {tax_code ? <span className='font-semibold'>{tax_code}</span>
                        : <span className='text-red-500'>Chưa cập nhật</span>}
                </span>
            ),
            onFilter: (value, record) => {
                if (value === 'hasData') {
                    return record.tax_code !== undefined && record.tax_code !== null;
                } else if (value === 'noData') {
                    return record.tax_code === undefined || record.tax_code === null;
                }
                return false;
            },
            filters: [
                { text: 'Đã cập nhật', value: 'hasData' },
                { text: 'Chưa cập nhật', value: 'noData' },
            ],
        },
        {
            title: 'Giấy phép kinh doanh',
            dataIndex: 'image_paper',
            key: 'image_paper',
            render: (image_paper: string | undefined) => (
                <span>
                    {image_paper ? <a className='text-blue-500 underline' href={image_paper}>Giấy phép kinh doanh</a>
                        : <span className='text-red-500' > Chưa cập nhật</span >}
                </span >
            ),
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (status: number | undefined) => {
                let color;
                let text;

                if (status === 1) {
                    color = 'green';
                    text = 'Kích Hoạt';

                } else if (status === 2) {
                    color = 'volcano';
                    text = 'Khóa';
                } else {
                    color = 'processing';
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
            title: 'Số Điện Thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 230,
            render: ({ key: id, status }: { key: string | number, status: number }) => (
                <div className="flex -mx-6">
                    <Button type="link" onClick={() => handleUpdateStatus(id, status)}>
                        <CheckOutlined style={{ fontSize: '18px', color: '#4eff3a' }} />
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin inline-block" />
                        ) : (
                            <span className='text-[#49eb47]'>Trạng Thái</span>
                        )}
                    </Button >
                    {/* <Button type='link' className="text-[#3eb7ee] px-0">
                        <FolderViewOutlined style={{ fontSize: '18px', color: '#3eb7ee' }} />
                        Xem chi tiết
                    </Button> */}
                </div>
            ),
        },
    ];


    return (
        <div>
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold">Quản lý Công Ty</h2>
            </div>

            <Table columns={columns} dataSource={dataCompany} scroll={{ x: 1300 }} />;
            <Modal
                title="Bạn có chắc chắn khóa công nay này không?"
                visible={modalVisible}
                okText="Có"
                cancelText="Không"
                okType="default"
                onOk={() => handleModalConfirm(1)} // Duyệt (Trạng thái 1)
                onCancel={() => handleModalConfirm(0)}
            >
            </Modal>

        </div>
    )
}

export default CompanyManage

