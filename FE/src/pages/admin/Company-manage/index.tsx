import { Button, Image, Modal, Result, Skeleton, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CheckOutlined } from '@ant-design/icons';

import { ICompanys } from "../../../interfaces";
import { AiOutlineCalendar, AiOutlineClockCircle, AiOutlineEnvironment, AiOutlineFileDone, AiOutlineFolderView, AiOutlineLoading3Quarters, AiOutlineMoneyCollect, AiOutlineStar, AiOutlineUser, AiOutlineUsergroupAdd } from "react-icons/ai";
import { useGetcompanysQuery, useUpdateStatuscompanysMutation } from "../../../api/CompanymanagerApi";
import React, { useState } from "react";

const CompanyManage = () => {
    const { data, isLoading, error } = useGetcompanysQuery();
    console.log(data);

    const [updateStatus] = useUpdateStatuscompanysMutation();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedCompany, setSelectedCompany] = React.useState<any | null>(null);
    const [open, setOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState<string | number | null>(null);


    const handleUpdateStatus = (companyId: number | string, currentStatus: number) => {
        // Kiểm tra trạng thái và cập nhật trạng thái mới (đảo ngược)
        const newStatus = currentStatus === 1 ? 0 : 1;

        if (currentStatus === 2) {
            // Nếu trạng thái là 2 (Chưa duyệt) khi bấm nút "Duyệt" sẽ hiển thị Modal xác nhận
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

    const handleViewJobPost = (jobPostId: number | string) => {
        setOpen(true);
        setSelectedPostId(jobPostId); // Lưu ID của bài đăng vào state selectedPostId
    }



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
        description,
        image_paper }: ICompanys) => {
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
            image_paper
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
        },
        {
            title: 'Địa Chỉ ',
            dataIndex: 'address',
            key: 'address',
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
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (status: number | undefined) => {
                let color;
                let text;

                if (status === 1) {
                    color = 'green';
                    text = 'Kích Hoạt';

                } else if (status === 0) {
                    color = 'volcano';
                    text = 'Khóa';
                } else {
                    color = 'geekblue';
                    text = 'Chưa Kích Hoạt';
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
            width: 200,
            render: ({ key: id, status }: { key: string | number, status: number }) => (
                <div className="flex -mx-8">
                    <Button type="link" onClick={() => handleUpdateStatus(id, status)}>
                        <CheckOutlined style={{ fontSize: '18px', color: '#4eff3a' }} />
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin inline-block" />
                        ) : (
                            <span className='text-[#49eb47]'>Trạng Thái</span>
                        )}
                    </Button >
                    <Button type='link' className="text-[#3eb7ee] px-0 flex items-center" onClick={() => handleViewJobPost(id)}>
                        <AiOutlineFolderView style={{ fontSize: '18px', color: '#3eb7ee' }} />
                        Xem chi tiết
                    </Button>
                </div>
            ),
        },
    ];


    return (
        <div>
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold">Quản lý Công Ty</h2>
            </div>

            <Table columns={columns} dataSource={dataCompany} scroll={{ x: 1300 }} />; {/* Chỉnh độ rộng của bảng */}
            <Modal
                title="Bạn có chắc chắn khóa công ty này không?"
                visible={modalVisible}
                okText="Có"
                cancelText="Không"
                okType="default"
                onOk={() => handleModalConfirm(1)} // Duyệt (Trạng thái 1)
                onCancel={() => handleModalConfirm(0)} // Không duyệt (Trạng thái 0)
            >
            </Modal>
            <Modal
                title="Xem chi tiết nhà tuyển dụng"
                centered
                open={open}
                width={1000}
                footer={<Button onClick={() => setOpen(false)}>Đóng</Button>}
            >
                {data?.data.map((item: ICompanys) => {
                    return (
                        <div key={item.id}>
                            <div className='flex justify-between items-center'>
                                <div className='w-28 h-28 rounded-full border border-gray-200 mb-3 mr-36 relative overflow-hidden'>
                                    <img src={item.logo} alt="" className='absolute w-full h-full rounded-full object-cover' />
                                </div>
                            </div>
                            <div className="text-gray-700">
                                <div >
                                    <div className="grid grid-cols-2 border text-[15px]">
                                        <div className="grid grid-cols-1 gap-2 border-r py-2">
                                            <div className="grid grid-cols-12 items-center gap-2 border-b pb-2">
                                                <AiOutlineClockCircle className="col-span-1" />
                                                <p className="col-span-3">Tên công ty</p>
                                                <p className="col-span-7">{item.company_name}</p>
                                            </div>
                                            <div className="grid grid-cols-12 items-center gap-2 border-b pb-2">
                                                <AiOutlineEnvironment />
                                                <p className="col-span-3">Địa điểm:</p>
                                                <p className="col-span-8">{item.address}</p>
                                            </div>
                                            <div className="grid grid-cols-12 items-center gap-2 border-b pb-2">
                                                <AiOutlineCalendar className="col-span-1" />
                                                <p className="col-span-3">Số điện thoại:</p>
                                                <p className="col-span-7">{item.phone}</p>
                                            </div>
                                            <div className="grid grid-cols-12 items-center gap-2">
                                                <AiOutlineUsergroupAdd className="col-span-1" />
                                                <p className="col-span-3">Email:</p>
                                                <p className="col-span-7">{item.email}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-2 py-2">
                                            <div className="grid grid-cols-12 items-center gap-2 border-b pb-2">
                                                <AiOutlineMoneyCollect className="col-span-1" />
                                                <p className="col-span-3">Mã số thuế:</p>
                                                <p className="col-span-7 font-medium">
                                                    {item.tax_code}
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-12 items-center gap-2 border-b pb-2">
                                                <AiOutlineUser className="col-span-1" />
                                                <p className="col-span-3">Người đại diện:</p>
                                                <p className="col-span-7">
                                                    {item.name}
                                                </p>
                                            </div>
                                            <div className="grid grid-cols-12 items-center gap-2 border-b pb-2">
                                                <AiOutlineFileDone className="col-span-1" />
                                                <p className="col-span-3">Ngày thành lập:</p>
                                                <p className="col-span-7">{item.founded_in}</p>
                                            </div>
                                            <div className="grid grid-cols-12 items-center gap-2">
                                                <AiOutlineStar className="col-span-1" />
                                                <p className="col-span-3">Văn phòng:</p>
                                                <p className="col-span-7">{item.office}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="font-semibold text-lg my-4">Mô tả công ty </h2>
                                    <div className="" >{item.description}</div>
                                </div>
                                <div>
                                    <h2 className="font-semibold text-lg my-4">Giấy phép kinh doanh</h2>
                                    <div className="">
                                        <Image src={item.image_paper} alt="Avatar" width={50} />
                                    </div>

                                </div>
                            </div>
                        </div>
                    );
                })}
            </Modal>

        </div >
    )
}

export default CompanyManage