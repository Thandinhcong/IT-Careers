import { BsSearch } from 'react-icons/bs';
import { Select } from 'antd';
import { MdRoom } from 'react-icons/md';
import { IJobPost } from '../../../interfaces';
import { useGetJobPostSelectByIdQuery, useSearchQuery } from '../../../api/searchApi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const customIcon = <MdRoom size={20} />;

const SearchJobs = ({ onSearchDataChange }: any) => {
    const navigate = useNavigate()
    const { data } = useGetJobPostSelectByIdQuery();
    const [searchValue, setSearchValue] = useState('');
    const [provinceValue, setProvinceValue] = useState(undefined);
    const searchQuery = useSearchQuery({ search: searchValue, province: provinceValue });

    const handleSearchInputChange = (event: any) => {
        setSearchValue(event.target.value);
    };

    const handleProvinceSelectChange = (value: any) => {
        setProvinceValue(value);
    };

    const handleSearchButtonClick = async () => {
        if (searchQuery.data) {
            // Thực hiện chuyển hướng sang trang recruit và truyền dữ liệu tìm kiếm
            navigate("/recruit", { state: { searchData: searchQuery.data } });
            // Gọi hàm callback để thông báo về dữ liệu tìm kiếm cho component cha
            onSearchDataChange(searchQuery?.data);
        }
    };

    return (
        <form className="lg:flex items-center gap-2 my-5">
            <div className="border rounded-md bg-white justify-between px-2 my-7 flex items-center lg:py-3 py-2">
                <label htmlFor="search" className="lg:pl-4 pl-2">
                    Tìm kiếm
                </label>
                <input
                    type="text"
                    className="outline-none ml-3 lg:w-[350px]"
                    placeholder="Chức danh, từ khóa hoặc công ty"
                    value={searchValue}
                    onChange={handleSearchInputChange}
                />
                <span className="pr-5">
                    <BsSearch />
                </span>
            </div>
            <Select
                placeholder="Chọn địa chỉ"
                className='w-[400px] h-[50px] border-none'
                suffixIcon={customIcon}
                value={provinceValue}
                onChange={handleProvinceSelectChange}
            >
                {data?.data?.province_id.map((options: IJobPost) => (
                    <Select.Option key={options.id} value={options.id}>
                        {options.province}
                    </Select.Option>
                ))}
            </Select>
            <button
                className="bg-blue-600 px-10 lg:my-7 lg:ml-2 rounded-full text-white font-semibold w-full lg:w-auto py-3"
                type="button"
                onClick={handleSearchButtonClick}
            >
                Tìm việc
            </button>
        </form>
    );
};

export default SearchJobs;
