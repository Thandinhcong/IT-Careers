import React, { useState } from "react";
import { AiFillFacebook, AiFillLinkedin, AiFillTwitterSquare, AiOutlineCalendar, AiOutlineCheck, AiOutlineClockCircle, AiOutlineClose, AiOutlineCopy, AiOutlineEnvironment, AiOutlineFileDone, AiOutlineHeart, AiOutlineMoneyCollect, AiOutlineStar, AiOutlineUser, AiOutlineUsergroupAdd, AiOutlineWarning } from "react-icons/ai"
import { CiMedal } from "react-icons/ci";
import { Link, useParams } from "react-router-dom";
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter,
} from "tw-elements-react";
import { useGetOneJobsQuery } from "../../../api/jobApi";
import { UploadImage, VND } from "../../../components/upload";
import { Notyf } from "notyf";
import { FromApply, schemaJobApply } from "../../../schemas/apply";
import { useGetInfoUserQuery, useLoginMutation } from "../../../api/auths";
import { useForm } from "react-hook-form";
import { FormLogin, schemaLogin } from "../../../schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalStorage } from "../../../useLocalStorage/useLocalStorage";
import { useApplyJobMutation, useGetJobApplyQuery } from "../../../api/jobPostApply";
import { FcGoogle } from "react-icons/fc";
import { SlSocialFacebook } from "react-icons/sl";
import { useListCvQuery } from "../../../api/cv/listCvApi";


