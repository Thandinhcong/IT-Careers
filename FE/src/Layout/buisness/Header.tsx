import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react';
import { BiEdit, BiSearch } from "react-icons/bi"
import { IoCartOutline, IoSettingsOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { CiUser } from 'react-icons/ci';
import { PiSignOutLight } from 'react-icons/pi';
import { useGetInforQuery } from '../../api/companies/jobPostCompany';
import { useLogOutCompaniesMutation } from '../../api/auth/Companies';
import { Notyf } from 'notyf';

const HeaderCompany = () => {

    const { data: Infor } = useGetInforQuery();
    const listIcon = Infor?.company?.logo;
    const notyf = new Notyf({
        duration: 2000,
        position: {
            x: 'right',
            y: 'top',
        },
    });
    const [logout] = useLogOutCompaniesMutation()
    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('authCompany');
            notyf.success("Đăng xuấ thành công!");
            window.location.href = "/business/signin";
        } catch (error) {
            notyf.error('Đăng xuất không thành công: ');
        }
    };
    const CV = [
        { name: 'Thông tin liên hệ', href: '/business/business_setting', icon: <CiUser className="text-blue-500 text-xl" /> },
        { name: 'Thiết lập công ty', href: '/business/business_setting/company', icon: <IoSettingsOutline className="text-blue-500 text-xl" /> },
        {
            name: 'Đăng xuất',
            href: '#',
            onclick: () => {
                if (window.confirm('Bạn có chắc chắn muốn đăng xuất không?')) {
                    handleLogout();
                }
            },
            icon: <PiSignOutLight className="text-blue-500 text-xl" />,
        },
    ]
    return (
        <div className='border flex fixed top-0 w-[82%] z-50 right-0 max-w-screen-2xl items-center gap-2 p-2 font-medium justify-end bg-white shadow'>
            <Link to="/business/jobs/create" className='flex items-center gap-2 px-5 py-2 relative rounded text-white bg-blue-500 group'>
                <BiEdit />
                <p className='text-sm'>Đăng tin mới</p>
                <div className='absolute left-0 right-0 mx-auto -bottom-9 text-center bg-black text-white opacity-0 group-hover:opacity-100 text-xs px-3 rounded'>
                    Đăng mới một tin tuyển dụng
                </div>
            </Link>

            <Link to="deposit" className='flex items-center relative group  gap-2 px-5 py-2 rounded text-white  bg-blue-500'>
                <IoCartOutline />
                <p className='text-sm'>Mua xu</p>
                <div className='absolute left-0 right-0 mx-auto -bottom-9 text-center bg-black text-white opacity-0 group-hover:opacity-100 text-xs px-3 rounded'>
                    Mua xu, nạp tiền tài khoản
                </div>
            </Link>
            <Link to="/business/find-profile" className='flex items-center gap-2 px-5 py-2 rounded text-white  bg-blue-500'>
                <BiSearch />
                <p className='text-sm'>Tìm CV</p>
            </Link>
            {/* <Link to="find-profile" className='flex relative group items-center gap-2 px-5 py-2 rounded text-white  bg-blue-500'>
                <BiMessageRounded />
                <p className='text-sm'>Kết nối ứng viên</p>
                <div className='absolute left-0 right-0 mx-auto -bottom-14 text-center bg-black text-white opacity-0 group-hover:opacity-100 text-xs px-3 rounded'>
                    Kết nối nhanh với ứng viên có nhu cầu trong ngày
                </div>
            </Link> */}


            <Popover.Group className="hidden lg:flex outline-none lg:gap-x-5">
                <Popover className="relative">
                    <Popover.Button
                        className="flex outline-none items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                    >
                        {listIcon ? (
                            <img src={Infor?.company?.logo} className='rounded-full border p-1 w-12 h-12' alt="logo công ty" />
                        ) : (
                            <img src="https://res.cloudinary.com/dxzlnojyv/image/upload/v1700739389/aa_ymumup.jpg" alt="icon" width={40} className='rounded-full' />
                        )}
                    </Popover.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute -right-1 top-full z-10 mt-3 w-screen max-w-[250px] overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                            <div className="p-2">
                                {CV?.map((item: any) => (
                                    <div
                                        key={item.name}
                                        onClick={item.onclick}
                                        className="group relative flex items-center gap-2 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                    >
                                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">

                                            {item.icon}
                                        </div>
                                        <div className="flex-auto">
                                            <Link to={item.href} className="block font-semibold text-gray-900">
                                                {item.name}
                                                <span className="absolute inset-0" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Popover.Panel>
                    </Transition>
                </Popover>

            </Popover.Group>

        </div>
    )
}

export default HeaderCompany