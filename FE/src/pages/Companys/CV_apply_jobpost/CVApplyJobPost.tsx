import { Form, Radio, Modal, message } from "antd"
import { AiOutlineFilter, AiOutlineReload } from "react-icons/ai"
import { useState } from "react";
import { AiOutlineCalendar, AiOutlineDownload, AiOutlineEdit, AiOutlineEye, AiOutlineMail, AiOutlinePhone, AiOutlineSetting, AiOutlineSwap } from "react-icons/ai"
import { TERipple, } from "tw-elements-react";
import { useAssseCandidateMutation, useGetCvApllyByIdJobPostIdQuery } from "../../../api/companies/cvApply";
import { Link, useParams } from "react-router-dom";
import { ICvApply } from "../../../interfaces";
import TextArea from "antd/es/input/TextArea";

const CVApplyJobPost = () => {
    const { id } = useParams();
    const { data } = useGetCvApllyByIdJobPostIdQuery(id || "");
    const [form] = Form.useForm();
    const [assse] = useAssseCandidateMutation();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [filterOption, setFilterOption] = useState("newest"); //lưu trữ và cập nhật biến để kiểm tra lọc
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCvApplyId, setSlectedCvApplyId] = useState<number | null>(null);//lưu id hồ sơ
    console.log(selectedCvApplyId);


    const showModal = (id: any) => {
        setSlectedCvApplyId(id);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
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
                        })
                        .catch((error) => {
                            message.error("Đánh giá thất bại" + error.message);
                        });
                } else {
                    message.error("Không có ID hồ sơ ứng tuyển được chọn.");
                }
                console.log('Received values:', values);
                // Đóng Modal
                setIsModalOpen(false);
            })
            .catch((errorInfo) => {
                console.log('Xác minh lỗi:', errorInfo);
            });
    };

    const filteredCandidates =
        filterOption === "newest"
            ? data?.list_candidate_apply_job
            : data?.list_candidate_apply_job.filter(
                (item: ICvApply) => item.status === 0
            );

    return (
        <div className="bg-gray-50 text-sm text-gray-500">
            <div className="max-w-screen-lg mx-auto py-4">
                <div className="flex items-center gap-5">
                    <select
                        className="appearance-none border border-gray-300 rounded px-4 py-1.5 w-1/4 focus:outline-none focus:border-blue-500 focus:shadow my-6"
                    >
                        <option value="">Trạng thái</option>
                        <option value="SRV">Phù hợp</option>
                        <option value="AK">Không phù hợp</option>
                    </select>
                    <div className="flex items-center gap-2">
                        <button className="bg-blue-600 text-white flex items-center rounded py-1.5 px-5"><AiOutlineFilter className="text-lg" /><p>Lọc</p></button>
                        <button className="bg-[#eaebee] text-gray-500 flex items-center rounded py-1.5 px-5"><AiOutlineReload /><p>Xóa lọc</p></button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    {/* <p>Tìm thấy <span className="font-semibold">{data?.list_candidate_apply_job?.length || 0}</span> ứng viên</p> */}
                    <p>
                        Tìm thấy <span className="font-semibold">
                            {filterOption === "newest"
                                ? data?.list_candidate_apply_job?.length || 0
                                : data?.list_candidate_apply_job.filter((item: ICvApply) => item.status === 0).length || 0}
                        </span> ứng viên
                    </p>
                    <div className="flex items-center gap-3">
                        <p>Ưu tiên</p>
                        <Radio.Group
                            name="radiogroup"
                            defaultValue={1}
                            onChange={(e) => setFilterOption(e.target.value === 1 ? "newest" : "notViewed")}
                        >
                            <Radio value={1}>Hiển thị CV mới nhất</Radio>
                            <Radio value={2}>Hiển thị CV chưa xem</Radio>
                        </Radio.Group>
                    </div>
                </div>
                {filteredCandidates?.map((item: ICvApply) => (
                    <div className="bg-white my-4 p-4 grid-cols-1">
                        <div>
                            <div className="flex justify-between my-4 p-2 items-center border-b-2">
                                <div>
                                    <img
                                        className="w-20 rounded-full border border-gray-400 p-1"
                                        src="https://cdn1.123job.vn/123job/uploads/2023/10/06/2023_10_06______622e2e506d59c1af0f1a16739bcc252d.png" alt="" />
                                </div>
                                <div className="grid grid-cols-1 gap-3 w-7/12">
                                    <p className="font-semibold text-base">{item.name}</p>
                                    <p className="flex items-center">
                                        <p className="flex items-center gap-1"><AiOutlinePhone /><span>{item.phone}</span> </p>
                                        <p className="border-gray-500 border-x-2 mx-1 px-2 flex items-center gap-1">
                                            <AiOutlineMail />
                                            <span>{item.email}</span>
                                        </p>
                                        <p className="flex items-center gap-1"><AiOutlineCalendar /> <span>{item.job_post_name}</span></p>
                                    </p>
                                    <div className="flex justify-between items-center mb-3">
                                        <p className="grid grid-cols-1 gap-3">
                                            <p>Mã ứng viên</p>
                                            <p>{item.candidate_code}</p>
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

                                                    : ''
                                                }`}>
                                                {item.qualifying_round_id === 0 ? 'không phù hợp' : item.qualifying_round_id === 1 ? 'phù hợp' : ''}
                                            </p>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-1 text-gray-700">
                                    <Link to={`/business/cv-apply/candidate-detail/${item.id}`} className="flex items-center bg-[#f5f6fa] px-3 py-1 border border-[#dbdfea] rounded-sm">
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
                                    <div className="relative">
                                        <button
                                            className="flex items-center bg-[#f5f6fa] px-3 py-1 border border-[#dbdfea] rounded-sm"
                                            onClick={handleDropdownToggle}
                                        >
                                            <AiOutlineSetting />
                                            <span> Thao tác</span>
                                        </button>

                                        {isDropdownOpen && (
                                            <div className="absolute end-0 z-10 mt-2 w-48 rounded-md border border-gray-100 bg-white shadow-lg">
                                                <ul className="p-1">
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="block rounded-lg px-4 py-2 text-[13px] text-gray-500 hover:bg-gray-50 hover:text-blue-500"                                    >
                                                            <AiOutlineDownload className="inline-block mr-1" />Tải xuống cv
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className="block rounded-lg px-4 py-2 text-[13px] text-gray-500 hover:bg-gray-50 hover:text-blue-500"                                    >
                                                            <AiOutlineSwap className="inline-block mr-1" />
                                                            Lịch sử ghi chú
                                                        </a>
                                                    </li>
                                                </ul>

                                            </div>
                                        )}
                                    </div>
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
                                    >
                                        <TextArea rows={6} />
                                    </Form.Item>
                                </Form>
                            </div>
                        </Modal>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default CVApplyJobPost