import { AiOutlineArrowDown, AiOutlineCheck, AiOutlineClose, AiOutlineStar } from "react-icons/ai"


const TabsFeedback = () => {
    return (
        <div className="text-gray-700">
            <p className="text-xl font-bold">Đánh giá bệnh viện đa khoa quốc tế thu cúc</p>
            <div className="bg-gray-50 p-4 border border-gray-100 rounded-lg my-5">
                <p className="font-bold text-lg my-2">Sắp xếp theo</p>
                <span className="grid grid-cols-3 w-1/3 text-center border-2 rounded-lg h-12 text-blue-500">
                    <button className="hover:bg-blue-500 hover:text-white rounded-l-lg">Hữu ích <AiOutlineArrowDown className="inline-block" /></button>
                    <button className="border border-x-2 border-y-0 hover:bg-blue-500 hover:text-white">Ngày <AiOutlineArrowDown className="inline-block" /></button>
                    <button className="hover:bg-blue-500 hover:text-white rounded-r-lg">Xếp hạng <AiOutlineArrowDown className="inline-block" /></button>
                </span>
            </div>
            <p>Bệnh viện đa khoa quốc tế thu cúc có <span className="font-bold">4</span> reviews</p>
            <div className="grid grid-cols-1 gap-6 max-w-screen-md ml-10">
                <div className="flex justify-start items-start border-b-2 gap-4">
                    <div className="flex flex-col w-20 text-center">
                        <p className="font-bold text-2xl">3.0</p>
                        <p className="border border-dashed border-gray-400 w-2/3 mx-auto my-2"></p>
                        <p className="flex text-[#9d2b6b]">
                            <AiOutlineStar />
                            <AiOutlineStar />
                            <AiOutlineStar />
                            <AiOutlineStar />
                            <AiOutlineStar />
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mb-6">
                        <div>
                            <p className="text-xl font-bold">Nơi làm việc mang lại nhiều kinh nghiệm và trải nghiệm</p>
                            <p>Quản lý kinh doanh/ Trợ lý Phó Giám đốc điều hành - Hà Nội - 4 năm trước</p>
                        </div>
                        <div>
                            <p className="font-bold"><AiOutlineCheck className="inline-block text-green-500 mr-1" />Ưu điểm</p>
                            <p>Môi trường nhân văn, chế độ đãi ngộ tốt</p>
                        </div>
                        <div>
                            <p className="font-bold"><AiOutlineClose className="inline-block text-red-500 mr-1" />Nhược điểm</p>
                            <p>Môi trường nhân văn, chế độ đãi ngộ tốt</p>
                        </div>
                        <div>
                            <p className="text-sm mb-2">Đánh giá này có hữu ích không?</p>
                            <p className="flex gap-4">
                                <button className="bg-gray-200 py-1 px-4 rounded-md hover:bg-gray-400 ">Có  4</button>
                                <button className="bg-gray-200 py-1 px-4 rounded-md">Không  4</button>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start items-start border-b-2 gap-4">
                    <div className="flex flex-col w-20 text-center">
                        <p className="font-bold text-2xl">3.0</p>
                        <p className="border border-dashed border-gray-400 w-2/3 mx-auto my-2"></p>
                        <p className="flex text-[#9d2b6b]">
                            <AiOutlineStar />
                            <AiOutlineStar />
                            <AiOutlineStar />
                            <AiOutlineStar />
                            <AiOutlineStar />
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mb-6">
                        <div>
                            <p className="text-xl font-bold">Nơi làm việc mang lại nhiều kinh nghiệm và trải nghiệm</p>
                            <p>Quản lý kinh doanh/ Trợ lý Phó Giám đốc điều hành - Hà Nội - 4 năm trước</p>
                        </div>
                        <div>
                            <p className="font-bold"><AiOutlineCheck className="inline-block text-green-500 mr-1" />Ưu điểm</p>
                            <p>Môi trường nhân văn, chế độ đãi ngộ tốt</p>
                        </div>
                        <div>
                            <p className="font-bold"><AiOutlineClose className="inline-block text-red-500 mr-1" />Nhược điểm</p>
                            <p>Môi trường nhân văn, chế độ đãi ngộ tốt</p>
                        </div>
                        <div>
                            <p className="text-sm mb-2">Đánh giá này có hữu ích không?</p>
                            <p className="flex gap-4">
                                <button className="bg-gray-200 py-1 px-4 rounded-md hover:bg-gray-400 ">Có  4</button>
                                <button className="bg-gray-200 py-1 px-4 rounded-md">Không  4</button>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start items-start border-b-2 gap-4">
                    <div className="flex flex-col w-20 text-center">
                        <p className="font-bold text-2xl">3.0</p>
                        <p className="border border-dashed border-gray-400 w-2/3 mx-auto my-2"></p>
                        <p className="flex text-[#9d2b6b]">
                            <AiOutlineStar />
                            <AiOutlineStar />
                            <AiOutlineStar />
                            <AiOutlineStar />
                            <AiOutlineStar />
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mb-6">
                        <div>
                            <p className="text-xl font-bold">Nơi làm việc mang lại nhiều kinh nghiệm và trải nghiệm</p>
                            <p>Quản lý kinh doanh/ Trợ lý Phó Giám đốc điều hành - Hà Nội - 4 năm trước</p>
                        </div>
                        <div>
                            <p className="font-bold"><AiOutlineCheck className="inline-block text-green-500 mr-1" />Ưu điểm</p>
                            <p>Môi trường nhân văn, chế độ đãi ngộ tốt</p>
                        </div>
                        <div>
                            <p className="font-bold"><AiOutlineClose className="inline-block text-red-500 mr-1" />Nhược điểm</p>
                            <p>Môi trường nhân văn, chế độ đãi ngộ tốt</p>
                        </div>
                        <div>
                            <p className="text-sm mb-2">Đánh giá này có hữu ích không?</p>
                            <p className="flex gap-4">
                                <button className="bg-gray-200 py-1 px-4 rounded-md hover:bg-gray-400 ">Có  4</button>
                                <button className="bg-gray-200 py-1 px-4 rounded-md">Không  4</button>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start items-start border-b-2 gap-4">
                    <div className="flex flex-col w-20 text-center">
                        <p className="font-bold text-2xl">3.0</p>
                        <p className="border border-dashed border-gray-400 w-2/3 mx-auto my-2"></p>
                        <p className="flex text-[#9d2b6b]">
                            <AiOutlineStar />
                            <AiOutlineStar />
                            <AiOutlineStar />
                            <AiOutlineStar />
                            <AiOutlineStar />
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mb-6">
                        <div>
                            <p className="text-xl font-bold">Nơi làm việc mang lại nhiều kinh nghiệm và trải nghiệm</p>
                            <p>Quản lý kinh doanh/ Trợ lý Phó Giám đốc điều hành - Hà Nội - 4 năm trước</p>
                        </div>
                        <div>
                            <p className="font-bold"><AiOutlineCheck className="inline-block text-green-500 mr-1" />Ưu điểm</p>
                            <p>Môi trường nhân văn, chế độ đãi ngộ tốt</p>
                        </div>
                        <div>
                            <p className="font-bold"><AiOutlineClose className="inline-block text-red-500 mr-1" />Nhược điểm</p>
                            <p>Môi trường nhân văn, chế độ đãi ngộ tốt</p>
                        </div>
                        <div>
                            <p className="text-sm mb-2">Đánh giá này có hữu ích không?</p>
                            <p className="flex gap-4">
                                <button className="bg-gray-200 py-1 px-4 rounded-md hover:bg-gray-400 ">Có  4</button>
                                <button className="bg-gray-200 py-1 px-4 rounded-md">Không  4</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TabsFeedback