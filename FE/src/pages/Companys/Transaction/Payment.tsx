import React, { useState } from 'react';
import { Divider, Radio, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
    key: React.Key;
    time: string | number;
    desc: string;
    coin: string;
    last_coin: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Ngày giao dịch',
        dataIndex: 'time',
        render: (text: string) => <p>{text}</p>,
    },
    {
        title: 'Mô tả',
        dataIndex: 'desc',
        render: (text: string) => <p>{text}</p>,
    },
    {
        title: 'Số xu',
        dataIndex: 'coin',
        render: (text: string) => <p>{text}</p>,
    },
    {
        title: 'Số dư cuối',
        dataIndex: 'last_coin',
        render: (text: string) => <p>{text}</p>,
    },
];

const data: DataType[] = [
    {
        key: '1',
        time: '2023-10-01 22:17:26',
        desc: 'Khuyến mại tài khoản mới',
        coin: '+30,000 xu',
        last_coin: '30,000 xu',
    },
];

const Payment = () => {

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

export default Payment;