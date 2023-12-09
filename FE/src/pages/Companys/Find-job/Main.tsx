import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineCalendar, AiOutlineClockCircle, AiOutlineClose, AiOutlineDollarCircle, AiOutlineEnvironment, AiOutlineFilter, AiOutlineHeart, AiOutlineReload, AiOutlineSwap } from "react-icons/ai"
import { TERipple, TEModal, TEModalDialog, TEModalContent, TEModalHeader, TEModalBody, TEModalFooter, } from "tw-elements-react";
import { useCancelSaveProfileMutation, useGetFindCandidateQuery, useOpenProfileMutation, useRateProfileMutation, useSaveProfileMutation } from "../../../api/companies/findJob";
import { IFindJob, IJobPost } from "../../../interfaces";
import { Form, Input, Modal, Rate, Select, Spin, message } from "antd";
import { formatDistanceToNow, parse } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useGetJobPostSelectByIdQuery } from "../../../api/companies/jobPostCompany";
import { BaseOptionType } from "antd/es/select";
import { DefaultOptionType } from "antd/es/cascader";
import { MdOutlineRateReview } from "react-icons/md";
import { useGetInforQuery } from "../../../api/CompanyInfoApi";

const MainFindJob = () => {
    const [form] = Form.useForm();
    const { data, isLoading } = useGetFindCandidateQuery();
    console.log(data)
    const { data: Infor } = useGetInforQuery();
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
    const [filterSalary, setFilterSalary] = useState('');
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
    // Thêm hàm để xử lý sự kiện khi giá trị mức lương thay đổi
    const handleSalarySelectChange = (value: string) => {
        setFilterSalary(value);
    };

    const handleFilter = () => {
        let result: any = data?.data || [];

        // Lọc theo chức vụ
        if (filterName) {
            result = result.filter((item: { major: string; }) => {
                const regex = new RegExp(filterName, 'i'); // 'i' là để không phân biệt chữ hoa, chữ thường
                return regex.test(item.major);
            });
        }
        //Lọc theo tỉnh thành phố
        if (filterProvince) {
            result = result.filter((item: { province: string }) => {
                const provinceLower = (item.province || '').toLowerCase(); // Thêm điều kiện kiểm tra trước khi sử dụng toLowerCase

                return (!filterProvince || provinceLower.includes(filterProvince.toLowerCase()));
            });
        }
        //Lọc theo quận huyện
        if (filterDistrict) {
            result = result.filter((item: { district: string }) => {
                const districtLower = (item.district || '').toLowerCase(); // Thêm điều kiện kiểm tra trước khi sử dụng toLowerCase

                return (!filterDistrict || districtLower.includes(filterDistrict.toLowerCase()));
            });
        }
        //Lọc theo mức lương
        if (filterSalary) {
            // Lọc theo mức lương dựa trên giá trị được chọn
            result = result.filter((item: { desired_salary: number }) => {
                switch (filterSalary) {
                    case '1':
                        return item.desired_salary < 1000000; // Dưới 1 triệu
                    case '2':
                        return item.desired_salary >= 1000000 && item.desired_salary < 5000000; // 1-5 triệu
                    case '3':
                        return item.desired_salary >= 5000000 && item.desired_salary < 10000000; // 5-10 triệu
                    case '4':
                        return item.desired_salary >= 10000000 && item.desired_salary < 15000000; // 10-15 triệu
                    case '5':
                        return item.desired_salary >= 15000000 && item.desired_salary < 20000000; // 15-20 triệu
                    case '6':
                        return item.desired_salary >= 20000000 && item.desired_salary < 25000000; // 20-25 triệu
                    case '7':
                        return item.desired_salary >= 25000000 && item.desired_salary < 30000000; // 25-30 triệu
                    case '8':
                        return item.desired_salary >= 30000000 && item.desired_salary < 35000000; // 30-35 triệu
                    case '9':
                        return item.desired_salary >= 35000000; // Trên 35 triệu
                    default:
                        return true; // Nếu không có mức lương nào được chọn, hiển thị tất cả
                }
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
        setFilterSalary('');
        setFilteredData((data?.data || []) as IFindJob[]);
        setSelectedProvincetId(null); // Reset giá trị của tỉnh/thành phố
        setFilterProvince(''); // Reset giá trị của quận/huyện
    };
    //Hàm chia đơn vị tiền tệ
    const formatCurrency = (amount: number, currency: string) => {
        const formattedAmount = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: currency,
        }).format(amount);

        return formattedAmount;
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
                    className="border border-gray-200 p-2 rounded-md outline-blue-400 text-gray-700 w-40 "
                    onChange={(e) => handleSalarySelectChange(e.target.value)}
                >
                    <option value="">- Mức lương -</option>
                    <option value="1">Dưới 1 triệu</option>
                    <option value="2">1-5 triệu</option>
                    <option value="3">5-10 triệu</option>
                    <option value="4">10-15 triệu</option>
                    <option value="5">15-20 triệu</option>
                    <option value="6">20-25 triệu</option>
                    <option value="7">25-30 triệu</option>
                    <option value="8">30-35 triệu</option>
                    <option value="9">Trên 35 triệu</option>
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
                        {/* <select
                            name=""
                            className="border border-gray-200 p-2 rounded-md outline-blue-400 text-gray-700 w-48"
                        >
                            <option value="">- Tin mới nhất -</option>
                            <option value="JM">- Mức lương giảm dần -</option>
                            <option value="SRV">- Mức lương tăng dần -</option>
                        </select> */}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {filteredData?.map((item: IFindJob) => (
                            <div className="p-4 bg-white text-base" key={item.id}>
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-4 leading-7">
                                        <img src={item.image} className="w-14 rounded-full border p-1.5" alt="" />
                                        <div>
                                            {item.name === null ? (
                                                <p className="font-semibold text-lg">Chưa cập nhật</p>
                                            ) : (
                                                <p className="font-semibold text-lg">{item.name}</p>
                                            )}
                                            <p>
                                                {item.phone === null ? (
                                                    <span>Chưa cập nhật</span>
                                                ) : (
                                                    <span>{item.phone}</span>
                                                )} -
                                                {item.birth === null ? (
                                                    <span>Chưa cập nhật</span>
                                                ) : (
                                                    <span>{item.birth}</span>
                                                )}
                                            </p>

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
                                    <p className="flex items-center"><AiOutlineCalendar /> <span className="w-28">Vị trí:</span>
                                        <span><p>{item.major === null ? (
                                            <p>Chưa cập nhật</p>
                                        ) : (
                                            <p>{item.major}</p>
                                        )}</p></span></p>
                                    <p className="flex items-center">
                                        <AiOutlineEnvironment /> <span className="w-28">Địa điểm:</span>
                                        <span>
                                            {item.province} {item.district === null ? 'Chưa cập nhật' : item.district}
                                        </span>
                                    </p>
                                    <p className="flex items-center"><AiOutlineDollarCircle /> <span className="w-28">Mức lương:</span>
                                        <span>{item.desired_salary === null ? (
                                            <p>Chưa cập nhật</p>
                                        ) : (
                                            <p className="text-red-500">{formatCurrency(item.desired_salary, 'VND')}</p>
                                        )}</span></p>
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
            <TEModal show={showModal} setShow={setShowModal} >
                <TEModalDialog style={{ maxWidth: '1000px' }}>
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
                                    <TEModalBody style={{ maxHeight: '75vh', overflowY: 'auto' }}>
                                        <div>
                                            <h2 className="text-gray-700 font-semibold mb-4 text-lg">Thông tin công việc</h2>
                                            <div className="flex">
                                                <div className="w-1/3 border border-slate-200 p-2">
                                                    <p className="font-semibold">Chức danh, tên công việc</p>
                                                </div>
                                                <div className="w-2/3 border border-slate-200 p-2">
                                                    <p>{item.major === null ? (
                                                        <p>Chưa cập nhật</p>
                                                    ) : (
                                                        <p>{item.major}</p>
                                                    )}</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-1/3 border border-slate-200 p-2">
                                                    <p className="font-semibold">Địa điểm làm việc</p>
                                                </div>
                                                <div className="w-2/3 border border-slate-200 p-2">
                                                    <p>{item.province} {item.district === null ? 'Chưa cập nhật' : item.district}</p>
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-1/3 border border-slate-200 p-2">
                                                    <p className="font-semibold">Mức Lương mong muốn</p>
                                                </div>
                                                <div className="w-2/3 border border-slate-200 p-2">
                                                    {item.desired_salary === null ? (
                                                        <p>Chưa cập nhật</p>
                                                    ) : (
                                                        <p className="text-red-500">{formatCurrency(item.desired_salary, 'VND')}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-1/3 border border-slate-200 p-2">
                                                    <p className="font-semibold">Thời gian</p>
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
                                                    {item.experience === null ? (
                                                        <p>Chưa cập nhật</p>
                                                    ) : (
                                                        <p>{item.experience}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h2 className="text-gray-700 font-semibold my-4 text-lg">Thông tin liên hệ</h2>
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
                                                    <p>{item.birth === null ? (
                                                        <p>Chưa cập nhật</p>
                                                    ) : (
                                                        <p>{item.birth}</p>
                                                    )}</p>
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
                                                    <p>{item.path_cv === null ? (
                                                        <p>Bạn phải mở khoá mới có thể thấy link hồ sơ</p>
                                                    ) : (
                                                        <a href={item.path_cv} className="text-blue-500" target="_blank" rel="noopener noreferrer">Hồ sơ của ứng viên</a>
                                                    )}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border border-slate-200 p-2 my-3">
                                            <p className="flex justify-between">
                                                <span>Phí mở liên hệ</span>
                                                <span className="text-red-400">{item.coin} xu</span>
                                            </p>
                                            <p className="flex justify-between">
                                                <span>Số xu trong tài khoản</span>
                                                <span>{Infor?.company?.coin} xu</span>
                                            </p>
                                        </div>
                                        <div>
                                            <h2 className="text-gray-700 font-semibold my-4 text-lg">Những công ty đã đánh giá</h2>
                                            <div className="pl-4">
                                                <Rate allowHalf defaultValue={item.start} disabled />
                                                <span className="text-red-500 ml-1">{item.start}/5 (71 đánh giá)</span>

                                                <div className="grid-cols-1">
                                                    <div className="border-t my-3 pt-3">
                                                        <div className="flex items-center gap-2">
                                                            <img src="data:image/jpeg;base64,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" alt="" className="w-14 h-14 rounded-full" />
                                                            <div>
                                                                <p className="text-base font-medium">Công ty cổ phần ABC</p>
                                                                <Rate allowHalf defaultValue={item.start} disabled className="text-sm" />
                                                            </div>
                                                        </div>
                                                        <p className="mt-2">Hàng thì oke đẹp mỗi tội k khâu đế khâu là k j phải bàn lun tuyệt🤭</p>
                                                        <p className="text-gray-500 font-medium">7/10/2023 13:28</p>
                                                    </div>
                                                    <div className="border-t my-3 pt-3">
                                                        <div className="flex items-center gap-2">
                                                            <img src="data:image/jpeg;base64,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" alt="" className="w-14 h-14 rounded-full" />
                                                            <div>
                                                                <p className="text-base font-medium">Công ty cổ phần ABC</p>
                                                                <Rate allowHalf defaultValue={item.start} disabled className="text-sm" />
                                                            </div>
                                                        </div>
                                                        <p className="mt-2">Hàng thì oke đẹp mỗi tội k khâu đế khâu là k j phải bàn lun tuyệt🤭</p>
                                                        <p className="text-gray-500 font-medium">7/10/2023 13:28</p>
                                                    </div>
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
                                                item.comment === null ? (
                                                    <button
                                                        type="button"
                                                        className="ml-3 flex items-center gap-1 bg-blue-500 text-white rounded-md p-2"
                                                        onClick={() => hadleOpenModalRateProfile(selectedCandidateId)}
                                                    >
                                                        <MdOutlineRateReview /> <span>Đánh giá</span>
                                                    </button>
                                                ) : (
                                                    <button className="ml-3 flex items-center gap-1 bg-blue-500 text-white rounded-md p-2">Bạn đã đánh giá hồ sơ này rồi!!</button>
                                                )
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

export default MainFindJob