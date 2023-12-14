import { AiFillCaretRight, AiOutlineReload } from 'react-icons/ai'
import { Link, useLocation } from 'react-router-dom';
import SearchJobs from './SearchJobs';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { formatDistanceToNow, parse } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { useGetJobPostSelectByIdQuery, useSearchQuery } from '../../../api/searchApi';
import { Select, Spin } from 'antd';
import slugify from 'slugify';
import { IJobPost } from '../../../interfaces';


const Recruit = () => {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useSearchQuery({ search: '', province: '' });
    const [searchData, setDataSearch] = useState(data?.data);
    const { data: select } = useGetJobPostSelectByIdQuery();
    const [selectedExp, setSelectedExp] = useState<string>('');
    const [selectedSalary, setSelectedSalary] = useState<string>('');
    const handleSearchDataChange = (searchData: any) => {
        setDataSearch(searchData);
    };

    useEffect(() => {
        if (!location?.state) {
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

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    const resetSearch = () => {
        setSelectedExp('');  // Đặt lại số năm kinh nghiệm
        setSelectedSalary('');  // Đặt lại mức lương
        setDataSearch(data);  // Đặt lại dữ liệu tìm kiếm
    }
    const filteredData = searchData?.data?.filter((item: any) => {
        // Lọc theo số năm kinh nghiệm
        if (selectedExp && item.experience !== selectedExp) {
            return false;
        }

        // Lọc theo mức lương
        if (selectedSalary) {
            const minSalary = parseInt(item.min_salary);
            const maxSalary = parseInt(item.max_salary);
            console.log(minSalary)

            switch (selectedSalary) {
                case '1':
                    // Dưới 1 triệu
                    if (!(maxSalary < 1000000 || minSalary < 1000000)) {
                        return false;
                    }
                    break;
                case '2':
                    // 1-5 triệu
                    if (!(maxSalary >= 1000000)) {
                        return false;
                    }
                    break;
                case '3':
                    // 5-10 triệu
                    if (!(maxSalary >= 5000000)) {
                        return false;
                    }
                    break;
                case '4':
                    // 10-15 triệu
                    if (!(maxSalary >= 10000000)) {
                        return false;
                    }
                    break;
                case '5':
                    // 15-20 triệu
                    if (!(maxSalary >= 15000000)) {
                        return false;
                    }
                    break;
                case '6':
                    // 20-25 triệu
                    if (!(maxSalary >= 20000000)) {
                        return false;
                    }
                    break;
                case '7':
                    // 25-30 triệu
                    if (!(maxSalary >= 25000000)) {
                        return false;
                    }
                    break;
                case '8':
                    // 30-35 triệu
                    if (!(maxSalary >= 30000000)) {
                        return false;
                    }
                    break;
                case '9':
                    // Trên 35 triệu
                    if (!(maxSalary > 35000000)) {
                        return false;
                    }
                    break;
                default:
                    break;
            }
        }

        return true;
    });
    const displayedData = filteredData?.slice(startIndex, endIndex);
    return (
        <div className='max-w-screen-xl mx-auto'>
            <SearchJobs onSearchDataChange={handleSearchDataChange} />
            <div>
                <div className='flex items-center my-4 gap-8'>
                    <Select
                        placeholder="--Số năm kinh nghiệm--"
                        className="h-[37px] w-44"
                        onChange={(value) => setSelectedExp(value)}
                    >
                        {select?.data?.exp.map((options: IJobPost) => (
                            <Select.Option key={options.id} value={options.experience} className="my-1">
                                {options.experience}
                            </Select.Option>
                        ))}
                    </Select>
                    <select
                        className="border border-gray-200 p-2 rounded-md outline-blue-400 text-gray-700 w-40"
                        onChange={(e) => setSelectedSalary(e.target.value)}
                    >
                        <option value="">- Mức lương -</option>
                        <option value="1">Dưới 1 triệu</option>
                        <option value="2">1-5 triệu</option>
                        <option value="3">5-10 triệu</option>
                        <option value="4">10-15 triệu</option>
                        <option value="5">15-20 triệu</option>
                        <option value="6">20-25 triệu</option>
                        <option value="7">25-30 triệu</option>
                        <option value="8">30-35 triệu</option>
                        <option value="9">Trên 35 triệu</option>
                    </select>
                    <button className='rounded-lg bg-gray-200 py-1.5 px-5' onClick={resetSearch} ><AiOutlineReload className="inline-block mr-1" />Đặt lại</button>
                </div>
            </div>

            <hr className='py-4' />
            <div className='grid grid-cols-3 gap-8'>
                <div className='col-span-2'>
                    <h2 className='font-semibold text-xl'>Tuyển dụng </h2>
                    <p className='py-4'>
                        Có <span className='font-bold'>{filteredData ? filteredData?.length : 0}</span> việc làm phù hợp với tìm kiếm của bạn
                    </p>

                    {/* item 1 */}
                    {displayedData && displayedData?.map((item: any) => {

                        const startDate = parse(item.start_date, 'yyyy-MM-dd', new Date());
                        const timeDiff = formatDistanceToNow(startDate, { locale: vi, addSuffix: true });
                        const slug = slugify(item?.title, { lower: true });
                        return (
                            <Spin key={item?.id} spinning={isLoading}>
                                < ul >
                                    <div className='grid grid-cols-5 mx-10 py-4 my-4 px-2 shadow-3xl rounded leading-7' >
                                        <Link to={`/job-detail/${slug}/${item?.id}`}>
                                            {item?.logo == null ? (
                                                <img src="https://res.cloudinary.com/dxzlnojyv/image/upload/v1700359570/glf34tttyauwoqpkbggt.png" alt="" className='w-28 h-28' />
                                            ) : (

                                                <img src={`${item?.logo}`} className='h-28 w-28' alt="" />
                                            )}
                                        </Link>

                                        <div className='col-span-4 '>

                                            <Link to={`/job-detail/${slug}/${item?.id}`} className=''>
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
                                                <div className='flex gap-2'>
                                                    <p>Mô tả:</p>
                                                    <p className="line-clamp-2" dangerouslySetInnerHTML={{ __html: item.desc }} />
                                                </div>
                                                <p className='my-2 text-gray-500 text-sm'>
                                                    Đăng: {timeDiff}
                                                </p>
                                            </Link>
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
            </div>
        </div >
    )
}
export default Recruit