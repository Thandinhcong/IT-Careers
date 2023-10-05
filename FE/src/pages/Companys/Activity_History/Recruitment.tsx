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
];

const History_Recruitment = () => {

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

export default History_Recruitment;