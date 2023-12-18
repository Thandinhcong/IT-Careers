import { Table } from 'antd';
import { useGetHistoryPaymentQuery } from '../../../api/payment/paymentCandidate';

const HistoryPayment = () => {
    const { data } = useGetHistoryPaymentQuery()
    const listPayment = data?.['History Payment All'];
    const dataSource = listPayment?.map((item: any, index: any) => {
        return {
            key: item?.id,
            index: index + 1,
            ...item
        }
    })
    const formatCurrency = (amount: number, currency: string) => {
        const formattedAmount = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: currency,
        }).format(amount);

        return formattedAmount;
    };
    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'key',
        },
        {
            title: 'Số tiền',
            dataIndex: 'coin',
            key: 'key',
            render: (text: any, record: any) => {
                const exchangeRate = 1;
                const vndAmount = record.coin * exchangeRate;
                const formattedAmount = formatCurrency(vndAmount, 'VND');
                return <span className=''> {formattedAmount}</span>;
            },
        },
        {
            title: 'Thời gian',
            dataIndex: 'created_at',
            key: 'key',
        }
        ,
        {
            title: 'Mô tả',
            dataIndex: 'note',
            key: 'key',
        }
    ];
    return (
        <div className='w-3/4'>
            <h2 className='text-3xl font-medium text-blue-500 mb-5'>Lịch sử thanh toán</h2>
            {listPayment ? (
                <div className="overflow-x-auto rounded-lg   w-full">
                    <Table dataSource={dataSource} columns={columns} />
                </div>
            ) : (
                <div className='text-blue-500 text-xl'>Bạn chưa thực hiện giao dịch nào!</div>
            )}
        </div>
    )
}

export default HistoryPayment