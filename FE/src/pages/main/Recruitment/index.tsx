import { BsArrowRight, BsCurrencyDollar } from 'react-icons/bs'
import { MdOutlineFavorite, MdOutlineFavoriteBorder, MdRoom } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useGetAllJobsQuery } from '../../../api/jobApi'
import { VND } from '../../../components/upload'
import { Pagination, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAddSaveJobsMutation, useGetAllSaveJobsQuery, useUnsaveJobMutation } from '../../../api/savejobpostapi'
import { useGetInfoUserQuery, useLoginMutation } from '../../../api/auths'
import { Notyf } from 'notyf'
import { TEModal, TEModalBody, TEModalContent, TEModalDialog, TEModalHeader } from 'tw-elements-react'
import { FcGoogle } from 'react-icons/fc'
import { useLocalStorage } from '../../../useLocalStorage/useLocalStorage'
import { FormLogin, schemaLogin } from '../../../schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
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
    console.log("listJobs", listJobs);


    const [currentPage, setCurrentPage] = useState(1);
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
    const displayedJobs = filteredJobs?.slice(startIndex, endIndex);
    const [savedJobs, setSavedJobs] = useState<any>({});
    //lưu việc làm
    const { data: infoUser } = useGetInfoUserQuery();
    const user = infoUser?.candidate;
    const idUser: any = user?.id;
    const [saveJob] = useAddSaveJobsMutation();
    const [cancelSaveJob] = useUnsaveJobMutation();

    const { data: JobSave } = useGetAllSaveJobsQuery();

    const handleSaveJob = async (id: any) => {
        try {
            await saveJob({
                idUser,
                id,
            }).unwrap();
            setSavedJobs((prevSavedJobs: any) => ({ ...prevSavedJobs, [id]: true }));
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
            setSavedJobs((prevSavedJobs: any) => ({ ...prevSavedJobs, [id]: false }));

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
            notyf.error(error?.message)
        }
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
                    <Link to="/jobs" className='flex items-center gap-2  hover:text-blue-500'>Xem tất cả  <BsArrowRight /></Link>
                </div>
                <div className='my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 '>
                    {displayedJobs?.map((item: any) => {
                        const isJobSaved = savedJobs[item?.id] || false;
                        return (
                            <div key={item?.id}>
                                <div className='shadow-lg p-2 rounded'>
                                    <Link to={`/job-detail/${item?.title}/${item?.id}`} key={item?.id}>
                                        <div className='flex gap-2'>
                                            <img src={item?.logo} className='border rounded-md p-2' width={70} />
                                            <div>
                                                <Link to="/">
                                                    <p className='text-slate-500 font-semibold text-lg'>{item?.title}</p>
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
                                                onClick={() => isJobSaved ? handleCancelSaveJob(item?.id) : handleSaveJob(item?.id)}
                                            >
                                                {isJobSaved ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />}
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


