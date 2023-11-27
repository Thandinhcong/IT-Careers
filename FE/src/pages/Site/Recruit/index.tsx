import { AiFillCaretRight, AiOutlineCheckCircle, AiOutlineReload } from 'react-icons/ai'
import FilterBySalary from './FilterBySalary';
import FilterByLocation from './FilterByLocation';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import SearchJobs from './SearchJobs'
import { useSearchQuery } from '../../../api/searchApi';

const Recruit = () => {
    const [isFollowing, setIsFollowing] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search) as any;
    const search = searchParams.get("search");
    const province = searchParams.get("province");
    // const { data: searchData } = useSearchQuery({ search: search, province: province });
    const { data: searchData } = useSearchQuery({ search: search });

    const [filteredWorks, setFilteredWorks] = useState([]);
    const [noResults, setNoResults] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log(searchData); // Check API data
                const filtered = searchData?.data?.filter((item: any) =>
                    item.title.toLowerCase().includes(search.toLowerCase())
                    // && item.province.includes(province)
                );

                // console.log(filtered); // Check the filtered array

                if (filtered?.length == 0) {
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
    }, [search]);

    console.log(searchData)

    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    return (
        <div className='max-w-screen-xl mx-auto'>
            <SearchJobs />
            <div>

            </div>
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
                    <button className='rounded-lg bg-gray-200'><AiOutlineReload className="inline-block base-line mr-1" />Đặt lại</button>
                </div>
            </div>

            <hr className='py-4' />
            <div className='grid grid-cols-3 gap-8'>

                <div className='col-span-2'>
                    <h2 className='font-semibold text-xl'>Tuyển dụng </h2>
                    <p className='py-4'>Có <span className='font-bold'>1280</span> việc làm phù hợp với tìm kiếm của bạn</p>
                    <div>
                        <div>
                            <div className="sm:hidden">
                                <label htmlFor="Tab" className="sr-only">Tab</label>
                                <select id="Tab" className="w-full rounded-md border-gray-200">
                                    <option>Settings</option>
                                    <option>Messages</option>
                                    <option>Archive</option>
                                    <option>Notifications</option>
                                </select>
                            </div>
                            <div className="hidden sm:block">
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
                        </div>
                    </div>


                    {/* item 1 */}

                    {/* {noResults ? (
                        <p>Không có kết quả tìm kiếm phù hợp.</p>
                    ) : ( */}
                    <>
                        <h1 className='mx-10 text-2xl font-bold'>Kết quả tìm kiếm cho: {search}, địa chỉ là: {province}</h1>
                        {filteredWorks.length > 0 ? (
                            <ul>
                                {filteredWorks.map((item: any) => (
                                    <div className='grid grid-cols-5 mx-10 py-4 my-4 px-2 shadow-3xl rounded leading-7'>
                                        <Link to={`/company/detail/${item.id}`}>
                                            <img src="http://smac.com.vn/wp-content/uploads/2019/06/Smac2.0.png" className='col-span-1 w-32 mx-auto' alt="" />
                                        </Link>

                                        <div className='col-span-4 '>

                                            <li key={item.title} className=''>
                                                <h1 className='text-xl'><b>{item.title}</b></h1>
                                                <h2 className='text-gray-500'>Công ty {item.company_name}</h2>
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
                                                <p><span className='font-bold mr-2'>$</span>Từ {item.min_salary}$ đến {item.max_salary}$</p>
                                            </li>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        ) : (
                            <p>Không có công việc phù hợp.</p>
                        )}
                    </>
                    {/* )} */}

                    {/* paginate */}
                    <ol className="flex justify-center gap-1 text-xs font-medium">
                        <li>
                            <a
                                href="#"
                                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                            >
                                <span className="sr-only">Prev Page</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                            >
                                1
                            </a>
                        </li>

                        <li
                            className="block h-8 w-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white"
                        >
                            2
                        </li>

                        <li>
                            <a
                                href="#"
                                className="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                            >
                                3
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="block h-8 w-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                            >
                                4
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                            >
                                <span className="sr-only">Next Page</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3 w-3"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </li>
                    </ol>
                </div>
                {/* Trong trường hợp không tìm thấy công việc */}
                <div className='col-span-2 hidden'>
                    <h2 className='font-semibold text-xl'>Tuyển dụng </h2>
                    <p className='py-4'>Có <span className='font-bold'>0</span> việc làm phù hợp với tìm kiếm của bạn</p>
                    <p className='font-bold'>Gợi ý: </p>
                    <p><AiFillCaretRight className='inline-block base-line' /> Xin bạn chắc chắn rằng tất cả các từ đều đúng chính tả.</p>
                    <p><AiFillCaretRight className='inline-block base-line' /> Hãy thử những từ khóa khác.</p>
                    <p><AiFillCaretRight className='inline-block base-line' /> Hãy thử những từ khóa chung hơn.</p>
                    <p><AiFillCaretRight className='inline-block base-line' /> Hãy thử thời gian đăng tin khác</p>
                    <p><AiFillCaretRight className='inline-block base-line' /> Có thể địa điểm của bạn chưa có công việc nào</p>
                    <p><AiFillCaretRight className='inline-block base-line' /> Đặt lại tiêu chí tìm kiếm</p>
                </div>

                <div className='col-span-1 w-2/3'>
                    <FilterBySalary />
                    <FilterByLocation />
                </div>
            </div>
        </div>
    )
}
export default Recruit