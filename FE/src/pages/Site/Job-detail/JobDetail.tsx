import { useEffect, useState } from "react";
import {
    AiOutlineCheck,
    AiOutlineClose,
    AiOutlineContainer,
    AiOutlineHdd,
    AiOutlineHeart,
} from "react-icons/ai";
import SearchJobs from "../Recruit/SearchJobs";
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
import { useNavigate, useParams } from "react-router-dom";
import { useGetOneJobsQuery } from "../../../api/jobApi";
import { IListJobsDetail } from "../../../interfaces";
import { useGetInfoUserQuery } from "../../../api/auths";
import { useForm } from "react-hook-form";
import { useApplyJobMutation, useGetJobApplyQuery } from "../../../api/jobPostApply";
import { FromApply, schemaJobApply } from "../../../schemas/apply";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { UploadImage } from "../../../components/upload";

const JobDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    //lấy thông tin xem đã ứng tuyển chưa
    const { data: ListJobApply } = useGetJobApplyQuery();
    const listJob = ListJobApply?.job_list;

    const idJob = parseInt(id, 10);

    const isAlreadyApplied = listJob?.some((appliedJob:any) => appliedJob.id === idJob);

    const { data } = useGetOneJobsQuery(id || "");
    const listOne:IListJobsDetail = data?.job_detail;

    const { data: infoUser } = useGetInfoUserQuery();
    const user = infoUser?.candidate;
    const idUser = user?.id;
    const [applyJob] = useApplyJobMutation();
    const [image, setImage] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm<FromApply>({
        resolver: yupResolver(schemaJobApply),
    });
    const onHandleSubmit = async (job: FromApply) => {
        if (typeof image !== "string") return;
        job.path_cv = image;
        try {
            await applyJob({
                id: id,
                candidate_id: idUser,
                ...job,
            }).unwrap();

            Swal.fire({
                position: "top",
                icon: "success",
                title: "Ứng tuyển công việc thành công",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate('/job-detail/:name/:id')
        } catch (error) {
            Swal.fire({
                title: "Bạn đã ứng tuyển công việc này rồi !",
                confirmButtonText: "Quay lại tìm việc.",
            });
        }

    };
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

            }
        }
        console.log(files);

    }
    const [basicActive, setBasicActive] = useState("tab1");
    const [showModal, setShowModal] = useState(false);
    const handleBasicClick = (value: string) => {
        if (value === basicActive) {
            return;
        }
        setBasicActive(value);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <div className="max-w-screen-xl mx-auto">
                <SearchJobs />

            </div>
            <div className="bg-gray-50 py-6">
                <div className="max-w-screen-lg mx-auto bg-white p-4">
                    <div className="grid grid-cols-4 my-2 gap-10">
                        <div className="col-span-3">
                            <p className="font-bold text-2xl">{listOne?.title}</p>
                            <p className="uppercase my-3">{listOne?.company_name}</p>

                        </div>
                        <div className="flex flex-col gap-2">
                            {isAlreadyApplied ? (
                                <p className="px-2 text-base bg-blue-500 rounded-lg py-1 text-white">Bạn đã ứng tuyển công việc này!</p>
                            ) : (
                                <TERipple rippleColor="white" className="">
                                    <button
                                        type="button"
                                        className="w-full text-white border border-blue-600 bg-blue-600 py-3 hover:bg-blue-500 font-medium rounded-lg"
                                        onClick={() => setShowModal(true)}
                                    >
                                        <AiOutlineCheck className="inline-block text mr-2 text-xl" />
                                        Nộp hồ sơ online
                                    </button>
                                </TERipple>
                            )}
                            <button className="bg-white border-2 border-blue-600 text-blue-600 py-3 hover:text-white hover:bg-blue-600 font-medium rounded-lg">
                                <AiOutlineHeart className="inline-block text mr-2 text-xl" />{" "}
                                Lưu tin
                            </button>
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
                                <TabNew />
                            </TETabsPane>
                            <TETabsPane show={basicActive === "tab2"}>
                                <TabInfor />
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
                        {/* <!--Modal b ody--> */}
                        <form onSubmit={handleSubmit(onHandleSubmit)}>
                            <TEModalBody className="leading-8">
                                <p className="text-base text-gray-900 my-2">
                                    Tải lên CV từ máy tính
                                </p>
                                <p className="text-sm  text-gray-700">
                                    File doc, docx, pdf. Tối đa 5MB.
                                </p>
                                <div>
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
                                <div>
                                    <label className="text-gray-700" htmlFor="message">
                                        Thư mô tả
                                    </label>
                                    <textarea
                                        {...register("desc")}
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm outline-none border border-solid "
                                        placeholder="Viết thư giới thiệu bản thân (điểm mạnh điểm yếu,...). Đây là cách gây ấn tượng với nhà tuyển dụng nếu bạn chưa có kinh nhiệm làm việc hoặc CV không tốt"
                                        rows={4}
                                        id="message"
                                    ></textarea>
                                </div>
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

        </div>
    );
};

export default JobDetail;
