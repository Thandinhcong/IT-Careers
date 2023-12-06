import { AiFillCaretRight, AiOutlineReload } from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom';
import SearchJobs from './SearchJobs';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { formatDistanceToNow, parse } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { useSearchQuery } from '../../../api/searchApi';
import { Spin } from 'antd';


const Recruit = () => {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useSearchQuery({ search: '', province: '' });
    console.log(data?.data)
    const [searchData, setDataSearch] = useState(data?.data);
    console.log(searchData)

    const handleSearchDataChange = (searchData: any) => {
        setDataSearch(searchData);
    };

    useEffect(() => {
        if (!location?.state) {
            console.log("đ tồn tại")
            handleSearchDataChange(data);

        } else if (location?.state) {
            handleSearchDataChange(location?.state?.searchData);
        }
        else {
            handleSearchDataChange(location?.state?.searchData);
        }
    }, [location?.state, data]);

    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedData = searchData && searchData.data && searchData.data.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const resetSearch = () => {
        setDataSearch(data)
    }

    return (
        <div className='max-w-screen-xl mx-auto'>
            <SearchJobs onSearchDataChange={handleSearchDataChange} />
            <div>
                <div className='grid grid-cols-8 my-4 gap-8'>
                    <select
                        name="HeadlineAct"
                        id="HeadlineAct"
                        className="w-full rounded-lg border-gray-300 text-gray-800 sm:text-sm col-span-1 text-center py-2 bg-gray-200"
                    >
                        <option value="date" hidden>Ngày đăng</option>
                        <option value="24hours" className=''>24 giờ qua</option>
                        <option value="3days">3 ngày qua</option>
                        <option value="7days">7 ngày qua</option>
                        <option value="30days">30 ngày qua</option>
                    </select>
                    <select
                        name="HeadlineAct"
                        id="HeadlineAct"
                        className="w-full rounded-lg border-gray-300 text-gray-800 sm:text-sm col-span-1 text-center py-2 bg-gray-200"
                    >
                        <option value="date" hidden>Cấp bậc</option>
                        <option value="24hours" className=''>TSS</option>
                        <option value="3days">Fresher Developer</option>
                        <option value="7days">Junior Developer</option>
                        <option value="30days">Mid-level Developer</option>
                        <option value="30days">Senior Developer</option>
                        <option value="30days">Leader</option>
                    </select>
                    <select
                        name="HeadlineAct"
                        id="HeadlineAct"
                        className="w-full rounded-lg border-gray-300 text-gray-800 sm:text-sm col-span-1 text-center py-2 bg-gray-200"
                    >
                        <option value="date" hidden>Kinh nghiệm</option>
                        <option value="24hours" className=''>Dưới 1 năm</option>
                        <option value="3days">1 năm</option>
                        <option value="7days">2 năm</option>
                        <option value="30days">4 năm</option>
                        <option value="30days">5 năm</option>
                        <option value="30days">Trên 5 năm</option>
                    </select>
                    <select
                        name="HeadlineAct"
                        id="HeadlineAct"
                        className="w-full rounded-lg border-gray-300 text-gray-800 sm:text-sm col-span-1 text-center py-2 bg-gray-200"
                    >
                        <option value="date" hidden>Chuyên ngành</option>
                        <option value="24hours" className=''>Front-end</option>
                        <option value="3days">Back-end(Website)</option>
                        <option value="7days">Desiger</option>
                        <option value="30days">Designer UX UI</option>
                    </select>
                    <button className='rounded-lg bg-gray-200' onClick={resetSearch} ><AiOutlineReload className="inline-block base-line mr-1" />Đặt lại</button>
                </div>
            </div>

            <hr className='py-4' />
            <div className='grid grid-cols-3 gap-8'>
                <div className='col-span-2'>
                    <h2 className='font-semibold text-xl'>Tuyển dụng </h2>
                    <p className='py-4'>
                        Có <span className='font-bold'>{searchData ? searchData?.data?.length : 0}</span> việc làm phù hợp với tìm kiếm của bạn
                    </p>

                    {/* <div>
                        <div className="">
                            <div className="border w-4/3 border-gray-200 mx-10">
                                <nav className="flex justify-between gap-6 py-4 mx-8" aria-label="Tabs">
                                    <p
                                        className="shrink-0 border-transparent px-1  text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                    >
                                        Ưu tiên hiển thị:
                                    </p>
                                    <a
                                        href="#"
                                        className="shrink-0 border-b-2 border-transparent px-1  text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                    >
                                        <AiOutlineCheckCircle className='inline-block base-line' /> Cần tuyển gấp
                                    </a>

                                    <a
                                        href="#"
                                        className="shrink-0 border-b-2 border-transparent px-1  text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                    >
                                        <AiOutlineCheckCircle className='inline-block base-line' /> Mới đăng tuyển
                                    </a>

                                    <a
                                        href="#"
                                        className="shrink-0 border-b-2 border-transparent px-1  text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                    >
                                        <AiOutlineCheckCircle className='inline-block base-line' /> Mới cập nhật
                                    </a>

                                    <a
                                        href="#"
                                        className="shrink-0 border-b-2 border-sky-500 px-1  text-sm font-medium text-sky-600"
                                        aria-current="page"
                                    >
                                        <AiOutlineCheckCircle className='inline-block base-line' /> Phù hợp nhất
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div> */}

                    {/* item 1 */}
                    {displayedData && displayedData?.map((item: any) => {
                        const startDate = parse(item.start_date, 'yyyy-MM-dd', new Date());
                        const timeDiff = formatDistanceToNow(startDate, { locale: vi, addSuffix: true });
                        return (
                            <Spin spinning={isLoading}>
                                < ul key={item.id}>
                                    <div className='grid grid-cols-5 mx-10 py-4 my-4 px-2 shadow-3xl rounded leading-7' key={item.id}>
                                        <Link to={`/job-detail/${item?.title}/${item?.id}`}>
                                            <img src="data:image/jpeg;base64,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" className='col-span-1 w-32 mx-auto' alt="" />
                                        </Link>

                                        <div className='col-span-4 '>

                                            <li className=''>
                                                <h1 className='text-xl'><b>{item.title}</b></h1>
                                                <h2 className='text-gray-500'>{item.company_name}</h2>
                                                <p className='flex items-center'>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5 mr-2 shrink-0 text-gray-900 inline-block base-line"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                        />
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                        />
                                                    </svg>
                                                    {item.province},
                                                    {item.district}
                                                </p>
                                                <p className='flex items-center gap-2'>
                                                    <MdOutlineAttachMoney className="text-lg" />
                                                    <span className='font-semibold'>
                                                        {parseInt(item.min_salary).toLocaleString()} đ - {parseInt(item.max_salary).toLocaleString()} đ
                                                    </span>
                                                </p>
                                                <p className="line-clamp-2">Mô tả: {item.desc}</p>
                                                <p className='my-2 text-gray-500 text-sm'>
                                                    {/* Đăng: {item.start_date} */}
                                                    Đăng: {timeDiff}
                                                </p>
                                            </li>
                                        </div>
                                    </div>
                                </ul>
                            </Spin>
                        )
                    })}

                    {/* Trường hợp không tìm thấy */}
                    {searchData && searchData.data && searchData.data.length === 0 ? (
                        <div>
                            <p className='font-bold'>Gợi ý: </p>
                            <p><AiFillCaretRight className='inline-block base-line' /> Xin bạn chắc chắn rằng tất cả các từ đều đúng chính tả.</p>
                            <p><AiFillCaretRight className='inline-block base-line' /> Hãy thử những từ khóa khác.</p>
                            <p><AiFillCaretRight className='inline-block base-line' /> Hãy thử những từ khóa chung hơn.</p>
                            <p><AiFillCaretRight className='inline-block base-line' /> Hãy thử thời gian đăng tin khác</p>
                            <p><AiFillCaretRight className='inline-block base-line' /> Có thể địa điểm của bạn chưa có công việc nào</p>
                            <p><AiFillCaretRight className='inline-block base-line' /> Đặt lại tiêu chí tìm kiếm</p>
                        </div>
                    ) : null}

                    {/* Phân trang */}
                    <ol className='flex justify-center gap-1 text-xs font-medium my-2'>
                        <li>
                            <a
                                href='#'
                                className='inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180'
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                <span className='sr-only'>Prev Page</span>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-3 w-3'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            </a>
                        </li>

                        {Array.from({ length: Math.ceil(searchData?.data?.length / itemsPerPage) }, (_, index) => (
                            <li key={index}>
                                <a
                                    href='#'
                                    className={`block h-8 w-8 rounded border ${currentPage === index + 1 ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-100 bg-white'} text-center leading-8 text-gray-900`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </a>
                            </li>
                        ))}

                        <li>
                            <a
                                href='#'
                                className='inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180'
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                <span className='sr-only'>Next Page</span>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-3 w-3'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            </a>
                        </li>
                    </ol>

                    {/* Hiển thị chỉ số trang */}
                    <p className='my-2 text-gray-500 text-sm'>
                        Trang {currentPage} / {Math.ceil(searchData?.data?.length / itemsPerPage)}
                    </p>
                </div>

                {/* <div className='col-span-1 w-2/3'>
                    <FilterBySalary />
                    <FilterByLocation />
                </div> */}

            </div>
        </div >
    )
}
export default Recruit