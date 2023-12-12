import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import { useAddEduMutation, useAddExpMutation, useAddProjectMutation, useAddSkillMutation, useDeleteEduMutation, useDeleteProjectMutation, useDeleteSkillMutation, useListCvQuery, useListInfoQuery, useRemoveExpMutation, useSaveCvMutation, useUpdateEduMutation, useUpdateExpMutation, useUpdateInfoProfileMutation, useUpdateProjectMutation, useUpdateSkillMutation } from '../../../api/cv/listCvApi';
import { useForm } from 'react-hook-form';
import { Notyf } from 'notyf';
import { IoTrashOutline } from 'react-icons/io5';
import { UploadImage } from '../../../components/upload';
import html2pdf from 'html2pdf.js';
import { GoDownload } from 'react-icons/go';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormEdu, FormExp, FormProfile, FormProject, FormSkill, schemaProfile } from '../../../schemas/svSchema';
import { IoIosArrowBack } from 'react-icons/io';


const CreateCvTest = React.memo(() => {
    const notyf = new Notyf({
        duration: 4000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
    const { id }: any = useParams();
    const [image, setImage] = useState<any>(null);
    const { data: dataCV } = useListCvQuery();

    const dataMap = dataCV?.data?.find((item: any) => item.id == id)
    const { data: getCV } = useListInfoQuery(id || '');
    const idPost = dataMap?.id;
    const { data } = useListInfoQuery(idPost || '');
    //call api update info cv
    const [updateInfoCv] = useUpdateInfoProfileMutation();

    const listProfile = data?.profile?.cv;
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormProfile>({
        resolver: yupResolver(schemaProfile)
    });
    const onHandleSubmit = async (data: any) => {
        data.image = image;
        try {
            await updateInfoCv({
                id: idPost,
                ...data
            }).unwrap();
            notyf.success("Cập nhật thông tin thành công")
        } catch (error: any) {
            notyf.error(error?.data?.error)
        }
    }
    //profile
    const [profile, setProfile] = useState({ title: '', careers_goal: "", name: '', birth: "", phone: "", email: '', address: '', image: "" });
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };
    //skill
    const [addSkill] = useAddSkillMutation();
    const [deleteSkill] = useDeleteSkillMutation();
    const listSkill = getCV?.profile?.skill_cv;
    const [updateSkill] = useUpdateSkillMutation();
    const { register: registerSkill, handleSubmit: handleSubmitSkill, getValues, reset: resetSkill } = useForm<FormSkill>();

    const onHandleSubmitSkill = async (data: any, skillId?: string) => {
        try {
            if (skillId) {
                await updateSkill({
                    id: skillId,
                    profile_id: idPost,
                    ...data,
                }).unwrap();
                notyf.success("Cập nhật kỹ năng thành công");
            } else {
                await addSkill({
                    profile_id: idPost,
                    ...data,
                }).unwrap();
                notyf.success("Thêm kỹ năng thành công");
            }
            resetSkill();
        } catch (error: any) {
            if (error?.status === 422) {
                const errorFields = ['name_skill'];
                errorFields.forEach(field => {
                    const fieldErrors = error?.data?.error?.[field];
                    if (fieldErrors && fieldErrors.length > 0) {
                        fieldErrors.forEach((errorMessage: any) => {
                            notyf.error(errorMessage);
                        });
                    }
                });
            } else {
                notyf.error("Thêm kỹ năng thất bại");
            }
        }
    };

    const [skills, setSkills] = useState([{ name_skill: "" }]);
    const onHandleDeleteSkill = async (id: any) => {
        try {
            await deleteSkill(id).unwrap();
            notyf.success("Xóa kỹ năng thành công")

        } catch (error) {
            notyf.error("Xóa kỹ năng thất bại")
        }
    }

    const handleAddSkill = (e: any) => {
        e.preventDefault();
        setSkills([...skills, { name_skill: "" }]);
    };

    const handleRemoveSkill = (index: any) => {
        const updatedSkills = [...skills];
        updatedSkills.splice(index, 1);
        setSkills(updatedSkills);
    };

    const handleChangeSkill = (index: any, field: any, value: string) => {
        const updatedSkills: any = [...skills];
        updatedSkills[index][field] = value;
        setSkills(updatedSkills);
    };
    //project
    const [addProject] = useAddProjectMutation();
    const listProject = getCV?.profile?.projects;
    const [updateProject] = useUpdateProjectMutation();
    const {
        register: registerProject,
        handleSubmit: handleSubmitProject,
        reset: resetProject,
        getValues: getValuesProject,
    } = useForm<FormProject>({
        defaultValues: listProject
    });

    const onHandleSubmitProject = async (data: any, projectId?: string) => {
        try {
            if (projectId) {
                await updateProject({
                    id: projectId,
                    profile_id: idPost,
                    ...data
                }).unwrap();
                notyf.success("Cập nhật Dự án thành công");
            } else {
                await addProject({
                    profile_id: idPost,
                    ...data
                }).unwrap();
                notyf.success("Thêm Dự án thành công");
            }
            resetProject();
        } catch (error: any) {
            if (error?.status === 422) {
                const errorFields = ["project_name", "link_project", "position", 'desc', 'end_date', 'start_date'];
                errorFields.forEach(field => {
                    const fieldErrors = error?.data?.error?.[field];
                    if (fieldErrors && fieldErrors.length > 0) {
                        fieldErrors.forEach((errorMessage: any) => {
                            notyf.error(errorMessage);
                        });
                    }
                });
            } else {
                notyf.error("Thêm/Cập nhật thất bại");
            }
        }
    };
    //xóa dự án
    const [deleteProject] = useDeleteProjectMutation();
    const handleDeleteProject = async (id: string | number) => {
        try {
            await deleteProject(id).unwrap();
            notyf.success("Xóa học vấn thành công")

        } catch (error: any) {
            notyf.error(error)
        }
    }
    const [projects, setProjects] = useState([{ project_name: '', position: '', start_date: '', end_date: '', desc: "", link_project: '' }]);

    const handleAddProject = () => {
        setProjects([...projects, { project_name: '', position: '', start_date: '', end_date: '', desc: "", link_project: '' }]);
    };

    const handleRemoveProject = (index: any) => {
        const updatedProjects = [...projects];
        updatedProjects.splice(index, 1);
        setProjects(updatedProjects);
    };

    const handleChangeProject = (index: any, field: any, value: any) => {
        const updatedProjects: any = [...projects];
        updatedProjects[index][field] = value;
        setProjects(updatedProjects);
    };
    //học vấn
    const listEducation = getCV?.profile?.educations;

    const [addEducation] = useAddEduMutation();
    const [updateEdu] = useUpdateEduMutation();
    const {
        register: registerEducation,
        handleSubmit: handleSubmitEducation,
        getValues: getValuesEdu,
        reset: resetEducation,
        formState: { errors: errorsEdu }
    } = useForm<FormEdu>({
        defaultValues: listEducation
    });

    const onHandleSubmitEducation = async (data: any, educationId?: string) => {
        try {
            if (educationId) {
                await updateEdu({
                    id: educationId,
                    profile_id: idPost,
                    ...data
                }).unwrap();
                notyf.success("Cập nhật học vấn thành công");
            } else {
                await addEducation({
                    profile_id: idPost,
                    ...data
                }).unwrap();
                notyf.success("Thêm học vấn thành công");
            }
            resetEducation();
        } catch (error: any) {
            if (error?.status === 422) {
                const educationErrorFields = ["name", 'gpa', 'major', "end_date", "start_date"];
                educationErrorFields.forEach(field => {
                    const fieldErrors = error?.data?.error?.[field];
                    if (fieldErrors && fieldErrors.length > 0) {
                        fieldErrors.forEach((errorMessage: any) => {
                            notyf.error(errorMessage);
                        });
                    }
                });
            } else {
                notyf.error("Thêm/Cập nhật học vấn thất bại");
            }
        }
    };
    // xóa học vấn
    const [deleteEducation] = useDeleteEduMutation();
    const handleDeleteEducation = async (id: string | number) => {
        try {
            await deleteEducation(id).unwrap();
            notyf.success("Xóa học vấn thành công");

        } catch (error: any) {
            notyf.error("Xóa học vấn thất bại");

        }
    };
    const [education, setEducation] = useState([{ major: "", name: '', gpa: '', start_date: '', end_date: '', type_degree: "" }]);

    const handleAddEdu = () => {
        setEducation([...education, { major: "", name: '', gpa: '', start_date: '', end_date: '', type_degree: "" }]);
    };

    const handleRemoveEdu = (index: any) => {
        const updatedEdu = [...education];
        updatedEdu.splice(index, 1);
        setEducation(updatedEdu);
    };

    const handleChangeEdu = (index: any, field: any, value: any) => {
        const updatedEdu: any = [...education];
        updatedEdu[index][field] = value;
        setEducation(updatedEdu);
    };

    const [addExp] = useAddExpMutation();
    const listExp = getCV?.profile?.exps;
    const [updateExp] = useUpdateExpMutation();
    const { register: registerExp, handleSubmit: handleSubmitExp, reset: resetExp, getValues: getValuesExp } = useForm<FormExp>({
        defaultValues: listExp
    });
    const onHandleSubmitExp = async (data: any, expId?: string) => {
        try {
            if (expId) {
                await updateExp({
                    id: expId,
                    profile_id: idPost,
                    ...data,
                }).unwrap();
                notyf.success("Cập nhật dự án thành công");
            } else {
                await addExp({
                    profile_id: idPost,
                    ...data,
                }).unwrap();
                notyf.success("Thêm dự án thành công");
            }
            resetExp();
        } catch (error: any) {
            if (error?.status === 422) {
                const errorFields = ['company_name', 'position', 'end_date'];
                errorFields.forEach(field => {
                    const fieldErrors = error?.data?.error?.[field];
                    if (fieldErrors && fieldErrors.length > 0) {
                        fieldErrors.forEach((errorMessage: any) => {
                            notyf.error(errorMessage);
                        });
                    }
                });
            } else {
                notyf.error(error?.data?.message);
            }

        }
    };
    const [deleteExp] = useRemoveExpMutation();
    const handleDeleteExp = async (id: any) => {
        try {
            await deleteExp(id).unwrap();
            notyf.success("Xóa dự án thành công")
        } catch (error: any) {
            notyf.error(error)
        }
    }
    const [experience, setExperience] = useState([{ position: "", desc: "", company_name: '', start_date: '', end_date: '' }]);

    const handleAddExp = () => {
        setExperience([...experience, { position: "", desc: "", company_name: '', start_date: '', end_date: '' }]);
    };

    const handleRemoveExp = (index: any) => {
        const updatedExp = [...experience];
        updatedExp.splice(index, 1);
        setExperience(updatedExp);
    };

    const handleChangeExp = (index: any, field: any, value: any) => {
        const updatedExp: any = [...experience];
        updatedExp[index][field] = value;
        setExperience(updatedExp);
    };
    const [saveCv] = useSaveCvMutation();

    const handleSaveCv = async () => {
        try {
            const element = document.getElementById('pdf-content');
            const pdfOptions = {
                margin: [0, 0],
                filename: `CVbework.pdf`,
                image: { type: 'jpeg', quality: 1 },
                html2canvas: { scale: 3, useCORS: true, imageTimeout: 2000 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            };
            const pdfBlob = await html2pdf().set(pdfOptions).from(element).output('blob').then((data: any) => { return data });
            const cloudinaryResponse = await uploadToCloudinary(pdfBlob);
            await saveCv({
                id,
                path_cv: cloudinaryResponse.secure_url,
            }).unwrap();
            notyf.success("Lưu Cv thành công");
        } catch (error) {
            notyf.error("Lưu Cv thất bại");
        }
    };

    const uploadToCloudinary = async (pdfBlob: Blob) => {
        const formData = new FormData();
        formData.append('file', new Blob([pdfBlob], { type: 'application/pdf' }), `CV${profile?.title} bework.pdf`);

        formData.append('upload_preset', 'demo-upload');
        const name = "dxzlnojyv";
        const cloudinaryResponse = await fetch(`https://api.cloudinary.com/v1_1/${name}/upload`, {
            method: 'POST',
            body: formData,
        }).then((res) => res.json())
        return cloudinaryResponse;
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
                return error
            }
        }
    };

    const generatePDF = async () => {
        const element = document.getElementById('pdf-content');
        if (!element) {
            return;
        }
        try {
            await html2pdf(element, {
                margin: [0, 0],
                filename: `CV_${profile?.name} bework.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 4, useCORS: true, imageTimeout: 5000 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            });
        } catch (error) {

        }
    };

    useEffect(() => {
        //skill
        setSkills(listSkill);
        //profile
        setProfile(listProfile);
        // dự án
        setProjects(listProject);
        //kinh nghiệm
        setExperience(listExp);
        //học vấn
        setEducation(listEducation);
        //ed
        resetSkill(listSkill);
        resetProject(listProject);
        reset(listProfile);
        resetExp(experience as any);
        resetEducation(education as any);
        // window.scrollTo(0, 0)

    }, [listProfile, listExp, listEducation, listProject, listSkill]);

    return (
        <div className='max-w-screen-xl mx-auto'>

            {/* nhập */}
            <div className='mx-24 relative'>
                {/* thông tin cá nhân */}
                <div className='flex fixed top-16 mt-5    z-50 bg-white w-full '>
                    <Link to={'/user/listcv'} className='flex items-center gap-1'> <span><IoIosArrowBack /></span>  Quay lại</Link>
                    <div
                        className='flex justify-center rounded m-8'
                    >
                        <button
                            className='px-3 bg-blue-500 py-2 rounded text-white flex gap-2 items-center'
                            onClick={generatePDF}
                        >Tải CV
                            <GoDownload />
                        </button>
                        <button
                            className='px-3 mx-2 bg-blue-500 py-2 rounded text-white flex gap-2 items-center'
                            onClick={handleSaveCv}
                        >Lưu cv

                        </button>
                    </div>
                </div>

                <div className='mt-48'>
                    <h2 className='bg-[#304340] text-white text-lg font-semibold p-2 my-6'>Thông tin cá nhân</h2>
                    <form onSubmit={handleSubmit(onHandleSubmit)}>
                        <div className='border border-gray-200 p-5 grid grid-cols-3 gap-8'>
                            <div>
                                <label className='block font-semibold mb-2'>Hình ảnh</label>
                                <input
                                    {...register('image')}
                                    defaultValue={profile?.image}
                                    onChange={onChangeFile}
                                    type="file" className='border border-gray-200 p-2 w-full outline-none'
                                />
                                <img src={image} alt="" className=' rounded-full w-[100px]' />
                                <div className='text-red-500 text-sm outline-none'>
                                    {errors?.image && errors?.image?.message}
                                </div>
                            </div>

                            <div>
                                <label className='block font-semibold mb-2'>Vị trí ứng tuyển:</label>
                                <input
                                    {...register('title')}
                                    name='title'
                                    defaultValue={profile?.title}
                                    onChange={handleInputChange}
                                    type="text" className='border border-gray-200 p-2 w-full outline-none'
                                />

                            </div>
                            <div>
                                <label htmlFor="full-name" className='block font-semibold mb-2'>Họ tên:</label>
                                <input type="text"
                                    {...register('name')}
                                    name='name'
                                    defaultValue={profile?.name}
                                    onChange={handleInputChange}
                                    className='border border-gray-200 p-2 w-full outline-none' />
                                <div className='text-red-500 text-sm outline-none'>
                                    {errors?.name && errors?.name?.message}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="full-name" className='block font-semibold mb-2'>Số điện thoại:</label>
                                <input type="text"
                                    {...register('phone')}
                                    name='phone'
                                    defaultValue={profile?.phone}
                                    onChange={handleInputChange}
                                    className='border border-gray-200 p-2 w-full outline-none' />
                                <div className='text-red-500 text-sm outline-none'>
                                    {errors?.phone && errors?.phone?.message}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="full-name" className='block font-semibold mb-2'>Email:</label>
                                <input type="text"
                                    {...register('email')}
                                    defaultValue={profile?.email}
                                    onChange={handleInputChange}
                                    name='email'
                                    className='border border-gray-200 p-2 w-full outline-none'
                                />
                                <div className='text-red-500 text-sm outline-none'>
                                    {errors?.email && errors?.email?.message}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="full-name"
                                    className='block font-semibold mb-2'>Địa chỉ:</label>
                                <input type="text"
                                    {...register('address')}
                                    defaultValue={profile?.address}
                                    onChange={handleInputChange}
                                    className='border border-gray-200 p-2 w-full outline-none'
                                />
                                <div className='text-red-500 text-sm'>
                                    {errors?.address && errors?.address?.message}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="full-name"

                                    className='block font-semibold mb-2'>Ngày sinh</label>
                                <input type="date"
                                    {...register('birth')}
                                    defaultValue={profile?.birth}
                                    name='birth'
                                    onChange={handleInputChange} className='border border-gray-200 p-2 w-full outline-none'
                                />
                                <div className='text-red-500 text-sm'>
                                    {errors?.birth && errors?.birth?.message}
                                </div>
                            </div>
                            <div>
                                <label className='block font-semibold mb-2'>Mục tiêu nghề nghiệp</label>
                                <textarea
                                    {...register('careers_goal')}
                                    onChange={handleInputChange}
                                    defaultValue={profile?.careers_goal}
                                    className='border border-gray-200 p-2 w-full outline-none'
                                ></textarea>

                            </div>
                        </div>
                        <button className='mt-5 bg-blue-500 text-white rounded px-5 py-2'>Lưu</button>
                    </form>
                </div>
                {/* kinh nghiệm làm việc */}
                <div>
                    <h2 className='bg-[#304340] text-white text-lg font-semibold p-2 my-6'>Kinh nghiệm làm việc</h2>
                    {experience?.map((experiences: any, index) => (
                        <div key={index}>
                            <button
                                type="button"
                                onClick={() => handleDeleteExp(experiences?.id)}
                                className='bg-red-500 text-white p-1.5 '
                            >
                                <IoTrashOutline />
                            </button>

                            <form onSubmit={handleSubmitExp(() => onHandleSubmitExp(getValuesExp(), experiences?.id))}>
                                <div className='border border-gray-200 p-5 my-3 grid grid-cols-3 gap-8'>
                                    {/* tên công ty */}
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Tên công ty</div>
                                        </label>
                                        <input
                                            {...registerExp("company_name")}
                                            type="text"
                                            name='company_name'
                                            defaultValue={experiences?.company_name}
                                            onChange={(e) => handleChangeExp(index, 'company_name', e.target.value)}
                                            className='border outline-none border-gray-200 p-2 w-full'
                                        />
                                        {/* <div className='text-red-500 text-sm'>
                                            {errorsExp?.company_name && errorsExp?.company_name?.message}
                                        </div> */}
                                    </div>

                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Chức vụ</div>
                                        </label>
                                        <input
                                            {...registerExp("position")}
                                            type="text"
                                            name='position'
                                            defaultValue={experiences.position}
                                            onChange={(e) => handleChangeExp(index, 'position', e.target.value)}
                                            className='border outline-none border-gray-200 p-2 w-full'
                                        />
                                        {/* <div className='text-red-500 text-sm'>
                                            {errorsExp?.position && errorsExp?.position?.message}
                                        </div> */}
                                    </div>

                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveExp(index)}
                                            className='bg-red-500 text-white p-1.5 float-right'
                                        >
                                            <AiOutlineClose />
                                        </button>
                                    </div>
                                    {/* ngày bắt đầu */}
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Ngày bắt đầu</div>
                                        </label>
                                        <input
                                            {...registerExp('start_date')}
                                            name='start_date'
                                            defaultValue={experiences?.start_date}
                                            onChange={(e) => handleChangeExp(index, 'start_date', e.target.value)}
                                            className='border outline-none border-gray-200 p-2 w-full'
                                            type="date"
                                        />
                                        {/* <div className='text-red-500 text-sm'>
                                            {errorsExp?.start_date && errorsExp?.start_date?.message}
                                        </div> */}
                                    </div>
                                    {/* ngày kết thúc */}
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Ngày kết thúc</div>
                                        </label>
                                        <input
                                            {...registerExp('end_date')}
                                            name='end_date'
                                            defaultValue={experiences?.end_date}
                                            onChange={(e) => handleChangeExp(index, 'end_date', e.target.value)}
                                            className='border outline-none border-gray-200 p-2 w-full'
                                            type="date"
                                        />
                                        {/* <div className='text-red-500 text-sm'>
                                            {errorsExp?.end_date && errorsExp?.end_date?.message}
                                        </div> */}
                                    </div>
                                    <div>

                                        <label className='block font-semibold mb-2 '>
                                            <div>Mô tả</div>
                                        </label>
                                        <textarea
                                            {...registerExp("desc")}
                                            name='desc'
                                            defaultValue={experiences?.desc}
                                            onChange={(e) => handleChangeExp(index, 'desc', e.target.value)}
                                            className='border outline-none border-gray-200 p-2 w-full'
                                        ></textarea>
                                    </div>
                                </div>
                                <button className='mt-3 mb-2 bg-blue-500 text-white rounded px-5 py-2'>Lưu</button>

                            </form>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddExp} className='bg-blue-500 text-white p-1.5'>
                        <AiOutlinePlus />
                    </button>
                </div>
                {/* học vấn */}
                <div>
                    <h2 className='bg-[#304340] text-white text-lg font-semibold p-2 my-6'>Học vấn</h2>
                    {education?.map((educations: any, index) => (
                        <div key={index}>
                            <button
                                onClick={() => handleDeleteEducation(educations?.id)}
                                className='text-white bg-red-500 px-3 py-2 rounded'
                            > <IoTrashOutline /></button>
                            <form onSubmit={handleSubmitEducation(() => onHandleSubmitEducation(getValuesEdu(), educations?.id))}>
                                <div className='border border-gray-200 p-5 my-3 grid grid-cols-3 gap-8'>
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Trường học</div>
                                        </label>
                                        <input
                                            {...registerEducation('name')}
                                            type="text"
                                            name='name'
                                            defaultValue={educations?.name}
                                            onChange={(e: any) => handleChangeEdu(index, 'name', e.target.value)}
                                            className='border outline-none border-gray-200 p-2 w-full'
                                        />
                                        <div className='text-red-500 text-sm'>
                                            {errorsEdu?.name && errorsEdu?.name?.message}
                                        </div>
                                    </div>
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Điểm trung bình</div>
                                        </label>
                                        <input
                                            {...registerEducation('gpa')}
                                            name='gpa'
                                            min={0}
                                            max={10}
                                            defaultValue={educations?.gpa}
                                            onChange={(e) => handleChangeEdu(index, 'gpa', e.target.value)}
                                            className='border outline-none border-gray-200 p-2 w-full'
                                            type="text"
                                        />
                                        <div className='text-red-500 text-sm'>
                                            {errorsEdu?.gpa && errorsEdu?.gpa?.message}
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveEdu(index)}
                                            className='bg-red-500 outline-none text-white p-1.5 float-right'
                                        >
                                            <AiOutlineClose />
                                        </button>
                                    </div>
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Chuyên ngành</div>
                                        </label>
                                        <input
                                            {...registerEducation('major')}
                                            name='major'
                                            defaultValue={educations?.major}
                                            onChange={(e) => handleChangeEdu(index, 'major', e.target.value)}
                                            className='border outline-none border-gray-200 p-2 w-full'
                                            type="text"
                                        />

                                        <div className='text-red-500 text-sm'>
                                            {errorsEdu?.major && errorsEdu?.major?.message}
                                        </div>
                                    </div>
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Loại bằng</div>
                                        </label>
                                        <select
                                            {...registerEducation('type_degree')}
                                            defaultValue={educations?.type_degree}
                                            className='border  border-gray-200 p-2 w-full outline-none'
                                            onChange={(e: any) => handleChangeEdu(index, 'type_degree', e.target.value)}
                                        >
                                            <option value="1">
                                                Đại Học
                                            </option>
                                            <option
                                                value="2"
                                            >
                                                Cao đẳng
                                            </option>
                                            <option
                                                value="3"
                                            >
                                                Trung cấp
                                            </option>
                                            <option
                                                value="4"
                                            >
                                                Sau đại học(Tiến sĩ/Thạc sỹ)
                                            </option>
                                            <option
                                                value="5"
                                            >
                                                Trung tâm đào tạo
                                            </option>
                                            <option
                                                value="6"
                                            >
                                                Du Học
                                            </option>
                                        </select>
                                        <div className='text-red-500 text-sm'>
                                            {errorsEdu?.type_degree && errorsEdu?.type_degree?.message}
                                        </div>
                                    </div>

                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Ngày bắt đầu</div>
                                        </label>
                                        <input
                                            {...registerEducation('start_date')}
                                            name="start_date"
                                            onChange={(e) => handleChangeEdu(index, 'start_date', e.target.value)}
                                            defaultValue={educations?.start_date}
                                            className='border outline-none border-gray-200 p-2 w-full'
                                            type="date"
                                        />
                                        <div className='text-red-500 text-sm'>
                                            {errorsEdu?.start_date && errorsEdu?.start_date?.message}
                                        </div>
                                    </div>
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Ngày kết thúc</div>
                                        </label>
                                        <input
                                            {...registerEducation('end_date')}
                                            name="end_date"
                                            onChange={(e) => handleChangeEdu(index, 'end_date', e.target.value)}
                                            defaultValue={educations?.end_date}
                                            className='border outline-none border-gray-200 p-2 w-full'
                                            type="date"
                                        />
                                        <div className='text-red-500 text-sm'>
                                            {errorsEdu?.end_date && errorsEdu?.end_date?.message}
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className='bg-blue-500 text-white p-1.5 my-2 rounded'>
                                    Lưu
                                </button>
                            </form>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddEdu} className='bg-blue-500 text-white p-1.5'>
                        <AiOutlinePlus />
                    </button>
                </div>
                {/* kỹ năng */}
                <div>
                    <h2 className='bg-[#304340] text-white text-lg font-semibold p-2 my-6'>Kĩ năng</h2>
                    {skills?.map((skill: any, index) => (
                        <div key={index}>
                            <button
                                type="button"
                                onClick={() => onHandleDeleteSkill(skill?.id)}
                                className='bg-red-500 text-white p-1.5 '
                            >
                                <IoTrashOutline />
                            </button>
                            <form onSubmit={handleSubmitSkill(() => onHandleSubmitSkill(getValues(), skill?.id))}>
                                <div className='border border-gray-200 p-5 my-3'>
                                    <div>
                                        <label className='font-semibold mb-2 flex justify-between items-center'>
                                            <div>Kĩ năng</div>
                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveSkill(index)}
                                                    className='bg-red-500 text-white p-1.5 float-right'
                                                >
                                                    <AiOutlineClose />
                                                </button>
                                            </div>
                                        </label>
                                        <input
                                            {...registerSkill('name_skill')}
                                            type="text"
                                            name='name_skill'
                                            defaultValue={skill?.name_skill}
                                            onChange={(e) => handleChangeSkill(index, "name_skill", e.target.value)}
                                            className='border border-gray-200 p-2 w-full outline-none'
                                        />

                                    </div>
                                </div>
                                <button type="submit" className='bg-blue-500 text-white p-1.5 my-2 rounded'>
                                    Lưu
                                </button>
                            </form>
                        </div>
                    ))}
                    <button type="submit" className='bg-blue-500 text-white p-1.5' onClick={handleAddSkill}>
                        <AiOutlinePlus />
                    </button>
                </div>

                {/* dự án */}
                <div>
                    <h2 className='bg-[#304340] text-white text-lg font-semibold p-2 my-6'>Project</h2>
                    {projects?.map((project: any, index) => (
                        <div key={index}>
                            <button
                                type="button"
                                onClick={() => handleDeleteProject(project?.id)}
                                className='bg-red-500 text-white p-1.5 '
                            >
                                <IoTrashOutline />
                            </button>
                            <form onSubmit={handleSubmitProject(() => onHandleSubmitProject(getValuesProject(), project?.id))}>
                                <div className='border border-gray-200 p-5 my-3 grid grid-cols-3 gap-8'>
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Tên dự án</div>
                                        </label>
                                        <input
                                            {...registerProject('project_name')}
                                            type="text"
                                            name='project_name'
                                            defaultValue={project?.project_name}
                                            onChange={(e: any) => handleChangeProject(index, 'project_name', e.target.value)}
                                            className='border outline-none border-gray-200 p-2 w-full'
                                        />
                                    </div>
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Vị trí:</div>
                                        </label>
                                        <input
                                            {...registerProject('position')}
                                            type="text"
                                            name='position'
                                            defaultValue={project?.position}
                                            onChange={(e: any) => handleChangeProject(index, 'position', e.target.value)}
                                            className='border outline-none border-gray-200 p-2 w-full'
                                        />
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveProject(index)}
                                            className='bg-red-500 text-white p-1.5 float-right'
                                        >
                                            <AiOutlineClose />
                                        </button>
                                    </div>

                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Link dự án</div>
                                        </label>
                                        <input
                                            {...registerProject('link_project')}
                                            type="text"
                                            name='link_project'
                                            defaultValue={project?.link_project}
                                            onChange={(e) => handleChangeProject(index, 'link_project', e.target.value)}
                                            className='border outline-none border-gray-200 p-2 w-full'
                                        />
                                    </div>

                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Ngày bắt đầu</div>
                                        </label>
                                        <input
                                            {...registerProject('start_date')}
                                            type="date"
                                            name='start_date'
                                            defaultValue={project?.start_date}
                                            onChange={(e) => handleChangeProject(index, 'start_date', e.target.value)}
                                            className='border border-gray-200 p-2 w-full outline-none'
                                        />
                                    </div>
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Ngày kết thúc</div>
                                        </label>
                                        <input
                                            {...registerProject('end_date')}

                                            type="date"
                                            name='end_date'
                                            defaultValue={project?.end_date}
                                            onChange={(e) => handleChangeProject(index, 'end_date', e.target.value)}
                                            className='border border-gray-200 p-2 w-full outline-none'
                                        />
                                    </div>
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Mô tả dự án</div>
                                        </label>
                                        <textarea
                                            {...registerProject('desc')}
                                            name='desc'
                                            defaultValue={project?.desc}
                                            onChange={(e) => handleChangeProject(index, 'desc', e.target.value)}
                                            className='border outline-none border-gray-200 p-2 w-full'
                                        ></textarea>
                                    </div>
                                </div>
                                <button className='mt-3 mb-2 bg-blue-500 text-white rounded px-5 py-2'>Lưu</button>
                            </form>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddProject} className='bg-blue-500 text-white p-1.5'>
                        <AiOutlinePlus />
                    </button>
                </div>
            </div>

            {/* cv hiện */}
            <div className='border shadow-xl w-9/12 rounded mx-auto mt-6   '>
                <div className='grid grid-cols-6   w-12/12 mx-auto  my-6' id="pdf-content">
                    <div className=' col-span-2 px-7 border-r-2 py-12 text-sm'>
                        <div className=''>
                            <img className='w-40 h-40 mx-auto' src={profile?.image} alt="" />
                        </div>
                        <div className='text-center'>
                            <p className='text-xl font-semibold mt-5'>{profile?.name}</p>
                            <p className='border-b-2 my-3 border-gray-300 w-1/6 mx-auto'></p>
                            <p className='uppercase text-sm'>{profile?.title}</p>
                        </div>
                        <div className='my-5'>
                            <h2 className='text-xl my-3 font-semibold'>Thông tin cá nhân</h2>
                            <div className='leading-8'>
                                <p>Email: <span>{profile?.email}</span></p>
                                <p>Số điện thoại: <span>{profile?.phone}</span></p>
                                <p>Ngày sinh: <span>{profile?.birth}</span></p>
                                <p>Địa chỉ: <span>{profile?.address}</span></p>
                            </div>
                        </div>
                        <div>
                            <h2 className='text-xl my-3 font-semibold'>Kĩ năng</h2>
                            <div>
                                {skills?.map((item: any) => (
                                    <p key={item?.id} className='grid grid-cols-2'>{item?.name_skill} </p>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='bg-white col-span-4 px-7 py-12 flex flex-col gap-8 rounded-tr-lg rounded-br-xl'>
                        <p className='text-[#1e7a6b] text-xl font-semibold'>Mục tiêu nghề nghiệp</p>
                        <p>{profile?.careers_goal}</p>
                        <p className='border-b border-gray-200 my-2'></p>
                        <p className='text-[#1e7a6b] text-xl font-semibold'>Kinh nghiệm làm việc</p>
                        <p className='border-b border-gray-200 my-2'></p>
                        {experience?.map((item: any) => {
                            return (
                                <div key={item?.id}>
                                    <div className='flex flex-col gap-1'>
                                        <p className='font-semibold mt-2'>Tên công ty:
                                            <span className='font-normal ml-1'>{item?.company_name}</span>
                                        </p>
                                        <p className='font-semibold'>Thời gian:
                                            <span className=' py-1 px-2 rounded-lg mx-1'>{item?.start_date}</span>-
                                            <span className=' py-1 px-2 rounded-lg ml-1'>{item?.end_date}</span>
                                        </p>
                                        <p className='font-semibold mt-2'>Vị trí:
                                            <span className='font-normal ml-1'>{item?.position}</span>
                                        </p>
                                        <p className='font-semibold mt-2'>Mô tả:
                                            <span className='font-normal ml-1'>{item?.desc}</span>
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                        <div >
                            <p className='text-[#1e7a6b] text-xl font-semibold'>Học vấn</p>
                            <p className='border-b border-gray-200 my-2'></p>
                            {education?.map((item: any) => {
                                return (
                                    <div key={item?.id}>
                                        <p className=' font-semibold my-4 text-lg'>{item?.name}</p>
                                        <div className='flex flex-col gap-1'>
                                            <p className='font-semibold'>Chuyên ngành:
                                                <span className='font-normal ml-1'>{item?.major}</span>
                                            </p>
                                            <p className='font-semibold'>Thời gian:
                                                <span className=' py-1 px-2 rounded-lg mx-1'>{item?.start_date}</span>-
                                                <span className=' py-1 px-2 rounded-lg ml-1'>{item?.end_date}</span>
                                            </p>
                                            <p className='font-semibold'>Bằng cấp:
                                                <span className='font-normal ml-1'>{item?.type_degree}</span>
                                            </p>
                                            <p className='font-semibold'>GPA:
                                                <span className='font-normal ml-1'>{item?.gpa}</span>
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {!projects ? "" : (
                            <div>
                                <p className='text-[#1e7a6b] text-xl font-semibold'>Dự án</p>
                                <p className='border-b border-gray-200 my-2'></p>
                                {projects?.map((item: any) => {
                                    return (
                                        <div key={item?.id}>
                                            <p className=' font-semibold my-4 text-lg'>{item?.project_name}</p>
                                            <div className='flex flex-col gap-1'>
                                                <p className='font-semibold'>Thời gian:
                                                    <span className=' py-1 px-2 rounded-lg mx-1'>{item?.start_date}</span>-
                                                    <span className=' py-1 px-2 rounded-lg ml-1'>{item?.end_date}</span>
                                                </p>
                                                <p className='font-semibold mt-2'>Vị trí:
                                                    <span className='font-normal ml-1'>{item?.position}</span>
                                                </p>
                                                <p className='font-semibold'>Link:
                                                    <span className='underline font-normal ml-1'>{item?.link_project}</span>
                                                </p>

                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div
                className='flex justify-center rounded m-8'
            >
                <button
                    className='px-3 bg-blue-500 py-2 rounded text-white flex gap-2 items-center'
                    onClick={generatePDF}
                >Tải CV
                    <GoDownload />
                </button>
                <button
                    className='px-3 mx-2 bg-blue-500 py-2 rounded text-white flex gap-2 items-center'
                    onClick={handleSaveCv}
                >Lưu cv

                </button>
            </div>
        </div>
    )
});

export default CreateCvTest;