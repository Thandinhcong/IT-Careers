import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import { useAddEduMutation, useAddExpMutation, useAddProjectMutation, useAddSkillMutation, useDeleteEduMutation, useDeleteProjectMutation, useDeleteSkillMutation, useListCvQuery, useListInfoQuery, useRemoveExpMutation, useUpdateEduMutation, useUpdateExpMutation, useUpdateInfoProfileMutation, useUpdateProjectMutation, useUpdateSkillMutation } from '../../../api/cv/listCvApi';
import { useForm } from 'react-hook-form';
import { Notyf } from 'notyf';
import { IoTrashOutline } from 'react-icons/io5';
import { useGetMajorQuery } from '../../../api/manageWebsiteApi/manageWebApi';
import { UploadImage } from '../../../components/upload';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { GoDownload } from 'react-icons/go';
import { yupResolver } from '@hookform/resolvers/yup';
import { schemaProfile } from '../../../schemas/svSchema';
const CreateCvTest = React.memo(() => {
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
    const { id } = useParams();
    const [image, setImage] = useState<any>(null);
    const { data: dataCV } = useListCvQuery();

    const dataMap = dataCV?.data.find((item: any) => item.id == id)
    const { data: getCV } = useListInfoQuery(id || '');
    const idPost = dataMap?.id;
    const { data } = useListInfoQuery(idPost || '');
    //call api update info cv
    const [updateInfoCv] = useUpdateInfoProfileMutation();

    const listProfile = data?.profile?.cv;
    const { register, handleSubmit, reset, formState: { errors } } = useForm<any>({
        resolver: yupResolver(schemaProfile)
    });
    const onHandleSubmit = async (data: any) => {
        // if (typeof image !== "string") return;
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
    const [profile, setProfile] = useState({ title: '', name: '', birth: "", phone: "", email: '', address: '', image: "" });
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
    const { register: registerSkill, handleSubmit: handleSubmitSkill, getValues, reset: resetSkill } = useForm<any>({
        defaultValues: listSkill,
    });

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
                // Thêm kỹ năng mới
                await addSkill({
                    profile_id: idPost,
                    ...data,
                }).unwrap();
                notyf.success("Thêm kỹ năng thành công");
            }
            resetSkill();
        } catch (error) {
            console.log("Submit skill", error);
        }
    };

    const [skills, setSkills] = useState([{ name_skill: "" }]);
    const onHandleDeleteSkill = async (id: any) => {
        try {
            await deleteSkill(id).unwrap();
            notyf.success("Xóa kỹ năng thành công")

        } catch (error) {
            console.log("skill", error);
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
        getValues: getValuesProject
    } = useForm<any>({
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
        } catch (error) {
            console.log("Submit project", error);
            notyf.error("Thêm/Cập nhật thất bại");
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
    const { data: dataMajor } = useGetMajorQuery();
    const listMajor = dataMajor?.major;
    const listEducation = getCV?.profile?.educations;

    const [addEducation] = useAddEduMutation();
    const [updateEdu] = useUpdateEduMutation();
    const {
        register: registerEducation,
        handleSubmit: handleSubmitEducation,
        getValues: getValuesEdu,
        // setValue: setValueEdu,
        reset: resetEducation,
    } = useForm<any>({
        defaultValues: listEducation
    });

    const onHandleSubmitEducation = async (data: any, educationId?: string) => {
        console.log(data);

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
        } catch (error) {
            console.log("Submit education", error);
            notyf.error("Thêm/Cập nhật học vấn thất bại");
        }
    };
    // xóa học vấn
    const [deleteEducation] = useDeleteEduMutation();
    const handleDeleteEducation = async (id: string | number) => {
        try {
            await deleteEducation(id).unwrap();
            notyf.success("Xóa học vấn thành công")

        } catch (error: any) {
            notyf.error(error)
        }
    };
    const [education, setEducation] = useState([{ major_id: "", name: '', gpa: '', start_date: '', end_date: '', type_degree: "" }]);

    const handleAddEdu = () => {
        setEducation([...education, { major_id: "", name: '', gpa: '', start_date: '', end_date: '', type_degree: "" }]);
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
    // kinh nghiệm

    const [addExp] = useAddExpMutation();
    const listExp = getCV?.profile?.exps;
    const [updateExp] = useUpdateExpMutation();
    const { register: registerExp, handleSubmit: handleSubmitExp, reset: resetExp, getValues: getValuesExp } = useForm<any>({
        defaultValues: listExp
    });
    const onHandleSubmitExp = async (data: any, expId?: string) => {
        try {
            if (expId) {
                // Cập nhật dự án đã tồn tại
                const results = await updateExp({
                    id: expId,
                    profile_id: idPost,
                    ...data,
                }).unwrap();


                console.log(results);

                notyf.success("Cập nhật dự án thành công");
            } else {
                // Thêm dự án mới
                await addExp({
                    profile_id: idPost,
                    ...data,
                }).unwrap();
                notyf.success("Thêm dự án thành công");
            }
            resetExp(); // Đặt lại form sau khi submit
        } catch (error: any) {
            console.log("Submit experience", error);
            notyf.error(error?.data?.message);
        }
    };
    const [deleteExp] = useRemoveExpMutation();
    const handleDeleteExp = async (id: any) => {
        try {
            await deleteExp(id).unwrap();
            notyf.success("Xóa dự án thành công")
        } catch (error: any) {
            console.log(error);
            notyf.error(error)
        }
    }
    const [experience, setExperience] = useState([{ position: "", company_name: '', start_date: '', end_date: '' }]);

    const handleAddExp = () => {
        setExperience([...experience, { position: "", company_name: '', start_date: '', end_date: '' }]);
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
    // in pdf

    const generatePDF = async () => {
        try {
            const canvas: any = await html2canvas(document.getElementById('pdf-content') as any, {
                scale: 3,
                scrollY: -window.scrollY,
                useCORS: true,
            });
            if (!canvas) {
                console.error("Canvas is undefined.");
                return;
            }
            const imgData = canvas.toDataURL('image/jpeg');
            const pdf = new jsPDF('p', 'mm', 'a4');

            const pdfWidth = 210;
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            // Add the image to the PDF
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            pdf.setFontSize(8);
            pdf.text("© Bework.com", 1, pdfHeight + 1);

            pdf.save(`CV_${profile?.name}.pdf`);
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
        //reset
        resetSkill(listSkill);
        resetProject(listProject);
        reset(listProfile);
        resetExp(experience);
        resetEducation(education);

    }, [listProfile, listExp, listEducation, listProject, listSkill]);

    return (
        <div className='max-w-screen-xl mx-auto'>

            {/* nhập */}
            <div className='mx-24'>
                {/* thông tin cá nhân */}
                <div>
                    <h2 className='bg-[#304340] text-white text-lg font-semibold p-2 my-6'>Thông tin cá nhân</h2>
                    <form onSubmit={handleSubmit(onHandleSubmit)}>
                        <div className='border border-gray-200 p-5 grid grid-cols-3 gap-8'>
                            <div>
                                <label className='block font-semibold mb-2'>Hinh anh</label>
                                <input
                                    {...register('image')}
                                    defaultValue={profile?.image}
                                    onChange={onChangeFile}
                                    type="file" className='border border-gray-200 p-2 w-full'
                                />
                                <img src={image} alt="" className=' rounded-full w-[100px]' />

                            </div>
                            <div>
                                <label className='block font-semibold mb-2'>Vị trí ứng tuyển:</label>
                                <input
                                    {...register('title')}
                                    name='title'
                                    defaultValue={profile?.title}
                                    onChange={handleInputChange}
                                    type="text" className='border border-gray-200 p-2 w-full'
                                />
                            </div>
                            <div>
                                <label htmlFor="full-name" className='block font-semibold mb-2'>Họ tên:</label>
                                <input type="text"
                                    {...register('name')}
                                    name='name'
                                    defaultValue={profile?.name}
                                    onChange={handleInputChange}
                                    className='border border-gray-200 p-2 w-full' />
                            </div>
                            <div>
                                <label htmlFor="full-name" className='block font-semibold mb-2'>Số điện thoại:</label>
                                <input type="text"
                                    {...register('phone')}
                                    name='phone'
                                    defaultValue={profile?.phone}
                                    onChange={handleInputChange}
                                    className='border border-gray-200 p-2 w-full' />
                            </div>
                            <div>
                                <label htmlFor="full-name" className='block font-semibold mb-2'>Email:</label>
                                <input type="text"
                                    {...register('email')}
                                    defaultValue={profile?.email}
                                    onChange={handleInputChange}
                                    name='email'
                                    className='border border-gray-200 p-2 w-full'
                                />
                                <div className='text-red-500 text-sm'>
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
                                    className='border border-gray-200 p-2 w-full'
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
                                    onChange={handleInputChange} className='border border-gray-200 p-2 w-full'
                                />
                                <div className='text-red-500 text-sm'>
                                    {errors?.birth && errors?.birth?.message}
                                </div>
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
                                            className='border border-gray-200 p-2 w-full'
                                        />
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
                                            className='border border-gray-200 p-2 w-full'
                                        />
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
                                            className='border border-gray-200 p-2 w-full'
                                            type="date"
                                        />
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
                                            className='border border-gray-200 p-2 w-full'
                                            type="date"
                                        />
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
                                            className='border border-gray-200 p-2 w-full'
                                        />
                                    </div>
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Điểm trung bình</div>
                                        </label>
                                        <input
                                            {...registerEducation('gpa')}
                                            name='gpa'
                                            defaultValue={educations?.gpa}
                                            onChange={(e) => handleChangeEdu(index, 'gpa', e.target.value)}
                                            className='border border-gray-200 p-2 w-full'
                                            type="text"
                                        />
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveEdu(index)}
                                            className='bg-red-500 text-white p-1.5 float-right'
                                        >
                                            <AiOutlineClose />
                                        </button>
                                    </div>
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Chuyên ngành</div>
                                        </label>
                                        <select
                                            {...registerEducation('major_id')}
                                            defaultValue={educations?.major_id}
                                            className='border border-gray-200 p-2 w-full outline-none'
                                            onChange={(e: any) => handleChangeEdu(index, 'major_id', e.target.value)}
                                        >
                                            {listMajor?.map((item: any) => {
                                                return (<option
                                                    key={item?.id}
                                                    value={item?.id}
                                                >
                                                    {item?.major}
                                                </option>)
                                            })}

                                        </select>
                                    </div>
                                    <div>
                                        <label className='block font-semibold mb-2 '>
                                            <div>Loại bằng</div>
                                        </label>
                                        <select
                                            {...registerEducation('type_degree')}
                                            defaultValue={educations?.type_degree}
                                            className='border border-gray-200 p-2 w-full outline-none'
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
                                            className='border border-gray-200 p-2 w-full'
                                            type="date"
                                        />
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
                                            className='border border-gray-200 p-2 w-full'
                                            type="date"
                                        />
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
                                            className='border border-gray-200 p-2 w-full'
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
                                            className='border border-gray-200 p-2 w-full'
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
                                            className='border border-gray-200 p-2 w-full'
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
                                            <div>Mô tả dự án</div>
                                        </label>
                                        <input
                                            {...registerProject('desc')}
                                            type="text"
                                            name='desc'
                                            defaultValue={project?.desc}
                                            onChange={(e) => handleChangeProject(index, 'desc', e.target.value)}
                                            className='border border-gray-200 p-2 w-full'
                                        />
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
                                            className='border border-gray-200 p-2 w-full'
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
                                            className='border border-gray-200 p-2 w-full'
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
                                            className='border border-gray-200 p-2 w-full'
                                        />
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
            <div className='border shadow-xl rounded  w-10/12 mx-auto mt-6   '>
                <div className='grid grid-cols-6   w-10/12 mx-auto  my-6' id="pdf-content">
                    <div className=' col-span-2 px-7 border-r-2 py-12 '>
                        <div className=''>
                            <img className='w-28 h-28 rounded-full mx-auto' src={profile?.image} alt="" />
                        </div>
                        <div className='text-center'>
                            <p className='text-2xl font-semibold mt-5'>{profile?.name}</p>
                            <p className='border-b-2 my-3 border-gray-300 w-1/6 mx-auto'></p>
                            <p className='uppercase text-sm'>{profile?.title}</p>
                        </div>
                        <div className='my-5'>
                            <h2 className='text-xl my-3 font-semibold'>Thông tin cá nhân</h2>
                            <div className='leading-8'>
                                <p>Ngày sinh: <span>{profile?.birth}</span></p>
                                <p>Số điện thoại: <span>{profile?.phone}</span></p>
                                <p>Email: <span>{profile?.email}</span></p>
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
                                        <p className='font-semibold mt-2'>Mô tả:
                                            <span className='font-normal ml-1'>{item?.position}</span>
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
                                                <p className='font-semibold'>Mô tả:
                                                    <span className=' font-normal ml-1'>{item?.desc}</span>
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
            </div>
        </div>
    )
});

export default CreateCvTest;