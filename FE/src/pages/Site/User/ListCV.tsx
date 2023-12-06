import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useActive_cvMutation, useAddCvMutation, useDelete_cvMutation, useListCvQuery, useUploadCVMutation } from '../../../api/cv/listCvApi';
import { Notyf } from 'notyf';
import { GoTrash } from 'react-icons/go';
import { CgEye } from 'react-icons/cg';
import { CiEdit } from 'react-icons/ci';
import React, { useEffect, useRef, useState } from 'react';
import { UploadImage } from '../../../components/upload';
import { useForm } from 'react-hook-form';
import { FromUpload } from '../../../schemas/apply';

const ListCV = React.memo(() => {
    const fileInputRef: any = useRef(null);
    const navigate = useNavigate();
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
    const [image, setImage] = useState<any>(null)
    const [titleFile, SetTitleFile] = useState<any>(null)

    const { data } = useListCvQuery();
    const listCv = data?.data;

    //tạo
    const [CreateCV] = useAddCvMutation();
    const handleAddCV = async (data: any) => {
        try {
            const response = await CreateCV(data).unwrap();
            notyf.success('Tạo thành công');
            const newID = response?.profile_id;
            navigate(`/tao-cv/${newID}`)
        } catch (error: any) {
            notyf.error(error?.data?.message)
        }
    }
    //upload
    const [UploadCv] = useUploadCVMutation();
    const { register, handleSubmit } = useForm<FromUpload>();

    const handleUploadCv = async (upload: FromUpload) => {
        upload.path_cv = image;
        upload.title = titleFile;
        try {
            await UploadCv(upload).unwrap();
            notyf.success('Tạo thành công');
        } catch (error: any) {
            console.log(error);

            if (error?.status === 400) {
                notyf.error(error.data.message)
                return;
            }
            notyf.error(error?.data?.error?.path_cv[0])
        }
    }
    //delete
    const [deleteCV] = useDelete_cvMutation();
    const handleDelete = async (id: any) => {
        const confilm = window.confirm("Bạn có muốn xóa CV không ?");
        if (confilm) {
            try {
                await deleteCV(id).unwrap();
                notyf.success('Xóa thành công')
            } catch (error: any) {
                notyf.error(error?.data?.message)
            }
        }
    }
    //active cv
    const [ActiveCv] = useActive_cvMutation();
    const handleActive = async (data: any) => {
        try {
            await ActiveCv(data).unwrap();
            notyf.success('Chọn cv chính thành công thành công!')
        } catch (error) {
            notyf.error('Bạn đã chọn cv này rồi!')
        }
    }
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
            try {
                const Response = await UploadImage({
                    file: files,
                    upload_preset: "demo-upload",
                });

                if (Response) {
                    setImage(Response.data.url);
                    SetTitleFile(Response.data.original_filename);
                }
            } catch (error) {
                return error
            }
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className=''>
            {listCv && listCv.length ? (
                <div className='border border-solid border-gray-300 rounded px-5 w-[800px]'>
                    <h2 className='text-2xl text-center my-10'>Quản lý CV</h2>
                    <div className='grid grid-cols-3 gap-5 '>
                        {listCv?.map((item: any) => {
                            return (
                                <div key={item?.id} className=' shadow-sm shadow-blue-300 border h-auto py-4 px-3'>
                                    <p className='text-center'>Tiêu đề: {item?.title}</p>
                                    <div className='flex justify-center items-center gap-2 my-2'>
                                        <button onClick={() => handleDelete(item?.id)} className='text-red-500 font-semibold '><GoTrash /></button>
                                        <Link to={item?.path_cv} target="_blank" rel="noopener noreferrer"><CgEye /></Link>
                                        {item?.type === 0 ? "" : (
                                            <Link to={`/tao-cv/${item?.id}`}><CiEdit /></Link>
                                        )}
                                    </div>
                                    <div className='flex justify-center my-4 pt-2'>
                                        <input
                                            type='radio'
                                            name='active'
                                            className='text-white  text-2xl bg-blue-500 px-3 py-2 rounded '
                                            onClick={() => handleActive(item)}
                                        ></input>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <form
                        onSubmit={handleSubmit(handleUploadCv)}
                        className="flex items-center justify-center w-full mt-5"
                    >
                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg
                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click tải lên</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Bạn chỉ có thể upload file PDF
                                </p>
                            </div>
                            <input
                                {...register("path_cv")}
                                onChange={onChangeFile}
                                accept=".pdf"
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                ref={fileInputRef}
                            />

                            <button className='border bg-blue-400 text-white px-2 py-1 rounded'>Upload</button>
                        </label>
                    </form>

                    <div className='text-center m-5'>
                        <button onClick={handleAddCV} className='text-white bg-blue-500 px-3 py-2 rounded '>Tạo CV</button>
                    </div>
                    <i className='text-yellow-600 text-sm'>*Lưu ý: sau khi tạo cv bạn cần cập nhật CV của mình</i>
                </div>

            ) : (
                <div className='flex justify-between shadow-sm shadow-blue-300 h-auto py-4'>
                    <div className='mt-10 pt-5 w-3/5 ml-10 mr-16'>
                        <b className='text-2xl'>Tạo CV đầu tiên trên BEWORK</b>
                        <p className='text-lg'>
                            Bạn đang muốn tạo ấn tượng tốt với nhà tuyển dụng trước lúc đi phỏng vấn?
                        </p>
                        <p className='text-lg'>Hãy dùng thử mẫu cv đẹp chuyên nghiệp và hiện đại trên BEWORK.</p>
                        <p className='text-lg'>Chúng tôi đồng hành cùng tạo cv toả sáng với nhà tuyển dụng</p>
                        <form
                            onSubmit={handleSubmit(handleUploadCv)}
                            className="flex items-center justify-center w-full mt-5"
                        >
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg
                                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click tải lên</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Bạn chỉ có thể upload file PDF
                                    </p>
                                </div>
                                <input
                                    {...register("path_cv")}
                                    onChange={onChangeFile}
                                    accept=".pdf"
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    ref={fileInputRef}

                                />

                                <button className='border bg-blue-400 text-white px-2 py-1 rounded'>Upload</button>
                            </label>
                        </form>
                    </div>
                    <div className='w-52 ml-5'>
                        <img src="https://123job.vn/images/banner/create-first-resume-logo.png" alt="" />
                    </div>
                </div>
            )}
        </div>
    )
});

export default ListCV