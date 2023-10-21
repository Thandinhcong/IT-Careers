import React, { useEffect, useRef } from 'react';
import { AiOutlineMail, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai'
import { BsCalendar2Date, BsInfoCircle } from 'react-icons/bs'
import { IoLocationOutline } from 'react-icons/io5'
import "./index.css";

const CreateCv = () => {
    const editableRef = useRef<HTMLDivElement | null>(null);

    const handleInput = () => {
        if (editableRef.current) {
            const content = editableRef.current.textContent || '';
            const sanitizedContent = content.replace(/\n/g, ''); // Loại bỏ xuống dòng
            editableRef.current.textContent = sanitizedContent;
        }
    };


    return (
        <div className='grid grid-cols-[65%,30%] gap-6 w-full   mx-5 max-w-7xl overflow-x-hidden  ' >
            <div>
                <div className='text-center text-2xl border px-2 py-2 outline-none my-2 custom-border w-full' contentEditable="true">Untitled CV</div>
                <div className='bg-green-200 py-10 px-2'>
                    <h1
                        className='text-4xl outline-none custom-border w-full'
                        contentEditable="true"
                        onInput={handleInput}
                        ref={editableRef}
                    >ĐINH VĂN THẢN</h1>
                    <h1
                        className='text-xl py-3 outline-none custom-border w-full'
                        contentEditable="true"
                        onInput={handleInput}
                        ref={editableRef}
                    >FRONT-END DEVELOPER</h1>
                </div>
                <div className='px-2 my-5 grid grid-cols-[40%,58%] gap-3 border py-2'>
                    <div>
                        <div>
                            <div className='flex gap-2 items-center my-2 '>
                                <BsCalendar2Date />
                                <p contentEditable="true" className="custom-border w-full outline-none ">08/2019</p>

                            </div>
                            <div className='flex gap-2 items-center my-2'>
                                <AiOutlineUser />
                                <p className='text-sm outline-none custom-border w-full' contentEditable="true">Nam</p>
                            </div>
                            <div className='flex gap-2 items-center my-2'>
                                <AiOutlinePhone />
                                <p className='text-sm outline-none custom-border w-full' contentEditable="true">0523892023</p>
                            </div>
                            <div className='flex gap-2 items-center my-2'>
                                <AiOutlineMail />
                                <p className='text-sm outline-none custom-border w-full' contentEditable="true">thandv03@gmail.com</p>
                            </div>
                            <div className='flex gap-2 items-center my-2'>
                                <IoLocationOutline />
                                <p className='text-sm outline-none custom-border w-full' contentEditable="true">HA NOI-VIET NAM</p>
                            </div>
                            <div className='flex gap-2 items-center my-2'>
                                <BsInfoCircle />
                                <p className='text-sm outline-none custom-border w-full' contentEditable="true">facebook.com/join.smith</p>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-xl outline-none my-5 font-semibold border-b' >MỤC TIÊU NGHỀ NGHIỆP</h1>
                            <p className='outline-none text-sm custom-border w-full ' contentEditable="true">Là một người điềm tĩnh, thích ứng nhanh với môi trường mới, không ngại khó khăn, hứng thú trong việc tìm ra hướng giải quyết cho vấn đề.</p>
                        </div>
                        <div>
                            <h1 className='text-xl outline-none my-5 font-semibold  border-b' >Kỹ năng</h1>
                            <p className='outline-none custom-border w-full' contentEditable="true">Word, excel, Javascript</p>
                        </div>
                        <div>
                            <h1 className='text-xl outline-none my-5 font-semibold' >Sở thích</h1>
                            <p className='outline-none custom-border w-full' contentEditable="true">-Đá bóng</p>

                        </div>
                        <div>
                            <h1 className='text-xl outline-none my-5 font-semibold  border-b' contentEditable="false">GIẢI THƯỞNG</h1>
                            <p className='outline-none' contentEditable="true">Nhân viên xuất sắc năm công ty </p>
                        </div>
                        <div>
                            <h1 className='text-xl outline-none my-5 font-semibold  border-b' contentEditable="false">CHỨNG CHỈ</h1>
                            <p className='outline-none custom-border w-full' contentEditable="true">Vô địch cuộc thi blockchain </p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>
                                <h1 className='text-xl outline-none mb-3 font-semibold  border-b' >HỌC VẤN</h1>
                                <h1 className='text-lg outline-none font-semibold  custom-border w-full' contentEditable="true">ĐẠI HỌC RMIT</h1>
                                <p className='outline-none my-1 custom-border w-full' contentEditable="true">Chuyên ngành: Công nghệ thông tin</p>
                                <p className='outline-none custom-border w-full' contentEditable="true">Tốt nghiệp loại giỏi, điêm trung bình 9.5</p>

                            </div>
                            <div>
                                <div className='my-2'>
                                    <h1 className='text-xl outline-none my-5 font-semibold border-b' contentEditable="true">KINH NGHIỆM LÀM VIỆC</h1>
                                    <div className='flex justify-between items-center '>
                                        <p className='outline-none font-semibold' contentEditable="true">Công ty FPT Software</p>
                                        <div className='flex gap-2 text-xs mr-2 '>
                                            <p className='custom-border w-full' contentEditable="true">06/2019</p> -
                                            <p className='custom-border w-full' contentEditable="true">08/2019</p>
                                        </div>
                                    </div>
                                    <p className='my-2 custom-border w-full outline-none' contentEditable="true">Project Manager</p>
                                    <p className='outline-none text-sm custom-border w-full' contentEditable="true">Là một người điềm tĩnh, thích ứng nhanh với môi trường mới, không ngại khó khăn, hứng thú trong việc tìm ra hướng giải quyết cho vấn đề.</p>
                                    <div className='flex justify-between items-center my-2'>
                                        <p className='outline-none font-semibold custom-border w-full' contentEditable="true">Công ty FPT Software</p>
                                        <div className='flex gap-2 text-xs mr-2  '>
                                            <p className="custom-border w-full" contentEditable="true">06/2019</p> -
                                            <p className="custom-border w-full" contentEditable="true">08/2019</p>
                                        </div>
                                    </div>
                                    <p className='my-2 custom-border w-full'>Project Manager</p>
                                    <p className='outline-none text-sm custom-border w-full' contentEditable="true">Là một người điềm tĩnh, thích ứng nhanh với môi trường mới, không ngại khó khăn, hứng thú trong việc tìm ra hướng giải quyết cho vấn đề.</p>


                                </div>

                            </div>
                            <div>
                                <h1 className='text-xl outline-none my-5 font-semibold  ' contentEditable="false">HOẠT ĐỘNG</h1>
                                <h1 className='text-lg outline-none font-semibold  ' contentEditable="true">TÌNH NGUYỆN 123</h1>
                                <p className='outline-none custom-border w-full' contentEditable="true">-Đá bóng</p>
                                <p className='outline-none custom-border w-full' contentEditable="true">-Đá bóng</p>
                            </div>
                            <div>
                                <h1 className='text-xl outline-none my-5 font-semibold  border-b' contentEditable="false">CHỨNG CHỈ</h1>

                                <div className='flex justify-between items-center my-2'>
                                    <p className='outline-none custom-border w-full' contentEditable="true">Project Manager</p>
                                    <div className='flex gap-2 text-xs mr-2 '>
                                        <p className='custom-border w-full' contentEditable="true">08/2019</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h1 className='text-xl outline-none my-5  border-b fon' contentEditable="false">THÔNG TIN THÊM</h1>
                                <p className='outline-none custom-border w-full' contentEditable="true">Điền thông tin khác nếu có </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2 className='text-2xl my-5 '>Tiêu đề CV</h2>
                <p className='my-3'>- Viết tên CV để dễ dàng quản lý các CV của bạn.</p>
                <p className='my-3'>- Tiêu đề này không hiển thị ra khi gửi CV cho nhà tuyển dung.</p>
                <hr className='mt-5 mb-2' />
                <p>Nếu xảy ra lỗi. Vui lòng liên hệ: <br />
                    Email: contact@123job.vn <br />
                    Zalo/Phone: 0378.949.988 (Bích)</p>
            </div>
        </div >
    )
}

export default CreateCv