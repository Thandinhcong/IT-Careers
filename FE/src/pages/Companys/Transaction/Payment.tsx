import React from 'react';
import { Divider, Spin, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useGetAllHistoryPaymentsQuery } from '../../../api/companies/package';
import moment from 'moment';

interface DataType {
    key: React.Key;
    coin: string;
    note: string;
    created_at: string;
    type_coin: number
}

const Payment = () => {
    const { data, isLoading } = useGetAllHistoryPaymentsQuery();
    const formatCurrency = (amount: number, currency: string) => {
        const formattedAmount = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: currency,
        }).format(amount);

        return formattedAmount;
    };
    // Kết hợp hai mảng thành một mảng mới
    const combinedData: DataType[] = [];

    if (data?.data?.history_payment && data?.data?.profileHistory) {
        const maxItems = Math.max(data.data.history_payment.length, data.data.profileHistory.length);

        for (let i = 0; i < maxItems; i++) {
            const historyPaymentItem = data.data.history_payment[i];
            const profileHistoryItem = data.data.profileHistory[i];

            if (historyPaymentItem) {
                combinedData.push({
                    key: historyPaymentItem.id,
                    type_coin: historyPaymentItem.type_coin,
                    coin: historyPaymentItem.coin,
                    note: historyPaymentItem.note,
                    created_at: moment(historyPaymentItem.created_at).format('HH:mm:ss DD-MM-YYYY'),
                });
            }

            if (profileHistoryItem) {
                combinedData.push({
                    key: profileHistoryItem.id,
                    type_coin: historyPaymentItem.type_coin,
                    coin: profileHistoryItem.coin,
                    note: profileHistoryItem.note,
                    created_at: moment(profileHistoryItem.created_at).format('HH:mm:ss DD-MM-YYYY'),
                });
            }
        }
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Mô tả',
            dataIndex: 'note',
            render: (text, record: any) => <p>{record.note}</p>,
        },
        {
            title: 'Số xu',
            dataIndex: 'coin',
            render: (_text, record: any) => {
                const exchangeRate = 1;
                const vndAmount = record.coin * exchangeRate;
                const formattedAmount = formatCurrency(vndAmount, 'VND');
                return (
                    <span className={record.type_coin === 0 ? 'text-green-500' : 'text-red-500'}>
                        {record.type_coin === 0 ? '+ ' : '- '}
                        {formattedAmount}
                    </span>
                )
            },
        },
        {
            title: 'Thời gian',
            dataIndex: 'created_at',
        },
    ];

    return (
        <div>
            <Divider />
            <Spin spinning={isLoading}>
                <Table columns={columns} dataSource={combinedData} className='grid col-span-3' />
            </Spin>
        </div>
    );
};

export default Payment;
