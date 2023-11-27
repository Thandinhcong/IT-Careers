import { Button, Form, Input, InputNumber, Steps } from 'antd';
import { useGetAllPackageQuery, useInsertInvoiceMutation, usePayMentMutation, useVnpayIpnQuery, useVnpayReturnQuery } from '../../../api/companies/package';
import { IPackages } from '../../../interfaces';
import { useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';


const { Step } = Steps;

const Deposit = () => {

    const { data: packages } = useGetAllPackageQuery();// Lấy ra tất cả gói nạp

    let queryString = location.search.substring(0); // Loại bỏ dấu '?' ở đầu chuỗi
    let param = queryString.length > 0 ? queryString : null;

    const { data: vnpayReturnData } = useVnpayReturnQuery(param);
    console.log(vnpayReturnData);
    const { data: vnpayIpnData } = useVnpayIpnQuery(param);
    console.log(vnpayIpnData);


    const [insertInvoice] = useInsertInvoiceMutation(); // Tạo hoá đơn-Xác nhận thanh toán
    const [payMent] = usePayMentMutation(); // Tạo hoá đơn-Xác nhận thanh toán

    const [responseData, setResponseData] = useState<any>(null); //Lưu thông tin tạo hoá đơn

    const [moneyValue, setMoneyValue] = useState<number | undefined>(undefined);
    const [currentStep, setCurrentStep] = useState(0);

    const onNextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const onPrevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const onFinishStep1 = (values: IPackages) => {
        insertInvoice(values)
            .unwrap()
            .then((response) => {
                setResponseData(response);
                onNextStep();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const onFinishStep2 = (values: IPackages) => {
        payMent(values)
            .unwrap()
            .then((response) => {
                const redirectUrl = response[0].data;
                // Chuyển hướng trình duyệt đến đường dẫn redirectUrl
                window.location.href = redirectUrl;

            })
            .catch((error) => {
                // Xử lý lỗi nếu có
                console.error(error);
            });

    };

    return (
        <div className='bg-gray-100 p-10'>
            <div className='bg-white p-8'>
                <Steps current={currentStep}>
                    <Step title='Chọn gói' />
                    <Step title='Xác nhận thanh toán' />
                </Steps>

                {currentStep === 0 && (
                    <div>
                        <h2 className='font-semibold text-lg'>Nạp xu</h2>
                        <div className='grid grid-cols-4 gap-6 my-5 mx-14'>
                            {packages?.package?.map((item: IPackages) => (
                                <div key={item.id} className='flex-col border border-gray-100 shadow-5xl rounded-2xl text-center leading-8 py-3'>
                                    <h2 className='text-lg'>{item.title}</h2>
                                    <p>Giá: {item.price} <span className='text-[10px] text-red-500'>VND</span></p>
                                    <p>Số xu: {item.coin} xu</p>
                                    <Form
                                        className='-mt-12 -mb-3'
                                        name='basic'
                                        labelCol={{ span: 24 }}
                                        wrapperCol={{ span: 24 }}
                                        style={{ maxWidth: 400 }}
                                        initialValues={{ package_id: item.id }}
                                        onFinish={onFinishStep1}
                                        autoComplete='off'
                                    >
                                        <Form.Item name='package_id'>
                                            <Input hidden />
                                        </Form.Item>

                                        <Form.Item labelAlign='left'>
                                            <Button type='primary' className='bg-blue-600 w-1/3' htmlType='submit'>
                                                Chọn
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {currentStep === 1 && (
                    <div className='bg-white p-8'>
                        <h2 className='font-semibold text-lg'>Xác nhận thanh toán</h2>
                        <Form
                            className='mx-40'
                            name='basic'
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ maxWidth: 600 }}
                            initialValues={{ remember: true }}
                            onFinish={onFinishStep2}
                            autoComplete='off'
                        >
                            <Form.Item
                                label="Tên gói nạp"
                                name='title'
                                initialValue={responseData.invoice.package.title}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    disabled
                                />
                            </Form.Item>

                            <Form.Item
                                label=""
                                name='invoice_id'
                                initialValue={responseData.invoice.invoice_id}
                            >
                                <Input
                                    style={{ width: '100%' }}
                                    disabled
                                    hidden
                                />
                            </Form.Item>

                            <Form.Item
                                label='Số tiền nạp'
                                name='amount'
                                className='-mt-12'
                                initialValue={responseData?.invoice?.amount}
                            >
                                <InputNumber
                                    style={{ width: '100%' }}
                                    addonAfter={<span>VND(1VND = 1Xu)</span>}
                                    value={moneyValue}
                                    formatter={(value) => {
                                        setMoneyValue(value);
                                        return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    }}
                                    disabled
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
                                <Button type='primary' htmlType='submit' className='bg-blue-600 flex items-center gap-1 p-5' danger>
                                    <AiOutlineCheckCircle className='text-xl' /> <span>Xác nhận giao dịch</span>
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                )}
                <div className='flex justify-between mt-4'>
                    {currentStep > 0 && (
                        <Button onClick={onPrevStep}>Quay lại</Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Deposit;