const TabNew = React.memo(({ isJobSaved, onSaveJob, onCancelSaveJob }: any) => {
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModa2l] = useState(false);
    const [image, setImage] = useState(null);
    const copyToClipboard = () => {
        const inputElement = document.querySelector<HTMLInputElement>("#inputElement");
        if (inputElement) {
            const textToCopy = inputElement.value;
            navigator.clipboard.writeText(textToCopy).then(
                function () {
                    alert("Sao chép thành công!!")
                }
            );
        }
    };
    const { id }: any = useParams();
    const { data } = useGetOneJobsQuery(id || "");
    const listOne: any = data && data?.job_detail;
    const { data: infoUser } = useGetInfoUserQuery();
    const { data: ListJobApply } = useGetJobApplyQuery();
    const listJob = ListJobApply?.job_list;

    const idJob: any = parseInt(id, 10);

    const isAlreadyApplied = listJob?.some((appliedJob: any) => appliedJob.id === idJob);
    const user = infoUser?.candidate;
    const idUser: any = user?.id;
    const [applyJob] = useApplyJobMutation();
    const { register, handleSubmit, formState: { errors } } = useForm<FromApply>({
        resolver: yupResolver(schemaJobApply),
    });

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

    const onHandleSubmit = async (job: FromApply) => {
        // if (typeof image !== "string") return;
        job.path_cv = image as any;
        try {
            await applyJob({
                id: id,
                candidate_id: idUser,
                ...job,
            }).unwrap();
            notyf.success("Ứng tuyển công việc thành công");
            setShowModal(false)
        } catch (error) {
            notyf.error("Có lỗi xảy ra vui lòng thử lại!")
        }

    };
    const { data: listCv } = useListCvQuery();
    const listAllCv = listCv?.data;
    const onChangeFile = async (e: any) => {
        const files = e.target.files[0];
        if (files) {
            try {
                const Response = await UploadImage({
                    file: files,
                    upload_preset: "demo-upload",
                });

                if (Response) {
                    setImage(Response.data.url)
                }
            } catch (error) {
                return error
            }
        }
    };

    return (
        <div className='grid grid-cols-3 gap-4'>
            <div className='col-span-2'>
                <div className='bg-gray-100 text-green-600 p-4'>
                    <div>
                        <TEModal show={showModal} setShow={setShowModal}>
                            <TEModalDialog>
                                <TEModalContent>
                                    <TEModalHeader>
                                        {/* <!--Modal title--> */}
                                        <h5 className="text-xl font-medium">
                                            <CiMedal className="inline-block text-3xl" />
                                            123job Trust verified
                                        </h5>
                                        {/* <!--Close button--> */}
                                        <button
                                            type="button"
                                            className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                            aria-label="Close"
                                        >
                                            <AiOutlineClose className="text-xl" />
                                        </button>
                                    </TEModalHeader>
                                    {/* <!--Modal body--> */}

                                </TEModalContent>
                            </TEModalDialog>
                        </TEModal>
                    </div>
                </div>
                <div className="text-gray-700">
                    <div>
                        <h2 className="font-semibold text-lg my-4">Thông tin cơ bản</h2>
                        <div className="grid grid-cols-2 border text-[15px]">
                            <div className="grid grid-cols-1 gap-2 border-r py-2">
                                <div className="grid grid-cols-12 items-center gap-2 border-b pb-2">
                                    <AiOutlineEnvironment className="col-span-1" />
                                    <p className="col-span-4">Địa điểm:</p>
                                    <p className="col-span-7">{listOne?.address}</p>
                                </div>
                                <div className="grid grid-cols-12 items-center gap-2 border-b pb-2">
                                    <AiOutlineClockCircle className="col-span-1" />
                                    <p className="col-span-4">Hạn nộp hồ sơ:</p>
                                    <p className="col-span-7">{listOne?.end_date}</p>
                                </div>
                                <div className="grid grid-cols-12 items-center gap-2 border-b pb-2">
                                    <AiOutlineCalendar className="col-span-1" />
                                    <p className="col-span-4">Hình thức:</p>
                                    <p className="col-span-7">{listOne?.working_form}</p>
                                </div>
                                <div className="grid grid-cols-12 items-center gap-2">
                                    <AiOutlineUsergroupAdd className="col-span-1" />
                                    <p className="col-span-4">Số lượng:</p>
                                    <p className="col-span-7">{listOne?.quantity}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-2 py-2">
                                <div className="grid grid-cols-12 items-center gap-2 border-b pb-2">
                                    <AiOutlineMoneyCollect className="col-span-1" />
                                    <p className="col-span-4">Mức lương:</p>
                                    <p className="col-span-7 text-red-500 font-medium">{VND.format(listOne?.min_salary)} - {VND.format(listOne?.max_salary)}</p>
                                </div>
                                <div className="grid grid-cols-12 items-center gap-2 border-b pb-2">
                                    <AiOutlineUser className="col-span-1" />
                                    <p className="col-span-4">Chức vụ:</p>
                                    <p className="col-span-7">{listOne?.job_position}</p>
                                </div>
                                <div className="grid grid-cols-12 items-center gap-2 border-b pb-2">
                                    <AiOutlineFileDone className="col-span-1" />
                                    <p className="col-span-4">Kinh nghiệm</p>
                                    <p className="col-span-7">{listOne?.experience}</p>
                                </div>
                                <div className="grid grid-cols-12 items-center gap-2">
                                    <AiOutlineStar className="col-span-1" />
                                    <p className="col-span-4">Trình độ:</p>
                                    <p className="col-span-7">{listOne?.academic_level}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="font-semibold text-lg my-4">Mô tả công việc/ Quyền lợi</h2>
                        <p>{listOne?.interest}</p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-lg my-4">Yêu cầu</h2>
                        <p>{listOne?.require
                        }
                        </p>
                    </div>
                    <div className="flex items-center gap-2 my-5">
                        {isAlreadyApplied ? (
                            <p className="px-6 text-base bg-blue-500 rounded-lg py-3 text-white text-center">Đã ứng tuyển!</p>
                        ) : (
                            <TERipple rippleColor="white" className="">
                                {!infoUser ? (
                                    <button
                                        type="button"
                                        className="w-full text-white border border-blue-600 bg-blue-600 py-3 px-5 hover:bg-blue-500 font-medium rounded-lg"
                                        onClick={() => setShowModa2l(true)}
                                    >
                                        <AiOutlineCheck className="inline-block text mr-2 text-xl" />
                                        Nộp hồ sơ online
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="w-full text-white border border-blue-600 px-5 bg-blue-600 py-3 hover:bg-blue-500 font-medium rounded-lg"
                                        onClick={() => setShowModal(true)}
                                    >
                                        <AiOutlineCheck className="inline-block text mr-2 text-xl" />
                                        Nộp hồ sơ online
                                    </button>
                                )}
                            </TERipple>
                        )}
                        {!infoUser ? (
                            <button
                                onClick={() => setShowModa2l(true)}
                                className="bg-white border-2 border-blue-600 text-blue-600 py-3 px-5 hover:text-white hover:bg-blue-600 font-medium rounded-lg"
                            >
                                <AiOutlineHeart className="inline-block text mr-2 text-xl " />{" "}
                                Lưu tin
                            </button>

                        ) : (
                            <button
                                className={`bg-white border-2 py-3 font-medium rounded-lg px-4 ${isJobSaved
                                    ? 'text-blue-500  border-blue-600'
                                    : 'text-blue-600 hover:text-white hover:bg-blue-600 border-blue-600 hover:border-blue-700'
                                    }`}
                                onClick={isJobSaved ? onCancelSaveJob : onSaveJob}
                            >
                                {isJobSaved ? 'Bỏ lưu' : 'Lưu việc làm'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="">
                <div className="border border-gray-100 p-3">
                    <h2 className="font-semibold text-lg">Chia sẻ tin tuyển dụng</h2>
                    <div className="my-3">
                        <p>sao chép đường dẫn</p>
                        <span>
                            <input
                                id="inputElement"
                                value={'https://123job.vn/viec-lam/tuyen-lai-xe-tainhan-bo-tuc-va-phu-xe-giao-banh-keo-tai-bac-giang-l5DOE8ngrV'}
                                type="text" disabled className="p-2 w-4/5 rounded" />
                            <button onClick={copyToClipboard} className="bg-[#4688ff26] text-blue-500 text-xl p-3 rounded ml-2"><AiOutlineCopy /></button>
                        </span>
                    </div>
                    <p>Chia sẻ qua mạng xã hội</p>
                    <span className="text-5xl flex gap-2 pt-2">
                        <a href=""><AiFillFacebook className="text-blue-500" /></a>
                        <a href=""><AiFillTwitterSquare className=" text-blue-500" /></a>
                        <a href=""><AiFillLinkedin className="text-blue-500" /></a>
                    </span>
                </div>
                <div className="border border-gray-100 p-3 my-4">
                    <h2 className="font-semibold text-base">Báo cáo tin tuyển dụng</h2>
                    <p className="my-3">
                        Nếu bạn thấy rằng tin tuyển dụng này không đúng hoặc có một trong các dấu hiệu lừa đảo: yêu cầu nộp tiền phỏng vấn, phí giữ chỗ, phí đồng phục ...
                    </p>
                    <button className="flex items-center gap-2 text-[#666] bg-[#f6f7f9] w-full justify-center rounded-md py-3">
                        <AiOutlineWarning />
                        <p>Báo cáo tin tuyển dụng</p>
                    </button>
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
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <Link to="/forgot" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>

                                </div>
                                <div className="flex justify-center">
                                    <button className="rounded-lg bg-gray-200 text-black flex items-center space-x-2 px-9 py-2 mt-4 mr-2">
                                        <span className="w-10"><FcGoogle /></span>

                                        <span> Google</span>
                                    </button>
                                    <button className="rounded-lg bg-blue-800 text-white flex items-center space-x-2 px-9 py-2 mt-4 ml-2">
                                        <span className="w-10">< SlSocialFacebook /></span>
                                        <span> Facebook</span>
                                    </button>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full mx-auto text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <Link to="/dang=ky-tai-khoan" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng ký </Link>
                                </p>
                            </form>
                        </TEModalBody>

                    </TEModalContent>
                </TEModalDialog>
            </TEModal>
            <TEModal show={showModal} setShow={setShowModal}>
                <TEModalDialog size="lg">
                    <TEModalContent>
                        <TEModalHeader style={{ alignItems: "start" }}>
                            {/* <!--Modal title--> */}
                            <h5 className="text-xl font-semibold leading-normal text-gray-700">
                                Ứng Tuyển
                                <span className="ml-2 text-blue-600">{listOne?.title}</span>
                            </h5>

                            {/* <!--Close button--> */}
                            <button
                                type="button"
                                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                                aria-label="Close"
                            >
                                <AiOutlineClose className="w-5 h-5" />
                            </button>
                        </TEModalHeader>
                        {/*ứng tuyển */}
                        <form onSubmit={handleSubmit(onHandleSubmit)}>
                            <TEModalBody className="leading-8">
                                <p className="text-base text-gray-900 my-2">
                                    Tải lên CV từ máy tính
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="">
                                        <label htmlFor="">
                                            Họ Tên <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Nhập tên của bạn"
                                            className="border py-1 px-2 outline-none rounded w-full my-2"
                                            {...register("name")}
                                        />
                                        <div className="text-sm text-red-500">
                                            {errors.name && errors.name.message}
                                        </div>
                                    </div>
                                    <div className="">
                                        <label htmlFor="">
                                            Email<span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Nhập tên email của bạn"
                                            className="border py-1 px-2 outline-none rounded w-full my-2"
                                            {...register("email")}
                                        />
                                        <div className="text-sm text-red-500">
                                            {errors.email && errors.email.message}
                                        </div>
                                    </div>
                                    <div className="">
                                        <label htmlFor="">
                                            Số điện thoại <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Nhập số điện thoại của bạn"
                                            className="border py-1 px-2 outline-none rounded w-full my-2"
                                            {...register("phone")}
                                        />
                                        <div className="text-sm text-red-500">
                                            {errors.phone && errors.phone.message}
                                        </div>
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="">
                                            CV của bạn <span className="text-red-500">*</span>
                                            <i className="text-xs ml-2 text-red-500">Chỉ nhận file PDF</i>
                                        </label>
                                        <input
                                            className="border py-1 w-full "
                                            type="file"
                                            {...register("path_cv")}
                                            onChange={onChangeFile}
                                            accept=".pdf"
                                        />
                                        <div className="text-sm text-red-500">
                                            {errors.path_cv && errors.path_cv.message}
                                        </div>
                                    </div>
                                </div>
                                {!listAllCv ? "" : (
                                    <div>
                                        <p>*Cv của bạn</p>
                                        <select
                                            {...register('curriculum_vitae_id')}
                                            className="border px-2 py-2 outline-none rounded"
                                        >
                                            <option value="">Vui lòng chọn</option>
                                            {listAllCv?.map((item: any) => {
                                                return (
                                                    <option key={item?.id} value={item?.id}>{item?.title}</option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                )}

                                <div>
                                    <label className="text-gray-700" htmlFor="message">
                                        Thư mô tả
                                    </label>
                                    <textarea
                                        {...register("introduce")}
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm outline-none border border-solid "
                                        placeholder="Viết thư giới thiệu bản thân (điểm mạnh điểm yếu,...). Đây là cách gây ấn tượng với nhà tuyển dụng nếu bạn chưa có kinh nhiệm làm việc hoặc CV không tốt"
                                        rows={4}
                                        id="message"
                                    ></textarea>
                                </div>
                                <i className="text-yellow-500">Lưu ý: bạn chỉ được chọn tải CV lên hoặc chọn CV đã tạo trên hệ thống!</i>
                            </TEModalBody>
                            <TEModalFooter>
                                <TERipple rippleColor="light">
                                    <button
                                        type="button"
                                        className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Huỷ
                                    </button>
                                </TERipple>
                                <TERipple rippleColor="light">
                                    <button
                                        type="submit"
                                        className="ml-1 inline-block rounded bg-blue-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    >
                                        Ứng tuyển
                                    </button>
                                </TERipple>
                            </TEModalFooter>
                        </form>
                    </TEModalContent>
                </TEModalDialog>
            </TEModal>
        </div >
    )
});

export default TabNew