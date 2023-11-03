import { IoAdd, IoCreateOutline } from "react-icons/io5"

const CreateCv = () => {


    return (
        <div className="max-w-4xl mx-auto border shadow  rounded py-3 px-7">
            <div>
                <h2 className="text-2xl my-2">Tạo cv trên hệ thống, tạo cơ hội nhận được việc làm !</h2>
                <p>Tạo CV trên hệ thống chúng tôi sẽ tăng 99% tìm được việc,</p>
                <p>hãy tạo ngay cho CV của mình nhé.</p>
            </div>
            <div>
                <div className="my-3 flex justify-between items-center">
                    <h2 className="text-xl">Thông tin cá nhân</h2>
                    <button className="text-xl text-blue-500">
                        <IoCreateOutline />
                    </button>
                </div>
                <hr className="text-xl mb-2 border-blue-500" />
                <div>
                    <p className="my-1"><span className="font-semibold text-sm">Họ tên : </span><span className="text-sm">Đinh Văn Thản</span></p>
                    <p className="my-1"><span className="font-semibold text-sm">Email : </span> <span className="text-sm">than@gmail.com</span></p>
                    <p className="my-1"><span className="font-semibold text-sm">Số điện thoại : </span> <span className="text-sm">0523892062</span></p>

                </div>
                <div className="my-3 flex justify-between items-center">
                    <h2 className="text-xl">Học vấn</h2>
                    <button className="text-xl text-blue-500">
                        <IoAdd />
                    </button>
                </div>
                <hr className="text-xl mb-2 border  border-blue-500" />

            </div>
        </div>
    )
}

export default CreateCv