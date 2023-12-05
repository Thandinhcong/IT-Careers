import React from 'react';
import { Divider, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useGetAllPaymentsQuery } from '../../../api/companies/historysPayment';

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
    const { data } = useGetAllPaymentsQuery();
    console.log(data);
    const datas: DataType[] = data?.['History Payment All'].map((item: any) => {

        return {
            key: item?.id,
            ...item
        }

    })

    const columns: ColumnsType<DataType> = [
        {
            title: 'Số tiền',
            dataIndex: 'coin',
        },
        {
            title: 'Thời gian',
            dataIndex: 'created_at',
        }
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

export default Add_Money;