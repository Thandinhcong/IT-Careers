import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Form, Select } from 'antd';
import { MdRoom } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { IJobPost } from '../../../interfaces';
import { useGetJobPostSelectByIdQuery } from '../../../api/searchApi';

const SearchJobs = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [province, setProvince] = useState("");
    const [searchError, setSearchError] = useState("");
    const searchParams = new URLSearchParams(location.search) as any;
    const search = searchParams.get("search");
    const { data: searchData } = useGetJobPostSelectByIdQuery();
    const [filteredWorks, setFilteredWorks] = useState([]);
    const [noResults, setNoResults] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log(searchData); // Check API data
                const filtered = searchData?.data?.filter((item: any) => {
                    // Log item.province
                    console.log("Item Province:", item.province);

                    return (
                        item.title.toLowerCase().includes(search.toLowerCase()) ||
                        item.province.includes(province) && item.title.toLowerCase().includes(search.toLowerCase())
                    );
                });

                // console.log(filtered); // Check the filtered array

                if (filtered?.length === 0) {
                    setNoResults(true);
                } else {
                    setNoResults(false);
                    setFilteredWorks(filtered || []); // Use an empty array if filtered is undefined
                }
            } catch (error) {
                // console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [search, province]);


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // if (!query.trim() && !location.trim()) {
        //     setSearchError("Vui lòng nhập từ khóa tìm kiếm hoặc chọn địa điểm.");
        //     return;
        // }

        const queryString = province ? `search=${query}&province=${province}` : `search=${query}`;
        await navigate(`/search?${queryString}`);
        // await navigate(`/search?search=${query}`);
    };
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };
    return (
        <form className="lg:flex gap-2 my-5" onSubmit={handleSubmit}>
            <div className="border rounded-xl bg-white justify-between px-2 my-7 flex items-center lg:py-3 py-2">
                <label htmlFor="search" className="lg:pl-4 pl-2">
                    Tìm kiếm
                </label>
                <input
                    type="text"
                    className="outline-none ml-3 lg:w-[350px]"
                    placeholder="Chức danh, từ khóa hoặc công ty"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <span className="pr-5">
                    <BsSearch />
                </span>
            </div>
            <div className='border rounded-xl bg-white justify-between px-2 my-7 flex items-center lg:py-3 py-2'>
                <Select placeholder="Chọn địa chỉ" className='w-[400px] border-none' onChange={(value) => setProvince(value)}>
                    {searchData?.data?.province_id.map((options: IJobPost) => (

                        <Select.Option key={options.id} value={options.id}>
                            {options.province}
                        </Select.Option>
                    ))}
                </Select>
                <span className='pr-5'>
                    <MdRoom />
                </span>
            </div>
            <button
                className="bg-blue-600 px-10 lg:my-7 lg:ml-2 rounded-full text-white font-semibold w-full lg:w-auto py-2"
                type="submit"
            >
                Tìm việc
            </button>
            {searchError && (
                <p className="text-red-500 text-sm mt-2">{searchError}</p>
            )}
        </form>
    );
};

export default SearchJobs;