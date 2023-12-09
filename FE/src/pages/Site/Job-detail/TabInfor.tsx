import { AiOutlineInsertRowRight, AiOutlineUser } from "react-icons/ai"
import React from "react";
import { IListJobs } from "../../../interfaces";
import { Link } from "react-router-dom";

type PropsListOne = {
    listOne: IListJobs
}
const TabInfor = React.memo((listOne: PropsListOne) => {
    const listCompanys = listOne?.listOne;
    return (
        <div className="p-3 h-[550px] overflow-y-auto">
            <h2 className="font-semibold text-lg my-4">Thông tin nhà tuyển dụng</h2>
            <div className="flex gap-4">
                {listCompanys?.logo === null ? (
                    <img
                        className="w-16 h-16 border-2 rounded-full"
                        src="https://res.cloudinary.com/dxzlnojyv/image/upload/v1700359570/glf34tttyauwoqpkbggt.png" />
                ) : (
                    <img
                        className="w-16 h-16 border-2 rounded-full"
                        src={listCompanys?.logo} />
                )}
                <div className="leading-8">
                    <Link to={`/company/detail/${listCompanys?.company_id}`}>
                        <p className="font-semibold">{listCompanys?.company_name}</p>
                    </Link>
                    <p><AiOutlineUser className="inline-block" /> Quy mô: {listCompanys?.company_size_min} - {listCompanys?.company_size_max} nhân sự</p>
                    <p>
                        <AiOutlineInsertRowRight className="inline-block" />
                        Trụ sở: <span className="uppercase">{listCompanys?.address}</span>
                    </p>
                </div>
            </div>
            <h3 className="font-semibold my-2">Giới thiệu</h3>
            <p className="uppercase">{listCompanys?.description}</p>
        </div>
    )
})

export default TabInfor