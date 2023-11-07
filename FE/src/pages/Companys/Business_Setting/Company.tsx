import { Button, DatePicker, Form, Input, Layout, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ICompanyInfor } from '../../../interfaces'
import { message } from 'antd'
import { useEditCompanyInfoMutation, useGetInforQuery } from '../../../api/CompanyInfoApi'
import { UploadImage } from '../../../components/upload';


const CompanySetting = () => {
    const [editcompany, { isLoading: isUpdateLoading }] = useEditCompanyInfoMutation();
    const navigate = useNavigate();
    const { data: companyData }: any = useGetInforQuery();
    const [form] = Form.useForm();
    const [image, setImage] = useState(null);

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    useEffect(() => {
        form.setFieldsValue({
            company_name: companyData?.company?.company_name,
            tax_code: companyData?.company?.tax_code,
            address: companyData?.company?.address,
            founded_in: companyData?.company?.founded_in,
            name: companyData?.company?.name,
            office: companyData?.company?.office,
            email: companyData?.company?.email,
            phone: companyData?.company?.phone,
            password: companyData?.company?.password,
            map: companyData?.company?.map,
            logo: companyData?.company?.logo,
            link_web: companyData?.company?.link_web,
            image_paper: companyData?.company?.image_paper,
            description: companyData?.company?.description,
            company_size_max: companyData?.company?.company_size_max,
            company_size_min: companyData?.company?.company_size_min,

        });
    }, [companyData]);

    const onFinish = (values: ICompanyInfor) => {
        editcompany({ ...values })
            .unwrap()
            .then(async () => {
                navigate("");
                message.success('Cập nhật thành công')
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    const onChangeFile = async (e: any) => {
        const files = e.target.files[0];
        if (files) {
            try {
                const Response = await UploadImage({
                    file: files,
                    upload_preset: "demo-upload",
                });

                if (Response) {
                    setImage(Response.data.url)
                }
            } catch (error) {

            }
        }
    }

    return (
        <Content style={{ padding: '0 20px' }} className='max-w-screen-xl'>
            <Layout style={{ background: colorBgContainer }}>
                <Content style={{ padding: '0 24px 100px 200px', minHeight: 580, }} className='leading-8 '>
                    <h1 className='font-bold text-base mb-8'>Thông tin Công Ty </h1>
                    <Form
                        // className="mx-40"
                        form={form}
                        name="basic"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ maxWidth: 400 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        labelWrap={true}
                        autoComplete="off">
                        <div>

                            <h2 className='font-bold flex items-center'>Logo</h2>
                            <Form.Item<ICompanyInfor>
                                // label=""
                                name="logo"
                                rules={[
                                    // { required: true, message: 'Trường này không được bỏ trống !' },
                                    // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                                ]}
                            >

                                <button><Input type='file' onChange={(e) => onChangeFile(e)} /></button>
                            </Form.Item>

                            <h2 className='font-bold flex items-center'>Tên Công Ty</h2>
                            <Form.Item<ICompanyInfor>
                                // label=""
                                name="company_name"
                                rules={[
                                    { required: true, message: 'Trường này không được bỏ trống !' },
                                    { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <h2 className='font-bold flex items-center'>Mã Số Thuế</h2>
                            <Form.Item<ICompanyInfor>
                                // label=""
                                name="tax_code"
                                rules={[
                                    { required: true, message: 'Trường này không được bỏ trống !' },
                                    { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <h2 className='font-bold flex items-center'>Địa Chỉ</h2>
                            <Form.Item<ICompanyInfor>
                                // label=""
                                name="address"
                                rules={[
                                    { required: true, message: 'Trường này không được bỏ trống !' },
                                    { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <h2 className='font-bold flex items-center'>Ngày Thành Lập</h2>
                            <Form.Item<ICompanyInfor>
                                // label=""
                                name="founded_in"
                                rules={[
                                    { required: true, message: 'Trường này không được bỏ trống !' },
                                    // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                                ]}
                            >
                                <DatePicker />
                            </Form.Item>
                            <h2 className='font-bold flex items-center'>Văn Phòng</h2>
                            <Form.Item<ICompanyInfor>
                                // label=""
                                name="office"
                                rules={[
                                    { required: true, message: 'Trường này không được bỏ trống !' },
                                    // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <h2 className='font-bold flex items-center'>Map</h2>
                            <Form.Item<ICompanyInfor>
                                // label=""
                                name="map"
                                rules={[
                                    { required: true, message: 'Trường này không được bỏ trống !' },
                                    // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <h2 className='font-bold flex items-center'>Link Website</h2>
                            <Form.Item<ICompanyInfor>
                                // label=""
                                name="link_web"
                                rules={[
                                    { required: true, message: 'Trường này không được bỏ trống !' },
                                    // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <h2 className='font-bold flex items-center'>Tên</h2>
                            <Form.Item<ICompanyInfor>
                                // label=""
                                name="name"
                                rules={[
                                    { required: true, message: 'Trường này không được bỏ trống !' },
                                    // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <h2 className='font-bold flex items-center'>Số Điện Thoại</h2>
                            <Form.Item<ICompanyInfor>
                                // label=""
                                name="phone"
                                rules={[
                                    { required: true, message: 'Trường này không được bỏ trống !' },
                                    // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <h2 className='font-bold flex items-center'>Email</h2>
                            <Form.Item<ICompanyInfor>
                                // label=""
                                name="email"
                                rules={[
                                    { required: true, message: 'Trường này không được bỏ trống !' },
                                    // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <h2 className='font-bold flex items-center'>Giấy Phép</h2>
                            <Form.Item<ICompanyInfor>
                                // label=""
                                name="image_paper"
                                rules={[
                                    // { required: true, message: 'Trường này không được bỏ trống !' },
                                    // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                                ]}
                            >
                                <button><Input type='file' onChange={(e) => onChangeFile(e)} /></button>
                            </Form.Item>
                            {/* <h2 className='font-bold flex items-center'>Quy Mô Nhỏ Từ</h2>
                            <Form.Item<ICompanyInfor>
                                // label=""
                                name="company_size_min"
                                rules={[
                                    { required: true, message: 'Trường này không được bỏ trống !' },
                                    // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <h2 className='font-bold flex items-center'>Quy Mô Lớn Từ</h2>
                            <Form.Item<ICompanyInfor>
                                // label=""
                                name="company_size_max"
                                rules={[
                                    { required: true, message: 'Trường này không được bỏ trống !' },
                                    // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                                ]}
                            >
                                <Input />
                            </Form.Item> */}
                            {/* <h2 className='font-bold flex items-center'>Mô tả</h2>
                            <Form.Item<ICompanyInfor>
                                // label=""
                                name="description"
                                rules={[
                                    { required: true, message: 'Trường này không được bỏ trống !' },
                                    // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                                ]}
                            >
                                <Input />
                            </Form.Item> */}

                            <Form.Item labelAlign="left">
                                <Button type="primary" htmlType="submit" className="bg-blue-500">
                                    {isUpdateLoading ? (
                                        <AiOutlineLoading3Quarters className="animate-spin" />
                                    ) : (
                                        "Cập nhật thông tin"
                                    )}
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </Content>
            </Layout>
        </Content>
    )
};


export default CompanySetting