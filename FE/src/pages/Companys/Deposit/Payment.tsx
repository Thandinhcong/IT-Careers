import { useState } from 'react';
import { Button, Form, InputNumber } from 'antd';
import { AiOutlineCheckCircle } from 'react-icons/ai';


const onFinish = (values: unknown) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo);
};

type FieldType = {
    username?: string;
    tel?: string;
    email?: string;
    money?: number;

};

const Payment = () => {
    const [moneyValue, setMoneyValue] = useState<number | undefined>(undefined);
    return (
        <div className='bg-gray-100 p-10'>
            <div className='bg-white p-8'>
                <h2 className='font-semibold text-lg'>Xác nhận thanh toán</h2>
                <Form
                    className='mx-40'
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Số tiền nạp"
                        name="money"
                        rules={[
                            { required: true, message: 'Cần nhập thông tin này!' },
                            { type: 'number', min: 100000, max: 10000000, message: 'Số tiền nạp phải từ 100,000 đến 10,000,000 VND!' }
                        ]}

                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            addonAfter={<span>VND(1VND = 1Xu)</span>}
                            value={moneyValue}
                            formatter={(value) => {
                                setMoneyValue(value);
                                return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            }}

                        />
                    </Form.Item>
                    <p className='my-2 text-gray-500'>
                        Số tiền bạn nạp là:
                        <span className='font-semibold text-gray-800'>   {moneyValue !== undefined && moneyValue.toString()} VND</span>
                    </p>

                    <p className='font-semibold text-gray-500 text-base'>Thanh toán</p>
                    <div className='bg-[#f5f6fa] flex justify-between items-center p-3 my-3 text-gray-500'>
                        <div className='leading-8'>
                            <p>Số tiền nạp: </p>
                            <p>Số xu:</p>
                        </div>
                        <div className='leading-8'>
                            <p>{moneyValue} VND</p>
                            <p>{moneyValue} Xu</p>
                        </div>
                    </div>

                    <Form.Item className='flex justify-end'>
                        <Button type="primary" htmlType="submit" className='bg-blue-600 flex items-center gap-1 p-5' danger>
                            <AiOutlineCheckCircle className='text-xl' /> <span>Xác nhận giao dịch</span>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Payment