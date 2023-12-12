import React, { useEffect, useRef, useState } from 'react'
import { useUploadCVMutation } from '../../../api/cv/listCvApi';
import { useForm } from 'react-hook-form';
import { FromUpload } from '../../../schemas/apply';
import { Notyf } from 'notyf';
import { Spin } from 'antd';
import { UploadImage } from '../../../components/upload';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

const UploadCV = React.memo(() => {
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
    const navigate = useNavigate();
    const [UploadCv] = useUploadCVMutation();
    const fileInputRef: any = useRef(null);
    const [image, setImage] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [titleFile, SetTitleFile] = useState<any>(null);
    const { register, handleSubmit } = useForm<FromUpload>();

    const handleUploadCv = async (upload: FromUpload) => {
        upload.path_cv = image;
        upload.title = titleFile;
        try {
            await UploadCv(upload).unwrap();
            notyf.success('Tải lên thành công');
            navigate("/user/listcv")
        } catch (error: any) {
            if (error?.status === 400) {
                notyf.error(error.data.message)
                return;
            }
            notyf.error(error?.data?.error?.path_cv[0])
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
                setLoading(true);
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
            } finally {
                setLoading(false)
            }
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div className='w-full border '>
            <Link to="/user/listcv" className='flex items-center text-sm'> <IoIosArrowBack />     <span>Trở lại</span></Link>
            <div className=' px-5 py-5'>
                <h2 className='text-3xl text-blue-500'>Upload CV để các cơ hội việc làm tự tìm đến bạn</h2>
                <h5 className='text-2xl'>Giảm đến 50% thời gian cần thiết để tìm được một công việc phù hợp</h5>

            </div>
            <hr />
            <div className='px-5 py-5'>
                <p>Bạn đã có sẵn CV của mình, chỉ cần tải CV lên, hệ thống sẽ tự động đề xuất CV của bạn tới những nhà tuyển dụng uy tín. Tiết kiệm thời gian, tìm việc thông minh, nắm bắt cơ hội và làm chủ đường đua nghề nghiệp của chính mình.</p>
                <form
                    onSubmit={handleSubmit(handleUploadCv)}
                    className=" w-full mt-5 border "
                >
                    <div className='flex justify-center   my-5 px-5 py-5'>
                        <p></p>
                        <label className="block ">
                            <span className="sr-only">Choose profile photo</span>
                            <input
                                type="file"
                                {...register("path_cv")}
                                onChange={onChangeFile}
                                accept=".pdf"
                                id="dropzone-file"
                                disabled={loading}
                                ref={fileInputRef}
                                className="block w-full  text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-none dark:file:bg-blue-500 dark:hover:file:bg-blue-400"
                            />
                        </label>
                        {loading && <span className="loading-text">  <Spin tip="Đang tải ảnh lên...">
                        </Spin></span>}
                    </div>
                    <div className='flex justify-center mb-5'>
                        <button className='border flex bg-blue-500 text-white px-2 py-1 rounded'>Upload</button>
                    </div>
                </form>
                <span className='text-red-500'>*</span><i className='text-warning text-sm'>Hệ thống chỉ nhận file FDF và dung lượng file dưới 5MB</i>
            </div>
        </div>
    )
});

export default UploadCV