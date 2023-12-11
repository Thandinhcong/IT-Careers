import { useParams } from "react-router-dom"
import { useGetOneCompanysQuery } from "../../../api/companyApi"
import React from "react";
import { Skeleton } from "antd";

const HeaderCompanyDetail = React.memo(() => {
    const { id } = useParams();
    const { data, isLoading } = useGetOneCompanysQuery(id || '');
    const isImage = data?.company?.image_paper;
    const listCompanyDetail: any = data && data?.company;

    if (isLoading) return <Skeleton loading />
    return (
        <div className="">
            <div className="relative">
                {/* {!isImage ? ( */}
                <img className="w-full h-56 object-cover rounded-md" src="https://res.cloudinary.com/dxzlnojyv/image/upload/v1700832295/tech_r7rqqf.jpg" alt="ảnh banner" />
                {/* ) : (
                    <img className="w-full h-56 object-cover rounded-md" src={listCompanyDetail?.image_paper} alt="ảnh banner" />
                )} */}
            </div>
            <div className="flex justify-between items-center px-8">

                <div className="grid grid-cols-8 gap-4 my-6">
                    <div className="col-span-1 border-2 border-gray-100 rounded-xl p-1 shadow-lg">
                        <img className=""
                            src={listCompanyDetail?.logo} alt="Anh lo go" />
                    </div>
                    <div className="col-span-7">
                        <div className="text-xl font-semibold">
                            <p>{listCompanyDetail?.company_name}</p>
                        </div>
                        <div className="flex items-center mt-3 text-gray-700">

                            <p className="text-sm pl-5 mx-5 border-l-2"><span className="font-semibold text-2xl">100</span>%</p>
                            <p className="text-xs w-56">Mọi người đồng ý giới thiệu bạn bè làm việc tại đây</p>
                        </div>
                    </div>

                </div>
                <div className="flex gap-2">
                </div>
            </div>
        </div>
    )
});

export default HeaderCompanyDetail