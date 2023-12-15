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
import { Popconfirm, Spin } from 'antd';
import { IoIosAdd, IoMdStar, IoMdStarOutline } from 'react-icons/io';
import { LuUpload } from 'react-icons/lu';
const ListCV = React.memo(() => {
    const fileInputRef: any = useRef(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
    const [image, setImage] = useState<any>(null);
    const [titleFile, SetTitleFile] = useState<any>(null);

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
        // const confilm = window.confirm("Bạn có muốn xóa CV không ?");
        // if (confilm) {
        try {
            await deleteCV(id).unwrap();
            notyf.success('Xóa thành công')
        } catch (error: any) {
            notyf.error(error?.data?.message)
        }
        // }
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
                const maxFileSizeMB = 5;
                const fileSizeMB = files.size / (1024 * 1024);

                if (fileSizeMB > maxFileSizeMB) {
                    alert(`Kích thước tệp vượt quá ${maxFileSizeMB}MB.`);
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                    return;
                }
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
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className=''>
            <h2 className='text-2xl text-center my-10'>Quản lý CV</h2>
            {listCv && listCv.length ? (
                <div className='border border-solid border-gray-300 rounded px-5 w-[800px]'>
                    <i className='text-sm my-2 text-yellow-500'>Lưu ý: CV của bạn tải lên thì sẽ không được chỉnh sửa thông tin</i>
                    <div className='flex justify-between items-center'>
                        <p className='text-xl text-blue-500 my-5'>CV đã tạo trên Bework</p>
                        <button onClick={handleAddCV} className='text-white flex items-center bg-blue-500 px-3 py-2 rounded-full '>
                            <div className='text-2xl'>
                                <IoIosAdd />
                            </div>
                            Tạo mới
                        </button>
                    </div>
                    <div className='grid grid-cols-3 gap-5 '>
                        {listCv?.map((item: any) => {
                            if (item?.type === 1) {
                                return (
                                    <div className='Cv tải lên' key={item?.id}>
                                        <div className='shadow-sm my-5 shadow-blue-300 border h-40 py-4 px-3'>
                                            <p className='text-center'>Tiêu đề: {item?.title}</p>
                                            <div className='flex justify-center items-center gap-2 my-2'>
                                                <Popconfirm
                                                    title="xóa Cv"
                                                    description="Bạn có muốn xóa không?"
                                                    cancelText="No"
                                                    okText="Yes"
                                                    okType='default'
                                                    onConfirm={() => handleDelete(item?.id)}
                                                >
                                                    <button className='text-red-500 font-semibold '><GoTrash /></button>

                                                </Popconfirm>
                                                <Link to={item?.path_cv} target="_blank" rel="noopener noreferrer"><CgEye /></Link>

                                                {item?.type === 0 ? "" : (
                                                    <Link to={`/tao-cv/${item?.id}`}><CiEdit /></Link>
                                                )}
                                            </div>

                                            <div className='flex justify-center my-4 pt-2'>
                                                {item?.is_active === 1 ? (
                                                    <button
                                                        name='active'
                                                        className='text-yellow-500  text-2xl  px-3 py-2 rounded '
                                                        onClick={() => handleActive(item)}
                                                    ><IoMdStar /></button>
                                                ) : (
                                                    <button
                                                        name='active'
                                                        className='  text-2xl  px-3 py-2 rounded '
                                                        onClick={() => handleActive(item)}
                                                    ><IoMdStarOutline /></button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })}

                    </div>

                    <hr className='border border-blue-500' />
                    <div className='flex justify-between my-3 items-center'>

                        <p className='my-2 text-xl text-blue-500'>CV đã tải lên Bework</p>
                        <Link to={'/user/upload-cv'} className='text-white flex items-center bg-blue-500 px-3 py-2 rounded-full '>
                            <div className='text-xl'>
                                <LuUpload />
                            </div>
                            Tải cv lên
                        </Link>
                    </div>
                    <div className='grid grid-cols-3 gap-5 my-10 '>
                        {listCv?.map((item: any) => {
                            if (item?.type === 0) {
                                return (
                                    <div key={item?.id} className='Cv tải lên'>
                                        <div className='shadow-sm shadow-blue-300 border h-40 py-4 px-3'>
                                            <p className='text-center'>Tiêu đề: {item?.title}</p>
                                            <div className='flex justify-center items-center gap-2 my-2'>
                                                <Popconfirm
                                                    title="xóa Cv"
                                                    description="Bạn có muốn xóa không?"
                                                    cancelText="No"
                                                    okText="Yes"
                                                    okType='default'
                                                    onConfirm={() => handleDelete(item?.id)}
                                                >
                                                    <button className='text-red-500 font-semibold '><GoTrash /></button>
                                                </Popconfirm>
                                                <Link to={item?.path_cv} target="_blank" rel="noopener noreferrer"><CgEye /></Link>

                                                {item?.type === 0 ? "" : (
                                                    <Link to={`/tao-cv/${item?.id}`}><CiEdit /></Link>
                                                )}
                                            </div>

                                            <div className='flex justify-center my-4 pt-2'>
                                                {item?.is_active === 1 ? (
                                                    <button
                                                        name='active'
                                                        className='text-yellow-500  text-2xl  px-3 py-2 rounded '
                                                        onClick={() => handleActive(item)}
                                                    ><IoMdStar /></button>
                                                ) : (
                                                    <button
                                                        name='active'
                                                        className='  text-2xl  px-3 py-2 rounded '
                                                        onClick={() => handleActive(item)}
                                                    ><IoMdStarOutline /></button>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                );
                            }
                        })}
                    </div>
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
                            className=" w-full mt-5 border"
                        >
                            <div className='flex justify-center  my-5 px-5 py-5'>

                                <label className="block ">
                                    <span className="sr-only">Choose profile photo</span>
                                    <input
                                        type="file"
                                        {...register("path_cv")}
                                        onChange={onChangeFile}
                                        accept=".pdf"
                                        id="dropzone-file"
                                        ref={fileInputRef}
                                        disabled={loading}
                                        className="block w-full  text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-none dark:file:bg-blue-500 dark:hover:file:bg-blue-400"
                                    />
                                </label>
                                {loading && <span className="loading-text">  <Spin tip="Đang tải ảnh lên...">
                                </Spin></span>}
                            </div>
                            <div className='flex justify-center mb-5'>
                                <button className='border flex bg-blue-400 text-white px-2 py-1 rounded'>Upload</button>
                            </div>
                        </form>
                        <div className='text-center m-5'>
                            <button disabled={loading} onClick={handleAddCV} className='text-white bg-blue-500 px-3 py-2 rounded '>Tạo CV đầu tiên</button>
                        </div>
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