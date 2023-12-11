import { AiOutlineHome, AiTwotoneSetting } from 'react-icons/ai'
import { BsFillBuildingFill } from 'react-icons/bs'
import { MdOutlineStackedBarChart } from 'react-icons/md'
import { PiMoneyThin } from "react-icons/pi"
import { ImFilesEmpty } from "react-icons/im"
import { HiSquare3Stack3D } from "react-icons/hi2"
import { IoDocumentTextOutline } from "react-icons/io5"
import { Link } from 'react-router-dom'
import { useGetInforQuery } from '../../api/companies/jobPostCompany'


const SideBarCompany = () => {
    const { data: Infor } = useGetInforQuery();
    const listIcon = Infor?.company?.logo;
    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }
    return (
        <div className='p-2 border font-medium text-[#526484] text-sm sticky top-0 h-screen overflow-y-auto'>
            <div className='flex items-center gap-2'>
                {listIcon ? (
                    <img src={Infor?.company?.logo} className='rounded-full border p-1 w-12 h-12' alt="logo công ty" />
                ) : (
                    <img src="https://res.cloudinary.com/dxzlnojyv/image/upload/v1700739389/aa_ymumup.jpg" alt="icon" width={40} className='rounded-full' />
                )}
                <p>{Infor?.company?.company_name}</p>
            </div>
            <div className='flex items-center gap-3 mt-10 ml-4'>
                <p>  <BsFillBuildingFill /></p>
                <p className='mr-3'>ID tài khoản</p>
                <p className='text-blue-500 bg-blue-200 p-1 rounded text-xs'>{Infor?.company?.id}</p>
            </div>
            <div className='flex items-center gap-3 mt-6 ml-4'>
                <p className='text-xl'> <PiMoneyThin />  </p>
                <p className='mr-3'>Số xu</p>
                <p className='text-blue-500 bg-blue-200 p-1 rounded text-xs'>{Infor?.company?.coin} xu</p>
            </div>
            <Link to="/business" className='flex items-center gap-3 mt-6 ml-4'>
                <p className='text-xl'> <AiOutlineHome /> </p>
                <p className='mr-3'>Bảng tin</p>
            </Link>
            <Link to={"/business/jobs-manage"} className='flex items-center gap-3 mt-6 ml-4'>
                <p className='text-xl'> <IoDocumentTextOutline /> </p>
                <p className='mr-3'>Quản lý tuyển dụng</p>
            </Link>
            <Link to={"/business/cv-apply"} className='flex items-center gap-3 mt-6 ml-4'>
                <p className='text-xl'> <ImFilesEmpty /> </p>
                <p className='mr-3'>Hồ sơ ứng tuyển</p>
            </Link>
            <Link to="/business/reports" className='flex items-center gap-3 mt-6 ml-4'>
                <p className='text-xl'> <MdOutlineStackedBarChart /> </p>
                <p className='mr-3'>Báo cáo tổng quan</p>
            </Link>
            <Link to={'/business/transaction/add_money'} className='flex items-center gap-3 mt-6 ml-4'>
                <p className='text-xl'> <HiSquare3Stack3D /> </p>
                <p className='mr-3'>Lịch sử giao dịch</p>
            </Link>

            <div className='flex items-center gap-3 mt-6 ml-4'>
                <p className='text-xl'> <AiTwotoneSetting /> </p>
                <Link to='business_setting'><p className='mr-3'>Cài đặt tài khoản</p></Link>
            </div>

        </div>
    )
}

export default SideBarCompany