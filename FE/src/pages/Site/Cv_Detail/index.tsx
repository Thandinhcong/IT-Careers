import { useState } from 'react'
import { AiOutlinePhone, AiOutlineMail, AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { TEModal, TEModalBody, TEModalContent, TEModalDialog, TEModalFooter, TEModalHeader, TERipple } from 'tw-elements-react';


const Cv_Detail = () => {

    const [showModal, setShowModal] = useState(false);

    return (
        <div className=' max-w-screen-xl mx-auto'>
            <div className="bg-white p-6 shadow-md hover:shadow-xl h-[1020px] mt-10">
                <div className="container mx-auto py-8">
                    <div className="grid grid-cols-7 gap-4">
                        <div className="col-span-7 sm:col-span-5">
                            <img src="https://img.nhandan.com.vn/Files/Images/2020/07/26/nhat_cay-1595747664059.jpg" alt="" />
                        </div>
                        <div className="col-span-7 sm:col-span-2">

                            <Link to={'/business/cv-apply'} className="bg-gray-300 hover:bg-gray-600 text-gray font-bold py-2 px-4 rounded-md mb-4 ">
                                Về trang chính
                            </Link>
                            <div className="bg-white p-4 mb-4 mt-4 flex items-center">
                                <img src="https://business.123job.vn/images/rank_0.png" className="w-20" />
                                <div className="ml-4">
                                    <p className="font-bold">Đinh Văn Thản</p>
                                    <div className="flex items-center mt-2">
                                        <AiOutlinePhone className="w-6 h-6 mr-2" />
                                        <span className="text-gray-600">012345678</span>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <AiOutlineMail className="w-6 h-6 mr-2" />
                                        <span className="text-gray-600">thandv@gmail.com</span>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="bg-white p-4">
                                <p className="font-bold">Lời Nhắn </p>
                                {/* <textarea className="w-full h-40 mt-4 p-2 border border-gray-300 rounded" /> */}
                                <span>Xin Chào Quý Công Ty Tôi Thấy Mình Khá Phù Hợp Với Công Việc Này</span>
                            </div>
                            <hr />
                            <div className="bg-white p-4">
                                <p className="font-bold mt-2 mb-2">Đánh Giá CV</p>
                                <span >Thực hiện đánh giá sẽ giúp hệ thống tối ưu tốt hơn cho chiến dịch tuyển dụng của bạn</span>
                            </div>
                            <div className="mt-4 bg-white">
                                <TERipple rippleColor="white">
                                    <button
                                        type="button"
                                        className="bg-[#e4efff] text-[#0971fe] border border-[#9dc6ff] rounded py-2 px-3 ml-5"
                                        onClick={() => setShowModal(true)}
                                    >
                                        Phù Hợp
                                    </button>
                                </TERipple>
                                <TERipple rippleColor="white">
                                    <button
                                        type="button"
                                        className="bg-[#ffe4e4] text-[#fe093e] border border-[#ff9d9d] rounded py-2 px-3 ml-10"
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
                            <table className="table-auto w-[300px] mt-4 ml-5">
                                <thead>
                                    <h3>Trạng Thái Cv</h3>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border px-4 py-2">Mã Hồ Sơ</td>
                                        <td className="border px-4 py-2">12343</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">Trạng Thái</td>
                                        <td className="border px-4 py-2">Status</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">Loại Hồ Sơ</td>
                                        <td className="border px-4 py-2">Upload Cv</td>
                                    </tr>
                                    <tr>
                                        <td className="border px-4 py-2">Ngày Ứng Tuyển</td>
                                        <td className="border px-4 py-2">3/11/2023</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="mt-4 bg-white">
                                <TERipple rippleColor="white">
                                    <button
                                        type="button"
                                        className="bg-gray-300 text-black border border-gray rounded py-2 px-[100px] ml-9"
                                        onClick={() => setShowModal(true)}
                                    >
                                        Đánh Giá
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
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Cv_Detail