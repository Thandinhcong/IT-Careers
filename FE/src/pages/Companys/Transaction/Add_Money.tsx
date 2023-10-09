import React, { useState } from 'react';
import { Divider, Radio, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
    key: React.Key;
    time: string | number;
    id_transaction: string;
    send_money: string,
    VAT: string,
    total: string,
    status: string,
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Thời gian',
        dataIndex: 'time',
        render: (text: string) => <p>{text}</p>,
    },
    {
        title: 'Mã giao dịch',
        dataIndex: 'id_transaction',
    },
    {
        title: 'Tiền nạp',
        dataIndex: 'send_money',
    },
    {
        title: 'VAT',
        dataIndex: 'VAT',
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'total',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
    },
];

const data: DataType[] = [
    // {
    //     key: '1',
    //     time: '2023-10-01 22:17:26',
    //     id_transaction: 'Khởi tạo tài khoản NTD',
    // },
];

const Add_Money = () => {

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

export default Add_Money;