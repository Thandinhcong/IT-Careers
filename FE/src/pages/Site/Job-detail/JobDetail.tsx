import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineContainer, AiOutlineHdd } from "react-icons/ai";
import { LoadingOutlined } from '@ant-design/icons';
import {
    TETabs,
    TETabsContent,
    TETabsItem,
    TETabsPane,
} from "tw-elements-react";
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter,
} from "tw-elements-react";
import TabNew from "./TabNew";
import TabInfor from "./TabInfor";
import { Link, useParams } from "react-router-dom";
import { useGetOneJobsQuery } from "../../../api/jobApi";
import { useGetInfoUserQuery, useLoginMutation } from "../../../api/auths";
import { useForm } from "react-hook-form";
import { useApplyJobMutation, useGetJobApplyQuery } from "../../../api/jobPostApply";
import { FromApply, schemaJobApply } from "../../../schemas/apply";
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadImage } from "../../../components/upload";
import { FcGoogle } from "react-icons/fc";
import { FormLogin, schemaLogin } from "../../../schemas";
import { useLocalStorage } from "../../../useLocalStorage/useLocalStorage";
import { Notyf } from "notyf";
import { useListCvQuery } from "../../../api/cv/listCvApi";
import { Skeleton, Spin } from "antd";
import { useAddSaveJobsMutation, useGetAllSaveJobsQuery, useUnsaveJobMutation } from "../../../api/savejobpostapi";

