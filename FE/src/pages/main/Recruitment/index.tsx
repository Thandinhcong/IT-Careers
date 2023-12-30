import { BsArrowRight, BsCurrencyDollar } from 'react-icons/bs'
import { MdOutlineFavorite, MdOutlineFavoriteBorder, MdRoom } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useGetAllJobsQuery } from '../../../api/jobApi'
import { VND } from '../../../components/upload'
import { Pagination, Select, Skeleton } from 'antd'
import React, { useState } from 'react'
import { useAddSaveJobsMutation, useGetAllSaveJobsQuery, useUnsaveJobMutation } from '../../../api/savejobpostapi'
import { useGetInfoUserQuery, useLoginMutation } from '../../../api/auths'
import { Notyf } from 'notyf'
import { TEModal, TEModalBody, TEModalContent, TEModalDialog, TEModalHeader } from 'tw-elements-react'
import { FcGoogle } from 'react-icons/fc'
import { useLocalStorage } from '../../../useLocalStorage/useLocalStorage'
import { FormLogin, schemaLogin } from '../../../schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { RiVipCrown2Line } from 'react-icons/ri'
import slugify from 'slugify';
import { IJobPost } from '../../../interfaces'
import { BaseOptionType } from 'antd/es/select'
import { DefaultOptionType } from 'antd/es/cascader'
import { useGetJobPostSelectByIdQuery } from '../../../api/searchApi'
import { AiOutlineFilter, AiOutlineReload } from 'react-icons/ai'
const Recruitment = React.memo(() => {
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
    const { data, isLoading } = useGetAllJobsQuery();
    const listJobs = data?.job_list;
    const [currentPage, setCurrentPage] = useState(1);
    const { data: select } = useGetJobPostSelectByIdQuery();
    const [filterProvince, setFilterProvince] = useState<string>('');
    const [filterExp, setFilterExp] = useState('');
    const [filterSalary, setFilterSalary] = useState('');
    const [selectedProvinceId, setSelectedProvincetId] = useState<string | number | null>(null);

    const pageSize = 12;
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    // Tính toán chỉ mục bắt đầu và kết thúc của danh sách công việc hiển thị trên trang hiện tại
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    // Lọc và phân trang danh sách công việc
    const filteredJobs = listJobs?.filter((item) => {
        return (item.status !== 0 && item.status !== 2) || (new Date() <= new Date(item?.end_date));
    });

    const [filteredData, setFilteredData] = useState(filteredJobs);
    let displayedJobs;

    if (filteredData === undefined) {
        displayedJobs = filteredJobs?.slice(startIndex, endIndex);
    } else {
        displayedJobs = filteredData?.slice(startIndex, endIndex);
    }

    // const displayedJobs = filteredData?.slice(startIndex, endIndex);
    //lưu việc làm
    const { data: infoUser } = useGetInfoUserQuery();
    const user = infoUser?.candidate;
    const idUser: any = user?.id;
    const [saveJob] = useAddSaveJobsMutation();
    const [cancelSaveJob] = useUnsaveJobMutation();
    const { data: JobSave } = useGetAllSaveJobsQuery();
    const listJobSave = JobSave?.data;
    const handleSaveJob = async (id: any) => {
        try {
            await saveJob({
                idUser,
                id,
            }).unwrap();
            notyf.success("Lưu việc làm thành công!")

        } catch (error: any) {
            notyf.error(error?.data?.error)
        }
    }
    //hủy lưu
    const handleCancelSaveJob = async (id: any) => {
        try {
            await cancelSaveJob({
                idUser,
                id
            }).unwrap();
            notyf.success("Hủy Lưu việc làm thành công!")

        } catch (error: any) {
            notyf.error(error?.data?.error);
        }
    }
    //đăng nhập
    const [showModal2, setShowModa2l] = useState(false);
    const [login] = useLoginMutation();
    const { register: regiterLogin, handleSubmit: handleSubmitLogin, formState: { errors: ErrorLogin } } = useForm<FormLogin>({
        resolver: yupResolver(schemaLogin),
    });
    const [users, setUser] = useLocalStorage("user", null);
    const onHandleSubmitLogin = async (data: FormLogin) => {
        try {
            const results = await login(data).unwrap();
            setUser({
                accessToken: results.access_token,
                users: results.user,
            });
            setShowModa2l(false);
            window.location.reload();
        } catch (error: any) {
            notyf.error("Thông tin tài khoản hoặc mật khẩu không đúng!");
        }
    };

    //Lọc
    const handleSelectProvinceId = (key: number | string, province: BaseOptionType | DefaultOptionType) => {
        setSelectedProvincetId(key);
        setFilterProvince(province?.children); // Use province object to get the name
        console.log(province); // Access the id property
    }
    // Thêm hàm để xử lý sự kiện khi giá trị mức lương thay đổi
    const handleSalarySelectChange = (value: string) => {
        setFilterSalary(value);

    };
    const handleSelectExp = (values: string) => {
        setFilterExp(values);
    }
    const handleFilter = () => {
        let result: any = filteredJobs || [];
        //Lọc theo tỉnh thành phố
        if (filterProvince) {
            result = result.filter((item: { province: string }) => {
                const provinceLower = (item.province || '').toLowerCase(); // Thêm điều kiện kiểm tra trước khi sử dụng toLowerCase

                return (!filterProvince || provinceLower.includes(filterProvince.toLowerCase()));
            });
        }
        //Lọc theo số năm kinh nghiệm
        if (filterExp) {
            result = result.filter((item: { experience: string }) => {
                const experienceLower = (item.experience || '').toLowerCase(); // Thêm điều kiện kiểm tra trước khi sử dụng toLowerCase

                return (!filterExp || experienceLower.includes(filterExp.toLowerCase()));
            });
        }
        // //Lọc theo mức lương
        if (filterSalary) {
            // Lọc theo mức lương dựa trên giá trị được chọn
            result = result.filter((item: any) => {
                const minSalary = parseInt(item.min_salary);
                const maxSalary = parseInt(item.max_salary);

                switch (filterSalary) {
                    case '1':
                        // Dưới 1 triệu
                        return maxSalary >= 1000000;
                        break;
                    case '2':
                        // 1-5 triệu
                        return maxSalary >= 5000000;
                        break;
                    case '3':
                        // 5-10 triệu
                        return maxSalary >= 10000000;
                        break;
                    case '4':
                        // 10-15 triệu
                        return maxSalary >= 15000000;
                        break;
                    case '5':
                        // 15-20 triệu
                        return maxSalary >= 20000000;
                        break;
                    case '6':
                        // 20-25 triệu
                        return maxSalary >= 25000000;
                        break;
                    case '7':
                        // 25-30 triệu
                        return maxSalary >= 30000000;
                        break;
                    case '8':
                        // 30-35 triệu
                        return maxSalary >= 35000000;
                        break;
                    case '9':
                        // Trên 35 triệu
                        return maxSalary > 40000000;
                        break;
                    default:
                        return true; // Nếu không có mức lương nào được chọn, hiển thị tất cả
                }
            });
        }
        setFilteredData(result);
    };

    const handleClearFilterButtonClick = () => {
        // Xóa tất cả các giá trị lọc và cập nhật state
        setFilterSalary('');
        setFilteredData(filteredJobs);
        setSelectedProvincetId(null); // Reset giá trị của tỉnh/thành phố
        setFilterExp(''); // Reset giá trị của quận/huyện
    };

    const handleFilterButtonClick = () => {
        // Gọi hàm lọc dữ liệu
        handleFilter();
    };


    if (isLoading) return <Skeleton />
    return (
        <div>
            <div className='mb-10   lg:p-1 mt-2'>
                <div className='flex justify-between'>
                    <h2 className='font-bold md:text-2xl'>
                        Tuyển dụng, việc làm
                        <span className='text-blue-500'> tốt nhất</span>
                    </h2>
                    <Link to="/recruit" className='flex items-center gap-2  hover:text-blue-500'>Xem tất cả  <BsArrowRight /></Link>
                </div>
                <div className="flex gap-4 text-sm my-4">
                    <Select
                        placeholder="Chọn địa chỉ"
                        className="h-[37px] w-40"
                        onChange={(value, option) => handleSelectProvinceId(value, option)}
                    >
                        {select?.data?.province_id.map((options: any) => (
                            <Select.Option key={options.id} value={options.id} rovinceName={options.province} className="my-1">
                                {options.province}
                            </Select.Option>
                        ))}
                    </Select>
                    <Select placeholder="--Số năm kinh nghiệm--" className="h-[37px] w-44" onChange={handleSelectExp}>
                        {select?.data?.exp.map((options: IJobPost) => (
                            <Select.Option key={options.id} value={options.experience} className="my-1">
                                {options.experience}
                            </Select.Option>
                        ))}
                    </Select>

                    <select
                        className="border border-gray-200 p-2 rounded-md outline-blue-400 text-gray-700 w-40 "
                        onChange={(e) => handleSalarySelectChange(e.target.value)}
                    >
                        <option value="">- Mức lương -</option>
                        <option value="1">Trên 1 triệu</option>
                        <option value="2">Trên 5 triệu</option>
                        <option value="3">Trên 10 triệu</option>
                        <option value="4">Trên 15 triệu</option>
                        <option value="5">Trên 20 triệu</option>
                        <option value="6">Trên 25 triệu</option>
                        <option value="7">Trên 30 triệu</option>
                        <option value="8">Trên 35 triệu</option>
                        <option value="9">Trên 40 triệu</option>
                    </select>

                    <button className="bg-blue-600 text-white flex items-center rounded-md px-3" onClick={handleFilterButtonClick}>
                        <AiOutlineFilter className="text-lg" />
                        <p>Lọc</p>
                    </button>
                    <button className="bg-[#eaebee] text-gray-500 flex items-center rounded-md px-3" onClick={handleClearFilterButtonClick}>
                        <AiOutlineReload />
                        <p>Xóa lọc</p>
                    </button>
                </div>
                {/* <div className="pt-4 mb-2 flex justify-between">
                    <p className="text-gray-700 font-semibold">Có {filteredData === undefined ? filteredJobs?.length : filteredData?.length || 0} kết quả tìm kiếm.</p>
                </div> */}
                <div className='my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 '>
                    {displayedJobs?.map((item: any) => {
                        const isCheckJobSave = listJobSave?.some((data: any) => data?.id === item?.id)
                        const slug = slugify(item?.title, { lower: true });
                        return (
                            <div key={item?.id}>
                                <div className='shadow-lg p-2 rounded'>
                                    <Link to={`/job-detail/${slug}/${item?.id}`} key={item?.id}>
                                        <div className='flex gap-2'>
                                            <img src={item?.logo} className='border rounded-md p-2' width={70} />
                                            {item?.id_type_job_post === 2 ? <div className='text-yellow-500 text-2xl;'><RiVipCrown2Line /></div> : ""}
                                            <div>
                                                <Link to="/">
                                                    {item?.id_type_job_post === 2 ? (
                                                        <p className='text-red-500 font-semibold text-lg'>{item?.title}</p>
                                                    ) : (
                                                        <p className='text-slate-500 font-semibold text-lg'>{item?.title}</p>
                                                    )}
                                                </Link>
                                                <p className='text-lg'>{item?.company_name}</p>
                                            </div>
                                        </div>
                                        <p className='flex items-center gap-1 my-2'> <MdRoom /> <span>{item?.province} - {item?.district}</span> </p>
                                    </Link>
                                    <div className='flex justify-between items-center mb-2'>
                                        <p className='flex items-center gap-1'> <BsCurrencyDollar /><span>{VND.format(item?.min_salary)} - {VND.format(item?.max_salary)}</span></p>
                                        {!infoUser ? (
                                            <button
                                                onClick={() => setShowModa2l(true)}
                                            >
                                                <MdOutlineFavoriteBorder />
                                            </button>

                                        ) : (
                                            <button
                                                key={item?.id}
                                                onClick={() => isCheckJobSave ? handleCancelSaveJob(item?.id) : handleSaveJob(item?.id)}
                                            >
                                                {isCheckJobSave ? <div className='text-red-500'><MdOutlineFavorite /> </div> : <MdOutlineFavoriteBorder />}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );

                    })}

                </div>
                {/* Hiển thị Pagination */}
                <div className="pagination-container flex justify-center items-center">
                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={filteredJobs?.length}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
            <TEModal show={showModal2} setShow={setShowModa2l}>
                <TEModalDialog>
                    <TEModalContent>
                        <TEModalHeader>
                            Đăng nhập
                        </TEModalHeader>
                        <TEModalBody>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmitLogin(onHandleSubmitLogin)}>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input
                                        {...regiterLogin("email")}
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                                        placeholder="name@company.com" />
                                    <div className="text-red-500 my-2">
                                        {ErrorLogin.email && ErrorLogin.email.message}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                    <input
                                        {...regiterLogin('password')}
                                        type="password"
                                        name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" />
                                    <div className="text-red-500 my-2">
                                        {ErrorLogin.password && ErrorLogin.password.message}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">

                                    <Link to="/forgot" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Quên mật khẩu?</Link>

                                </div>
                                <button
                                    type="submit"
                                    className="w-full mx-auto text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Đăng nhập</button>
                                <div className="flex justify-center">
                                    <button className="rounded-lg w-full justify-center bg-gray-200 text-black flex items-center space-x-2 px-9 py-2 mt-4 mr-2">
                                        <span className="w-10"><FcGoogle /></span>
                                        <span> Google</span>
                                    </button>

                                </div>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Bạn chưa có tài khoản? <Link to="/dang=ky-tai-khoan" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng ký </Link>
                                </p>

                            </form>
                        </TEModalBody>

                    </TEModalContent>
                </TEModalDialog>
            </TEModal>

        </div>
    )
});

export default Recruitment