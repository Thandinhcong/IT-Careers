import { useEffect, useState } from 'react'
// import './main.css'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import { useAddExpMutation, useListCvQuery, useListInfoQuery, useUpdateInfoProfileMutation } from '../../../api/cv/listCvApi';
import { useForm } from 'react-hook-form';
import { Notyf } from 'notyf';
const CreateCvTest = () => {
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
    const { data: dataCV } = useListCvQuery();
    const idPost = dataCV?.data[0]?.id;
    const { data } = useListInfoQuery(idPost || '');
    //call api update info cv
    const [updateInfoCv] = useUpdateInfoProfileMutation();
    const listProfile = data?.profile?.cv;
    const { register, handleSubmit } = useForm<any>();
    const onHandleSubmit = async (data: any) => {
        try {
            await updateInfoCv({
                id: idPost,
                ...data
            }).unwrap();
        } catch (error: any) {
            notyf.error(error.message)
        }
    }
    //profile
    const [profile, setProfile] = useState({ title: '', name: '', birth: "", phone: "", email: '', address: '', });
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };
    //skill
    const [skills, setSkills] = useState(['']);

    const handleAddSkill = (e: any) => {
        e.preventDefault();
        setSkills([...skills, '']);
    };

    const handleRemoveSkill = (index: any) => {
        const updatedSkills = [...skills];
        updatedSkills.splice(index, 1);
        setSkills(updatedSkills);
    };

    const handleChangeSkill = (index: any, value: string) => {
        const updatedSkills = [...skills];
        updatedSkills[index] = value;
        setSkills(updatedSkills);
    };
    //project
    const [projects, setProjects] = useState([{ project_name: '', project_describe: '', start_date_project: '', end_date_project: '', project_link: '' }]);

    const handleAddProject = () => {
        setProjects([...projects, { project_name: '', project_describe: '', start_date_project: '', end_date_project: '', project_link: '' }]);
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
    const [education, setEducation] = useState([{ school: '', GPA: '', start_date_project: '', end_date_project: '' }]);

    const handleAddEdu = () => {
        setEducation([...education, { school: '', GPA: '', start_date_project: '', end_date_project: '' }]);
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
    const { register: registerExp, handleSubmit: handleSubmitExp } = useForm<any>();
    const onHandleSubmitExp = async (data: any) => {
        try {
            await addExp({
                profile_id: idPost,
                ...data
            }).unwrap();
        } catch (error) {

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



    useEffect(() => {
        if (listProfile) {
            setProfile(listProfile); // Cập nhật profile từ dữ liệu đã lấy
        }
    }, [listProfile]);

    return (
        <div className='max-w-screen-xl mx-auto'>
            {/* nhập */}
            <div className='mx-24'>
                <div>
                    <h2 className='bg-[#304340] text-white text-lg font-semibold p-2 my-6'>Thông tin cá nhân</h2>
                    <form onSubmit={handleSubmit(onHandleSubmit)}>
                        <div className='border border-gray-200 p-5 grid grid-cols-3 gap-8'>
                            <div>
                                <label className='block font-semibold mb-2'>Vị trí ứng tuyển:</label>
                                <input
                                    value={profile.title}
                                    {...register('title')}

                                    onChange={handleInputChange}
                                    type="text" className='border border-gray-200 p-2 w-full'

                                />
                            </div>
                            <div>
                                <label htmlFor="full-name" className='block font-semibold mb-2'>Họ tên:</label>
                                <input type="text"
                                    {...register('name')}
                                    name='name'

                                    value={profile.name}
                                    onChange={handleInputChange}
                                    className='border border-gray-200 p-2 w-full' />
                            </div>
                            <div>
                                <label htmlFor="full-name" className='block font-semibold mb-2'>Số điện thoại:</label>
                                <input type="text"
                                    {...register('phone')}
                                    name='phone'
                                    value={profile.phone}
                                    onChange={handleInputChange}
                                    className='border border-gray-200 p-2 w-full' />
                            </div>
                            <div>
                                <label htmlFor="full-name" className='block font-semibold mb-2'>Email:</label>
                                <input type="text"
                                    {...register('email')}
                                    value={profile.email}
                                    onChange={handleInputChange}
                                    name='email'
                                    className='border border-gray-200 p-2 w-full' />
                            </div>
                            <div>
                                <label htmlFor="full-name"
                                    className='block font-semibold mb-2'>Địa chỉ:</label>
                                <input type="text"
                                    value={profile.address}
                                    onChange={handleInputChange}
                                    name="address" className='border border-gray-200 p-2 w-full' />
                            </div>
                            <div>
                                <label htmlFor="full-name"

                                    className='block font-semibold mb-2'>Ngày sinh</label>
                                <input type="text"
                                    {...register('birth')}
                                    value={profile.birth}
                                    name='birth'
                                    onChange={handleInputChange} className='border border-gray-200 p-2 w-full' />
                            </div>

                        </div>
                        <button className='mt-5 bg-blue-500 text-white rounded px-5 py-2'>Lưu</button>
                    </form>
                </div>
                <div>
                    <h2 className='bg-[#304340] text-white text-lg font-semibold p-2 my-6'>Kinh nghiệm làm việc</h2>
                    {experience.map((experiences, index) => (
                        <form key={index} onSubmit={handleSubmitExp(onHandleSubmitExp)}>
                            <div className='border border-gray-200 p-5 my-3 grid grid-cols-3 gap-8'>
                                <div>
                                    <label className='block font-semibold mb-2 '>
                                        <div>Tên công ty</div>
                                    </label>
                                    <input
                                        {...registerExp("company_name")}
                                        type="text"
                                        name='company_name'
                                        value={experiences.company_name}
                                        onChange={(e) => handleChangeExp(index, 'company_name', e.target.value)}
                                        className='border border-gray-200 p-2 w-full'
                                    />
                                </div>

                                <div>
                                    <label className='block font-semibold mb-2 '>
                                        <div>Mô tả</div>
                                    </label>
                                    <input
                                        {...registerExp("position")}
                                        type="text"
                                        name='position'
                                        value={experiences.position}
                                        onChange={(e) => handleChangeExp(index, 'position', e.target.value)}
                                        className='border border-gray-200 p-2 w-full'
                                    />
                                </div>
                                {index > 0 && (
                                    <div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveExp(index)}
                                            className='bg-red-500 text-white p-1.5 float-right'
                                        >
                                            <AiOutlineClose />
                                        </button>
                                    </div>
                                )}
                                <div>
                                    <label className='block font-semibold mb-2 '>
                                        <div>Ngày bắt đầu</div>
                                    </label>
                                    <input
                                        type="text"
                                        {...registerExp('start_date')}
                                        name='start_date'
                                        value={experiences.start_date}
                                        onChange={(e) => handleChangeExp(index, 'start_date', e.target.value)}
                                        className='border border-gray-200 p-2 w-full'
                                    />
                                </div>

                                <div>
                                    <label className='block font-semibold mb-2 '>
                                        <div>Ngày kết thúc</div>
                                    </label>
                                    <input
                                        {...registerExp('end_date')}
                                        type="text"
                                        name='end_date'
                                        value={experiences.end_date}
                                        onChange={(e) => handleChangeExp(index, 'end_date', e.target.value)}
                                        className='border border-gray-200 p-2 w-full'
                                    />
                                </div>
                            </div>
                            <button className='mt-3 mb-2 bg-blue-500 text-white rounded px-5 py-2'>Lưu</button>

                        </form>
                    ))}
                    <button type="button" onClick={handleAddExp} className='bg-blue-500 text-white p-1.5'>
                        <AiOutlinePlus />
                    </button>
                </div>
                <div>
                    <h2 className='bg-[#304340] text-white text-lg font-semibold p-2 my-6'>Học vấn</h2>
                    {education.map((educations, index) => (
                        <div key={index} className='border border-gray-200 p-5 my-3 grid grid-cols-3 gap-8'>
                            <div>
                                <label className='block font-semibold mb-2 '>
                                    <div>Trường học</div>
                                </label>
                                <input
                                    type="text"
                                    name='project_name'
                                    value={educations.school}
                                    onChange={(e: any) => handleChangeEdu(index, 'school', e.target.value)}
                                    className='border border-gray-200 p-2 w-full'
                                />
                            </div>
                            <div>
                                <label className='block font-semibold mb-2 '>
                                    <div>Điểm trung bình</div>
                                </label>
                                <input
                                    type="text"
                                    name='project_describe'
                                    value={educations.GPA}
                                    onChange={(e) => handleChangeEdu(index, 'GPA', e.target.value)}
                                    className='border border-gray-200 p-2 w-full'
                                />
                            </div>
                            {index > 0 && (
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveEdu(index)}
                                        className='bg-red-500 text-white p-1.5 float-right'
                                    >
                                        <AiOutlineClose />
                                    </button>
                                </div>
                            )}


                            <div>
                                <label className='block font-semibold mb-2 '>
                                    <div>Ngày bắt đầu</div>
                                </label>
                                <input
                                    type="date"
                                    name='start_date_project'
                                    value={educations.start_date_project}
                                    onChange={(e) => handleChangeEdu(index, 'start_date_project', e.target.value)}
                                    className='border border-gray-200 p-2 w-full'
                                />
                            </div>
                            <div>
                                <label className='block font-semibold mb-2 '>
                                    <div>Ngày kết thúc</div>
                                </label>
                                <input
                                    type="date"
                                    name='end_date_project'
                                    value={educations.end_date_project}
                                    onChange={(e) => handleChangeEdu(index, 'end_date_project', e.target.value)}
                                    className='border border-gray-200 p-2 w-full'
                                />
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddEdu} className='bg-blue-500 text-white p-1.5'>
                        <AiOutlinePlus />
                    </button>
                </div>

                <div>
                    <h2 className='bg-[#304340] text-white text-lg font-semibold p-2 my-6'>Kĩ năng</h2>
                    {skills.map((skill, index) => (
                        <div key={index} className='border border-gray-200 p-5 my-3'>
                            <div>
                                <label className='font-semibold mb-2 flex justify-between items-center'>
                                    <div>Kĩ năng</div>
                                    {index > 0 && (
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveSkill(index)}
                                                className='bg-red-500 text-white p-1.5 float-right'
                                            >
                                                <AiOutlineClose />
                                            </button>
                                        </div>
                                    )}
                                </label>

                                <input
                                    type="text"
                                    name='skill'
                                    value={skill}
                                    onChange={(e) => handleChangeSkill(index, e.target.value)}
                                    className='border border-gray-200 p-2 w-full'
                                />
                            </div>

                        </div>
                    ))}
                    <button type="submit" className='bg-blue-500 text-white p-1.5' onClick={handleAddSkill}>
                        <AiOutlinePlus />
                    </button>
                </div>

                <div>
                    <h2 className='bg-[#304340] text-white text-lg font-semibold p-2 my-6'>Project</h2>
                    {projects.map((project, index) => (
                        <div key={index} className='border border-gray-200 p-5 my-3 grid grid-cols-3 gap-8'>
                            <div>
                                <label className='block font-semibold mb-2 '>
                                    <div>Tên đề tài</div>
                                </label>
                                <input
                                    type="text"
                                    name='project_name'
                                    value={project.project_name}
                                    onChange={(e: any) => handleChangeProject(index, 'project_name', e.target.value)}
                                    className='border border-gray-200 p-2 w-full'
                                />
                            </div>
                            <div>
                                <label className='block font-semibold mb-2 '>
                                    <div>Mô tả đề tài</div>
                                </label>
                                <input
                                    type="text"
                                    name='project_describe'
                                    value={project.project_describe}
                                    onChange={(e) => handleChangeProject(index, 'project_describe', e.target.value)}
                                    className='border border-gray-200 p-2 w-full'
                                />
                            </div>
                            {index > 0 && (
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveProject(index)}
                                        className='bg-red-500 text-white p-1.5 float-right'
                                    >
                                        <AiOutlineClose />
                                    </button>
                                </div>
                            )}
                            <div>
                                <label className='block font-semibold mb-2 '>
                                    <div>Link project</div>
                                </label>
                                <input
                                    type="text"
                                    name='project_link'
                                    value={project.project_link}
                                    onChange={(e) => handleChangeProject(index, 'project_link', e.target.value)}
                                    className='border border-gray-200 p-2 w-full'
                                />
                            </div>

                            <div>
                                <label className='block font-semibold mb-2 '>
                                    <div>Ngày bắt đầu</div>
                                </label>
                                <input
                                    type="date"
                                    name='start_date_project'
                                    value={project.start_date_project}
                                    onChange={(e) => handleChangeProject(index, 'start_date_project', e.target.value)}
                                    className='border border-gray-200 p-2 w-full'
                                />
                            </div>
                            <div>
                                <label className='block font-semibold mb-2 '>
                                    <div>Ngày kết thúc</div>
                                </label>
                                <input
                                    type="date"
                                    name='end_date_project'
                                    value={project.end_date_project}
                                    onChange={(e) => handleChangeProject(index, 'end_date_project', e.target.value)}
                                    className='border border-gray-200 p-2 w-full'
                                />
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddProject} className='bg-blue-500 text-white p-1.5'>
                        <AiOutlinePlus />
                    </button>
                </div>
            </div>

            {/* cv hiện */}
            <div className='grid grid-cols-6 border shadow-4xl w-10/12 mx-auto rounded-xl my-6'>
                <div className='bg-[#246b5f] col-span-2 px-7 text-white py-12 rounded-tl-lg rounded-bl-xl'>
                    <div className=''>
                        <img className='w-28 h-28 rounded-full mx-auto' src="https://th.bing.com/th/id/OIP.g-FcRsj_DrnzN7sIDOrsEwHaHa?w=176&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="" />
                    </div>
                    <div className='text-center'>
                        <p className='text-2xl font-semibold mt-5'>{profile.name}</p>
                        <p className='border-b-2 my-3 border-gray-300 w-1/6 mx-auto'></p>
                        <p className='uppercase text-sm'>{profile.title}</p>
                    </div>
                    <div className='my-5'>
                        <h2 className='text-xl my-3 font-semibold'>Thông tin cá nhân</h2>
                        <div className='leading-8'>
                            <p>Ngày sinh: <span>{profile.birth}</span></p>
                            <p>Số điện thoại: <span>{profile.phone}</span></p>
                            <p>Email: <span>{profile.email}</span></p>
                            <p>Địa chỉ: <span>{profile.address}</span></p>
                        </div>
                    </div>
                    <div>
                        <h2 className='text-xl my-3 font-semibold'>Kĩ năng</h2>
                        <div>
                            <p>{skills.join(', ')} </p>
                        </div>
                    </div>
                </div>
                <div className='bg-white col-span-4 px-7 py-12 flex flex-col gap-8 rounded-tr-lg rounded-br-xl'>
                    <p className='text-[#1e7a6b] text-xl font-semibold'>Kinh nghiệm làm việc</p>
                    <p className='border-b border-gray-200 my-2'></p>
                    {experience?.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className='flex flex-col gap-1'>
                                    <p className='font-semibold mt-2'>Tên công ty:
                                        <span className='font-normal ml-1'>{item.company_name}</span>
                                    </p>
                                    <p className='font-semibold'>Thời gian:
                                        <span className='bg-[#1b6256] text-white py-1 px-2 rounded-lg mx-1'>{item.start_date}</span>-
                                        <span className='bg-[#1b6256] text-white py-1 px-2 rounded-lg ml-1'>{item.end_date}</span>
                                    </p>
                                    <p className='font-semibold mt-2'>Mô tả:
                                        <span className='font-normal ml-1'>{item.position}</span>
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                    <div >
                        <p className='text-[#1e7a6b] text-xl font-semibold'>Học vấn</p>
                        <p className='border-b border-gray-200 my-2'></p>
                        {education?.map((item, index) => {
                            return (
                                <div key={index}>
                                    <p className='bg-gray-100 font-semibold my-4 text-lg'>{item.school}</p>
                                    <div className='flex flex-col gap-1'>
                                        <p className='font-semibold'>Thời gian:
                                            <span className='bg-[#1b6256] text-white py-1 px-2 rounded-lg mx-1'>{item?.start_date_project}</span>-
                                            <span className='bg-[#1b6256] text-white py-1 px-2 rounded-lg ml-1'>{item?.end_date_project}</span>
                                        </p>
                                        <p className='font-semibold'>GPA:
                                            <span className='font-normal ml-1'>{item?.GPA}</span>
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <p className='text-[#1e7a6b] text-xl font-semibold'>Dự án</p>
                        <p className='border-b border-gray-200 my-2'></p>
                        {projects?.map((item, index) => {
                            return <div key={index}>
                                <p className='bg-gray-100 font-semibold my-4 text-lg'>{item?.project_name}</p>
                                <div className='flex flex-col gap-1'>
                                    <p className='font-semibold'>Thời gian:
                                        <span className='bg-[#1b6256] text-white py-1 px-2 rounded-lg mx-1'>{item.start_date_project}</span>-
                                        <span className='bg-[#1b6256] text-white py-1 px-2 rounded-lg ml-1'>{item.end_date_project}</span>
                                    </p>
                                    <p className='font-semibold mt-2'>Mô tả:
                                        <span className='font-normal ml-1'>{item.project_describe}</span>
                                    </p>
                                    <p className='font-semibold'>Link github:
                                        <span className='underline font-normal ml-1'>{item.project_link}</span>
                                    </p>
                                </div>
                            </div>
                        })}


                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCvTest