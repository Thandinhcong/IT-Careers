
const FilterByLocation = () => {
    return (
        <div className="border border-gray-300 px-4 leading-9 text-gray-700">
            <h2 className="font-semibold text-gray-900">Việc làm toàn quốc</h2>
            <hr />
            <div className="grid grid-cols-1 ">
                <button className="hover:text-gray-900 text-left">Hà Nội</button>
                <button className="hover:text-gray-900 text-left">Hồ Chí Minh</button>
                <button className="hover:text-gray-900 text-left">Hải Phòng</button>
                <button className="hover:text-gray-900 text-left">Cần thơ</button>
                <button className="hover:text-gray-900 text-left">Bắc Ninh</button>
                <button className="hover:text-gray-900 text-left">Vĩnh Phúc</button>
                <button className="hover:text-gray-900 text-left">Bình Dương</button>
                <button className="hover:text-gray-900 text-left">Đồng Nai</button>
                <button className="hover:text-gray-900 text-left">Hưng yên</button>
            </div>
        </div>
    )
}

export default FilterByLocation