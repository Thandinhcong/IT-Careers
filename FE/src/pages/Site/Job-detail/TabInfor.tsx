import { AiOutlineInsertRowRight, AiOutlineUser } from "react-icons/ai"
import { useParams } from "react-router-dom";
import { useGetOneJobsQuery } from "../../../api/jobApi";
import { IListJobsDetail } from "../../../interfaces";


const TabInfor = () => {
    const { id } = useParams();
    const { data } = useGetOneJobsQuery(id || "");
    const listOne: IListJobsDetail | undefined = data && data.job_detail;
    return (
        <div className="p-3 h-[550px] overflow-y-auto">
            <h2 className="font-semibold text-lg my-4">Thông tin nhà tuyển dụng</h2>
            <div className="flex gap-4">
                <img
                    className="w-16 h-16 border-2 rounded-full"
                    src="https://cdn1.123job.vn/123job/uploads/2023/10/01/2023_10_01______1843bd84f5554feda615d01cd2126ba0.jpg" alt="" />
                <div className="leading-8">
                    <p className="font-semibold">{listOne?.company_name}</p>
                    {/* <p><AiOutlineUser className="inline-block" /> Quy mô: 500-1000 nhân sự</p> */}
                    <p>
                        <AiOutlineInsertRowRight className="inline-block" />
                        Trụ sở: <span className="uppercase">{listOne?.address}</span>
                    </p>
                </div>
            </div>
            <h3 className="font-semibold my-2">Giới thiệu</h3>
            <p className="uppercase">{listOne?.company_name}</p>
        </div>
    )
}

export default TabInfor