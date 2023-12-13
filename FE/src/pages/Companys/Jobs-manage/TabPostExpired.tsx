import { AiOutlineBulb, AiOutlineCalendar, AiOutlineClockCircle, AiOutlineEdit, AiOutlineEnvironment, AiOutlineFilter, AiOutlineReload, AiOutlineSetting, AiOutlineTag } from "react-icons/ai"
import { useState } from 'react';
import { Button, Divider, Dropdown, Menu, Modal, Space, Table, Tag, Form, DatePicker, Select, Row, Col, InputNumber, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useExtendJobPostMutation, useGetJobPostExpiresByIdCompanyQuery } from '../../../api/companies/jobPostCompany';
import { IJobPost } from "../../../interfaces";
import { formatDistanceToNow, parse } from 'date-fns';
import { vi } from 'date-fns/locale';
import moment from "moment";
import { Link } from "react-router-dom";


// const cancel = () => {
//     message.info('Huỷ dừng');
// };
const TabPostExpired = () => {
    const { data } = useGetJobPostExpiresByIdCompanyQuery();

    const [extendJobPost] = useExtendJobPostMutation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
    // const [stopJobPost] = useStopJobPostMutation();
    const defaultEndDate = moment().add(5, 'days');
    const defaultQuantity = 5;

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
                if (values.end_date !== undefined) {
                    const endDate = values.end_date.toDate();
                    // Định dạng ngày thành chuỗi "YYYY-MM-DD"
                    values.end_date = moment(endDate).format('YYYY-MM-DD');
                }
                if (selectedJobId !== null) {
                    extendJobPost({ ...values, id: selectedJobId })
                        .unwrap()
                        .then(() => {
                            message.success(`Gia hạn thành bài đăng thành công`);
                        })
                        .catch((error) => {
                            message.error("Đăng bài thất bại" + error.message);
                        });
                } else {
                    message.error("Không có ID bài đăng được chọn.");
                }
                // Đóng Modal
                setIsModalOpen(false);
            })

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

    const columns: ColumnsType<any> = [
        {
            title: (
                <div className="p-0">
                    <span>Tiêu đề</span>
                </div>
            ),
            dataIndex: 'title',
            render: (title: string, record: IJobPost) => {
                if (record.start_date) {
                    const startDate = parse(record.start_date, 'yyyy-MM-dd', new Date());
                    const timeDiff = formatDistanceToNow(startDate, { locale: vi, addSuffix: true });
                    return (
                        <div className="text-gray-600 w-auto">
                            <p>Mã tin: <span className="font-medium"># {record.id}</span></p>
                            <a className="font-bold text-[15px] text-gray-700">{title}</a>
                            <p className="flex items-center">
                                <p className="flex items-center gap-1"><AiOutlineClockCircle /><span>{timeDiff}</span> </p>
                                <p className="border-gray-500 border-x-2 mx-1 px-2 flex items-center gap-1">
                                    <AiOutlineEnvironment />
                                    <span>{record.province}</span>
                                </p>
                                <p className="flex items-center gap-1"><AiOutlineCalendar /> <span>{record.major_id}</span></p>
                            </p>
                        </div>
                    )
                }
            },
        },
        {
            title: 'Loại tin',
            dataIndex: 'type',
            width: 100,
            render: (type: string) => (
                <p className="text-center">{type}</p>
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
            title: 'Hiển thị',
            dataIndex: 'display',
            width: 90,
            render: (display: string) => (
                <p className="text-center">{display}</p>
            )
        },
        {
            title: 'Lượt xem',
            dataIndex: 'views',
            width: 100,
            render: (views: string) => (
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
            render: ({ key: id }: { key: number }) => {

                return (
                    <div className="flex gap-2">
                        <Button type="primary" className="bg-[#f5f6fa] border border-[#dbdfea] py-1 px-2.5 rounded " onClick={() => showModal(id)}>
                            <AiOutlineReload className="text-xl text-[#526484] hover:text-white" />
                        </Button>
                        <Space>
                            <Button type="primary" className="bg-[#f5f6fa] border border-[#dbdfea] py-1 px-2.5 rounded " href={`job_post/update/${id}`}>
                                <AiOutlineEdit className="text-xl text-[#526484] hover:text-white" />
                            </Button>
                        </Space>
                        <Space direction="vertical">
                            <Dropdown overlay={
                                <Menu>
                                    <Menu.Item key="1">
                                        <Link target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" to={`/job-detail/${id}`}>
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
                                        <a target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" href="https://www.luohanacademy.com">
                                            <AiOutlineBulb />
                                            Dịch vụ đã áp dụng
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

    const jobPostData: any = data?.data?.map((item: IJobPost) => {

        return {
            key: item.id,
            status: item.status,
            title: item.title,
            gender: item.gender,
            quantity: item.quantity,
            require: item.require,
            start_date: item.start_date,
            end_date: item.end_date,
            office: item.office,
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

    return (
        <div>
            <div className="flex gap-4 text-sm my-4">
                <input type="text" placeholder="Tìm theo tiêu đề hoặc mã tin" className="border border-gray-200 py-2 px-4 rounded-md outline-blue-400 w-1/2" />
                <button className="bg-blue-600 text-white flex items-center rounded-md px-5"><AiOutlineFilter className="text-lg" /><p>Lọc</p></button>
                <button className="bg-[#eaebee] text-gray-500 flex items-center rounded-md px-5"><AiOutlineReload /><p>Xóa lọc</p></button>
            </div>
            <div>
                <Divider />

                <Table
                    columns={columns}
                    dataSource={jobPostData}
                />
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
                        <Form.Item
                            name="selectedOption"
                            label="Chọn loại tin đăng"
                        // rules={[{ required: true, message: 'Vui lòng chọn một tùy chọn!' }]}
                        >
                            <Select style={{ width: '100%' }} placeholder="--Chọn loại tin--">
                                <Select.Option value="option1">Vip 1</Select.Option>
                                <Select.Option value="option2">Vip 2</Select.Option>
                                <Select.Option value="option3">Vip 3</Select.Option>
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

                        </Row>



                    </Form>
                </div>
            </Modal>
        </div>
    )
}

export default TabPostExpired