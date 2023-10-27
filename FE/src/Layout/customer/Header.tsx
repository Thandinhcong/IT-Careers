import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import { AiOutlineBars, AiFillCaretDown, AiOutlineClose, AiOutlineHeart, AiOutlineProfile, AiOutlineUser, AiOutlineCalendar, AiOutlineLogout, AiOutlineKey, AiOutlineSetting } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import { useLogOutMutation } from '../../api/auths';
import Swal from 'sweetalert2';




const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();  // const user = JSON.parse(localStorage.getItem("user") as string);
  const [useLogout]=useLogOutMutation();
  const [isLogin, setIsLogin] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null

  });
  const handleLogout = async() => {
    const confilm = window.confirm("Bạn có muốn đăng xuất không?");
    if (confilm) {
      await useLogout();
      localStorage.removeItem('user');
      localStorage.removeItem("accessToken");
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Đăng xuất thành công!',
        timer: 1500,
      });
      navigate('/');

    }
  };
  const CV = [
    { name: 'Hồ sơ của tôi  ', href: '#', icon: <AiOutlineProfile className="text-blue-500 text-3xl" /> },
    { name: 'Mẫu CV', href: '#', icon: <AiOutlineProfile className="text-blue-500 text-3xl" /> },
  ]
  const profile = [
    { name: 'Profile cá nhân', href: '/user/profile', icon: <AiOutlineUser className="text-xl" /> },
    { name: 'Quản lý CV', href: '/user/listcv', icon: <AiOutlineProfile className="text-xl" /> },
    { name: 'Việc làm đã ứng tuyển', href: '/user/jobapply', icon: <AiOutlineCalendar className="text-xl" /> },
    { name: 'Việc làm đã lưu', href: '/user/jobfavor', icon: <AiOutlineHeart className="text-xl" /> },
    { name: 'Đổi mật khẩu', href: '/change', icon: <AiOutlineKey className="text-xl" /> },
    { name: 'Thiết lập tài khoản', href: '/account', icon: <AiOutlineSetting className="text-xl" /> },
    { name: 'Đăng xuất', onclick: handleLogout, icon: <AiOutlineLogout className="text-xl" /> },
  ]

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <header className="bg-white w-100%">
      <nav className="mx-auto flex items-center justify-between p-6" aria-label="Global">
        <div className="flex lg:flex-none mr-10">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-8 w-auto" src="https://123job.vn/images/logo_tim.png" alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <AiOutlineBars />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
            >
              Hồ sơ CV
              <AiFillCaretDown className="inline-block base-line text-blue-600" />
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
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {CV.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        {/* <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" /> */}
                        {item.icon}
                      </div>
                      <div className="flex-auto">
                        <a href={item.href} className="block font-semibold text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          <Link to="/jobs" className="text-sm font-semibold leading-6 text-gray-900">
            Việc làm
          </Link>
          <Link to="company" className="text-sm font-semibold leading-6 text-gray-900">
            Công ty
          </Link>
          <Link to="#" className="text-sm font-semibold leading-6 text-gray-900">
            Sự nghiệp phát triền
          </Link>
          <Link to="#" className="text-sm font-semibold leading-6 text-gray-900">
            Công cụ
          </Link>
        </Popover.Group>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center" >
          <Link to={"user/jobfavor"} className="text-sm font-semibold leading-6 text-gray-900">
            <AiOutlineHeart className="inline-block base-line text-2xl w-20" />
          </Link>

          <Popover.Group className="hidden lg:flex outline-none lg:gap-x-5 mr-3">
            <Popover className="relative">
              <Popover.Button
                className="flex outline-none items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
              >
                <img src="https://123job.vn/images/no_user.png" className='rounded-full border' alt="logo công ty" width={40} />
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
                <Popover.Panel className="absolute -left-1 top-full z-10 mt-3 w-screen max-w-[250px] overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-2">
                    {profile.map((item) => (
                      <div
                      onClick={item.onclick}
                        key={item.name}
                        className="group relative flex items-center gap-2 rounded-lg p-2 text-sm leading-6 hover:bg-blue-100"
                      >
                        <div className=' text-gray-600'>
                          {item.icon}
                        </div>
                        <div className="flex-auto">
                          <a href={item.href} className="block font-medium text-gray-600">
                            {item.name}
                            <span className="absolute inset-0" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </Popover.Group>
          {isLogin ? "" : (
            <div>

              <Link to="/signin" className="text-sm font-semibold leading-6 text-gray-900">
                Đăng nhập <span aria-hidden="true"></span>
              </Link>
              <p className='border-r-2 mx-4 border-gray-400 '></p>
              <a href="/signup" className="text-sm font-semibold leading-6 text-gray-900">
                Đăng Ký <span aria-hidden="true"></span>
              </a>
            </div>
          )}
          <a href="/companies/signin" className="text-sm font-semibold leading-6 text-gray-900 ml-4">
            Đăng nhập/Đăng Ký NDT <span aria-hidden="true"></span>
          </a>
        </div>
      </nav>

      {/* mobile */}
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://123job.vn/images/logo_tim.png"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <AiOutlineClose />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        <AiOutlineProfile className="inline-block base-line text-blue-600" />
                        <p>Hồ sơ CV</p>
                        <AiFillCaretDown className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex')}
                          aria-hidden="true" />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...CV].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <a
                  href="/jobs"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Việc làm
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Công ty
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Sự nghiệp phát triền
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Công cụ
                </a>
              </div>
              <div className="py-3">
                <Link
                  to={"jobfavor"}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Tin đã lưu <AiOutlineHeart className="inline-block base-line" />
                </Link>
                <a
                  href="/signin"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Đăng nhập
                </a>
                <a
                  href="/signup"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Đăng ký
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}

export default Header