import { Button, Form, Input, Layout, Upload, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { useEffect, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { ICompanyInfor } from '../../../interfaces'
import { message } from 'antd'
import { useEditCompanyInfoMutation, useGetInforQuery } from '../../../api/CompanyInfoApi'
import { UploadImage } from '../../../components/upload';


const CompanySetting = () => {
    const [editcompany, { isLoading: isUpdateLoading }] = useEditCompanyInfoMutation();
    const navigate = useNavigate();
    const { data: companyData } = useGetInforQuery();
    console.log(companyData);

    const [form] = Form.useForm();
    const [logoUrl, setLogoUrl] = useState<string | null>(companyData?.company?.logo || null);
    const [licenseUrl, setLicenseUrl] = useState<string | null>(companyData?.company?.image_paper || null);

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

    const onFinish = (values: ICompanyInfor | any) => {
        // Truy cập vào mảng fileList trong trường logo và lấy originFileObj
        const logo = values.logo && values.logo.fileList[0]?.originFileObj;
        const imagePaper = values.image_paper && values.image_paper.fileList[0]?.originFileObj;

        // Nếu có ảnh được chọn, gửi ảnh lên và cập nhật trường logo
        if (logo) {
            UploadImage({
                file: logo,
                upload_preset: "demo-upload",
            })
                .then((response) => {
                    // Cập nhật trường logo với URL được trả về từ Cloudinary
                    values.logo = response.data.url;
                    // Gọi hàm editcompany với giá trị đã cập nhật trường logo
                    editcompany({ ...values })
                        .unwrap()
                        .then(() => {
                            navigate("");
                            message.success('Cập nhật thành công');
                        })
                        .catch((error) => {
                            console.error('Lỗi khi cập nhật thông tin công ty:', error);
                        });
                })
                .catch((error) => {
                    console.error('Lỗi khi tải ảnh lên:', error);
                });
        }
        if (imagePaper) {
            UploadImage({
                file: imagePaper,
                upload_preset: "demo-upload",
            })
                .then((response) => {
                    // Cập nhật trường image_paper với URL được trả về từ Cloudinary
                    values.image_paper = response.data.url;
                    // Gọi hàm editcompany với giá trị đã cập nhật trường image_paper
                    editcompany({ ...values })
                        .unwrap()
                        .then(() => {
                            navigate("");
                            message.success('Cập nhật thành công');
                        })
                        .catch((error) => {
                            console.error('Lỗi khi cập nhật thông tin công ty:', error);
                        });
                })
                .catch((error) => {
                    console.error('Lỗi khi tải ảnh lên:', error);
                });
        }
    };


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
                        setLogoUrl(imageUrl); // Gán đường dẫn ảnh Logo
                    } else if (fieldName === 'image_paper') {
                        setLicenseUrl(imageUrl); // Gán đường dẫn ảnh Giấy phép
                    }
                }
            } catch (error) {
                console.error(error);
            }
        }
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
                        <div>

                            <h2 className='font-bold flex items-center '>Logo</h2>
                            <Form.Item<ICompanyInfor>
                                // label=""
                                name="logo"
                                rules={[
                                    { required: true, message: 'Trường này không được bỏ trống !' },
                                ]}
                            >
                                <Upload
                                    onChange={(e: any) => onChangeFile(e, 'logo')} // Truyền tên trường 'logo'
                                    fileList={logoUrl ? [{ originFileObj: logoUrl }] : []}
                                >
                                    <Button>Tải lên</Button>
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
                                    { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
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
                                <Input />
                            </Form.Item>
                            <h2 className='font-bold flex items-center'>Email</h2>
                            <Form.Item<ICompanyInfor>

                                name="email"
                                rules={[
                                    { required: true, message: 'Trường này không được bỏ trống !' },

                                ]}
                            >
                                <Input />
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
                                    onChange={(e: any) => onChangeFile(e, 'image_paper')} // Truyền tên trường 'image_paper'
                                    fileList={licenseUrl ? [{ originFileObj: licenseUrl }] : []}
                                >
                                    <Button>Tải lên</Button>
                                </Upload>
                            </Form.Item>
                            {licenseUrl ? (
                                <img src={licenseUrl} alt="Uploaded Image" className='w-full' />
                            ) : (
                                <img src={companyData?.company?.image_paper} alt="Initial Image" className='w-full' />
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
                                <Input />
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
                        </div>
                    </Form>
                </Content>
            </Layout>
        </Content>
    )
};


export default CompanySetting