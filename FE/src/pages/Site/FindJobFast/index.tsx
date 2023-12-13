import { Link } from "react-router-dom"
import type { SelectProps } from 'antd';
import { Button, Checkbox, Col, Form, Input, InputNumber, Select } from 'antd';

const FindJobFast = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        username?: string;
        password?: string;
        remember?: string;
    };

    return (
        <div className='max-w-5xl mx-auto my-10'>
            <h3 className='text-center text-2xl font-semibold mb-10 text-blue-500'>Tìm kiếm nhanh</h3>
            <p className="text-center text-base font-sans">Mỗi lần sử dụng bạn sẽ mất 30.000 coin. Tối đa bạn chỉ được sử dụng 1 lần / 1 ngày. Sử dụng chức năng sẽ giúp bạn apply vào bài tuyển dụng phù hợp một cách nhanh chống mà bạn không phải tìm xem từng bài tuyển dụng nào phù hợp với bạn.</p>
            <div className="text-center mt-1">Do bạn chưa tạo cv trên hệ thống. nên bạn hãy tìm kiếm bằng cách chọn chuyên ngành hoặc chọn kỹ năng bên dưới để sử dụng chức năng hoặc bạn có thể tạo cv <Link to="/user/listcv" className="text-blue-500">tại đây!</Link></div>
            {/* <div className="my-10 grid grid-cols-4 gap-5"> */}
            <Form
                // form={form}
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div className="grid grid-cols-4 gap-5 my-5">

                    <div className="col-span-1">
                        <Form.Item<FieldType>

                            label="Ngành nghề muốn quan tâm"
                            // name="major"
                            rules={[{ required: true, message: 'Vui lòng nhập ngành nghề muốn tìm việc!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="col-span-1">
                        <Form.Item<any>
                            label="Tỉnh/Thành phố"
                            rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố" }]}
                        >
                            <Select placeholder="--Chọn--" style={{ width: '100%' }}>
                                {/* {province?.map((options: any) => (
                                    <Select.Option key={options.id} rovinceId={options.id}>
                                        {options.province}
                                    </Select.Option>
                                ))} */}
                            </Select>
                        </Form.Item>
                    </div>
                    {/* Quận/Huyện*/}
                    <div className="col-span-1">

                        <Form.Item<any>
                            label="Kinh nghiệm làm việc"
                            name="district_id"
                            rules={[{ required: true, message: "Vui lòng chọn địa chỉ làm việc" }]}
                        >
                            <Select placeholder="--Chọn--" style={{ width: '100%' }} >
                                {/* {districts?.filter((options: {
                                    province_id: string | number | null; id: string | number;
                                }) => options.province_id == selectedProvinceId) */}
                                {/* .map((options: any) => (
                                        <Select.Option key={options.id} value={options.id}>
                                            {options.name}
                                        </Select.Option>
                                    ))} */}
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="col-span-1">


                        <Form.Item<any>
                            label="Hình thức làm việc"
                            name="experience_id"
                        >
                            <Select placeholder="--Chọn--" style={{ width: '100%' }} >
                                {/* {
                                    listExp?.map((options: any) => {
                                        return <Select.Option key={options.id} value={options.id}>
                                            {options?.experience}
                                        </Select.Option>
                                    })
                                } */}
                            </Select>
                        </Form.Item>
                    </div>
                </div>

                <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
                    <Button type="primary" className='bg-blue-500 mb-10 mx-auto' htmlType="submit">
                        Tìm kiếm
                    </Button>
                </Form.Item>
            </Form>
        </div>

        // </div>
    )
}

export default FindJobFast