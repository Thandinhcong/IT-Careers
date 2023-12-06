import { Table } from 'antd';
import React from 'react'
import { useGetHistoryPaymentQuery } from '../../../api/payment/paymentCandidate';

const HistoryPayment = () => {
    const { data } = useGetHistoryPaymentQuery()
    const listPayment = data?.['History Payment All'];
    console.log(listPayment);
    const dataSource = listPayment?.map((item: any) => {
        return {
            key: item?.id,
            ...item
        }
    })

    const columns = [
        {
            title: 'Số tiền',
            dataIndex: 'coin',
            key: 'coin',
        },
        {
            title: 'Thời gian',
            dataIndex: 'created_at',
            key: 'age',
        }
    ];
    return (
        <div className='w-full'>
            <h2 className='text-2xl text-blue-500 mb-5'>Lịch sử thanh toán</h2>
            {listPayment ? (
                <div className="overflow-x-auto rounded-lg border border-gray-200 w-full">
                    <Table dataSource={dataSource} columns={columns} />
                </div>

            ) : (

                <div className='text-blue-500 text-2xl'>Bạn chưa thực hiện giao dịch nào!</div>
            )}


        </div>
    )
}

export default HistoryPayment