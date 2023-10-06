import { useState } from "react";
import { AiOutlineCalendar, AiOutlineEdit, AiOutlineEye, AiOutlineMail, AiOutlinePhone, AiOutlineSetting } from "react-icons/ai"

const MainCvApply = () => {
    const [currentStatus, setCurrentStatus] = useState(false);

    const handleStatusChange = () => {
        setCurrentStatus(!currentStatus);
    };

    const statusClass = currentStatus ? 'bg-[#e9ebee] text-[#364a63] p-1' : 'bg-[#fceceb] text-[#e85347]';
    return (
        <div className="flex justify-between my-4 p-2 items-center border-b-2">
            <div>
                <img
                    className="w-20 rounded-full border border-gray-400 p-1"
                    src="https://cdn1.123job.vn/123job/uploads/2023/10/06/2023_10_06______622e2e506d59c1af0f1a16739bcc252d.png" alt="" />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <p className="font-semibold text-base">Nguyễn Văn Dũng</p>
                <p className="flex items-center">
                    <p className="flex items-center gap-1"><AiOutlinePhone /><span>0983442815</span> </p>
                    <p className="border-gray-500 border-x-2 mx-1 px-2 flex items-center gap-1">
                        <AiOutlineMail />
                        <span>nguyendung031201@gmail.com</span>
                    </p>
                    <p className="flex items-center gap-1"><AiOutlineCalendar /> <span>Tuyển thực tập sinh ReactJS</span></p>
                </p>
                <div className="flex justify-between items-center mb-3">
                    <p className="grid grid-cols-1 gap-3">
                        <p>Mã ứng viên</p>
                        <p>1491771</p>
                    </p>
                    <p className="grid grid-cols-1 gap-3">
                        <p>Ngày ứng tuyển</p>
                        <p>2023/10/06 11:41:08</p>
                    </p>
                    <p className="grid grid-cols-1 gap-3">
                        <p>Trạng thái</p>
                        <p onClick={handleStatusChange} className={`p-1 rounded text-xs text-center ${statusClass}`}>
                            {currentStatus ? 'đã xem' : 'chưa xem'}
                        </p>
                    </p>
                    <p className="grid grid-cols-1 gap-3">
                        <p>Vòng hồ sơ</p>
                        <p className="p-1 rounded text-xs text-center bg-[#e4f8fb] text-[#09c2de]">phỏng vấn</p>
                    </p>
                </div>
            </div>
            <div className="flex gap-1 text-gray-700">
                <button className="flex items-center bg-[#f5f6fa] px-3 py-1 border border-[#dbdfea] rounded-sm"><AiOutlineEye /><span>Chi tiết</span></button>
                <button className="flex items-center bg-[#f5f6fa] px-3 py-1 border border-[#dbdfea] rounded-sm"><AiOutlineEdit /><span> Đánh giá</span></button>
                <button className="flex items-center bg-[#f5f6fa] px-3 py-1 border border-[#dbdfea] rounded-sm"><AiOutlineSetting /><span> Thao tác</span></button>
            </div>
        </div>
    )
}

export default MainCvApply