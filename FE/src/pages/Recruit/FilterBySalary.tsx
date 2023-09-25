
const FilterBySalary = () => {
    return (
        <div className="border border-gray-300 px-4 leading-9 text-gray-700 my-4">
            <h2 className="font-semibold text-gray-900">Lọc theo mức lương</h2>
            <hr />
            <div className="grid grid-cols-1 ">
                <button className="hover:text-gray-900 text-left">Dưới 1 triệu</button>
                <button className="hover:text-gray-900 text-left">1-3 triệu</button>
                <button className="hover:text-gray-900 text-left">3 - 5 triệu</button>
                <button className="hover:text-gray-900 text-left">5 - 7 triệu</button>
                <button className="hover:text-gray-900 text-left">7 - 10 triệu</button>
                <button className="hover:text-gray-900 text-left">10 - 15 triệu</button>
                <button className="hover:text-gray-900 text-left">15 - 20 triệu</button>
                <button className="hover:text-gray-900 text-left">20 - 25 triệu</button>
                <button className="hover:text-gray-900 text-left">25 - 30 triệu</button>
                <button className="hover:text-gray-900 text-left">30 - 40 triệu</button>
                <button className="hover:text-gray-900 text-left">40 - 50 triệu</button>
                <button className="hover:text-gray-900 text-left">Trên 50 triệu</button>
            </div>
        </div>
    )
}

export default FilterBySalary