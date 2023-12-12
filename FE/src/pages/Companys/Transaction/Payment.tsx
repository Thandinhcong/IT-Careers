import React from 'react';
import { Divider, Table } from 'antd';
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
    console.log(data);
    const datas: DataType[] = data?.data?.history_profile?.map((item: any, index: number) => {
        console.log("datas", item);

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
            dataIndex: 'desc',
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
                return moment(record.created_at).format('YYYY-MM-DD HH:mm:ss');
            },
        },
    ];
    return (
        <div>
            <Divider />
            <Table
                columns={columns}
                dataSource={datas}
                className='grid col-span-3'
            />
        </div>
    );
};

export default Payment;