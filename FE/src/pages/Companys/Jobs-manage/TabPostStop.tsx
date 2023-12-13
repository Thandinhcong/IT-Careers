import { AiOutlineCalendar, AiOutlineClockCircle, AiOutlineEdit, AiOutlineEnvironment, AiOutlineProfile, AiOutlineReload, AiOutlineSetting, AiOutlineTag } from "react-icons/ai"
import { useState } from 'react';
import { Button, Divider, Dropdown, Menu, Modal, Space, Table, Tag, Form, DatePicker, Select, Row, Col, InputNumber, message, Input, Skeleton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useExtendJobPostMutation, useGetJobPostByIdCompanyQuery, useGetJobPostSelectByIdQuery } from '../../../api/companies/jobPostCompany';
import { IJobPost } from "../../../interfaces";
import { formatDistanceToNow, parse } from 'date-fns';
import { vi } from 'date-fns/locale';
import moment from "moment";
import slugify from "slugify";
import { Link } from "react-router-dom";


// const cancel = () => {
//     message.info('Huỷ dừng');
// };
const isExpired = (endDate: string) => {
    const currentDate = moment();
    const end = moment(endDate);
    return currentDate.isAfter(end);
};
const TabPostStop = () => {
    const { data, isLoading } = useGetJobPostByIdCompanyQuery();

    const [extendJobPost] = useExtendJobPostMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
    // const [stopJobPost] = useStopJobPostMutation();
    const { data: select } = useGetJobPostSelectByIdQuery();

    const defaultEndDate = moment().add(10, 'days'); //giá trị mặc định là sau 10 ngày hiện tại
    const defaultQuantity = 10;

    const [searchKeyword, setSearchKeyword] = useState(""); // Trạng thái lưu từ khoá tìm kiếm
    const [originalJobPostData, setOriginalJobPostData] = useState([]); // Trạng thái lưu mảng bài đăng ban đầu
    console.log(originalJobPostData);

    const showModal = (jobId: number) => {
        setSelectedJobId(jobId);
        setIsModalOpen(true);
    };

    const handleQuantityChange = (value: string | number | null) => { //Tăng giảm ngày đăng lại bài
        // Lấy ngày hiện tại

        const currentDate = moment();

        // Tính toán ngày kết thúc mới bằng cách thêm số ngày gia hạn vào ngày hiện tại
        const newEndDate = currentDate.add(value, 'days');

        // Đặt giá trị mới cho trường 'end_date'
        form.setFieldsValue({ end_date: newEndDate });
    };

    const handleOk = () => {
        // Gọi hàm validateFields trên biểu mẫu
        form
            .validateFields()
            .then((values) => {
                if (values.end_date !== undefined || values.start_date !== undefined) {
                    const endDate = values.end_date.toDate();
                    const startDate = values.start_date.toDate();
                    // Định dạng ngày thành chuỗi "YYYY-MM-DD"
                    values.end_date = moment(endDate).format('YYYY-MM-DD');
                    values.start_date = moment(startDate).format('YYYY-MM-DD');
                }
                if (selectedJobId !== null) {
                    extendJobPost({ ...values, id: selectedJobId })
                        .unwrap()
                        .then(() => {
                            message.success(`Gia hạn thành bài đăng thành công`);
                            // Đóng Modal
                            setIsModalOpen(false);
                        })
                        .catch((error) => {
                            message.error(error?.data?.errors);
                        });
                } else {
                    message.error("Không có ID bài đăng được chọn.");
                }
                // Đóng Modal
                setIsModalOpen(false);
                console.log('Received values:', values);
            })
            .catch(() => {

            });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // const confirm = (id: number | string) => {
    //     stopJobPost(id);
    //     setTimeout(() => {
    //         message.success('Bài đăng đã được dừng tuyển');
    //     }, 1000);
    // };

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const columns: ColumnsType<IJobPost> = [
        {
            title: (
                <div className="p-0">
                    <span>Tiêu đề</span>
                </div>
            ),
            dataIndex: 'title',
            render: (title: string, record: IJobPost, id: number) => {
                if (record.start_date) {
                    const startDate = parse(record.start_date, 'yyyy-MM-dd', new Date());
                    const timeDiff = formatDistanceToNow(startDate, { locale: vi, addSuffix: true });


                    return (
                        <div className="text-gray-600 w-auto">
                            <p>Mã tin: <span className="font-medium"># {id + 1}</span></p>
                            <a className="font-bold text-[15px] text-gray-700">{title}</a>
                            <div className="flex items-center">
                                <p className="flex items-center gap-1"><AiOutlineClockCircle /><span>{timeDiff}</span> </p>
                                <p className="border-gray-500 border-x-2 mx-1 px-2 flex items-center gap-1">
                                    <AiOutlineEnvironment />
                                    <span>{record.province}</span>
                                </p>
                                <p className="flex items-center gap-1"><AiOutlineCalendar /> <span>{record.major_id}</span></p>
                            </div>
                        </div>
                    )
                }

            },
        },
        {
            title: 'Loại tin',
            dataIndex: 'type_post',
            width: 100,
            render: (type_post: string) => (
                <p className="text-center">{type_post}</p>
            )
        },
        {
            title: 'Trạng thái',
            key: 'status',
            dataIndex: 'status',
            render: (status: number | undefined) => {
                let color;
                let text;

                if (status === 1) {
                    color = 'green';
                    text = 'Được duyệt';

                } else if (status === 0) {
                    color = 'geekblue';
                    text = 'Chưa duyệt';
                } else if (status === 3) {
                    color = 'gold';
                    text = 'Dừng tuyển';
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
            title: 'Lượt xem',
            dataIndex: 'views',
            width: 100,
            render: (views: number) => (
                <p className="text-center">{views}</p>
            )
        },
        {
            title: 'Hồ sơ',
            dataIndex: 'quantity_apply',
            width: 70,
            render: (quantity_apply: number) => (
                <p className="text-center">{quantity_apply}</p>
            )
        },
        {
            title: (
                <div className="text-center">
                    <span>Thao tác</span>
                </div>
            ),
            render: ({ key: id, end_date, title, status }: { key: number, end_date: string, title: string, status: number | string }) => {
                const isExpiredValue = end_date ? isExpired(end_date) : true;
                const showExtendButton = isExpiredValue || status === 3;
                const slug = slugify(title, { lower: true });
                return (
                    <div className="flex gap-2">
                        {showExtendButton && (
                            <Button type="primary" className="bg-[#f5f6fa] border border-[#dbdfea] py-1 px-2.5 rounded " onClick={() => showModal(id)}>
                                <AiOutlineReload className="text-xl text-[#526484] hover:text-white" />
                            </Button>
                        )}
                        <Space>
                            <Button type="primary" className="bg-[#f5f6fa] border border-[#dbdfea] py-1 px-2.5 rounded " href={`job_post/update/${id}`}>
                                <AiOutlineEdit className="text-xl text-[#526484] hover:text-white" />
                            </Button>
                        </Space>
                        <Space direction="vertical">
                            <Dropdown overlay={
                                <Menu>
                                    <Menu.Item key="1">
                                        <Link target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" to={`/job-detail/${slug}/${id}`}>
                                            <AiOutlineTag />
                                            Xem tin đăng trên web
                                        </Link>
                                    </Menu.Item>
                                    {/* <Menu.Item key="2">
                                        <a target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" href="https://www.antgroup.com">
                                            <AiOutlineDelete />
                                            <p>Xóa tin</p>
                                        </a>
                                    </Menu.Item> */}
                                    {/* <Menu.Item key="3">
                                        <Popconfirm
                                            title="Dừng tuyển bài đăng"
                                            description="Bạn có muốn bài đăng này dừng tuyển không?"
                                            onConfirm={() => confirm(id)}
                                            onCancel={cancel}
                                            okText="Có"
                                            okType="default"
                                            cancelText="Không"
                                        >
                                            <a target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                                                <AiOutlinePauseCircle />
                                                Dừng tuyển
                                            </a>
                                        </Popconfirm>

                                    </Menu.Item> */}
                                    <Menu.Item key="4">
                                        <a target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" href={`/business/cv-apply/job-post/${id}`}>
                                            <AiOutlineProfile />
                                            Hồ sơ đăng tuyển
                                        </a>
                                    </Menu.Item>
                                </Menu>
                            } placement="bottomRight">
                                <Button type="primary" className="bg-[#f5f6fa] border border-[#dbdfea] py-1 px-2.5 rounded">
                                    <AiOutlineSetting className="text-xl text-[#526484] hover:text-white" />
                                </Button>
                            </Dropdown>
                        </Space>
                    </div>
                )
            }
        },
    ];
    if (isLoading) return <Skeleton loading />;
    const jobPostData = data?.Job_position?.map((item: IJobPost) => {

        return {
            key: item.id,
            status: item.status,
            title: item.title,
            gender: item.gender,
            quantity: item.quantity,
            require: item.requirement,
            start_date: item.start_date,
            end_date: item.end_date,
            office: item.office,
            type_post: item.name,
            job_position_id: item.job_position_id,
            province: item.province, //Tỉnh/ Thành phố
            district: item.district, //Quận/ Huyện
            academic_level_id: item.academic_level_id,
            major_id: item.major,
            interest: item.interest,
            views: item.view,
            quantity_apply: item.quantity_apply,
        }
    })
    const passJobPostData = jobPostData?.filter((item: IJobPost) => item.status === 3);
    const filteredJobPostData = passJobPostData?.filter((item: IJobPost) => {
        return item.title?.toLowerCase().includes(searchKeyword.toLowerCase()); // Lọc theo từ khoá trong tiêu đề bài đăng
    });
    return (
        <div>
            <div className="flex gap-4 text-sm my-4">
                <Input
                    type="text"
                    placeholder="Tìm theo tiêu đề bài đăng"
                    className="border border-gray-200 py-2 px-4 rounded-md outline-blue-400 w-1/2"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <button
                    className="bg-[#eaebee] text-gray-500 flex items-center rounded-md px-5"
                    onClick={() => {
                        setSearchKeyword(""); // đặt input về chuỗi rỗng
                        setOriginalJobPostData([]); //đặt lại mảng về ban đầu
                    }}
                >
                    <AiOutlineReload />
                    <p>Xóa lọc</p>
                </button>
            </div>
            <div>
                <Divider />
                {filteredJobPostData && filteredJobPostData.length > 0 ? (
                    <Table
                        columns={columns}
                        dataSource={filteredJobPostData || passJobPostData}
                    />
                ) : (
                    <p>Không tìm thấy bài đăng</p>
                )}
            </div>
            <Modal
                title="Đăng lại bài"
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Xác nhận"
                okType="default"
                cancelText="Huỷ"
            >
                <div className="text-[#526484]">
                    <p className="my-3 pb-3">Tin tuyển dụng sẽ được đăng lại thông tin sau khi chúng tôi duyệt.</p>
                    <Form
                        form={form}
                        name="repostJobForm"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        initialValues={{ remember: true }}
                        autoComplete="off"
                    >
                        <Form.Item<IJobPost>
                            label="Chọn loại tin đăng"
                            name="type_job_post_id"
                            rules={[{ required: true }]}
                        >
                            <Select placeholder="--Chọn--" style={{ width: '100%' }} onChange={handleChange}>
                                {select?.data?.type_job_post.map((options: IJobPost) => (
                                    <Select.Option key={options.id} value={options.id}>
                                        {options.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="quantity_date"
                                    label="Số ngày gia hạn"
                                    initialValue={defaultQuantity} // Đặt giá trị mặc định của trường nhập số ngày gia hạn
                                >
                                    <InputNumber
                                        style={{ width: '100%' }}
                                        min={5} // Đặt giá trị tối thiểu
                                        step={1} // Đặt bước tăng giảm
                                        onChange={handleQuantityChange}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item<IJobPost>
                                    name="end_date"
                                    label="Ngày kết thúc"
                                    initialValue={defaultEndDate} // Đặt giá trị mặc định của DatePicker
                                >
                                    <DatePicker style={{ width: '100%' }} disabled />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item<IJobPost>
                                    name="start_date"
                                    label="Ngày bắt đầu"
                                    hidden
                                    initialValue={moment()} // Đặt giá trị mặc định của DatePicker là ngày hiện tại
                                >
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default TabPostStop