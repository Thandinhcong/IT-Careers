import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Form, Select } from 'antd';
import { MdRoom } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { IJobPost } from '../../../interfaces';

const SearchJobs = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [province, setProvince] = useState("");
    const [searchError, setSearchError] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // if (!query.trim() && !location.trim()) {
        //     setSearchError("Vui lòng nhập từ khóa tìm kiếm hoặc chọn địa điểm.");
        //     return;
        // }

        // const queryString = province ? `search=${query}&province=${province}` : `search=${query}`;
        // await navigate(`/search?${queryString}`);
        await navigate(`/search?title=${query}`);
    };
    // const handleSubmit = (e: any) => {
    //     e.preventDefault();
    //     navigate(`/search?search=${query}&province=${province}`);
    // };
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
                <label className='lg:pl-4 pl-2' htmlFor=''>
                    Địa điểm
                </label>
                <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                >
                    <option value=""></option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Hồ Chí Minh">Hồ chí Minh</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                </select>
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