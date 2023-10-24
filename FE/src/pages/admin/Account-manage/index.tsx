
import { Button, Table, message, Skeleton, Result, Tag, Modal, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AiOutlineCheck, AiOutlineFolderView, AiOutlineLoading3Quarters } from "react-icons/ai";
import { IAccount } from "../../../interfaces";
import { useEditCandidateStatusMutation, useGetCandidatesQuery } from "../../../api/accountApi";
import React from "react";

// const cancel = () => {
//     message.info('Huỷ xoá');
// };
const AccountManage = () => {
    const { data, isLoading, error } = useGetCandidatesQuery();
    const [updateStatus] = useEditCandidateStatusMutation();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedCandidate, setSelectedCandidate] = React.useState<IAccount | null>(null);
    const handleUpdateStatus = (candidateId: number | string, currentStatus: number) => {
        // Kiểm tra trạng thái và cập nhật trạng thái mới (đảo ngược)
        const newStatus = currentStatus === 1 ? 2 : 1;

        if (currentStatus === 0) {
            // Nếu trạng thái là 2 (Chưa duyệt) khi bấm nút "Duyệt" sẽ hiển thị Modal xác nhận
            setModalVisible(true);
            setSelectedCandidate({ id: candidateId, status: newStatus });
        } else {
            // Nếu trạng thái là 1 (Duyệt) hoặc 0 (Không duyệt), gọi mutation để cập nhật trạng thái
            updateStatus({ id: candidateId, status: newStatus });
            message.success("Cập nhật trạng thái thành công");
        }
    };
    const handleModalConfirm = (newStatus: number) => {
        if (selectedCandidate) {
            const updatedCandidate = { ...selectedCandidate, status: newStatus };
            updateStatus(updatedCandidate);
            message.success("Cập nhật trạng thái thành công");
        }

        setModalVisible(false);
    };
    if (isLoading) return <Skeleton loading />;
    // console.log(data);

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
                        extra={<Button type="primary">Back Home</Button>}
                    />
                );
            }
        }
    }

    const accountData = data?.data?.map(({ id, name, email, password, phone, address, avatar, status, coin }: IAccount) => {
        return {
            key: id,
            name,
            email,
            password,
            address,
            phone,
            avatar,
            status,
            coin,
        }
    })


    const columns: ColumnsType<IAccount> = [
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
            title: 'Mật khẩu',
            dataIndex: 'password',
            key: 'password',
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
            dataIndex: 'avatar',
            key: 'avatar',
            width: 50,
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
            render: (status: number | undefined) => {
                let color;
                let text;

                if (status === 1) {
                    color = 'green';
                    text = 'Duyệt';
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
                        <AiOutlineCheck style={{ fontSize: '18px', color: '#4eff3a' }} />
                        {isLoading ? (
                            <AiOutlineLoading3Quarters className="animate-spin inline-block" />
                        ) : (
                            <span className='text-[#49eb47]'>Đổi trạng thái</span>
                        )}
                    </Button >
                </div>
            ),
        },

    ];
    return (
        <div>
            <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-semibold">Quản lý tài khoản </h2>
            </div>

            <Table columns={columns} dataSource={accountData} />
            <Modal
                title="Xác nhận cho vào danh sách đen"
                visible={modalVisible}
                okText="Có"
                cancelText="Không"
                okType="default"
                onOk={() => handleModalConfirm(1)} // Duyệt (Trạng thái 1)
                onCancel={() => handleModalConfirm(2)} // Không duyệt (Trạng thái 0)
            >
                Bạn có muốn cho tài khoản này vào danh sách đen không?
            </Modal>
        </div>
    )
}

export default AccountManage
