import { IoIosArrowRoundForward } from "react-icons/io";
import { useRev_statisticalQuery } from "../../../api/admin/statisticalApi"
import Statistical from "./Statistical";
import { Link } from "react-router-dom";
import ManageWebsite from "./ManageWebsite";
import React from "react";
import JobPost from "./JobPost";


const DashBoard = React.memo(() => {
    const { data } = useRev_statisticalQuery();
    const listCandidate = data?.countCandidate;
    const listCompanys = data?.countCompany;
    const listCv = data?.countCV;
    const listUser = data?.countUser;


    return (
        <div>
            <div className="grid grid-cols-4 gap-5  ">
                <div className="p-2 bg-green-500">
                    <p className="text-2xl text-white">{listCandidate?.length}</p>
                    <p className="mt-5 text-white">Ứng viên có trong hệ thống</p>
                    <Link to={'/admin/account-manage'} className="flex items-center gap-1 text-white mt-5 justify-center">Xem chi tiết <span><IoIosArrowRoundForward /></span></Link>
                </div>
                <div className="p-2 bg-blue-500 text-white">
                    <p className="text-2xl">{listCompanys?.length}</p>
                    <p className="mt-5">Công ty có trong hệ thống</p>
                    <Link to='/admin/company-manage' className="flex items-center gap-1 text-white mt-5 justify-center">Xem chi tiết <span><IoIosArrowRoundForward /></span></Link>
                </div>
                <div className="p-2 bg-yellow-500 text-white">
                    <p className="text-2xl">{listCv?.length}</p>
                    <p className="mt-5">CV có trong hệ thống</p>
                    <a className="flex items-center gap-1 text-white mt-5 justify-center">Xem chi tiết <span><IoIosArrowRoundForward /></span></a>
                </div>
                <div className="p-2 bg-red-400 text-white">
                    <p className="text-2xl">{listUser?.length}</p>
                    <p className="mt-5">Người dùng có trong hệ thống</p>
                    <Link to='#' className="flex items-center gap-1 text-white mt-5 justify-center">Xem chi tiết <span><IoIosArrowRoundForward /></span></Link>
                </div>
            </div>
            <ManageWebsite data={data} />
            <Statistical data={data} />
            <JobPost data={data} />
        </div>

    )
});

export default DashBoard