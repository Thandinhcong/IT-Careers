import React, { useState } from 'react';
import { Divider, Radio, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
    key: React.Key;
    time: string | number;
    content: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Thời gian',
        dataIndex: 'time',
        render: (text: string) => <p>{text}</p>,
    },
    {
        title: 'Nội dung',
        dataIndex: 'content',
    }
];

const data: DataType[] = [
    {
        key: '1',
        time: '2023-10-01 22:17:26',
        content: 'Khởi tạo tài khoản NTD',
    },
];

const All_History = () => {

    return (
        <div>
            <Divider />
            <Table
                columns={columns}
                dataSource={data}
                className='grid col-span-3'
            />
        </div>
    );
};

export default All_History;