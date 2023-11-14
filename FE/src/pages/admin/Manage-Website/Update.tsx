import { Link, useNavigate, useParams } from "react-router-dom"
import { EnterOutlined } from "@ant-design/icons"
import React, { useState } from "react";
import { useGetManageOneWebsiteQuery, useUpdate_ManageMutation } from "../../../api/admin/manageWebsiteApi";
import { UploadImage } from "../../../components/upload";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormManage, schemaUpdateManage } from "../../../schemas/manage";
import { Skeleton, message } from "antd";

const UpdateManage = React.memo(() => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [UpdateManage, { isLoading: isUpdateLoading }] = useUpdate_ManageMutation();
    const { data, isLoading } = useGetManageOneWebsiteQuery(id || '');
    const listData = data?.man_web;
    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schemaUpdateManage),
        defaultValues: async () => {
            return await listData;
        }
    })
    if (isLoading) return <Skeleton />
    const onHandleSubmit = async (values: FormManage) => {
        if (typeof image !== "string") return;
        values.logo = image
        values.banner = image

        try {
            await UpdateManage({
                id,
                ...values,
            })
                .unwrap()
                .then(() => {
                    message.success("Cập nhật thành công!");
                    return navigate('/admin/manage-website');
                })

        } catch (error) {
            message.error("Cập nhật thất bại")
        }
    }
    const onChangeFile = async (e: any) => {
        const files = e.target.files[0];
        if (files) {
            try {
                const Res = await UploadImage({
                    file: files,
                    upload_preset: "demo-upload",
                });
                if (Res) {
                    setImage(Res.data.url);
                }
            } catch (error) {

            }
        }
    }
    if (isUpdateLoading) return <Skeleton />
    return (
        <div>
            <Link to="/admin/manage-website">Quay lại <EnterOutlined /></Link>
            <h2 className="m-6 text-2xl font-semibold">Cập Nhật Website </h2>
            <form onSubmit={handleSubmit(onHandleSubmit)}>
                <div className="grid grid-cols-2 gap-2">
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Logo
                        </label>

                        <input
                            {...register('logo')}
                            onChange={onChangeFile}
                            type="file"
                            className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Banner
                        </label>
                        <input
                            {...register('banner')}
                            onChange={onChangeFile}
                            type="file"
                            className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">

                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Tên website
                        </label>
                        <input
                            {...register("name_web")}
                            type="text"
                            className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />

                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Tên công ty
                        </label>
                        <input
                            {...register("company_name")}
                            type="text"
                            className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">

                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Email
                        </label>
                        <input
                            {...register("email")}
                            type="text"
                            className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Số điện thoại
                        </label>
                        <input
                            {...register("phone")}
                            type="text"
                            className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Số điện thoại liên hệ
                    </label>
                    <input
                        {...register("sdt_lienhe")}
                        type="text"
                        className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Cập nhật
                </button>
            </form>

        </div>
    )
});

export default UpdateManage  