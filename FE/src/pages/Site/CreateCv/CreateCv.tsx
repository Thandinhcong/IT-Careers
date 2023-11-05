import { useState } from "react"
import { IoAdd, IoCreateOutline } from "react-icons/io5"

const CreateCv = () => {
    const [showPersonalForm, setShowPersonalForm] = useState(false);
    const [showEducationForm, setShowEducationForm] = useState(false);
    const [showExperienceForm, setShowExperienceForm] = useState(false);
    const togglePersonalForm = () => {
        setShowPersonalForm(!showPersonalForm);
    };

    const toggleEducationForm = () => {
        setShowEducationForm(!showEducationForm);
    };

    const toggleExperienceForm = () => {
        setShowExperienceForm(!showExperienceForm);
    };

    const addEducationForm = () => {
        setShowEducationForm(true);
    };

    const addExperienceForm = () => {
        setShowExperienceForm(true);
    };
    return (
        <div className="max-w-4xl mx-auto border shadow  rounded py-3 px-7">
            <div>
                <h2 className="text-2xl my-2">Tạo cv trên hệ thống, tạo cơ hội nhận được việc làm !</h2>
                <p>Tạo CV trên hệ thống chúng tôi sẽ tăng 99% tìm được việc,</p>
                <p>hãy tạo ngay cho CV của mình nhé.</p>
            </div>
            {/* Thông tin cá nhân  */}
            <div>
                <div className="my-3 flex justify-between items-center">
                    <h2 className="text-xl">Thông tin cá nhân</h2>
                    <button
                        onClick={togglePersonalForm}
                        className="text-xl text-blue-500"
                    >
                        <IoCreateOutline />
                    </button>
                </div>
                {showPersonalForm && (
                    <form action="" className="border p-2">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label htmlFor="" className="">Họ tên</label> <br />
                                <input type="text" className="border outline-none rounded w-full px-2 py-1 text-sm my-2" />
                            </div>
                            <div>
                                <label htmlFor="" className="">Địa chỉ</label> <br />
                                <input type="text" className="border outline-none rounded w-full px-2 py-1 text-sm my-2" />
                            </div>
                            <div>
                                <label htmlFor="" className="">Số điện thoại</label> <br />
                                <input type="text" className="border outline-none rounded w-full px-2 py-1 text-sm my-2" />
                            </div>
                            <div>
                                <label htmlFor="" className="">Email</label> <br />
                                <input type="text" className="border outline-none rounded w-full px-2 py-1 text-sm my-2" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="" className="">Chuyên ngành</label> <br />
                            <input type="text" className="border outline-none rounded w-full px-2 py-1 text-sm my-2" />
                        </div>
                        <div>
                            <label htmlFor="">Giới thiệu chung</label> <br />
                            <textarea name="" id="" className="w-full outline-none border rounded p-2 text-sm">

                            </textarea>
                            <i className="text-xs text-blue-500">Gợi ý: giới thiệu số năm kinh nghiệm và mục tiêu bản thân</i>
                        </div>
                        <div className="my-2">
                            <button className="text-white px-2 py-1 bg-blue-500 mr-2  rounded">Lưu</button>
                            <button
                                onClick={togglePersonalForm}
                                className="text-white px-2 py-1 bg-yellow-500 rounded"
                            >Hủy</button>
                        </div>
                    </form>

                )}
                <hr className="text-xl mb-2 border-blue-500" />
                <div>
                    <p className="my-1"><span className="font-semibold text-sm">Họ tên : </span><span className="text-sm">Đinh Văn Thản</span></p>
                    <p className="my-1"><span className="font-semibold text-sm">Email : </span> <span className="text-sm">than@gmail.com</span></p>
                    <p className="my-1"><span className="font-semibold text-sm">Số điện thoại : </span> <span className="text-sm">0523892062</span></p>
                </div>

                {/* học vấn */}
                <div className="my-3 flex justify-between items-center">
                    <h2 className="text-xl">Học vấn</h2>
                    <button
                        onClick={addEducationForm}
                        className="text-xl text-blue-500"
                    >
                        <IoAdd />
                    </button>
                </div>
                <hr className="text-xl mb-2 border  border-blue-500" />
                {showEducationForm && (
                    <form className="border p-2 border-blue-500 rounded my-2">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label htmlFor="" className="">Tên trường</label> <br />
                                <input type="text" className="border outline-none rounded w-full px-2 py-1 text-sm my-2" />
                            </div>
                            <div>
                                <label htmlFor="" className="">Chuyên ngành</label> <br />
                                <input type="text" className="border outline-none rounded w-full px-2 py-1 text-sm my-2" />
                            </div>
                            <div>
                                <label htmlFor="" className="">Ngày bắt đầu</label> <br />
                                <input type="date" className="border outline-none rounded w-full px-2 py-1 text-sm my-2" />
                            </div>
                            <div>
                                <label htmlFor="" className="">Ngày kết thúc</label> <br />
                                <input type="date" className="border outline-none rounded w-full px-2 py-1 text-sm my-2" />
                            </div>
                            <div>
                                <label htmlFor="" className="">Điểm trung bình</label> <br />
                                <input type="text" className="border outline-none rounded w-full px-2 py-1 text-sm my-2" />
                            </div>
                            <div>
                                <label htmlFor="" className="">Loại bằng</label> <br />
                                <input type="text" className="border outline-none rounded w-full px-2 py-1 text-sm my-2" />
                                <i className="text-xs text-blue-500">VD : Bằng đại học , cao đẳng</i>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="">Mô tả học vấn </label> <br />
                            <textarea name="" id="" className="w-full outline-none border rounded p-2 text-sm">
                            </textarea>
                            <i className="text-xs text-blue-500">Gợi ý: mô tả ngành học và kiến thức</i>
                        </div>
                        <div className="my-2">
                            <button className="text-white px-2 py-1 bg-blue-500 mr-2  rounded">Lưu</button>
                            <button
                                onClick={toggleEducationForm}
                                className="text-white px-2 py-1 bg-yellow-500 rounded"
                            >Hủy</button>
                        </div>
                    </form>
                )}
                {/* Kinh nghiệm làm việc */}
                <div>
                    <div className="my-3 flex justify-between items-center">
                        <h2 className="text-xl">Kinh nghiệm làm việc</h2>
                        <button
                            onClick={addExperienceForm}
                            className="text-xl text-blue-500"
                        >
                            <IoAdd />
                        </button>
                    </div>
                    <hr className="text-xl mb-2 border  border-blue-500" />
                    {showExperienceForm && (
                        <form className=" border  rounded border-blue-500 p-2">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label htmlFor="" className="">Tên công ty</label> <br />
                                    <input type="text" className="border outline-none rounded w-full px-2 py-1 text-sm my-2" placeholder="Tên công ty..." />
                                </div>
                                <div>
                                    <label htmlFor="" className="">Vị trí</label> <br />
                                    <input type="text" className="border outline-none rounded w-full px-2 py-1 text-sm my-2" placeholder="Vị trí..." />
                                </div>

                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label htmlFor="" className="">Ngày bắt đầu</label> <br />
                                    <input type="date" className="border outline-none rounded w-full px-2 py-1 text-sm my-2" />
                                </div>
                                <div>
                                    <label htmlFor="" className="">Ngày kết thúc</label> <br />
                                    <input type="date" className="border outline-none rounded w-full px-2 py-1 text-sm my-2" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="">Mô tả</label> <br />
                                <textarea name="" id="" className="w-full outline-none border rounded p-2 text-sm">

                                </textarea>
                                <i className="text-xs text-blue-500">Gợi ý: mô tả công việc cụ thể, những kết quả và thành tựu đạt được có số liệu dẫn chứng</i>
                            </div>
                            <div className="my-2">
                                <button className="text-white px-2 py-1 bg-blue-500 mr-2  rounded">Lưu</button>
                                <button
                                    onClick={toggleExperienceForm}
                                    className="text-white px-2 py-1 bg-yellow-500 rounded"
                                >Hủy</button>
                            </div>
                        </form>
                    )}
                    {/* dự án  */}
                    <div className="my-3 flex justify-between items-center">
                        <h2 className="text-xl">Dự án</h2>
                        <button className="text-xl text-blue-500">
                            <IoAdd />
                        </button>
                    </div>
                    <hr className="text-xl mb-2 border  border-blue-500" />
                    <div className=" border  rounded border-blue-500 p-2 my-2">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label htmlFor="" className="">Tên dự án</label> <br />
                                <input type="text" className="border outline-none rounded w-full px-2 py-1 text-sm my-2" placeholder="Dự án của bạn..." />
                            </div>
                            <div>
                                <label htmlFor="" className="">Vị trí trong dự án</label> <br />
                                <input type="text" className="border outline-none rounded w-full px-2 py-1 text-sm my-2" placeholder="Chuyên ngành của bạn..." />
                            </div>

                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label htmlFor="" className="">Ngày bắt đầu</label> <br />
                                <input type="date" className="border outline-none rounded w-full px-2 py-1 text-sm my-2" placeholder="Chuyên ngành của bạn..." />
                            </div>
                            <div>
                                <label htmlFor="" className="">Ngày kết thúc</label> <br />
                                <input type="date" className="border outline-none rounded w-full px-2 py-1 text-sm my-2" placeholder="Chuyên ngành của bạn..." />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="">Mô tả</label> <br />
                            <textarea name="" id="" className="w-full outline-none border rounded p-2 text-sm">
                            </textarea>

                        </div>
                        <div>
                            <label htmlFor="">Nội dung</label> <br />
                            <textarea name="" id="" className="w-full outline-none border rounded p-2 text-sm">
                            </textarea>
                            <i className="text-xs text-blue-500">Gợi ý: mô tả công việc cụ thể, những kết quả và thành tựu đạt được có số liệu dẫn chứng</i>
                        </div>
                    </div>

                </div>
                {/* ky nang */}
            </div>
            <div className="mx-auto flex justify-center my-2">
                <button className=" bg-blue-500 text-white px-5 rounded  py-2">Tạo CV</button>
            </div>
        </div>
    )
}

export default CreateCv