const JobDetail = React.memo(() => {
    const fileInputRef: any = useRef(null);
    const curriculumVitaeIdRef: any = useRef(null);
    const [selectedOption, setSelectedOption] = useState<any>('upload');
    const [selectedCvId, setSelectedCvId] = useState(null);
    const [uploading, setUploading] = useState(false);
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
    const [basicActive, setBasicActive] = useState("tab1");
    const [showModal, setShowModal] = useState(false);
    const handleBasicClick = (value: string) => {
        if (value === basicActive) {
            return;
        }
        setBasicActive(value);
    };
    const [showModal2, setShowModa2l] = useState(false);

    const { id }: any = useParams();

    //lấy thông tin xem đã ứng tuyển chưa
    const { data: ListJobApply } = useGetJobApplyQuery();
    const listJob = ListJobApply?.job_list;

    const idJob: any = parseInt(id, 10);
    //so sánh id có trùng khớp không
    const isAlreadyApplied = listJob?.some((appliedJob: any) => appliedJob.id === idJob);
    //id bài đăng
    const [applyJob] = useApplyJobMutation();
    const { data, isLoading } = useGetOneJobsQuery(id || "");
    const { data: infoUser } = useGetInfoUserQuery();
    const user = infoUser?.candidate;
    const idUser: any = user?.id;
    const listOne: any = data?.job_detail;



    const [image, setImage] = useState(null);
    // ứng tuyển
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FromApply>({
        resolver: yupResolver(schemaJobApply),
    });
    const { data: listCv } = useListCvQuery();
    const listAllCv = listCv?.data;
    //login
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
    const onHandleSubmit = async (appply: FromApply) => {
        appply.path_cv = image as any;
        if (selectedOption === 'existing' && !selectedCvId) {
            notyf.error("Vui lòng chọn CV từ danh sách!");
            return;
        }

        if (selectedOption === 'upload' && image) {
            appply.path_cv = image;
        } else {
            appply.path_cv = null as any;
        }

        if (selectedOption === 'existing') {
            appply.curriculum_vitae_id = selectedCvId as any;
        }
        try {
            await applyJob({
                id: idJob,
                ...appply
            }).unwrap();
            notyf.success("Ứng tuyển thành công");
            setShowModal(false)
        } catch (error: any) {

            if (error?.data?.status === "fail") {
                notyf.error("Bài đăng đã bị khóa!");
                return;
            }
            notyf.error("Vui lòng chọn đầy đủ thông tin!");
        }
    };

    const isPDFFile = (fileName: any) => {
        const fileExtension = fileName?.split('.').pop()?.toLowerCase();
        return fileExtension === 'pdf';
    };


    const onChangeFile = async (e: any) => {
        const files = e.target.files[0];

        if (!isPDFFile(files?.name)) {
            alert("Vui lòng chọn một file PDF.");

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            return;
        }

        if (files) {
            const maxFileSizeMB = 5;
            const fileSizeMB = files.size / (1024 * 1024);

            if (fileSizeMB > maxFileSizeMB) {
                alert(`Kích thước tệp vượt quá ${maxFileSizeMB}MB.`);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                return;
            }
            try {
                setUploading(true);
                const Response = await UploadImage({
                    file: files,
                    upload_preset: "demo-upload",
                });

                if (Response) {
                    setImage(Response.data.url);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setUploading(false);
            }
        }
    };


    const { data: JobSave } = useGetAllSaveJobsQuery();
    const idSaveJob: any = parseInt(id, 10);
    const isJobSaved: any = JobSave?.data?.some((savedJob: any) => savedJob?.id === idSaveJob);

    const savedJob = listJob?.find((job: any) => job?.id === idSaveJob);
    //lưu việc làm
    const [saveJob] = useAddSaveJobsMutation();
    const [cancelSaveJob] = useUnsaveJobMutation();
    const handleSaveJob = async () => {
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
    const handleCancelSaveJob = async () => {
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

    const onOptionChange = (option: string) => {
        setSelectedOption(option);
        if (option === 'upload') {
            curriculumVitaeIdRef.current.value = null;
            setSelectedCvId(null);
        } else {
            fileInputRef.current.value = null;
        }
    };


    useEffect(() => {
        reset({
            name: user?.name,
            email: user?.email,
            phone: user?.phone
        })
        window.scrollTo(0, 0);
    }, [user?.name, user?.email, user?.phone, reset])


    if (isLoading) return <Skeleton loading />
    // if (isLoadingInfo) return <Skeleton />
    return (
        <div>

            <div className="bg-gray-50 py-6 ">
                <div className="max-w-screen-lg mx-auto bg-white p-4">
                    <div className="grid grid-cols-4 my-2 gap-10">
                        <div className="col-span-3">
                            <p className="font-bold text-2xl">{listOne?.title}</p>
                            <p className="uppercase my-3">{listOne?.company_name}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            {isAlreadyApplied ? (
                                <div>
                                    <div
                                        className="px-2 text-sm bg-blue-500 rounded-lg py-3 text-white text-center"
                                    >
                                        Đã ứng tuyển!
                                        <p>{savedJob?.time_apply}</p>
                                    </div>
                                </div>

                            ) : (

                                <TERipple rippleColor="white" className="">
                                    {!infoUser ? (
                                        <button
                                            type="button"
                                            className="w-full text-white border border-blue-600 bg-blue-600 py-3 hover:bg-blue-500 font-medium rounded-lg"
                                            onClick={() => setShowModa2l(true)}
                                        >
                                            Nộp hồ sơ online
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            className="w-full text-white border border-blue-600 bg-blue-600 py-3 hover:bg-blue-500 font-medium rounded-lg"
                                            onClick={() => setShowModal(true)}
                                        >
                                            Nộp hồ sơ online
                                        </button>
                                    )}
                                </TERipple>
                            )}
                            {!infoUser ? (
                                <button
                                    onClick={() => setShowModa2l(true)}
                                    className="bg-white border-2 border-blue-600 text-blue-600 py-3 hover:text-white hover:bg-blue-600 font-medium rounded-lg"
                                >
                                    Lưu việc làm
                                </button>

                            ) : (
                                <button
                                    className={`bg-white border-2 py-3 font-medium rounded-lg ${isJobSaved
                                        ? 'text-blue-500  border-blue-600'
                                        : 'text-blue-600 hover:text-white hover:bg-blue-600 border-blue-600 hover:border-blue-700'
                                        }`}
                                    onClick={isJobSaved ? handleCancelSaveJob : handleSaveJob}
                                >
                                    {isJobSaved ? 'Bỏ lưu' : 'Lưu việc làm'}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="mb-3">
                        <TETabs className="border-b">
                            <TETabsItem
                                onClick={() => handleBasicClick("tab1")}
                                active={basicActive === "tab1"}
                            >
                                <AiOutlineContainer className="inline-block mr-1" /> Tin tuyển
                                dụng
                            </TETabsItem>
                            <TETabsItem
                                onClick={() => handleBasicClick("tab2")}
                                active={basicActive === "tab2"}
                            >
                                <AiOutlineHdd className="inline-block mr-1" /> Thông tin công ty
                            </TETabsItem>
                        </TETabs>

                        <TETabsContent className="mt-4">
                            <TETabsPane show={basicActive === "tab1"}>
                                <TabNew
                                    isJobSaved={isJobSaved}
                                    onSaveJob={handleSaveJob}
                                    onCancelSaveJob={handleCancelSaveJob}
                                />
                            </TETabsPane>
                            <TETabsPane show={basicActive === "tab2"}>
                                <TabInfor listOne={listOne} />
                            </TETabsPane>
                        </TETabsContent>
                    </div>
                </div>
            </div>

            {/* ModalMain */}

            <TEModal show={showModal} setShow={setShowModal}>
                <TEModalDialog size="lg">
                    <TEModalContent>
                        <TEModalHeader style={{ alignItems: "start" }}>
                            {/* <!--Modal title--> */}
                            <h5 className="text-xl font-semibold leading-normal text-gray-700">
                                Ứng Tuyển
                                <span className="ml-2 text-blue-600">{listOne?.title}</span>
                            </h5>
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
                        <form onSubmit={handleSubmit(onHandleSubmit)} encType="multipart/form-data" >
                            <TEModalBody className="leading-8">

                                <div className="grid grid-cols-2 gap-2">
                                    <div className="">
                                        <label htmlFor="">
                                            Họ Tên <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            defaultValue={user?.name}
                                            {...register("name")}
                                            type="text"
                                            placeholder="Nhập tên của bạn"
                                            className="border py-1 px-2 outline-none rounded w-full my-2"
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
                                            {...register('email')}
                                            defaultValue={user?.email || ''}
                                            type="text"
                                            placeholder="Nhập tên email của bạn"
                                            className="border py-1 px-2 outline-none rounded w-full my-2"
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
                                            defaultValue={user?.phone}
                                            {...register("phone")}

                                            type="text"
                                            placeholder="Nhập số điện thoại của bạn"
                                            className="border py-1 px-2 outline-none rounded w-full my-2"
                                        />
                                        <div className="text-sm text-red-500">
                                            {errors.phone && errors.phone.message}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 ">
                                    <label className="flex items-center gap-2">
                                        <input
                                            className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-200"
                                            type="radio"
                                            value="upload"
                                            checked={selectedOption === 'upload'}
                                            onChange={() => onOptionChange('upload')}
                                        /> Tải cv mới lên
                                    </label>

                                    <label className="flex items-center gap-2">
                                        <input
                                            className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-200"
                                            type="radio"
                                            value="existing"
                                            checked={selectedOption === 'existing'}
                                            onChange={() => onOptionChange('existing')}
                                        /> Chọn từ cv đã có
                                    </label>
                                </div>
                                {selectedOption === 'upload' && (
                                    <div className="my-2">
                                        <label htmlFor="">
                                            Tải cv mới lên <span className="text-red-500">*</span>
                                            <i className="text-xs ml-2 text-red-500">Chỉ nhận file PDF & dung lượng dưới 5MB</i>
                                        </label>

                                        <input
                                            {...register("path_cv")}
                                            className={`border  py-1 w-full ${uploading ? 'loading' : ''}`}
                                            type="file"
                                            onChange={onChangeFile}
                                            accept=".pdf"
                                            disabled={uploading || selectedOption === 'existing'}
                                            ref={fileInputRef}
                                        />

                                        {uploading && (
                                            <span className="loading-text">
                                                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                                            </span>
                                        )}

                                        <div className="text-sm text-red-500">
                                            {errors.path_cv && errors.path_cv.message}
                                        </div>
                                    </div>
                                )}
                                {selectedOption === 'existing' && (
                                    <div>
                                        <p>Cv đã tạo trên website</p>
                                        <select
                                            id="cvSelect"
                                            {...register('curriculum_vitae_id')}
                                            className="border px-2 w-full py-2 outline-none rounded"
                                            disabled={selectedOption === 'upload'}
                                            onChange={(e: any) => setSelectedCvId(e.target.value)}
                                            ref={curriculumVitaeIdRef}
                                        >
                                            <option value="">Chọn CV</option>
                                            {listAllCv?.map((item: any) => (
                                                <option key={item?.id} value={item?.id}>
                                                    {item?.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                <div>
                                    <label className="text-gray-700" htmlFor="message">
                                        Thư xin việc
                                    </label>
                                    <textarea
                                        {...register("introduce")}
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm outline-none border border-solid "
                                        placeholder="Viết thư giới thiệu bản thân (điểm mạnh điểm yếu,...). Đây là cách gây ấn tượng với nhà tuyển dụng nếu bạn chưa có kinh nhiệm làm việc hoặc CV không tốt"
                                        rows={4}
                                        id="message"
                                    ></textarea>
                                    {errors?.introduce && errors?.introduce?.message}
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
        </div >
    );
});

export default JobDetail;
