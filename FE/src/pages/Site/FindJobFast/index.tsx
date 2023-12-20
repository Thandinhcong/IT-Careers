import { Link } from "react-router-dom"
import { Button, Form, Input, Select } from 'antd';
import { useDataFastJobQuery, useFindJobFastMutation } from "../../../api/find-Job/find_jobApi";
import { Notyf } from "notyf";
import { useGetInfoUserQuery, useLoginMutation } from "../../../api/auths";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { TEModal, TEModalBody, TEModalContent, TEModalDialog, TEModalHeader } from "tw-elements-react";
import { FormLogin, schemaLogin } from "../../../schemas";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "../../../useLocalStorage/useLocalStorage";
import { yupResolver } from "@hookform/resolvers/yup";

const FindJobFast = () => {
    const { data } = useDataFastJobQuery();
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
    const [showModal2, setShowModa2l] = useState(false);
    const listProvince = data?.data?.province;
    const listExp = data?.data?.experiences;
    const listWorkingForm = data?.data?.working_form;
    const listJobPost = data?.data.job_position;
    const { data: infoUser, isLoading: isLoadingInfo } = useGetInfoUserQuery();
    const user = infoUser?.candidate;
    const idUser: any = user?.id;
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
    const [applyFast] = useFindJobFastMutation();
    const onFinish = async (values: any) => {
        try {
            await applyFast({
                candidate_id: idUser,
                ...values
            }).unwrap();
            notyf.success("Ứng tuyển nhanh thành công!")

        } catch (error: any) {
            notyf.error(error?.data?.message);
        }

    };

    const onFinishFailed = (errorInfo: any) => {
        notyf.error(errorInfo?.data?.message)

    };

    type FieldType = {
        search?: string
        working_form?: string;
        experiences?: string;
        province?: string;
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div className='max-w-6xl mx-auto my-10'>
            <h3 className='text-center text-2xl font-semibold mb-10 text-blue-500'>Tìm kiếm nhanh</h3>
            <p className="text-center text-base font-sans">Mỗi lần sử dụng bạn sẽ mất 30.000 coin. Tối đa bạn chỉ được sử dụng 1 lần / 1 ngày. Sử dụng chức năng sẽ giúp bạn apply vào bài tuyển dụng phù hợp một cách nhanh chống mà bạn không phải tìm xem từng bài tuyển dụng nào phù hợp với bạn.</p>
            <div className="text-center mt-1">Do bạn chưa tạo cv trên hệ thống. nên bạn hãy tìm kiếm bằng cách chọn chuyên ngành hoặc chọn kỹ năng bên dưới để sử dụng chức năng hoặc bạn có thể tạo cv <Link to="/user/listcv" className="text-blue-500">tại đây!</Link></div>
            {/* <div className="my-10 grid grid-cols-4 gap-5"> */}
            <Form
                // form={form}
                name="basic"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div className="grid grid-cols-5 gap-5 my-5">

                    <div className="col-span-1">
                        <Form.Item<FieldType>
                            label="Ngành nghề  quan tâm"
                            name="search"
                            rules={[{ required: true, message: 'Vui lòng nhập ngành nghề muốn tìm việc!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="col-span-1">
                        <Form.Item<any>
                            label="Tỉnh/Thành phố"
                            name='province'
                            rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố" }]}
                        >
                            <Select placeholder="--Chọn--" style={{ width: '100%' }}>
                                {listProvince?.map((options: any) => (
                                    <Select.Option key={options.id} value={options?.id}  >
                                        {options.province}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="col-span-1">

                        <Form.Item<any>
                            label="Kinh nghiệm làm việc"
                            name="experiences"
                            rules={[{ required: true, message: "Vui lòng chọn kinh nghiệm làm việc" }]}
                        >
                            <Select placeholder="--Chọn--" style={{ width: '100%' }} >
                                {listExp?.map((options: any) => (
                                    <Select.Option key={options.id} value={options?.id} >
                                        {options.experience}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="col-span-1">
                        <Form.Item<any>
                            label="Hình thức làm việc"
                            name="working_form"
                            rules={[{ required: true, message: "Vui lòng chọn hình thức làm việc" }]}
                        >
                            <Select placeholder="--Chọn--" style={{ width: '100%' }} >
                                {
                                    listWorkingForm?.map((options: any) => {
                                        return <Select.Option key={options.id} value={options.id}>
                                            {options?.working_form}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </div>
                    <div className="col-span-1">
                        <Form.Item<any>
                            label="Chức vụ"
                            name="job_position"
                            rules={[{ required: true, message: "Vui lòng chọn chức vụ!" }]}
                        >
                            <Select placeholder="--Chọn--" style={{ width: '100%' }} >
                                {
                                    listJobPost?.map((options: any) => {
                                        return <Select.Option key={options.id} value={options.id}>
                                            {options?.job_position}
                                        </Select.Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                {!user ? (
                    <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
                        <Button type="primary" onClick={() => setShowModa2l(true)} className='bg-blue-500 mb-10 mx-auto'>
                            Tìm kiếm
                        </Button>
                    </Form.Item>
                ) : (
                    <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
                        <Button type="primary" className='bg-blue-500 mb-10 mx-auto' htmlType="submit">
                            Tìm kiếm
                        </Button>
                    </Form.Item>
                )}
            </Form>
            <TEModal show={showModal2} setShow={setShowModa2l}>
                <TEModalDialog>
                    <TEModalContent>
                        <TEModalHeader>
                            Đăng nhập
                        </TEModalHeader>
                        <TEModalBody>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmitLogin(onHandleSubmitLogin)} >
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
                                    {/* <button className="rounded-lg w-full justify-center bg-gray-200 text-black flex items-center space-x-2 px-9 py-2 mt-4 mr-2">
                                        <span className="w-10"><FcGoogle /></span>
                                        <span> Google</span>
                                    </button> */}

                                </div>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Bạn chưa có tài khoản? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng ký </Link>
                                </p>
                            </form>
                        </TEModalBody>

                    </TEModalContent>
                </TEModalDialog>
            </TEModal>
        </div>

        // </div>
    )
}

export default FindJobFast