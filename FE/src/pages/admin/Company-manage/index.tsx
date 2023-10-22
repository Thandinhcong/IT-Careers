import { Link } from "react-router-dom"
import { Button, Result, Skeleton, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { FolderViewOutlined, CheckOutlined } from '@ant-design/icons';
import { useGetcompanysQuery } from "../../../api/CompanymanagerAPI";
import { ICompanys } from "../../../interfaces";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CompanyManage = () => {
    const { data, isLoading, error } = useGetcompanysQuery();
    // const [updateStatus] = useEditJobPostStatusMutation();
    // const [modalVisible, setModalVisible] = React.useState(false);
    // const [selectedJobPost, setSelectedJobPost] = React.useState<IJobPost | null>(null);


    // const handleUpdateStatus = (jobPostId: number | string, currentStatus: number) => {
    //     // Kiểm tra trạng thái và cập nhật trạng thái mới (đảo ngược)
    //     const newStatus = currentStatus === 1 ? 0 : 1;

    //     if (currentStatus === 2) {
    //         // Nếu trạng thái là 2 (Chưa duyệt) khi bấm nút "Duyệt" sẽ hiển thị Modal xác nhận
    //         setModalVisible(true);
    //         setSelectedJobPost({ id: jobPostId, status: newStatus });
    //     } else {
    //         // Nếu trạng thái là 1 (Duyệt) hoặc 0 (Không duyệt), gọi mutation để cập nhật trạng thái
    //         updateStatus({ id: jobPostId, status: newStatus });
    //         message.success("Cập nhật trạng thái thành công");
    //     }
    // };

    // const handleModalConfirm = (newStatus: number) => {
    //     if (selectedJobPost) {
    //         const updatedJobPost = { ...selectedJobPost, status: newStatus };
    //         updateStatus(updatedJobPost);
    //         message.success("Cập nhật trạng thái thành công");
    //     }

    //     setModalVisible(false);
    // };



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
    const dataCompany = data?.list_company?.map(({ id, status, company_name,
        tax_code,
        address,
        name,
        founded_in,
        phone,
        email,
        office,
        logo,
        link_web,
        desc, }: ICompanys) => {
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
            desc,
        }
    })
    const columns: ColumnsType<ICompanys> = [
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
                    text = 'Chặn';
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
            width: 250,
            render: ({/*{ key: id, status }*/ }: { key: string | number, status: number }) => (
                <div className="flex -mx-6">
                    <Button type="link" >
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
                <h2 className="text-2xl font-semibold">Quản lý Công Ty</h2>
            </div>

            <Table columns={columns} dataSource={dataCompany} scroll={{ x: 1300 }} />; {/* Chỉnh độ rộng của bảng */}
            {/* <Modal
                title="Xác nhận duyệt bài đăng"
                visible={modalVisible}
                okText="Có"
                cancelText="Không"
                okType="default"
                onOk={() => handleModalConfirm(1)} // Duyệt (Trạng thái 1)
                onCancel={() => handleModalConfirm(0)} // Không duyệt (Trạng thái 0)
            >
                Bạn có muốn cho phép bài đăng này được được đăng tuyển không?
            </Modal> */}

        </div>
    )
}

export default CompanyManage

