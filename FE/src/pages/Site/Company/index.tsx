import { BsSearch } from 'react-icons/bs';
import ContentCompany from './Content';
import { useSearchCompaniesQuery } from '../../../api/companyApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Skeleton } from 'antd';

const Company = React.memo(() => {
    const [searchResultsVisible, setSearchResultsVisible] = useState(false);

    const { data, isLoading } = useSearchCompaniesQuery();

    const listCompanys = data?.list_company;
    console.log(listCompanys);

    const [records, setRecords] = useState([])
    const Filter = (e: any) => {
        const keyword = e.target.value.toLowerCase();
        const filteredRecords: any = listCompanys?.filter((item: any) => {
            const companyName = item.company_name.toLowerCase();
            return companyName.includes(keyword);
        });

        setRecords(filteredRecords);
        // Kiểm tra xem từ khóa tìm kiếm có rỗng hay không và cập nhật trạng thái hiển thị kết quả
        setSearchResultsVisible(keyword.trim() !== '');
    };
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    if (isLoading) return <Skeleton />
    return (
        <div>
            <div className='max-w-screen-xl mx-auto px-8 '>
                <div className='py-4'>
                    <div className='text-3xl text-blue-500 py-3'>
                        Danh sách các công ty
                    </div>

                </div>
                <form className='grid grid-cols-3 relative'>
                    <div className='col-span-2 border rounded-xl bg-white justify-between px-2 my-7 flex items-center py-3'>
                        <input
                            onBlur={(e) => {
                                if (e.target.value.trim() === '') {
                                    setSearchResultsVisible(false);
                                }
                            }}
                            onChange={Filter}
                            type="text"
                            className='outline-none ml-3  lg:w-[350px]'
                            placeholder='Tìm kiếm theo tên công ty' />
                        <span className='pr-5'><BsSearch /></span>
                    </div>
                    <button className='col-span-1 bg-blue-600 px-10 lg:my-7 lg:ml-2 rounded-xl text-white font-semibold  w-full lg:w-auto'>Tìm công ty</button>
                    <div className='absolute top-20 bg-white px-5 z-50 shadow-sm w-[810px]'>
                        {searchResultsVisible && records?.length > 0 && (
                            records.map((item: any) => (
                                <div key={item?.id} className='flex gap-3 items-center '>
                                    <img src={item?.logo} alt="Anhr logo" width={50} className='rounded' />
                                    <Link to={`/company/detail/${item?.id}`} className='text-lg w-full font-sans hover:text-blue-500'>{item?.company_name}</Link>
                                </div>
                            ))
                        )}
                    </div>

                </form>


            </div>
            <ContentCompany data={listCompanys} />

        </div>
    )
})

export default Company