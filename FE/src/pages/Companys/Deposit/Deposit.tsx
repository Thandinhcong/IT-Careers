
import { useState } from 'react';
import AsideDeposit from './AsideDeposit'
import { Button, Form, Input, InputNumber, Radio } from 'antd';
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

const Deposit = () => {
    const [moneyValue, setMoneyValue] = useState<number | undefined>(undefined);
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>(undefined);

    const handlePriceChange = (e: any) => {
        setSelectedPrice(e.target.value);
        setMoneyValue(e.target.value);
        // console.log(e.target.value);

    };
    console.log(moneyValue);

    return (
        <div className='grid grid-cols-7 gap-3 bg-gray-100 p-10'>
            <div className='col-span-4 bg-white p-8'>
                <h2 className='font-semibold text-lg'>Nạp xu vào tài khoản</h2>
                <Form
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
                        label="Họ và tên"
                        name="username"
                        rules={[{ required: true, message: 'Cần nhập thông tin này!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Số điện thoại"
                        name="tel"
                        rules={[{ required: true, message: 'Cần nhập thông tin này!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Cần nhập thông tin này!' },
                            { type: 'email', message: 'Email không đúng định dạng!' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
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
                    <input type="text" value={moneyValue} />
                    <p className='my-2 text-gray-500'>
                        Số tiền bạn nạp là:
                        <span className='font-semibold text-gray-800'>   {moneyValue !== undefined && moneyValue.toString()} VND</span>
                    </p>
                    <div className="flex flex-wrap gap-3 items-center my-2">
                        <div className='text-gray-500 font-medium text-base mr-2'>
                            <p>Đề xuất: </p>
                        </div>
                        <Radio.Group onChange={handlePriceChange}>
                            <Radio.Button value={100000}>100,000</Radio.Button>
                            <Radio.Button value={300000}>300,000</Radio.Button>
                            <Radio.Button value={500000}>500,000</Radio.Button>
                            <Radio.Button value={700000}>700,000</Radio.Button>
                            <Radio.Button value={1000000}>1,000,000</Radio.Button>
                        </Radio.Group>
                    </div>

                    <p className='font-semibold text-gray-500 text-base'>Thanh toán</p>
                    <div className='bg-[#f5f6fa] flex justify-between items-center p-3 my-3 text-gray-500'>
                        <div className='leading-8'>
                            <p>Số tiền nạp: </p>
                            <p>Thuế VAT: </p>
                            <p>Xu khuyến mãi:</p>
                        </div>
                        <div className='leading-8'>
                            <p>{moneyValue} VND</p>
                            <p>{moneyValue !== undefined ? (moneyValue / 10) : 0} VND</p>
                            <p>{moneyValue !== undefined ? (moneyValue / 10) : 0} Xu</p>
                        </div>
                    </div>

                    <Form.Item className='flex justify-end'>
                        <Button type="primary" htmlType="submit" className='bg-blue-600 flex items-center gap-1 p-5' danger>
                            <AiOutlineCheckCircle className='text-xl' /> <span>Xác nhận giao dịch</span>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className='bg-white p-6 leading-8 col-span-3 text-gray-600'>
                <AsideDeposit />
            </div>
        </div>
    )
}

export default Deposit