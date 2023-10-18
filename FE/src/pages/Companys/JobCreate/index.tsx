import React from 'react'
import { AiOutlineArrowRight, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom'
import Select from "react-select"
import makeAnimated from 'react-select/animated';

const JobCreate = () => {
    const makeAnimate = makeAnimated();
    const selectAreas = [
        { value: 'Hà Nội', label: 'Hà Nội' },
        { value: 'Hồ Chí Minh', label: 'Hồ Chí Minh' },
        { value: 'Hải Phòng', label: 'Hải Phòng' },
        { value: 'Thái Bình', label: 'Thái Bình' },
    ]
    return (
        <div className='mt-16 mx-10'>
            <p className='text-sm py-5'>
                <Link className='text-gray-600' to="/companys">Bảng tin</Link> /
                <Link className='text-gray-600' to={'#'}> Tin tuyển dụng</Link> /
                <span className='text-gray-400'> Thêm mới</span>
            </p>
            <form action="">
                <div className='border shadow p-5 text-sm'>
                    <h2 className='text-xl  font-semibold'>Thông tin cơ bản</h2>
                    <div >
                        <div className='mt-7'>
                            <label htmlFor="">Tiêu đề tuyển dụng <span className='text-red-500'>*</span></label>
                            <br />
                            <input
                                type="text"
                                className='border border-solid w-full text-sm outline-blue-500 px-5 py-2 rounded-md mt-2'
                                placeholder='Ví dụ: Tuyển thực tập sinh ReactJS'
                            />
                        </div>
                        <div className='my-5'>
                            <label htmlFor="">Ngành nghề <span className='text-red-500'>*</span></label>
                            <Select
                                closeMenuOnSelect={false}
                                components={makeAnimate}
                                isMulti
                                options={selectAreas}
                                className='mt-2'
                            />
                        </div>
                        <div className='my-5 grid grid-cols-2 gap-5'>
                            <div className=''>
                                <label htmlFor="" className=''>Tỉnh/Thành phố <span className='text-red-500'>*</span></label>
                                <Select className='mt-2' />
                            </div>
                            <div className=''>
                                <label htmlFor="" className=''>Quận/Huyện </label>
                                <Select className='mt-2' />
                            </div>
                        </div>
                        <div className='my-5 grid grid-cols-2 gap-5'>
                            <div className=''>
                                <label htmlFor="" className=''>Hình thức làm việc<span className='text-red-500'>*</span></label>
                                <Select className='mt-2' />
                            </div>
                            <div className=''>
                                <label htmlFor="" className=''>Cấp bậc <span className='text-red-500'>*</span></label>
                                <Select className='mt-2' />
                            </div>
                        </div>
                        <div className='my-5 grid grid-cols-2 gap-5'>
                            <div className=''>
                                <label htmlFor="" className=''>Số lượng<span className='text-red-500'>*</span></label>
                                <Select className='mt-2' />
                            </div>
                            <div className=''>
                                <label htmlFor="" className=''>Trình độ </label>
                                <Select className='mt-2' />
                            </div>
                        </div>
                        <div className='my-5 grid grid-cols-2 gap-5'>
                            <div className=''>
                                <label htmlFor="" className=''>Kinh nghiệm</label>
                                <Select className='mt-2' />
                            </div>
                            <div className=''>
                                <label htmlFor="" className=''>Giới tính</label>
                                <Select className='mt-2' />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border shadow  p-5 text-sm my-5'>
                    <h2 className='text-xl  font-semibold'>Mức lương</h2>
                    <p className='my-2 text-gray-400 text-base'>Mức lương nhập lên được tính bằng VND</p>
                    <div className='my-5 grid grid-cols-2 gap-5'>
                        <div className=''>
                            <label htmlFor="" className=''>Hình thức trả lương</label>
                            <Select className='mt-2' />
                        </div>
                        <div className=''>
                            <label htmlFor="" className=''>Loại mức lương</label>
                            <Select className='mt-2' />
                        </div>
                    </div>
                    <div className='my-5 grid grid-cols-2 gap-5'>
                        <div className=''>
                            <label htmlFor="" className=''>Mức lương</label>
                            <Select className='mt-2' />
                        </div>
                        <div className=''>
                            <label htmlFor="" className=''>Loại mức lương</label>
                            <Select className='mt-2' />
                        </div>
                    </div>
                </div>
                <div className='border shadow  p-5 text-sm my-5'>
                    <h2 className='text-xl  font-semibold'>Nội dung</h2>

                    <div className='my-5'>
                        <label htmlFor="" className=''>Mô tả công việc <span className='text-red-500'>*</span></label>  <br />
                        <textarea
                            name=""
                            id=""
                            rows="5"
                            placeholder='Nhập mô tả công việc'
                            className='w-full border border-solid outline-blue-500 rounded mt-2 px-5 py-1'></textarea>
                    </div>
                    <div className='my-5'>
                        <label htmlFor="" className=''>Yêu cầu công việc<span className='text-red-500'>*</span></label>  <br />
                        <textarea
                            name=""
                            id=""
                            rows="5"
                            placeholder='Nhập yêu cầu công việc'
                            className='w-full border border-solid outline-blue-500 rounded mt-2 px-5 py-1'></textarea>
                    </div>
                    <div className='my-5'>
                        <label htmlFor="" className=''>Quyền lợi<span className='text-red-500'>*</span></label>  <br />
                        <textarea
                            name=""
                            id=""
                            rows="5"
                            placeholder='Nhập quyền lợi'
                            className='w-full border border-solid outline-blue-500 rounded mt-2 px-5 py-1'></textarea>
                    </div>
                </div>
                <div className='border shadow  p-5 text-sm my-5'>
                    <h2 className='text-xl  font-semibold'>Thông tin liên hệ</h2>
                    <div className='my-5 grid grid-cols-2 gap-5'>
                        <div className=''>
                            <label htmlFor="">Họ và tên<span className='text-red-500'>*</span></label>
                            <br />
                            <input
                                type="text"
                                className='border border-solid w-full text-sm outline-blue-500 px-5 py-2 rounded-md mt-2'
                                placeholder='Ví dụ: Đinh Văn Thản'
                            />
                        </div>
                        <div className=''>
                            <label htmlFor="">Email liên hệ<span className='text-red-500'>*</span></label>
                            <br />
                            <input
                                type="text"
                                className='border border-solid w-full text-sm outline-blue-500 px-5 py-2 rounded-md mt-2'
                                placeholder='Ví dụ:exam@gmail.com'
                            />
                        </div>
                        <div className=''>
                            <label htmlFor="">Số điện thoại<span className='text-red-500'>*</span></label>
                            <br />
                            <input
                                type="text"
                                className='border border-solid w-full text-sm outline-blue-500 px-5 py-2 rounded-md mt-2'
                                placeholder='Ví dụ: 062222222'
                            />
                        </div>
                        <div className=''>
                            <label htmlFor="">Chức vụ<span className='text-red-500'>*</span></label>
                            <br />
                            <input
                                type="text"
                                className='border border-solid w-full text-sm outline-blue-500 px-5 py-2 rounded-md mt-2'
                                placeholder='Leader'
                            />
                        </div>
                    </div>
                </div>
                <div className='border shadow text-sm my-5 flex static justify-between p-2 items-center'>
                    <a href="" className='flex items-center gap-2  px-2 py-2 border bg-gray-100 rounded'><i className='text-lg'><AiOutlineEye /></i>  Xem trước giao diện</a>
                    <a href="" className='flex items-center gap-2  border border-solid px-3 py-2 rounded  text-white bg-blue-500 mr-5'>Tiếp tục <i><AiOutlineArrowRight /></i> </a>
                </div>

            </form>
        </div>
    )
}

export default JobCreate