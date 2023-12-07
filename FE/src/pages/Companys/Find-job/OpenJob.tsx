import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineCalendar, AiOutlineClockCircle, AiOutlineClose, AiOutlineDollarCircle, AiOutlineEnvironment, AiOutlineFilter, AiOutlineHeart, AiOutlineReload, AiOutlineSwap } from "react-icons/ai"
import { TERipple, TEModal, TEModalDialog, TEModalContent, TEModalHeader, TEModalBody, TEModalFooter, } from "tw-elements-react";
import { useCancelSaveProfileMutation, useGetProfileOpenQuery, useOpenProfileMutation, useRateProfileMutation, useSaveProfileMutation } from "../../../api/companies/findJob";
import { IFindJob, IJobPost } from "../../../interfaces";
import { Form, Input, Modal, Rate, Select, Spin, message } from "antd";
import { formatDistanceToNow, parse } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useGetJobPostSelectByIdQuery } from "../../../api/companies/jobPostCompany";
import { BaseOptionType } from "antd/es/select";
import { DefaultOptionType } from "antd/es/cascader";
import { MdOutlineRateReview } from "react-icons/md";

const OpenJob = () => {
    const [form] = Form.useForm();
    const { data, isLoading } = useGetProfileOpenQuery();
    const { data: select } = useGetJobPostSelectByIdQuery();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [ratingModalVisible, setRatingModalVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedCandidateId, setSelectedCandidateId] = useState<string | number | null>(null); // lưu trữ id của ứng viên được chọn
    const [selectedProvinceId, setSelectedProvincetId] = useState<string | number | null>(null);
    const [openProfile] = useOpenProfileMutation();
    const [saveProfile] = useSaveProfileMutation();
    const [rateProfile] = useRateProfileMutation();
    const [cancelSaveProfile] = useCancelSaveProfileMutation();

    const [filterName, setFilterName] = useState('');
    const [filterProvince, setFilterProvince] = useState('');
    const [filterDistrict, setFilterDistrict] = useState('');
    // const [filterSalary, setFilterSalary] = useState('');
    const [filteredData, setFilteredData] = useState<IFindJob[] | null>(null);

    useEffect(() => {// Lưu trữ data vào filteredData khi data thay đổi
        setFilteredData((data?.data || []) as IFindJob[]);
    }, [data]);
    //hàm mở chi tiết ứng viên
    const handleOpenModal = (candidateId: number | string) => {
        setSelectedCandidateId(candidateId); // lưu id của ứng viên được chọn vào state
        setShowModal(true);
    };
    //hàm mở modal mở khoá
    const handleOpenModalUnlock = (candidateId: number | string | null) => {
        setModalVisible(true);
        setSelectedCandidateId(candidateId);
    }
    //Hàm đếm thời gian
    const formatTimeDifference = (createdAt: string) => {
        if (!createdAt || typeof createdAt !== 'string') {
            return "Ngày không xác định";
        }

        const startDate = parse(createdAt, 'yyyy-MM-dd HH:mm:ss', new Date());

        if (isNaN(startDate.getTime())) {
            return "Ngày không xác định";
        }

        return formatDistanceToNow(startDate, { locale: vi, addSuffix: true });
    };
    //Hàm mở khoá hồ sơ
    const handleModalConfirm = () => {
        if (selectedCandidateId) {
            console.log(selectedCandidateId);
            openProfile(selectedCandidateId)
                .unwrap()
                .then(() => {
                    message.success("Mở khoá thành công");
                    setShowModal(false);
                })
                .catch((error) => {
                    setShowModal(false);
                    message.error(error.data.error);
                });
        }

        setModalVisible(false);
    };
    //Hàm lưu hồ sơ
    const handleSaveProfile = (id: number | string) => {
        saveProfile(id)
            .unwrap()
            .then(() => {
                message.success("Lưu thành công");
            })
            .catch((error) => {
                console.log(error.data.error);
                cancelSaveProfile(id)
                message.info("Huỷ lưu");
            });
    }
    //Hàm mở modal đánh giá
    const hadleOpenModalRateProfile = (id: number | string | null) => {
        setRatingModalVisible(true)
        console.log(id);
    }
    //hàm đánh giá ứng viên
    const handleRateProfile = () => {
        // Validate the form before submitting
        form.validateFields()
            .then((values) => {
                if (selectedCandidateId !== null) {
                    rateProfile({ ...values, id: selectedCandidateId })
                        .unwrap()
                        .then(() => {
                            message.success(`Đánh giá thành công`);
                            form.resetFields();
                        })
                        .catch((error) => {
                            message.error(error.data.errors);
                        });
                } else {
                    message.error("Không có ID hồ sơ ứng tuyển được chọn.");
                }
                setRatingModalVisible(false);
                setShowModal(false)
                console.log(values);
            })
            .catch(error => {
                console.error("Form validation error:", error);
            });
    };


    const handleSelectProvinceId = (key: number | string, rovinceName: BaseOptionType | DefaultOptionType) => {
        setSelectedProvincetId(key); // Lưu ID của tỉnh thành phố vào state selectedProvinceId
        setFilterProvince(rovinceName?.children);
    }

    const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterName(event.target.value);
    };

    const handleDistrictSelectChange = (value: string) => {
        // Cập nhật giá trị của select Quận/Huyện
        setFilterDistrict(value);
    };

    const handleFilter = () => {
        let result: any = data?.data || [];

        // Lọc theo chức vụ
        if (filterName) {
            result = result.filter((item: { title: string; }) => {
                const regex = new RegExp(filterName, 'i'); // 'i' là để không phân biệt chữ hoa, chữ thường
                return regex.test(item.title);
            });
        }

        // Lọc theo Tỉnh/Thành Phố và Quận/Huyện
        if (filterProvince || filterDistrict) {
            result = result.filter((item: { address: string; }) => {
                const addressLower = item.address.toLowerCase();

                return (!filterProvince || addressLower.includes(filterProvince.toLowerCase())) &&
                    (!filterDistrict || addressLower.includes(filterDistrict.toLowerCase()));
            });
        }
        setFilteredData(result);
    };

    const handleFilterButtonClick = () => {
        // Gọi hàm lọc dữ liệu
        handleFilter();
    };

    const handleClearFilterButtonClick = () => {
        // Xóa tất cả các giá trị lọc và cập nhật state
        setFilterName('');
        setFilterDistrict('');
        // setFilterSalary('');
        setFilteredData((data?.data || []) as IFindJob[]);
        setSelectedProvincetId(null); // Reset giá trị của tỉnh/thành phố
        setFilterProvince(''); // Reset giá trị của quận/huyện
    };

    return (
        <div>
            <div className="flex gap-4 text-sm my-4">
                <input
                    type="text"
                    placeholder="Tìm tên việc, chức danh"
                    className="border border-gray-200 p-2 rounded-md outline-blue-400 w-1/4"
                    value={filterName}
                    onChange={handleNameInputChange}
                />
                <Select placeholder="--Tỉnh, Thành phố--" className="h-[37px] w-40" onChange={handleSelectProvinceId}>
                    {select?.data?.province_id.map((options: IJobPost) => (
                        <Select.Option key={options.id} rovinceName={options.province} className="my-1">
                            {options.province}
                        </Select.Option>
                    ))}
                </Select>
                <Select placeholder="--Quận, Huyện--" className="h-[37px] w-40" onChange={handleDistrictSelectChange}>
                    {select?.data?.district_id
                        ?.filter((options: {
                            province_id: string | number | null; id: string | number;
                        }) => options.province_id == selectedProvinceId)
                        .map((options: IJobPost) => (
                            <Select.Option key={options.id} value={options.name}>
                                {options.name}
                            </Select.Option>
                        ))}
                </Select>

                <select
                    name=""
                    className="border border-gray-200 p-2 rounded-md outline-blue-400 text-gray-700 w-40 "
                >
                    <option value="">- Mức lương -</option>
                    <option value="JM">Dưới 1 triệu</option>
                    <option value="SRV">1-3 triệu</option>
                    <option value="JH">3-5 triệu</option>
                    <option value="BBK">7-10 triệu</option>
                    <option value="AK">10-13 triệu</option>
                    <option value="BG">13-16 triệu</option>
                    <option value="BG">16-20 triệu</option>
                    <option value="BG">20-25 triệu</option>
                </select>
                <button className="bg-blue-600 text-white flex items-center rounded-md px-3" onClick={handleFilterButtonClick}>
                    <AiOutlineFilter className="text-lg" />
                    <p>Lọc</p>
                </button>
                <button className="bg-[#eaebee] text-gray-500 flex items-center rounded-md px-3" onClick={handleClearFilterButtonClick}>
                    <AiOutlineReload />
                    <p>Xóa lọc</p>
                </button>
            </div>
            <Spin spinning={isLoading}>
                <div className="bg-gray-100 -mx-4">
                    <div className="pt-4 bg-gray-100 mb-2 flex justify-between">
                        <p className="text-gray-700">Có {filteredData?.length || 0} kết quả tìm kiếm.</p>
                        <select
                            name=""
                            className="border border-gray-200 p-2 rounded-md outline-blue-400 text-gray-700 w-48"
                        >
                            <option value="">- Tin mới nhất -</option>
                            <option value="JM">- Mức lương giảm dần -</option>
                            <option value="SRV">- Mức lương tăng dần -</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {filteredData?.map((item: IFindJob) => (
                            <div className="p-4 bg-white text-base" key={item.id}>
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-4 leading-7">
                                        <img src={item.image} className="w-14 rounded-full border p-1.5" alt="" />
                                        <div>
                                            <p className="font-semibold text-lg">{item.name}</p>
                                            <p>{item.phone}-<span> Năm sinh: {item.birth}</span></p>
                                        </div>
                                    </div>
                                    {item.find_job === 0 && (
                                        <div>
                                            <p className="float-right w-1/2 mx-auto text-xs text-red-500">Ứng viên này không còn nhu cầu tìm việc</p>
                                        </div>
                                    )}
                                </div>
                                <p className="text-gray-500 my-3">Công việc quan tâm</p>
                                <div className="leading-8 border-b pb-2">
                                    <p className="flex items-center"><AiOutlineCalendar /> <span className="w-28">Vị trí:</span> <span>{item.title}</span></p>
                                    <p className="flex items-center"><AiOutlineEnvironment /> <span className="w-28">Địa điểm:</span> <span>{item.address}</span></p>
                                    <p className="flex items-center"><AiOutlineDollarCircle /> <span className="w-28">Mức lương:</span> <span>Trên 50 triệu</span></p>
                                </div>
                                <div className="mt-3 flex justify-between">

                                    <p className="flex items-center gap-2 text-gray-500"><AiOutlineClockCircle /><span>{item.created_at ? (
                                        <span>{formatTimeDifference(item.created_at)}</span>
                                    ) : (
                                        <span>Ngày không xác định</span>
                                    )}</span></p>
                                    <div>
                                        <button
                                            onClick={() => handleSaveProfile(item.id)}
                                            className={`bg-gray-100 p-3 mr-2 rounded ${item.save_profile === "chưa lưu" ? 'text-gray-400' : 'text-red-500'}`}
                                        >
                                            {item.save_profile === "chưa lưu" ? <AiOutlineHeart /> : <AiFillHeart />}
                                        </button>

                                        <TERipple rippleColor="white">
                                            <button
                                                type="button"
                                                className="bg-[#e4efff] text-[#0971fe] border border-[#9dc6ff] rounded py-2 px-3"
                                                onClick={() => handleOpenModal(item.id)}
                                            >
                                                Xem ngay
                                            </button>
                                        </TERipple>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </Spin>

            {/* <!-- Modal --> */}
            <TEModal show={showModal} setShow={setShowModal}>
                <TEModalDialog style={{ maxWidth: '700px' }}>
                    {data?.data
                        .filter((item: { id: null; }) => item.id === selectedCandidateId)// Lọc ứng viên với ID tương ứng
                        .map((item: IFindJob) => {
                            return (
                                <TEModalContent >
                                    <TEModalHeader>
                                        {/* <!--Modal title--> */}
                                        <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                                            Ứng viên cần tìm việc
                                        </h5>
                                        {/* <!--Close button--> */}
                                        <button
                                            type="button"
                                            className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                            aria-label="Close"
                                        >
                                            <AiOutlineClose />
                                        </button>
                                    </TEModalHeader>
                                    {/* <!--Modal body--> */}
                                    <TEModalBody>
                                        <div>
                                            <h2 className="text-gray-700 font-semibold mb-4">Thông tin công việc</h2>
                                            <div className="flex">
                                                <div className="w-1/3 border border-slate-200 p-2">
                                                    <p className="font-semibold">Chức danh, tên công việc</p>
                                                </div>
                                                <div className="w-2/3 border border-slate-200 p-2">
                                                    <p>{item.title}</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-1/3 border border-slate-200 p-2">
                                                    <p className="font-semibold">Địa điểm làm việc</p>
                                                </div>
                                                <div className="w-2/3 border border-slate-200 p-2">
                                                    <p>{item.address}</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-1/3 border border-slate-200 p-2">
                                                    <p className="font-semibold">Mức Lương mong muốn</p>
                                                </div>
                                                <div className="w-2/3 border border-slate-200 p-2">
                                                    <p>Trên 50 triệu</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-1/3 border border-slate-200 p-2">
                                                    <p className="font-semibold">Kĩ năng gồm có</p>
                                                </div>
                                                <div className="w-2/3 border border-slate-200 p-2">
                                                    <p>Nau mon han quoc</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-1/3 border border-slate-200 p-2">
                                                    <p className="font-semibold">Ngày đăng</p>
                                                </div>
                                                <div className="w-2/3 border border-slate-200 p-2">
                                                    <p>{item.created_at ? (
                                                        <span>{formatTimeDifference(item.created_at)}</span>
                                                    ) : (
                                                        <span>Ngày không xác định</span>
                                                    )}</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-1/3 border border-slate-200 p-2">
                                                    <p className="font-semibold">Kinh nghiệm đã có</p>
                                                </div>
                                                <div className="w-2/3 border border-slate-200 p-2">
                                                    <p>5nam</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h2 className="text-gray-700 font-semibold my-4">Thông tin liên hệ</h2>
                                            <div className="flex">
                                                <div className="w-1/3 border border-slate-200 p-2">
                                                    <p className="font-semibold">Họ và tên</p>
                                                </div>
                                                <div className="w-2/3 border border-slate-200 p-2">
                                                    <p>{item.name}</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-1/3 border border-slate-200 p-2">
                                                    <p className="font-semibold">Năm sinh</p>
                                                </div>
                                                <div className="w-2/3 border border-slate-200 p-2">
                                                    <p>{item.birth}</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-1/3 border border-slate-200 p-2">
                                                    <p className="font-semibold">Số điện thoại</p>
                                                </div>
                                                <div className="w-2/3 border border-slate-200 p-2">
                                                    <p>{item.phone}</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-1/3 border border-slate-200 p-2">
                                                    <p className="font-semibold">Email</p>
                                                </div>
                                                <div className="w-2/3 border border-slate-200 p-2">
                                                    <p>{item.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-1/3 border border-slate-200 p-2">
                                                    <p className="font-semibold">Hồ sơ</p>
                                                </div>
                                                <div className="w-2/3 border border-slate-200 p-2">
                                                    <p>4 tuần trươc</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-1/3 border border-slate-200 p-2">
                                                    <p className="font-semibold">Kinh nghiệm đã có</p>
                                                </div>
                                                <div className="w-2/3 border border-slate-200 p-2">
                                                    <p>	Link</p>
                                                </div>
                                            </div>
                                        </div>
                                    </TEModalBody>
                                    <TEModalFooter>
                                        <TERipple rippleColor="light">
                                            <button
                                                type="button"
                                                className="flex items-center gap-1 bg-gray-100 text-gray-800 rounded-md p-2"
                                                onClick={() => setShowModal(false)}
                                            >
                                                <AiOutlineClose /><span>Đóng</span>
                                            </button>
                                        </TERipple>
                                        <TERipple rippleColor="right">
                                            {item.open_profile === "chưa mua" ? (
                                                <button
                                                    type="button"
                                                    className="ml-3 flex items-center gap-1 bg-blue-500 text-white rounded-md p-2"
                                                    onClick={() => handleOpenModalUnlock(selectedCandidateId)}
                                                >
                                                    <AiOutlineSwap /> <span>Mở liên hệ</span>
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    className="ml-3 flex items-center gap-1 bg-blue-500 text-white rounded-md p-2"
                                                    onClick={() => hadleOpenModalRateProfile(selectedCandidateId)}
                                                >
                                                    <MdOutlineRateReview /> <span>Đánh giá</span>
                                                </button>
                                            )}
                                        </TERipple>
                                    </TEModalFooter>
                                    {/* Modal xác nhận mở khoá */}
                                    <Modal
                                        title="Xác nhận mở khoá ứng viên"
                                        visible={modalVisible}
                                        okText="Có"
                                        cancelText="Không"
                                        okType="default"
                                        onOk={handleModalConfirm} // Không cần truyền tham số vào hàm này
                                        onCancel={() => setModalVisible(false)}
                                        zIndex={1200}
                                    >
                                        Bạn có muốn mở khoá ứng viên này không không?
                                    </Modal>
                                    {/* Modal đánh giá ứng viên */}
                                    <Modal
                                        title="Đánh giá ứng viên"
                                        visible={ratingModalVisible}
                                        onOk={() => handleRateProfile()}
                                        onCancel={() => setRatingModalVisible(false)}
                                        okType="default"
                                        okText="Đánh giá"
                                        zIndex={1200}
                                    >
                                        <Form
                                            form={form}
                                            name="repostJobForm"
                                            labelCol={{ span: 24 }}
                                            wrapperCol={{ span: 24 }}
                                            initialValues={{ remember: true }}
                                            autoComplete="off"
                                        >
                                            <Form.Item label="Mức độ hài lòng:" name="start" rules={[{ required: true, message: 'Vui lòng chọn đánh giá' }]}>
                                                <Rate />
                                            </Form.Item>
                                            <Form.Item label="Bình luận:" name="comment" rules={[{ required: true, message: 'Vui lòng viết bình luận' }]}>
                                                <Input.TextArea rows={6} />
                                            </Form.Item>
                                        </Form>
                                    </Modal>
                                </TEModalContent>
                            )
                        })
                    }
                </TEModalDialog>
            </TEModal>
        </div>
    )
};

export default OpenJob