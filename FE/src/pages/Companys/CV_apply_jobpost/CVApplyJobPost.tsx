import { Form, Radio, Modal, message, Pagination, Skeleton } from "antd"
import React, { useState } from "react";
import { AiOutlineCalendar, AiOutlineEdit, AiOutlineEye, AiOutlineMail, AiOutlinePhone } from "react-icons/ai"
import { TERipple, } from "tw-elements-react";
import { useAssseCandidateMutation, useGetCvApllyByIdJobPostIdQuery } from "../../../api/companies/cvApply";
import { Link, useParams } from "react-router-dom";
import { ICvApply } from "../../../interfaces";
import TextArea from "antd/es/input/TextArea";

const CVApplyJobPost = React.memo(() => {
    const { id } = useParams();
    const { data, isLoading } = useGetCvApllyByIdJobPostIdQuery(id || "");

    const [form] = Form.useForm();
    const [assse] = useAssseCandidateMutation();
    const [filterOption, setFilterOption] = useState("newest"); //lưu trữ và cập nhật biến để kiểm tra lọc
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCvApplyId, setSlectedCvApplyId] = useState<number | null>(null);//lưu id hồ sơ
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const filteredCandidates = filterOption === "newest"
        ? data?.list_candidate_apply_job
        : filterOption === "notViewed"
            ? data?.list_candidate_apply_job?.filter((item: ICvApply) => item.status === 0)
            : filterOption === "suitable"
                ? data?.list_candidate_apply_job?.filter((item: ICvApply) => item.qualifying_round_id === 1)
                : filterOption === "unsuitable"
                    ? data?.list_candidate_apply_job?.filter((item: ICvApply) => item.qualifying_round_id === 0)
                    : null;

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
                setIsModalOpen(false);
            })
            .catch((errorInfo) => {
                console.log('Xác minh lỗi:', errorInfo);
            });
    };

    if (isLoading) return <Skeleton />
    return (
        <div className="bg-gray-50 text-sm text-gray-500">
            <div className="max-w-screen-lg mx-auto py-4">
                <div className="flex items-center gap-5">
                    <p className="font-semibold text-base mt-2 -mb-2 bg-blue-100 w-full p-3">Hồ sơ ứng tuyển của ứng viên</p>
                </div>
                <div className="flex justify-between items-center mt-10">
                    <p>
                        Tìm thấy <span className="font-semibold">
                            {filterOption === "newest"
                                ? data?.list_candidate_apply_job?.length || 0
                                : filterOption === "notViewed"
                                    ? data?.list_candidate_apply_job?.filter((item: ICvApply) => item.status === 0).length || 0
                                    : filterOption === "suitable"
                                        ? data?.list_candidate_apply_job?.filter((item: ICvApply) => item.qualifying_round_id === 1).length || 0
                                        : filterOption === "unsuitable"
                                            ? data?.list_candidate_apply_job?.filter((item: ICvApply) => item.qualifying_round_id === 0).length || 0
                                            : 0
                            }
                        </span> ứng viên
                    </p>
                    <div className="flex items-center gap-3">
                        <p>Hiển thị: </p>
                        <Radio.Group
                            name="radiogroup"
                            defaultValue="newest"
                            onChange={(e) => setFilterOption(e.target.value)}
                        >
                            <Radio value="newest">Tất cả</Radio>
                            <Radio value="notViewed">CV chưa xem</Radio>
                            <Radio value="suitable">CV phù hợp</Radio>
                            <Radio value="unsuitable">CV không phù hợp</Radio>
                        </Radio.Group>
                    </div>
                </div>
                {filteredCandidates?.slice(startIndex, endIndex).map((item: ICvApply) => (
                    <div key={item?.id} className="bg-white my-4 p-4 grid-cols-1">
                        <div>
                            <div className="flex justify-between my-4 p-2 items-center border-b-2">
                                <div>
                                    {item?.image ? (
                                        <img
                                            className="w-20 h-20 rounded-full border border-gray-400 p-1"
                                            src={item?.image} alt=""
                                        />
                                    ) : (
                                        <img
                                            className="w-20 rounded-full border border-gray-400 p-1"
                                            src='https://res.cloudinary.com/dxzlnojyv/image/upload/v1700739389/aa_ymumup.jpg' alt=""
                                        />
                                    )
                                    }
                                </div>
                                <div className="grid grid-cols-1 gap-3 w-7/12">
                                    <p className="font-semibold text-base">{item?.name}</p>
                                    <p className="flex items-center">
                                        <p className="flex items-center gap-1"><AiOutlinePhone /><span>{item?.phone}</span> </p>
                                        <p className="border-gray-500 border-x-2 mx-1 px-2 flex items-center gap-1">
                                            <AiOutlineMail />
                                            <span>{item?.email}</span>
                                        </p>
                                        <p className="flex items-center gap-1"><AiOutlineCalendar /> <span>{item?.job_post_name}</span></p>
                                    </p>
                                    <div className="flex justify-between items-center mb-3">
                                        <p className="grid grid-cols-1 gap-3">
                                            <p>Mã ứng viên</p>
                                            <p>{item?.candidate_code}</p>
                                        </p>
                                        <p className="grid grid-cols-1 gap-3">
                                            <p>Ngày ứng tuyển</p>
                                            <p>{item.time_apply}</p>
                                        </p>
                                        <p className="grid grid-cols-1 gap-3">
                                            <p>Trạng thái</p>
                                            <p className={`${item?.status === 1
                                                ? 'bg-[#e9ebee] text-[#364a63] text-center p-1 text-xs rounded'
                                                : item?.status === 0
                                                    ? 'bg-[#fceceb] text-[#e85347] text-center p-1 text-xs rounded'
                                                    : ''
                                                }`}>
                                                {item?.status === 0 ? 'chưa xem' : item?.status === 1 ? 'đã xem' : ''}
                                            </p>
                                        </p>
                                        <p className="grid grid-cols-1 gap-3">
                                            <p>Vòng hồ sơ</p>
                                            <p className={`${item?.qualifying_round_id === 0
                                                ? 'p-1 rounded text-xs text-center bg-yellow-200 text-yellow-500'
                                                : item?.qualifying_round_id === 1
                                                    ? 'p-1 rounded text-xs text-center bg-[#b5ff95] text-[#62a745]'
                                                    : 'p-1 rounded text-xs text-center bg-gray-200 text-gray-500'
                                                }`}>
                                                {item.qualifying_round_id === 0 ? 'không phù hợp' : item.qualifying_round_id === 1 ? 'phù hợp' : 'chưa đánh giá'}
                                            </p>

                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-1 text-gray-700">
                                    <Link to={`/business/cv-apply/candidate-detail/${item.candidate_code}`} className="flex items-center bg-[#f5f6fa] px-3 py-1 border border-[#dbdfea] rounded-sm">
                                        <AiOutlineEye /><span>Chi tiết</span>
                                    </Link>
                                    <TERipple rippleColor="white">
                                        <button
                                            className="flex items-center bg-[#f5f6fa] px-3 py-1 border border-[#dbdfea] rounded-sm"
                                            type="button"
                                            onClick={() => showModal(item.candidate_code)}
                                        ><AiOutlineEdit /><span> Đánh giá</span>
                                        </button>
                                    </TERipple>
                                </div>
                            </div >
                        </div>
                        {/* Modal đánh giá hồ sơ  */}
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
                                        rules={[{ required: true, message: "Không được bỏ trống" }]} >
                                        <TextArea rows={6} />
                                    </Form.Item>
                                </Form>
                            </div>
                        </Modal>
                    </div>
                ))
                }

            </div >
            <Pagination
                current={currentPage}
                total={filteredCandidates?.length}
                pageSize={pageSize}
                onChange={(page) => setCurrentPage(page)}
            />
        </div >
    )
});

export default CVApplyJobPost