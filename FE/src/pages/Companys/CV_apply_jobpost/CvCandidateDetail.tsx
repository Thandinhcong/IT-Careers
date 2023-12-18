import React, { useState } from 'react'
import { AiOutlinePhone, AiOutlineMail, AiOutlineArrowLeft } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom';
import { TERipple } from 'tw-elements-react';
import { useAssseCandidateMutation, useGetCandidateDetailQuery } from '../../../api/companies/cvApply';
import { Form, Radio, Modal, message, Skeleton } from 'antd';
import TextArea from 'antd/es/input/TextArea';


const CvCandodateDetail = React.memo(() => {

    const { id } = useParams();
    const { data, isLoading } = useGetCandidateDetailQuery(id || "");
    // console.log("data detail", data);
    const [assse] = useAssseCandidateMutation();
    const listInfoCandidateApply = data?.data;
    const listImage = data?.data?.image;
    const [form] = Form.useForm();
    console.log(data);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCvApplyId, setSlectedCvApplyId] = useState<number | null>(null);//lưu id hồ sơ


    const showModal = (id: number) => {
        setSlectedCvApplyId(id);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOk = () => {
        // Gọi hàm validateFields trên biểu mẫu
        form
            .validateFields()
            .then((values) => {
                if (selectedCvApplyId !== null) {
                    assse({ ...values, id: selectedCvApplyId })
                        .unwrap()
                        .then(() => {
                            message.success(`Đánh giá thành công`);
                            form.resetFields();
                        })
                        .catch((error) => {
                            message.error("Đánh giá thất bại" + error.message);
                        });
                } else {
                    message.error("Không có ID hồ sơ ứng tuyển được chọn.");
                }
                // Đóng Modal
                setIsModalOpen(false);
            })
            .catch((errorInfo) => {
                console.log('Xác minh lỗi:', errorInfo);
            });
    };
    if (isLoading) return <Skeleton />
    return (
        <div className=' max-w-screen-xl mx-auto text-[#364a63]'>
            <div className="bg-white p-6 shadow-md hover:shadow-xl ">
                <div className="container mx-auto">
                    <div className="grid grid-cols-7 gap-4">
                        <div className="col-span-7 sm:col-span-5">
                            <embed src={`${data?.data?.path_cv}`} type="application/pdf" width="100%" height="100%" />
                        </div>
                        <div className="col-span-7 sm:col-span-2">
                            <Link to={'/business/cv-apply'} className="bg-[#f1f3f5] text-[#8091a7] hover:bg-gray-400 hover:text-white py-2 px-4 rounded mb-4 text-sm ">
                                <AiOutlineArrowLeft className="inline-block" /> Về trang chính
                            </Link>
                            <div className="bg-white p-4 mb-4 mt-4 flex items-center">
                                {listImage ? (
                                    <img
                                        className="w-20 h-20 rounded-full border border-gray-400 p-1"
                                        src={listImage} alt=""
                                    />
                                ) : (
                                    <img
                                        className="w-20 rounded-full border border-gray-400 p-1"
                                        src="https://res.cloudinary.com/dxzlnojyv/image/upload/v1700739389/aa_ymumup.jpg" alt=""
                                    />
                                )}
                                <div className="ml-4">
                                    <p className=" font-sans font-semibold">{data?.data?.name}</p>
                                    <div className="flex items-center mt-2">
                                        <span className='bg-[#e4efff] mr-2 rounded-full p-2'>
                                            <AiOutlinePhone className="w-4 h-4 text-[#0971fe] text-center" />
                                        </span>
                                        <span className="">{data?.data?.phone}</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span className='bg-[#e4efff] mr-2 rounded-full p-2'>
                                            <AiOutlineMail className="w-4 h-4 text-[#0971fe] text-center" />
                                        </span>
                                        <span className="">{data?.data?.email}</span>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="bg-white p-4">
                                <p className="font-bold mb-1.5">Lời Nhắn </p>
                                <p className="text-sm">
                                    {listInfoCandidateApply?.introduce}
                                </p>
                            </div>
                            <hr />
                            <div className="bg-white p-4">
                                <p className="font-bold mt-2 mb-2">Đánh Giá CV</p>
                                <span className='text-sm'>Thực hiện đánh giá sẽ giúp hệ thống tối ưu tốt hơn cho chiến dịch tuyển dụng của bạn</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 px-4">
                                <TERipple rippleColor="white">
                                    <button
                                        type="button"
                                        className="bg-[#e4efff] text-[#0971fe] hover:text-white hover:bg-blue-500 text-center w-full py-2 rounded text-[15px]"
                                        onClick={() => data?.data?.candidate_code && showModal(data.data.candidate_code)}
                                    >
                                        Phù Hợp
                                    </button>
                                </TERipple>
                                <TERipple rippleColor="white">
                                    <button
                                        type="button"
                                        className="bg-[#fceceb] text-[#e85347]  hover:text-white hover:bg-red-500 text-center w-full py-2 rounded text-[15px]"
                                        onClick={() => data?.data?.candidate_code && showModal(data.data.candidate_code)}
                                    >
                                        Không Phù Hợp
                                    </button>
                                </TERipple>

                                <Modal
                                    title="Đánh giá ứng viên"
                                    visible={isModalOpen}
                                    onOk={handleOk}
                                    onCancel={handleCancel}
                                    okText="Xác nhận"
                                    okType="default"
                                    cancelText="Huỷ"
                                    width={800}
                                >
                                    <div className="text-[#526484]">
                                        <Form
                                            form={form}
                                            name="repostJobForm"
                                            labelCol={{ span: 24 }}
                                            wrapperCol={{ span: 24 }}
                                            initialValues={{ remember: true }}
                                            autoComplete="off"
                                        >
                                            <Form.Item
                                                name="qualifying_round_id"
                                            >
                                                <Radio.Group>
                                                    <Radio.Button value="1" style={{ margin: '0 8px', borderRadius: "5px" }}>Phù hợp</Radio.Button>
                                                    <Radio.Button value="0" style={{ margin: '0 8px', borderRadius: "5px", position: "static", border: "1px solid #dcd9d9" }}>Không phù hợp</Radio.Button>
                                                </Radio.Group>
                                            </Form.Item>

                                            <Form.Item
                                                label="Nhận xét về ứng viên"
                                                name="evaluate"
                                                rules={[{ required: true, message: "Không được bỏ trống" }]}

                                            >
                                                <TextArea rows={6} />
                                            </Form.Item>
                                        </Form>
                                    </div>
                                </Modal>
                            </div>
                            <hr className='mt-5' />
                            <table className="table-auto w-[300px] ml-5">
                                <thead>
                                    <h3 className='font-semibold my-3'>Trạng Thái Cv</h3>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border px-4 py-2">Mã Hồ Sơ</td>
                                        <td className="border px-4 py-2">{data?.data?.candidate_code}</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">Trạng Thái</td>
                                        <td className="border px-4 py-2">
                                            <p className={`${data?.data?.qualifying_round_id === 0
                                                ? 'p-1 rounded text-xs text-center bg-yellow-200 text-yellow-500 w-3/4'
                                                : data?.data?.qualifying_round_id === 1
                                                    ? 'p-1 rounded text-xs text-center bg-[#b5ff95] text-[#62a745] w-1/2'

                                                    : ''
                                                }`}>
                                                {data?.data?.qualifying_round_id === 0 ? 'không phù hợp' : data?.data?.qualifying_round_id === 1 ? 'phù hợp' : 'chưa đánh giá'}
                                            </p>
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <td className="border px-4 py-2">Loại Hồ Sơ</td>
                                        <td className="border px-4 py-2">Upload Cv</td>
                                    </tr> */}
                                    <tr>
                                        <td className="border px-4 py-2">Ngày Ứng Tuyển</td>
                                        <td className="border px-4 py-2">{data?.data?.created_at}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
});

export default CvCandodateDetail