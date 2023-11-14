import React from 'react';
import { Divider, Table } from 'antd';
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

const History_Transaction = () => {

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

export default History_Transaction;