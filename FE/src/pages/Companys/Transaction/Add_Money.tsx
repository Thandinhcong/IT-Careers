import React from 'react';
import { Divider, Spin, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useGetAllHistoryPaymentsQuery } from '../../../api/companies/package';
import moment from 'moment';

interface DataType {
    key: React.Key;
    time: string | number;
    id_transaction: string;
    send_money: string,
    VAT: string,
    total: string,
    status: string,
}

const Add_Money = () => {
    const { data, isLoading } = useGetAllHistoryPaymentsQuery();
    const datas: DataType[] = data?.['History Payment All'].map((item: any, index: number) => {

        return {
            key: item?.id,
            index: index + 1,
            ...item
        }

    })

    const columns: ColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: 'index',
        },
        {
            title: 'Số tiền nạp',
            dataIndex: 'coin',
            render: (text, record: any) => {
                const exchangeRate = 1;
                const vndAmount = record.coin * exchangeRate;
                const formattedAmount = formatCurrency(vndAmount, 'VND');
                return <span className='text-green-500'>+ {formattedAmount}</span>;
            },
        },
        {
            title: 'Thời gian',
            dataIndex: 'created_at',
            render: (text, record: any) => {
                return moment(record.created_at).format('YYYY-MM-DD HH:mm:ss');
            },
        },
    ];

    const formatCurrency = (amount: number, currency: string) => {
        const formattedAmount = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: currency,
        }).format(amount);

        return formattedAmount;
    };

    return (
        <div>
            <Divider />
            <Spin spinning={isLoading}>
                <Table
                    columns={columns}
                    dataSource={datas}
                    className='grid col-span-3'
                />
            </Spin>
        </div>
    );
};

export default Add_Money;