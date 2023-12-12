import React, { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useSearchCompaniesQuery } from '../../../api/companyApi';
import { Skeleton } from 'antd';
import ContentCompany from './Content';

const Company = React.memo(() => {
    const [searchResultsVisible, setSearchResultsVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { data, isLoading } = useSearchCompaniesQuery();

    const listCompanys = data?.list_company;
    const Filters = (e: any) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = (e: any) => {
        e.preventDefault();
        setSearchResultsVisible(true);

        // Thực hiện tìm kiếm dựa trên giá trị searchTerm
        const filteredResults = listCompanys?.filter((item: any) =>
            item.company_name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSearchResults(filteredResults);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (isLoading) return <Skeleton />;

    return (
        <div>
            <div className='max-w-screen-xl mx-auto px-8 '>
                <div className='py-4'>
                    <div className='text-3xl text-blue-500 py-3'>
                        Danh sách các công ty
                    </div>
                </div>
                <form className='grid grid-cols-3 relative' onSubmit={handleSearch}>
                    <div className='col-span-2 border rounded-xl bg-white justify-between px-2 my-7 flex items-center py-3'>
                        <input
                            onBlur={() => setSearchResultsVisible(false)}
                            onChange={Filters}
                            type="text"
                            className='outline-none ml-3 lg:w-[350px]'
                            placeholder='Tìm kiếm theo tên công ty'
                        />
                        <span className='pr-5'><BsSearch /></span>
                    </div>
                    <button className='col-span-1 bg-blue-600 px-10 lg:my-7 lg:ml-2 rounded-xl text-white font-semibold w-full lg:w-auto' type="submit">
                        Tìm công ty
                    </button>
                    <div className='absolute top-20 bg-white px-5 z-50 shadow-sm w-[810px]'>
                        {searchResultsVisible && searchResults.length > 0 ? (
                            searchResults.map((item: any) => (
                                <div key={item?.id} className='flex gap-3 py-5 items-center '>
                                    <img src={item?.logo} alt="Anhr logo" width={50} className='rounded' />
                                    <Link to={`/company/detail/${item?.id}`} className='text-lg w-full font-sans hover:text-blue-500'>{item?.company_name}</Link>
                                </div>
                            ))
                        ) : (
                            searchResultsVisible && (
                                <div className='text-red-500 text-2xl'>Không có kết quả phù hợp</div>
                            )
                        )}
                    </div>
                </form>
            </div>
            <ContentCompany data={listCompanys} />
        </div>
    );
});

export default Company;
