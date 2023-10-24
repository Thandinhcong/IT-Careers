import { useState } from "react";
import { AiFillFacebook, AiFillLinkedin, AiFillTwitterSquare, AiOutlineCalendar, AiOutlineCheck, AiOutlineCheckCircle, AiOutlineClockCircle, AiOutlineClose, AiOutlineCopy, AiOutlineEnvironment, AiOutlineFileDone, AiOutlineHeart, AiOutlineMoneyCollect, AiOutlineQuestionCircle, AiOutlineRight, AiOutlineStar, AiOutlineUser, AiOutlineUsergroupAdd, AiOutlineWarning } from "react-icons/ai"
import { CiMedal } from "react-icons/ci";
import { useParams } from "react-router-dom";
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
} from "tw-elements-react";
import { useGetOneJobsQuery } from "../../../api/jobApi";
import { IListJobsDetail } from "../../../interfaces";


const TabNew = () => {

    const [showModal, setShowModal] = useState(false);

    const copyToClipboard = () => {
        const inputElement = document.querySelector<HTMLInputElement>("#inputElement");
        if (inputElement) {
            const textToCopy = inputElement.value;
            navigator.clipboard.writeText(textToCopy).then(
                function () {
                    alert("Sao chép thành công!!")
                }
            );
        }
    };
    const { id } = useParams();
    const { data } = useGetOneJobsQuery(id || "");
    const listOne: IListJobsDetail | undefined = data && data.job_detail;
    return (
        <div className='grid grid-cols-3 gap-4'>
            <div className='col-span-2'>
                <div className='bg-gray-100 text-green-600 p-4'>
                    <p className='font-semibold text-lg flex items-center gap-2'>
                        <AiOutlineCheckCircle className="text-3xl" />123job Trust verified <AiOutlineQuestionCircle />
                    </p>
                    <div className='grid grid-cols-2 gap-4 text-sm my-4'>
                        <p className='flex items-center gap-3'><AiOutlineCheckCircle />
                            <span className='text-gray-800'>Chưa có giấy phép kinh doanh</span>
                        </p>
                        <p className='flex items-center gap-3'><AiOutlineCheckCircle />
                            <span className='text-gray-800'>Tin đăng chưa có video hoặc hình ảnh</span>
                        </p>
                        <p className='flex items-center gap-3'><AiOutlineCheckCircle />
                            <span className='text-gray-800'> Nhà tuyển dụng tạo tài khoản dưới 1 tháng</span>
                        </p>
                        <p className='flex items-center gap-3'><AiOutlineCheckCircle />
                            <span className='text-gray-800'>Chưa có lịch sử báo xấu tin đăng</span>
                        </p>
                    </div>
                    <div>
                        {/* <!-- Button trigger modal --> */}
                        <TERipple rippleColor="red" className="flex justify-end items-center">
                            <button
                                type="button"
                                className="text-sm font-medium  text-red-500 "
                                onClick={() => setShowModal(true)}
                            >
                                Tìm hiểu thêm
                            </button>
                            <AiOutlineRight className="text-red-500" />
                        </TERipple>

                        {/* <!-- Modal --> */}
                        <TEModal show={showModal} setShow={setShowModal}>
                            <TEModalDialog>
                                <TEModalContent>
                                    <TEModalHeader>
                                        {/* <!--Modal title--> */}
                                        <h5 className="text-xl font-medium">
                                            <CiMedal className="inline-block text-3xl" />
                                            123job Trust verified
                                        </h5>
                                        {/* <!--Close button--> */}
                                        <button
                                            type="button"
                                            className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                            aria-label="Close"
                                        >
                                            <AiOutlineClose className="text-xl" />
                                        </button>
                                    </TEModalHeader>
                                    {/* <!--Modal body--> */}
                                    <TEModalBody className="text-gray-800">
                                        <p>Dữ liệu chúng tôi cung cấp giúp bạn an toàn hơn trong quá trình tìm hiểu để ứng tuyển vào công việc hiện tại. Tránh những tin tuyển dụng giả mạo, lừa đảo.</p>
                                        <div className="flex items-start gap-4">
                                            <AiOutlineCheckCircle className="text-2xl mt-1 text-green-500 " />
                                            <div>
                                                <p className="font-semibold">Chưa có giấy phép kinh doanh</p>
                                                <p>Nhà tuyển dụng chưa cung cấp giấy phép kinh doanh để xác thực tài khoản</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <AiOutlineCheckCircle className="text-2xl mt-1 text-green-500" />
                                            <div>
                                                <p className="font-semibold">Nhà tuyển dụng tạo tài khoản dưới 1 tháng</p>
                                                <p>Thời gian tạo tài khoản đăng tin tuyển dụng càng lâu. Mức độ uy tín càng nhiều.</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <AiOutlineCheckCircle className="text-4xl mt-1 text-green-500" />
                                            <div>
                                                <p className="font-semibold">Tin đăng chưa có video hoặc hình ảnh</p>
                                                <p>Hình ảnh và video làm việc khi được tải lên cùng tin tuyển dụng. Sẽ giúp ứng viên tìm hiểu rõ hơn về công việc mình đang quan tâm</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <AiOutlineCheckCircle className="text-4xl mt-1 text-green-500" />
                                            <div>
                                                <p className="font-semibold">Chưa có lịch sử báo xấu tin đăng</p>
                                                <p>Tin tuyển dụng có số lần báo cáo nhiều 1 lần. Bạn cần lưu ý các tin này. Bạn sẽ an toàn hơn đối với các tin chưa có lịch sử báo xấu trước đó.</p>
                                            </div>
                                        </div>
                                        <p className="text-xs my-3">
                                            Mọi thông tin liên quan tới tin tuyển dụng này là do người đăng tin đăng tải và chịu trách nhiệm. Chúng tôi luôn cố gắng để có chất lượng thông tin tốt nhất, nhưng chúng tôi không đảm bảo và không chịu trách nhiệm về bất kỳ nội dung nào liên quan tới tin việc làm này. Nếu người tìm việc phát hiện có sai sót hay vấn đề gì xin hãy
                                            <span className="text-blue-500"> báo cáo cho chúng tôi</span>
                                        </p>
                                    </TEModalBody>
                                </TEModalContent>
                            </TEModalDialog>
                        </TEModal>
                    </div>
                </div>
                <div className="text-gray-700">
                    <div>
                        <h2 className="font-semibold text-lg my-4">Thông tin cơ bản</h2>
                        <div className="grid grid-cols-2 border text-[15px]">
                            <div className="grid grid-cols-1 gap-2 border-r py-2">
                                <div className="grid grid-cols-12 items-center gap-2 border-b pb-2">
                                    <AiOutlineEnvironment className="col-span-1" />
                                    <p className="col-span-4">Địa điểm:</p>
                                    <p className="col-span-7">{listOne?.address}</p>
                                </div>
                                <div className="grid grid-cols-12 items-center gap-2 border-b pb-2">
                                    <AiOutlineClockCircle className="col-span-1" />
                                    <p className="col-span-4">Hạn nộp hồ sơ:</p>
                                    <p className="col-span-7">{listOne?.end_date}</p>
                                </div>
                                <div className="grid grid-cols-12 items-center gap-2 border-b pb-2">
                                    <AiOutlineCalendar className="col-span-1" />
                                    <p className="col-span-4">Hình thức:</p>
                                    <p className="col-span-7">{listOne?.working_form}</p>
                                </div>
                                <div className="grid grid-cols-12 items-center gap-2">
                                    <AiOutlineUsergroupAdd className="col-span-1" />
                                    <p className="col-span-4">Số lượng:</p>
                                    <p className="col-span-7">{listOne?.quantity}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-2 py-2">
                                <div className="grid grid-cols-12 items-center gap-2 border-b pb-2">
                                    <AiOutlineMoneyCollect className="col-span-1" />
                                    <p className="col-span-4">Mức lương:</p>
                                    <p className="col-span-7 text-red-500 font-medium">{listOne?.min_salary}-{listOne?.max_salary}</p>
                                </div>
                                <div className="grid grid-cols-12 items-center gap-2 border-b pb-2">
                                    <AiOutlineUser className="col-span-1" />
                                    <p className="col-span-4">Chức vụ:</p>
                                    <p className="col-span-7">{listOne?.job_position}</p>
                                </div>
                                <div className="grid grid-cols-12 items-center gap-2 border-b pb-2">
                                    <AiOutlineFileDone className="col-span-1" />
                                    <p className="col-span-4">Kinh nghiệm</p>
                                    <p className="col-span-7">{listOne?.experience}</p>
                                </div>
                                <div className="grid grid-cols-12 items-center gap-2">
                                    <AiOutlineStar className="col-span-1" />
                                    <p className="col-span-4">Trình độ:</p>
                                    <p className="col-span-7">{listOne?.academic_level}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="font-semibold text-lg my-4">Mô tả công việc</h2>
                        <p>{listOne?.desc}</p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-lg my-4">Quyền lợi</h2>
                        <p>{listOne?.interest}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 my-5">
                        <button className="text-white border border-blue-600 bg-blue-600 p-3 hover:bg-blue-500 font-medium rounded-lg">
                            <AiOutlineCheck className="inline-block text mr-2 text-xl" />Nộp hồ sơ online
                        </button>
                        <button className="bg-white border-2 border-blue-600 text-blue-600 p-3 hover:text-white hover:bg-blue-600 font-medium rounded-lg">
                            <AiOutlineHeart className="inline-block text mr-2 text-xl" /> Lưu tin
                        </button>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="border border-gray-100 p-3">
                    <h2 className="font-semibold text-lg">Chia sẻ tin tuyển dụng</h2>
                    <div className="my-3">
                        <p>sao chép đường dẫn</p>
                        <span>
                            <input
                                id="inputElement"
                                value={'https://123job.vn/viec-lam/tuyen-lai-xe-tainhan-bo-tuc-va-phu-xe-giao-banh-keo-tai-bac-giang-l5DOE8ngrV'}
                                type="text" disabled className="p-2 w-4/5 rounded" />
                            <button onClick={copyToClipboard} className="bg-[#4688ff26] text-blue-500 text-xl p-3 rounded ml-2"><AiOutlineCopy /></button>
                        </span>
                    </div>
                    <p>Chia sẻ qua mạng xã hội</p>
                    <span className="text-5xl flex gap-2 pt-2">
                        <a href=""><AiFillFacebook className="text-blue-500" /></a>
                        <a href=""><AiFillTwitterSquare className=" text-blue-500" /></a>
                        <a href=""><AiFillLinkedin className="text-blue-500" /></a>
                    </span>
                </div>
                <div className="border border-gray-100 p-3 my-4">
                    <h2 className="font-semibold text-base">Báo cáo tin tuyển dụng</h2>
                    <p className="my-3">
                        Nếu bạn thấy rằng tin tuyển dụng này không đúng hoặc có một trong các dấu hiệu lừa đảo: yêu cầu nộp tiền phỏng vấn, phí giữ chỗ, phí đồng phục ...
                    </p>
                    <button className="flex items-center gap-2 text-[#666] bg-[#f6f7f9] w-full justify-center rounded-md py-3">
                        <AiOutlineWarning />
                        <p>Báo cáo tin tuyển dụng</p>
                    </button>
                </div>
            </div>
        </div >
    )
}

export default TabNew