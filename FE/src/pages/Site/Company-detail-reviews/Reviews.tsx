import { Rate } from 'antd';
import { AiOutlineArrowLeft, AiOutlineEdit, AiOutlineUser } from "react-icons/ai"
import { Link } from "react-router-dom"

const Reviews = () => {
    return (
        <div className="bg-gray-50 py-4">
            <div className="max-w-screen-xl mx-48 grid grid-cols-3 gap-6">
                <div className="col-span-2 bg-white p-8">
                    <Link to={'/company/detail'}><AiOutlineArrowLeft className="inline-block" />Quay lại</Link>
                    <div className="flex items-center gap-4 my-6">
                        <img className="w-20 shadow-4xl" src="https://cdn.123job.vn/123job/uploads/2023/02/07/2023_02_07______553331b3f5d57b00c71a7ac016b5be1a.png" alt="" />
                        <div className="leading-8">
                            <p className="font-semibold text-lg">Bệnh viện đa khóa quốc tế Thu Cúc</p>
                            <p>278 Thụy Khuê, Tây Hồ, Ha Noi</p>
                        </div>
                    </div>
                    <form className='text-gray-700'>
                        <div className='pb-8 my-3 border-b-2'>
                            <div>
                                <label htmlFor="" className='block text-lg font-bold'>Bạn đánh giá công ty này như thế nào</label>
                                <Rate />
                            </div>
                            <div className="mt-6 space-y-6">
                                <label htmlFor="" className='block text-lg font-bold'>Bạn có muốn giới thiệu cong ty với bạn bè người thân không?</label>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="push-everything"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                        Không
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="push-email"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Có
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className='pb-8 my-3 border-b-2'>
                            <p className='font-bold text-xl'><AiOutlineEdit className="inline-block mr-2" />Cái tốt và cái xấu. Điều gì nổi bật khi làm việc tại công ty này?</p>
                            <div className="col-span-full">
                                <label htmlFor="about" className='block text-base font-bold'>Đánh giá tóm tắt</label>
                                <div className="mt-2">
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows={3}
                                        className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                        placeholder='Ví dụ: Văn phòng làm việc xịn xò, đẹp'
                                    />
                                </div>
                            </div>
                            <div className="col-span-full my-2">
                                <label htmlFor="uudiem" className='block text-base font-bold'>Ưu điểm</label>

                                <div className="my-2">
                                    <input
                                        id="uudiem"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder='Ví dụ: Bữa trưa miễn phí'
                                    />
                                </div>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="street-address" className='block text-base font-bold'>Nhược điểm</label>

                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="street-address"
                                        id="street-address"
                                        autoComplete="street-address"
                                        className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder='Văn phòng thiếu cây xanh'
                                    />
                                </div>
                            </div>
                            <div className="col-span-full my-2">
                                <label htmlFor="a" className='block text-base font-bold'>Điều cần cải thiện</label>
                                <div className="mt-2">
                                    <textarea
                                        id="a"
                                        name="about"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={''}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='pb-8 my-3 border-b-2'>
                            <p className='font-bold text-xl'><AiOutlineUser className="inline-block mr-2" />Hãy cho chúng tôi biết về bạn</p>

                            <div className="col-span-full my-2">
                                <label htmlFor="" className='block text-base font-bold'>Chức danh công việc tại Bệnh viện đa khoa quốc tế thu cúc</label>

                                <div className="my-2">
                                    <input
                                        id=""
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder='Ví dụ: Nhân viên IT'
                                    />
                                </div>
                            </div>
                            <div className="col-span-full my-2">
                                <label htmlFor="" className='block text-base font-bold'>Khu vực làm việc tại Bệnh viện đa khoa quốc tế thu cúc</label>

                                <div className="my-2">
                                    <input
                                        id=""
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 p-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder='Ví dụ: Hà Nội'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500"
                            >
                                Hoàn thành
                            </button>
                        </div>
                    </form>

                </div>
                <div className="bg-white px-6 py-8 rounded-lg shadow-3xl grid grid-cols-1 gap-4 h-[480px]">
                    <p className="font-bold text-lg">Hướng dẫn và điều kiện đánh giá</p>
                    <p>Mọi đánh giá phải tuân thủ Hướng Dẫn & Điều Kiện về đánh giá để được hiển thị trên website.</p>
                    <p>Xin vui lòng:</p>
                    <p className="ml-8">- Không sử dụng từ ngữ mang ý xúc phạm, miệt thị</p>
                    <p className="ml-8">- Không cung cấp thông tin cá nhân</p>
                    <p className="ml-8">- Không cung cấp thông tin bảo mật, bí mật kinh doanh của công ty</p>
                    <p>Cảm ơn bạn đã đưa ra những đánh giá chân thực nhất. Xem thêm thông tin chi tiết về Hướng Dẫn & Điều Kiện về đánh giá</p>
                </div>
            </div>
        </div>
    )
}

export default Reviews