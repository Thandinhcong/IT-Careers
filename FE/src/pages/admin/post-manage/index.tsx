import { Button, Result, Skeleton, Table, Tag, Modal, message, Checkbox } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FolderViewOutlined, CheckOutlined } from '@ant-design/icons';
import { AiOutlineCalendar, AiOutlineClockCircle, AiOutlineEnvironment, AiOutlineFileDone, AiOutlineLoading3Quarters, AiOutlineMoneyCollect, AiOutlineStar, AiOutlineUser, AiOutlineUsergroupAdd } from "react-icons/ai";
import { IJobPost } from "../../../interfaces";
import { useEditJobPostStatusMutation, useGetJobPostQuery } from "../../../api/jobPost";
import React, { useState } from 'react';
import { FilterOutlined } from '@ant-design/icons';

const PostManage = () => {
    const [open, setOpen] = useState(false);
    const { data, isLoading, error } = useGetJobPostQuery();
    const [updateStatus] = useEditJobPostStatusMutation();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedJobPost, setSelectedJobPost] = React.useState<any | null>(null);
    const [selectedPostId, setSelectedPostId] = useState<string | number | null>(null); //Lưu id bài đăng đã chọn

    const handleUpdateStatus = (jobPostId: number | string, currentStatus: number) => {
        // Kiểm tra trạng thái và cập nhật trạng thái mới (đảo ngược)
        const newStatus = currentStatus === 1 ? 2 : 1;
        if (currentStatus === 0) {
            // Nếu trạng thái là 2 (Chưa duyệt) khi bấm nút "Duyệt" sẽ hiển thị Modal xác nhận
            setModalVisible(true);
            setSelectedJobPost({ id: jobPostId, status: newStatus });
        } else {
            // Nếu trạng thái là 1 (Duyệt) hoặc 0 (Không duyệt), gọi mutation để cập nhật trạng thái
            updateStatus({ id: jobPostId, status: newStatus }).unwrap();
            message.success("Cập nhật trạng thái thành công");
        }
    };

    const handleViewJobPost = (jobPostId: number | string) => {
        setOpen(true);
        setSelectedPostId(jobPostId); // Lưu ID của bài đăng vào state selectedPostId
    }

    const handleModalConfirm = (newStatus: number) => {
        if (selectedJobPost) {
            const updatedJobPost = { ...selectedJobPost, status: newStatus };
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

    const dataJobPost: any = data?.jobPost?.map((item: IJobPost) => {
        return {
            key: item?.id,
            ...item,
        }
    })

    const columns: ColumnsType<IJobPost> = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',

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
                    text = 'Duyệt';

                } else if (status === 0) {
                    color = 'geekblue';
                    text = 'Chưa duyệt';
                } else if (status === 2) {
                    color = 'volcano';
                    text = 'Không duyệt';
                }

                return (
                    <Tag color={color}>
                        {text}
                    </Tag>
                );
            },
            filters: [
                { text: 'Duyệt', value: 1 },
                { text: 'Chưa duyệt', value: 0 },
                { text: 'Không duyệt', value: 2 },
            ],
            onFilter: (value, record) => record.status === value,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
                <div style={{ padding: 8 }}>
                    {[
                        { text: 'Duyệt', value: 1 },
                        { text: 'Chưa duyệt', value: 0 },
                        { text: 'Không duyệt', value: 2 },
                    ].map((item) => (
                        <div key={item.value} style={{ marginBottom: 8 }}>
                            <Checkbox
                                checked={selectedKeys.includes(item.value)}
                                onChange={(e) => {
                                    const nextSelectedKeys = e.target.checked
                                        ? [...selectedKeys, item.value]
                                        : selectedKeys.filter((key: any) => key !== item.value);
                                    setSelectedKeys(nextSelectedKeys);
                                }}
                            >
                                {item.text}
                            </Checkbox>
                        </div>
                    ))}
                    <div style={{ marginTop: 8 }}>
                        <Button
                            type="primary"
                            onClick={() => confirm()}
                            size="small"
                            style={{ marginRight: 8 }}
                            className='bg-blue-500'
                        >
                            Lọc
                        </Button>
                        <Button onClick={() => clearFilters()} size="small">
                            Đặt lại
                        </Button>
                    </div>
                </div>
            ),
            filterIcon: (filtered: boolean) => (
                <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
            ),
        },
        {
            title: 'Gói đăng tin',
            dataIndex: 'type_job_post_id',
            key: 'type_job_post_id',
            render: (type_job_post_id: number | undefined) => {
                let color;
                let text
                if (type_job_post_id === 1) {
                    color = 'blue';
                    text = 'Tin Thường';

                } else {
                    color = '#f50';
                    text = 'Tin VIP';
                }
                return (
                    <Tag color={color}>
                        {text}
                    </Tag>
                )
            },
            filters: [
                { text: 'Tin Thường', value: 1 },
                { text: 'Tin VIP', value: 2 },
            ],
            onFilter: (value, record) => record.type_job_post_id === value,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
                <div style={{ padding: 8 }}>
                    {[
                        { text: 'Tin Thường', value: 1 },
                        { text: 'Tin VIP', value: 2 },
                    ].map((item) => (
                        <div key={item.value} style={{ marginBottom: 8 }}>
                            <Checkbox
                                checked={selectedKeys.includes(item.value)}
                                onChange={(e) => {
                                    const nextSelectedKeys = e.target.checked
                                        ? [...selectedKeys, item.value]
                                        : selectedKeys?.filter((key: any) => key !== item.value);
                                    setSelectedKeys(nextSelectedKeys);
                                }}
                            >
                                {item.text}
                            </Checkbox>
                        </div>
                    ))}
                    <div style={{ marginTop: 8 }}>
                        <Button
                            type="primary"
                            onClick={() => confirm()}
                            size="small"
                            style={{ marginRight: 8 }}
                            className='bg-blue-500'
                        >
                            Lọc
                        </Button>
                        <Button onClick={() => clearFilters()} size="small">
                            Đặt lại
                        </Button>
                    </div>
                </div>
            ),
            filterIcon: (filtered: boolean) => (
                <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
            ),
        },
        {
            title: 'Công ty đăng bài',
            dataIndex: 'company_name',
            key: 'company_name',
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 250,
            render: ({ key: id, status }: { key: string | number, status: number }) => (
                <div className="flex -mx-6">
                    <Button type="link" onClick={() => handleUpdateStatus(id, status)}>
                        <CheckOutlined style={{ fontSize: '18px', color: '#4eff3a' }} />
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin inline-block" />
                        ) : (
                            <span className='text-[#49eb47]'>Đổi trạng thái</span>
                        )}
                    </Button >
                    <Button type='link' className="text-[#3eb7ee] px-0" onClick={() => handleViewJobPost(id)}>
                        <FolderViewOutlined style={{ fontSize: '18px', color: '#3eb7ee' }} />
                        Xem chi tiết
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold">Quản lý bài đăng</h2>
            </div>
            <Table columns={columns} dataSource={dataJobPost} scroll={{ x: 1500 }} loading={isLoading} pagination={{ pageSize: 10 }} /> {/* Chỉnh độ rộng của bảng */}
            <Modal
                title="Xác nhận duyệt bài đăng"
                visible={modalVisible}
                okText="Có"
                cancelText="Không"
                okType="default"
                onOk={() => handleModalConfirm(1)} // Duyệt (Trạng thái 1)
                onCancel={() => handleModalConfirm(2)} // Không duyệt (Trạng thái 0)
            >
                Bạn có muốn cho phép bài đăng này được được đăng tuyển không?
            </Modal>
            {/* Xem chi tiết */}
            <Modal
                title="Xem chi tiết bài đăng"
                centered
                open={open}
                onOk={() => {
                    handleUpdateStatus(selectedPostId, selectedJobPost?.status || 0);
                    setOpen(false);
                }}
                onCancel={() => setOpen(false)}
                okType='default'
                cancelText="Đóng"
                okText="Kiểm duyệt"
                width={1000}
            >
                {data?.jobPost
                    ?.filter((item: { id: null; }) => item.id === selectedPostId)// Lọc bài đăng với ID tương ứng
                    .map((item: IJobPost) => {
                        return (
                            <div key={item.id}>
                                <div className='flex justify-between items-center'>
                                    <div className='w-28 h-28 rounded-full border border-gray-200 mb-3 mr-36 relative overflow-hidden'>
                                        <img src="https://cdn1.123job.vn/123job/uploads/2023/10/05/2023_10_05______41fd58339555b8bd8c915ee29ea7badc.jpg" alt="" className='absolute w-full h-full rounded-full object-cover' />
                                    </div>
                                </div>
                                <div className="text-gray-700">
                                    <div >
                                        <div className="grid grid-cols-2 border text-[15px]">
                                            <div className="grid grid-cols-1 gap-2 border-r py-2">
                                                <div className="grid grid-cols-12 items-center gap-2 border-b pb-2">
                                                    <AiOutlineEnvironment />
                                                    <p className="col-span-3">Địa điểm:</p>
                                                    <p className="col-span-8">{item.address}</p>
                                                </div>
                                                <div className="grid grid-cols-12 items-center gap-2 border-b pb-2">
                                                    <AiOutlineClockCircle className="col-span-1" />
                                                    <p className="col-span-3">Hạn nộp hs:</p>
                                                    <p className="col-span-7">{item.end_date}</p>
                                                </div>
                                                <div className="grid grid-cols-12 items-center gap-2 border-b pb-2">
                                                    <AiOutlineCalendar className="col-span-1" />
                                                    <p className="col-span-3">Hình thức:</p>
                                                    <p className="col-span-7">{item.job_position}</p>
                                                </div>
                                                <div className="grid grid-cols-12 items-center gap-2">
                                                    <AiOutlineUsergroupAdd className="col-span-1" />
                                                    <p className="col-span-3">Số lượng:</p>
                                                    <p className="col-span-7">{item.quantity}</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 gap-2 py-2">
                                                <div className="grid grid-cols-12 items-center gap-2 border-b pb-2">
                                                    <AiOutlineMoneyCollect className="col-span-1" />
                                                    <p className="col-span-3">Mức lương:</p>
                                                    <p className="col-span-7 text-red-500 font-medium">
                                                        {item.min_salary && item.max_salary &&
                                                            `${(item.min_salary / 1000000).toLocaleString()} triệu VND - ${(item.max_salary / 1000000).toLocaleString()} triệu VND / tháng`}
                                                    </p>
                                                </div>
                                                <div className="grid grid-cols-12 items-center gap-2 border-b pb-2">
                                                    <AiOutlineUser className="col-span-1" />
                                                    <p className="col-span-3">Giới tính</p>
                                                    <p className="col-span-7">
                                                        {item.gender === 0 ? 'Nam' : item.gender === 1 ? 'Nữ' : 'Không yêu cầu'}
                                                    </p>
                                                </div>
                                                <div className="grid grid-cols-12 items-center gap-2 border-b pb-2">
                                                    <AiOutlineFileDone className="col-span-1" />
                                                    <p className="col-span-3">Kinh nghiệm</p>
                                                    <p className="col-span-7">{item.experience}</p>
                                                </div>
                                                <div className="grid grid-cols-12 items-center gap-2">
                                                    <AiOutlineStar className="col-span-1" />
                                                    <p className="col-span-3">Trình độ:</p>
                                                    <p className="col-span-7">{item.academic_level}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-lg my-4">Mô tả công việc </h2>
                                        <div className="" dangerouslySetInnerHTML={{ __html: item?.desc }}></div>
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-lg my-4"> Yêu cầu</h2>
                                        <div className="" dangerouslySetInnerHTML={{ __html: item?.require }}></div>

                                    </div>

                                    <div>
                                        <h2 className="font-semibold text-lg my-4">Quyền lợi</h2>
                                        <div className="" dangerouslySetInnerHTML={{ __html: item?.interest }}></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </Modal>
        </div>
    )
}

export default PostManage