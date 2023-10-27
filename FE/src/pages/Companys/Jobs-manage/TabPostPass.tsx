import { AiOutlineAreaChart, AiOutlineBulb, AiOutlineCalendar, AiOutlineClockCircle, AiOutlineDelete, AiOutlineEdit, AiOutlineEnvironment, AiOutlineFilter, AiOutlineNodeIndex, AiOutlinePauseCircle, AiOutlineProfile, AiOutlineReload, AiOutlineSetting, AiOutlineTag } from "react-icons/ai"
import React, { useState } from 'react';
import { Button, Divider, Drawer, Dropdown, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { MenuProps } from 'antd';
import { useGetJobPostByIdCompanyQuery } from '../../../api/companies/jobPostCompany';
import FormEdit from "./PostEdit";
import { IJobPost } from "../../../interfaces";
import { formatDistanceToNow, parse } from 'date-fns';
import { vi } from 'date-fns/locale';

const TabPostPass = () => {
    const { data } = useGetJobPostByIdCompanyQuery();



    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" href="https://www.antgroup.com">
                    <AiOutlineDelete />
                    <p>Xóa tin</p>
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" href="https://www.aliyun.com">
                    <AiOutlineProfile />
                    Hồ sơ ứng tuyển
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" href="https://www.luohanacademy.com">
                    <AiOutlineTag />
                    Xem tin đăng trên web
                </a>
            ),
        },
        {
            key: '4',
            label: (
                <a target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" href="https://www.luohanacademy.com">
                    <AiOutlinePauseCircle />
                    Dừng tuyển
                </a>
            ),
        },
        {
            key: '5',
            label: (
                <a target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" href="https://www.luohanacademy.com">
                    <AiOutlineBulb />
                    Dịch vụ đã áp dụng
                </a>
            ),
        },
    ];
    const columns: ColumnsType<IJobPost> = [
        {
            title: (
                <div className="p-0">
                    <span>Tiêu đề</span>
                </div>
            ),
            dataIndex: 'title',
            render: (title: string, record: IJobPost) => {
                const startDate = parse(record.start_date, 'yyyy-MM-dd', new Date()); // Chuyển record.start_date thành đối tượng ngày
                const currentDate = new Date();
                const timeDiff = formatDistanceToNow(startDate, { locale: vi, addSuffix: true });
                return (
                    <div className="text-gray-600 w-auto">
                        <p>Mã tin: <span className="font-medium"># {record.id}</span></p>
                        <a className="font-bold text-[15px] text-gray-700">{title}</a>
                        <p className="flex items-center">
                            <p className="flex items-center gap-1"><AiOutlineClockCircle /><span>{timeDiff}</span> </p>
                            <p className="border-gray-500 border-x-2 mx-1 px-2 flex items-center gap-1">
                                <AiOutlineEnvironment />
                                <span>{record.area_id}</span>
                            </p>
                            <p className="flex items-center gap-1"><AiOutlineCalendar /> <span>{record.major_id}</span></p>
                        </p>
                    </div>
                )
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
            dataIndex: 'profile',
            width: 70,
            render: (profile: string) => (
                <p className="text-center">{profile}</p>
            )
        },
        {
            title: (
                <div className="text-center">
                    <span>Thao tác</span>
                </div>
            ),
            render: () => (
                <div className="flex items-center gap-2">
                    <Button type="primary" className="bg-[#f5f6fa] border border-[#dbdfea] py-1 px-2.5 rounded ">
                        <AiOutlineNodeIndex className="text-xl text-[#526484] hover:text-white" />
                    </Button>
                    <Button type="primary" className="bg-[#f5f6fa] border border-[#dbdfea] py-1 px-2.5 rounded ">
                        <AiOutlineAreaChart className="text-xl text-[#526484] hover:text-white" />
                    </Button>
                    <Space>
                        <Button type="primary" className="bg-[#f5f6fa] border border-[#dbdfea] py-1 px-2.5 rounded " onClick={showDrawer}>
                            <AiOutlineEdit className="text-xl text-[#526484] hover:text-white" />
                        </Button>
                    </Space>
                    <Drawer title="Sửa bài đăng" placement="right" onClose={onClose} open={open} width={500}>
                        <FormEdit />
                    </Drawer>
                    <Space direction="vertical">
                        <Dropdown menu={{ items }} placement="bottomRight">
                            <Button type="primary" className="bg-[#f5f6fa] border border-[#dbdfea] py-1 px-2.5 rounded">
                                <AiOutlineSetting className="text-xl text-[#526484] hover:text-white" />
                            </Button>
                        </Dropdown>
                    </Space>
                </div>
            )
        },
    ];

    const jobPostData = data?.Job_position?.map((item: IJobPost) => {

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
            area_id: item.area_id,
            academic_level_id: item.academic_level_id,
            major_id: item.major_id,
            interest: item.interest,
        }
    })
    const passJobPostData = jobPostData.filter((item: IJobPost) => item.status === 1);
    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: DataType) => ({
            name: record.title,
        }),
    };
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
                    rowSelection={{
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={passJobPostData}
                />
            </div>
        </div>
    )
}

export default TabPostPass