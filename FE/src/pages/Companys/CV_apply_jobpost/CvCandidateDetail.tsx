import { useState } from 'react'
import { AiOutlinePhone, AiOutlineMail, AiOutlineClose, AiOutlineArrowLeft } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom';
import { TEModal, TEModalBody, TEModalContent, TEModalDialog, TEModalFooter, TEModalHeader, TERipple } from 'tw-elements-react';
import { useGetCandidateDetailQuery } from '../../../api/companies/cvApply';


const CvCandodateDetail = () => {

    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();
    const { data } = useGetCandidateDetailQuery(id || "");

    return (
        <div className=' max-w-screen-xl mx-auto text-[#364a63]'>
            <div className="bg-white p-6 shadow-md hover:shadow-xl ">
                <div className="container mx-auto">
                    <div className="grid grid-cols-7 gap-4">
                        <div className="col-span-7 sm:col-span-5">
                            <img src={`${data?.data?.profile.path_cv}`} alt="" />
                        </div>
                        <div className="col-span-7 sm:col-span-2">
                            <Link to={'/business/cv-apply'} className="bg-[#f1f3f5] text-[#8091a7] hover:bg-gray-400 hover:text-white py-2 px-4 rounded mb-4 text-sm ">
                                <AiOutlineArrowLeft className="inline-block" /> Về trang chính
                            </Link>
                            <div className="bg-white p-4 mb-4 mt-4 flex items-center">
                                <img
                                    className="w-20 rounded-full border border-gray-400 p-1"
                                    src="https://cdn1.123job.vn/123job/uploads/2023/10/06/2023_10_06______622e2e506d59c1af0f1a16739bcc252d.png" alt="" />
                                <div className="ml-4">
                                    <p className=" font-sans font-semibold">{data?.data?.profile.name}</p>
                                    <div className="flex items-center mt-2">
                                        <span className='bg-[#e4efff] mr-2 rounded-full p-2'>
                                            <AiOutlinePhone className="w-4 h-4 text-[#0971fe] text-center" />
                                        </span>
                                        <span className="">{data?.data?.profile.phone}</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span className='bg-[#e4efff] mr-2 rounded-full p-2'>
                                            <AiOutlineMail className="w-4 h-4 text-[#0971fe] text-center" />
                                        </span>
                                        <span className="">{data?.data?.profile.email}</span>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="bg-white p-4">
                                <p className="font-bold mb-1.5">Lời Nhắn </p>
                                <p className="text-sm">
                                    Em là sinh viên mới học xong đang chờ bằng, cần một nơi để thực tập, rèn luyện kĩ năng bản thân. - Điểm mạnh: khả năng tự học cao - Điếm yếu: ngoại ngữ kém cần hoàn hiện nhiều
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
                                        onClick={() => setShowModal(true)}
                                    >
                                        Phù Hợp
                                    </button>
                                </TERipple>
                                <TERipple rippleColor="white">
                                    <button
                                        type="button"
                                        className="bg-[#fceceb] text-[#e85347]  hover:text-white hover:bg-red-500 text-center w-full py-2 rounded text-[15px]"
                                        onClick={() => setShowModal(true)}
                                    >
                                        Không Phù Hợp
                                    </button>
                                </TERipple>

                                <TEModal show={showModal} setShow={setShowModal}>
                                    <TEModalDialog className="bg-white" style={{ maxWidth: '700px', background: 'white' }}>
                                        <TEModalContent >
                                            <TEModalHeader>
                                                {/* <!--Modal title--> */}
                                                <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                                                    Đánh Giá Ứng Viên
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
                                                <div className="flex justify-between">
                                                    <button className="bg-white-200 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mr-2">
                                                        Phù Hợp
                                                    </button>
                                                    <button className="bg-white-200 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mr-2">
                                                        Phỏng Vấn
                                                    </button>
                                                    <button className="bg-white-200 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full mr-2">
                                                        Từ Chối
                                                    </button>
                                                    <button className="bg-white-200 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full mr-2">
                                                        Nhận Việc
                                                    </button>
                                                    <button className="bg-white-200 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full mr-2">
                                                        Khác
                                                    </button>
                                                </div>
                                                <br />
                                                <p>Nhận Xét Ứng Viên</p>
                                                <textarea className="w-full h-40 mt-4 p-2 border border-gray-300 rounded" />
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
                                                <TERipple rippleColor="light">
                                                    <button
                                                        type="button"
                                                        className="ml-3 flex items-center gap-1 bg-blue-500 text-white rounded-md p-2"
                                                    >
                                                        <span>Đánh Giá</span>
                                                    </button>
                                                </TERipple>
                                            </TEModalFooter>
                                        </TEModalContent>
                                    </TEModalDialog>
                                </TEModal>
                            </div>
                            <hr className='mt-5' />
                            <table className="table-auto w-[300px] ml-5">
                                <thead>
                                    <h3 className='font-semibold my-3'>Trạng Thái Cv</h3>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border px-4 py-2">Mã Hồ Sơ</td>
                                        <td className="border px-4 py-2">{data?.data?.profile.id}</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">Trạng Thái</td>
                                        <td className="border px-4 py-2">
                                            <p className={`${data?.data?.profile.qualifying_round_id === 0
                                                ? 'p-1 rounded text-xs text-center bg-yellow-200 text-yellow-500 w-1/2'
                                                : data?.data?.profile?.qualifying_round_id === 1
                                                    ? 'p-1 rounded text-xs text-center bg-[#b5ff95] text-[#62a745] w-1/2'

                                                    : ''
                                                }`}>
                                                {data?.data?.profile.qualifying_round_id === 0 ? 'không phù hợp' : data?.data?.profile.qualifying_round_id === 1 ? 'phù hợp' : ''}
                                            </p>
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <td className="border px-4 py-2">Loại Hồ Sơ</td>
                                        <td className="border px-4 py-2">Upload Cv</td>
                                    </tr> */}
                                    <tr>
                                        <td className="border px-4 py-2">Ngày Ứng Tuyển</td>
                                        <td className="border px-4 py-2">{data?.data?.profile.created_at}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default CvCandodateDetail