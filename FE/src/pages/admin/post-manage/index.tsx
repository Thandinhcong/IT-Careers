import { Button, Result, Skeleton, Table, Tag, Modal, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FolderViewOutlined, CheckOutlined } from '@ant-design/icons';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IJobPost } from "../../../interfaces";
import { useEditJobPostStatusMutation, useGetJobPostQuery } from "../../../api/jobPost";
import React from 'react';


const PostManage = () => {
    const { data, isLoading, error } = useGetJobPostQuery();
    console.log(data);
    const [updateStatus] = useEditJobPostStatusMutation();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedJobPost, setSelectedJobPost] = React.useState<IJobPost | null>(null);


    const handleUpdateStatus = (jobPostId: number | string, currentStatus: number) => {
        // Kiểm tra trạng thái và cập nhật trạng thái mới (đảo ngược)
        const newStatus = currentStatus === 1 ? 2 : 1;

        if (currentStatus === 0) {
            // Nếu trạng thái là 2 (Chưa duyệt) khi bấm nút "Duyệt" sẽ hiển thị Modal xác nhận
            setModalVisible(true);
            setSelectedJobPost({ id: jobPostId, status: newStatus });
        } else {
            // Nếu trạng thái là 1 (Duyệt) hoặc 0 (Không duyệt), gọi mutation để cập nhật trạng thái
            updateStatus({ id: jobPostId, status: newStatus });
            message.success("Cập nhật trạng thái thành công");
        }
    };

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
    const dataJobPost = data?.jobPost?.map(({ id, title, job_position_id, start_date, end_date, require, gender, interest, status }: IJobPost) => {
        return {
            key: id,
            title,
            job_position_id,
            start_date,
            end_date,
            require,
            gender,
            interest,
            status
        }
    })
    const columns: ColumnsType<IJobPost> = [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',

        },
        {
            title: 'Công ty đăng bài',
            dataIndex: 'job_position_id',
            key: 'job_position_id',
        },
        {
            title: 'Thời gian đăng',
            dataIndex: 'start_date',
            key: 'start_date',
        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: 'end_date',
            key: 'end_date',
        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: 'require',
            key: 'require',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            render: (gender: number | undefined) => {
                let text;

                if (gender === 0) {
                    text = 'Nam';

                } else if (gender === 1) {
                    text = 'Nữ';
                } else {
                    text = 'Không yêu cầu';
                }

                return (
                    <p >
                        {text}
                    </p>
                );
            }
        },
        {
            title: 'Yêu cầu',
            dataIndex: 'interest',
            key: 'interest',
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
                } else {
                    color = 'volcano';
                    text = 'Không duyệt';
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
                    <Button type='link' className="text-[#3eb7ee] px-0">
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
            <Table columns={columns} dataSource={dataJobPost} scroll={{ x: 1500 }} /> {/* Chỉnh độ rộng của bảng */}
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
        </div>
    )
}

export default PostManage