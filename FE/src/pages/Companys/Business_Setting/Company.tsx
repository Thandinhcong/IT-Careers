import { Button, Form, Input, Layout, Spin, Upload, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React, { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { ICompanyInfor } from '../../../interfaces'
import { message } from 'antd'
import { useEditCompanyInfoMutation, useGetInforQuery } from '../../../api/CompanyInfoApi'
import { UploadImage } from '../../../components/upload';
import TextArea from 'antd/es/input/TextArea';


const CompanySetting = React.memo(() => {
    const [editcompany, { isLoading: isUpdateLoading }] = useEditCompanyInfoMutation();
    const { data: companyData } = useGetInforQuery();
    const [form] = Form.useForm();
    const [logoUrl, setLogoUrl] = useState<string | null>(companyData?.company?.logo || null);
    const [licenseUrl, setLicenseUrl] = useState<string | null>(companyData?.company?.image_paper || null);
    const [uploading, setUploading] = useState(false);

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

    const onChangeFile = async (e: any, fieldName: string) => {
        const files = e.file.originFileObj;
        if (files) {
            try {
                const Response = await UploadImage({
                    file: files,
                    upload_preset: "demo-upload",
                });

                if (Response) {
                    const imageUrl = Response.data.url;
                    if (fieldName === 'logo') {
                        setLogoUrl(imageUrl);
                    }
                    if (fieldName === 'image_paper') {
                        setLicenseUrl(imageUrl);
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setUploading(false); // Đặt lại biến uploading thành false khi quá trình tải lên kết thúc
            }
        }
    };

    const onFinish = (values: ICompanyInfor | any) => {

        const logo = values.logo && values.logo.fileList && values.logo.fileList[0]?.originFileObj;
        const imagePaper = values.image_paper && values.image_paper.fileList && values.image_paper.fileList[0]?.originFileObj;


        const uploadLogo = logo
            ? UploadImage({
                file: logo,
                upload_preset: "demo-upload",
            }).then((response) => response.data.url)
            : null;

        const uploadImagePaper = imagePaper
            ? UploadImage({
                file: imagePaper,
                upload_preset: "demo-upload",
            }).then((response) => response.data.url)
            : null;

        Promise.all([uploadLogo, uploadImagePaper])
            .then(([logoUrl, imagePaperUrl]) => {
                if (logoUrl) {
                    values.logo = logoUrl;
                }
                if (imagePaperUrl) {
                    values.image_paper = imagePaperUrl;
                }
                return editcompany({ ...values });
            })
            .then(() => {
                message.success('Cập nhật thành công');
                window.location.reload();
            })
            .catch((error) => {
                console.error('Lỗi khi cập nhật thông tin công ty:', error);
            });
    };

    return (
        <Content style={{ padding: '0 20px' }} className='max-w-screen-xl'>
            <Layout style={{ background: colorBgContainer }}>
                <Content style={{ padding: '0 24px 100px 200px', minHeight: 580, }} className='leading-8 '>
                    <h1 className='font-bold text-base mb-8'>Thông tin Công Ty </h1>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        style={{ maxWidth: 450 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        labelWrap={true}
                        autoComplete="off">

                        <h2 className='font-bold flex items-center '>Logo</h2>
                        <Form.Item<ICompanyInfor>
                            name="logo"
                            rules={[
                                { required: true, message: 'Trường này không được bỏ trống !' },
                            ]}
                        >
                            <Upload
                                onChange={(e: any) => {
                                    onChangeFile(e, 'logo');
                                    setUploading(true);
                                }}
                                beforeUpload={() => {
                                    return true;
                                }}
                                fileList={logoUrl ? [{ originFileObj: logoUrl }] : []}
                            >
                                {uploading ? (
                                    <Spin tip="Đang tải ảnh lên...">
                                        <img
                                            src={logoUrl || companyData?.company?.logo}
                                            alt="Uploaded Image"
                                            className="w-20 h-20 rounded-full ml-2"
                                        />
                                    </Spin>
                                ) : (
                                    <img
                                        src={logoUrl ? logoUrl : companyData?.company?.logo}
                                        alt="Initial Image"
                                        className="w-20 h-20 rounded-full ml-2"
                                    />
                                )}
                            </Upload>
                        </Form.Item>
                        <h2 className='font-bold flex items-center'>Tên Công Ty</h2>
                        <Form.Item<ICompanyInfor>
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
                            name="tax_code"
                            rules={[
                                { required: true, message: 'Trường này không được bỏ trống !' },
                                { min: 6, message: "Mã số thuế phải trên 6 kí tự" }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <h2 className='font-bold flex items-center'>Địa Chỉ</h2>
                        <Form.Item<ICompanyInfor>

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
                            name="founded_in"
                            rules={[
                                { required: true, message: 'Trường này không được bỏ trống !' },
                            ]}
                        >
                            <Input type='date' />
                        </Form.Item>
                        <h2 className='font-bold flex items-center'>Văn Phòng</h2>
                        <Form.Item<ICompanyInfor>

                            name="office"
                            rules={[
                                { required: true, message: 'Trường này không được bỏ trống !' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <h2 className='font-bold flex items-center'>Map</h2>
                        <Form.Item<ICompanyInfor>

                            name="map"
                            rules={[
                                { required: true, message: 'Trường này không được bỏ trống !' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <h2 className='font-bold flex items-center'>Link Website</h2>
                        <Form.Item<ICompanyInfor>

                            name="link_web"
                            rules={[
                                { required: true, message: 'Trường này không được bỏ trống !' },

                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <h2 className='font-bold flex items-center'>Tên</h2>
                        <Form.Item<ICompanyInfor>

                            name="name"
                            rules={[
                                { required: true, message: 'Trường này không được bỏ trống !' },

                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <h2 className='font-bold flex items-center'>Số Điện Thoại</h2>
                        <Form.Item<ICompanyInfor>
                            name="phone"
                            rules={[
                                { required: true, message: 'Trường này không được bỏ trống !' },
                                { pattern: /^(0[0-9]{9,10})$/, message: "Số điện thoại không đúng định dạng" }
                            ]}
                        >
                            <Input disabled />
                        </Form.Item>
                        <h2 className='font-bold flex items-center'>Email</h2>
                        <Form.Item<ICompanyInfor>
                            name="email"
                            rules={[
                                { required: true, message: 'Trường này không được bỏ trống !' },

                            ]}
                        >
                            <Input disabled />
                        </Form.Item>
                        <h2 className='font-bold flex items-center'>Giấy Phép</h2>
                        <Form.Item
                            name="image_paper"
                            initialValue={companyData?.company?.image_paper}
                            rules={[
                                { required: true, message: 'Trường này không được bỏ trống !' },
                            ]}
                        >
                            <Upload
                                onChange={(e: any) => {
                                    onChangeFile(e, 'image_paper');
                                    setUploading(true);
                                }}
                                beforeUpload={() => {
                                    return true;
                                }}
                                fileList={licenseUrl ? [{ originFileObj: licenseUrl }] : []}
                            >
                                <Button>Tải lên</Button>
                            </Upload>
                        </Form.Item>
                        {uploading ? (
                            <Spin tip="Đang tải ảnh lên...">
                                <img
                                    src={licenseUrl || companyData?.company?.image_paper}
                                    alt="Uploaded Image"
                                    width={100}
                                    className="w-full"
                                />
                            </Spin>
                        ) : (
                            <img
                                src={licenseUrl ? licenseUrl : companyData?.company?.image_paper}
                                alt="Initial Image"
                                width={100}
                                className="w-full"
                            />
                        )}
                        <h2 className='font-bold flex items-center'>Quy mô tối thiểu</h2>
                        <Form.Item<ICompanyInfor>

                            name="company_size_min"
                            rules={[
                                { required: true, message: 'Trường này không được bỏ trống !' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <h2 className='font-bold flex items-center'>Quy mô tối đa</h2>
                        <Form.Item<ICompanyInfor>

                            name="company_size_max"
                            rules={[
                                { required: true, message: 'Trường này không được bỏ trống !' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('company_size_min') === undefined) {
                                            return Promise.resolve();
                                        }
                                        if (parseFloat(value) > parseFloat(getFieldValue('company_size_min'))) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('Quy mô tối đa phải lớn hơn quy mô tối thiểu');
                                    },
                                }),
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <h2 className='font-bold flex items-center'>Mô tả</h2>
                        <Form.Item<ICompanyInfor>
                            name="description"
                            rules={[
                                { required: true, message: 'Trường này không được bỏ trống !' },
                            ]}
                        >
                            <TextArea />
                        </Form.Item>

                        <Form.Item labelAlign="left">
                            <Button type="primary" htmlType="submit" className="bg-blue-500">
                                {isUpdateLoading ? (
                                    <AiOutlineLoading3Quarters className="animate-spin" />
                                ) : (
                                    "Cập nhật thông tin"
                                )}
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>
        </Content>
    )
});


export default CompanySetting