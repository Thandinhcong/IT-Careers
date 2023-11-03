import { Radio } from "antd"
import { AiOutlineFilter, AiOutlineReload } from "react-icons/ai"
import MainCvApply from "./MainCvApply"

const CVApply = () => {
    return (
        <div className="bg-gray-50 text-sm text-gray-500">
            <div className="max-w-screen-lg mx-auto py-4">
                <div className="flex items-center gap-5">
                    <select
                        className="appearance-none border border-gray-300 rounded px-4 py-1.5 w-1/4 focus:outline-none focus:border-blue-500 focus:shadow my-6"
                    >
                        <option value="">Trạng thái</option>
                        <option value="SRV">Phù hợp</option>
                        <option value="AK">Không phù hợp</option>
                    </select>
                    <div className="flex items-center gap-2">
                        <button className="bg-blue-600 text-white flex items-center rounded py-1.5 px-5"><AiOutlineFilter className="text-lg" /><p>Lọc</p></button>
                        <button className="bg-[#eaebee] text-gray-500 flex items-center rounded py-1.5 px-5"><AiOutlineReload /><p>Xóa lọc</p></button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <p>Tìm thấy <span className="font-semibold">5</span> ứng viên</p>
                    <div className="flex items-center gap-3">
                        <p>Ưu tiên sắp xếp:</p>
                        <Radio.Group name="radiogroup" defaultValue={1}>
                            <Radio value={1}>Hiển thị CV mới nhất</Radio>
                            <Radio value={2}>Hiển thị CV chưa xem</Radio>
                        </Radio.Group>
                    </div>
                </div>
                <div className="bg-white my-4 p-4 grid-cols-1">
                    <MainCvApply />
                </div>
            </div>

        </div>
    )
}

export default CVApply