import { Button, Form, Input, Select, Skeleton, Upload } from 'antd'
import { useEffect, useState } from 'react'
import { IAccount } from '../../../interfaces'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useEditCandidateMutation, useGetCandidatesQuery } from '../../../api/accountApi'
import { useNavigate } from 'react-router-dom'
import { IoCloudUploadOutline } from 'react-icons/io5'
import { UploadImage } from '../../../components/upload'
import { Notyf } from 'notyf'



const CandidateInformation = () => {
    const { data: candidateData, isLoading } = useGetCandidatesQuery();
    const [form] = Form.useForm();

    const [imageUrl, setImageUrl] = useState<string | null>(candidateData?.candidate?.image || null);
    const [editCandidate, { isLoading: isUpdateLoading }] = useEditCandidateMutation();
    const navigate = useNavigate();
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });

    useEffect(() => {
        form.setFieldsValue({
            name: candidateData?.candidate?.name,
            email: candidateData?.candidate?.email,
            phone: candidateData?.candidate?.phone,
            password: candidateData?.candidate?.password,
            image: candidateData?.candidate?.image,
            address: candidateData?.candidate?.address,
            gender: candidateData?.candidate?.gender,
            type: candidateData?.candidate?.type,
            coin: candidateData?.candidate?.coin,
        });
    }, [candidateData]);

    const onFinish = (values: IAccount) => {
        const image: any = values.image && values.image.fileList[0]?.originFileObj;
        if (image) {
            UploadImage({
                file: image,
                upload_preset: "demo-upload",
            })
                .then((response) => {
                    // Cập nhật trường logo với URL được trả về từ Cloudinary
                    values.image = response.data.url;
                    // Gọi hàm editcompany với giá trị đã cập nhật trường logo
                    editCandidate({ ...values })
                        .unwrap()
                        .then(() => {
                            navigate("");
                            notyf.success("Cập nhật thành công!");
                        })
                    // .catch((error: any ) => {
                    //     notyf.error('Lỗi khi cập nhật thông tin:', error);
                    // });
                })
                .catch();
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
                    if (fieldName === 'image') {
                        setImageUrl(imageUrl);
                    }
                }
            } catch (error) {

            }
        }
    };

    if (isLoading) return <Skeleton />
    return (
        <div><h1 className='font-bold text-base mb-8'>Thông tin tài khoản</h1>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ maxWidth: 400 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                labelWrap={true}
                autoComplete="off">
                <div>
                    <h2 className='font-bold flex items-center'>Họ và tên</h2>
                    <Form.Item<IAccount>
                        name="name"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <h2 className='font-bold flex items-center'>Email</h2>
                    <Form.Item<IAccount>
                        name="email"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <h2 className='font-bold flex items-center gap-3 my-2'>Avatar {imageUrl ? (
                        <img src={imageUrl} alt="Uploaded Image" className='w-16 h-16 rounded-full' />
                    ) : (
                        <img src={candidateData?.candidate?.image} alt="Initial Image" className='w-16 h-16 rounded-full' />
                    )}</h2>

                    <Form.Item<IAccount>
                        name="image"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                        ]}
                    >
                        <Upload
                            onChange={(e: any) => onChangeFile(e, 'image')} // Truyền tên trường 'logo'
                            fileList={imageUrl ? [{ originFileObj: imageUrl }] : []}>
                            <Button icon={<IoCloudUploadOutline />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <h2 className='font-bold flex items-center'>Số điện thoại</h2>
                    <Form.Item<IAccount>
                        // label=""
                        name="phone"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <h2 className='font-bold flex items-center'>Địa chỉ</h2>
                    <Form.Item<IAccount>
                        // label=""
                        name="address"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <h2 className='font-bold flex items-center'>Giới tính</h2>
                    <Form.Item<IAccount>
                        // label=""
                        name="gender"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                        ]}
                    >
                        <Select>
                            <Select.Option value={0}>Không xác định</Select.Option>
                            <Select.Option value={1}>Nam</Select.Option>
                            <Select.Option value={2}>Nữ</Select.Option>
                        </Select>
                    </Form.Item>
                    <h2 className='font-bold flex items-center'>Loại</h2>
                    <Form.Item<IAccount>
                        // label=""
                        name="type"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                        ]}
                    >
                        <Input disabled />
                    </Form.Item>
                    <h2 className='font-bold flex items-center'>Xu</h2>
                    <Form.Item<IAccount>
                        // label=""
                        name="coin"
                        rules={[
                            { required: true, message: 'Trường này không được bỏ trống !' },
                            // { min: 6, message: "Tên kĩ năng phải trên 6 kí tự" }
                        ]}
                    >
                        <Input disabled />
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
            </Form></div>
    )
}

export default CandidateInformation