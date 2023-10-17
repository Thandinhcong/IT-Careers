import { AiOutlineInsertRowRight, AiOutlineUser } from "react-icons/ai"


const TabInfor = () => {
    return (
        <div className="p-3 h-[550px] overflow-y-auto">
            <h2 className="font-semibold text-lg my-4">Thông tin nhà tuyển dụng</h2>
            <div className="flex gap-4">
                <img
                    className="w-16 h-16 border-2 rounded-full"
                    src="https://cdn1.123job.vn/123job/uploads/2023/10/01/2023_10_01______1843bd84f5554feda615d01cd2126ba0.jpg" alt="" />
                <div className="leading-8">
                    <p className="font-semibold">CÔNG TY TNHH DICH VẬN TẢI MIỀN BẮC</p>
                    <p><AiOutlineUser className="inline-block" /> Quy mô: 500-1000 nhân sự</p>
                    <p><AiOutlineInsertRowRight className="inline-block" /> Trụ sở: <span className="uppercase">hà nội</span></p>
                </div>
            </div>
            <h3 className="font-semibold my-2">Giới thiệu</h3>
            <p className="uppercase">CÔNG TY TNHH DICH VẬN TẢI MIỀN BẮC</p>
        </div>
    )
}

export default TabInfor