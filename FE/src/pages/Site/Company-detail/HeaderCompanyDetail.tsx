import { AiFillStar, AiOutlineCreditCard, AiOutlineShareAlt } from "react-icons/ai"
import { Link, useParams } from "react-router-dom"
import { useGetOneCompanysQuery } from "../../../api/companyApi"
import { ICompanys } from "../../../interfaces";

const HeaderCompanyDetail = () => {
    const { id } = useParams();
    const { data } = useGetOneCompanysQuery(id || '');

    const listCompanyDetail: ICompanys | undefined = data && data.company && data.company[0];

    return (
        <div className="">
            <div className="relative">
                <img className="w-full h-56 object-cover rounded-md" src="https://cdn.123job.vn/123job/uploads/2019/09/18/2019_09_18______1fb35e2d67d725dbc249d3cfef3b7fa9.jpg" alt="" />
            </div>
            <div className="flex justify-between items-center px-8">

                <div className="grid grid-cols-8 gap-4 my-6">
                    <div className="col-span-1 border-2 border-gray-100 rounded-xl p-1 shadow-lg">
                        <img className=""
                            src={listCompanyDetail?.logo} alt="Anh lo go" />
                    </div>
                    <div className="col-span-7">
                        <div className="text-xl font-semibold">
                            <p>{listCompanyDetail?.name}</p>
                        </div>
                        <div className="flex items-center mt-3 text-gray-700">
                            <p className="font-semibold">2.5 <AiFillStar className="text-xl inline-block base-line text-[#9d2b6b]" /></p>
                            <p className="text-sm pl-5 mx-5 border-l-2"><span className="font-semibold text-2xl">100</span>%</p>
                            <p className="text-xs w-56">Mọi người đồng ý giới thiệu bạn bè làm việc tại đây</p>
                        </div>
                    </div>

                </div>
                <div className="flex gap-2">
                    <button className="text-white bg-blue-500 rounded-lg font-semibold w-40 flex items-center justify-center">
                        <AiFillStar />
                        <p>Theo dõi</p>
                    </button>
                    <Link to={'reviews'} className="bg-white text-blue-500 rounded-lg font-semibold w-40 flex items-center justify-center border border-blue-500">
                        <AiOutlineCreditCard />
                        <p>Viết review </p>
                    </Link>
                    <button className="bg-white text-blue-500 p-3 border border-blue-500 rounded-lg">
                        <AiOutlineShareAlt className="text-xl font-bold" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HeaderCompanyDetail