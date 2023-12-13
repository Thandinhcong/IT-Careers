import React from 'react';
import { Divider, Spin, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useGetAllHistoryPaymentsQuery } from '../../../api/companies/package';
import moment from 'moment';

interface DataType {
    key: React.Key;
    time: string | number;
    desc: string;
    coin: string;
    last_coin: string;
}


const Payment = () => {
    const { data, isLoading } = useGetAllHistoryPaymentsQuery();
    const datas: DataType[] = data?.data?.history_all?.map((item: any, index: number) => {
        return {
            key: item?.id,
            index: index + 1,
            ...item
        }

    })

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text: string) => <p>{text}</p>,
        },
        {
            title: 'Mô tả',
            dataIndex: 'note',
            render: (text: string) => <p>{text}</p>,
        },
        {
            title: 'Số xu',
            dataIndex: 'coin',
            render: (text: string) => <p>{text}</p>,
        },
        {
            title: 'Thời gian',
            dataIndex: 'created_at',
            render: (text, record: any) => {
                return moment(record.created_at).format('HH:mm:ss YYYY-MM-DD');
            },
        },
    ];
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

export default Payment;