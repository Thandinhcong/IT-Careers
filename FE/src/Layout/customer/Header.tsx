import React, { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  AiOutlineBars,
  AiFillCaretDown,
  AiOutlineClose,
  AiOutlineHeart,
  AiOutlineProfile,
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlineLogout,
  AiOutlineKey,
  AiOutlineSetting,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useLogOutMutation } from "../../api/auths";
import { Notyf } from "notyf";
import { useGetCandidatesQuery } from "../../api/accountApi";
import { TbRecharging } from "react-icons/tb";
import { MdHistory } from "react-icons/md";

const Header = React.memo((data: any) => {
  const listData = data?.data;

  const notyf = new Notyf({
    duration: 2000,
    position: {
      x: 'right',
      y: 'top',
    },
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: candidateData } = useGetCandidatesQuery();

  const [useLogout] = useLogOutMutation();
  const [isLogin] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });
  const handleLogout = async () => {
    const confilm = window.confirm("Bạn có muốn đăng xuất không?");
    if (confilm) {
      await useLogout();
      localStorage.removeItem("user");
      notyf.success("Đăng xuất thành công!")
      window.location.reload();
    }
  };
  const listImage = candidateData?.candidate?.image;
  const CV = [
    {
      name: "Trang chủ  ",
      href: "/",
      icon: <AiOutlineProfile className="text-blue-500 text-2xl" />,
    }
  ];
  const profile = [
    {
      name: "Profile cá nhân",
      href: "/user/profile",
      icon: <AiOutlineUser className="text-xl" />,
    },
    {
      name: "Quản lý CV",
      href: "/user/listcv",
      icon: <AiOutlineProfile className="text-xl" />,
    },
    {
      name: "Việc làm đã ứng tuyển",
      href: "/user/jobapply",
      icon: <AiOutlineCalendar className="text-xl" />,
    },
    {
      name: "Việc làm đã lưu",
      href: "/user/jobfavor",
      icon: <AiOutlineHeart className="text-xl" />,
    },
    {
      name: "Đổi mật khẩu",
      href: "/account/change_pass",
      icon: <AiOutlineKey className="text-xl" />,
    },
    {
      name: "Thiết lập tài khoản",
      href: "/account",
      icon: <AiOutlineSetting className="text-xl" />,
    },
    {
      name: "Gói nạp",
      href: "/user/recharge",
      icon: <TbRecharging className="text-xl" />,
    },
    {
      name: "Lịch sử thanh toán",
      href: "/user/historys-payment",
      icon: <MdHistory className="text-xl" />,
    },
    {
      name: "Đăng xuất",
      onclick: handleLogout,
      icon: <AiOutlineLogout className="text-xl" />,
    },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <header className="bg-white w-100%">
      <nav
        className="mx-auto flex items-center justify-between p-6"
        aria-label="Global"
      >
        <div className="flex lg:flex-none mr-10">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className=" "
              src={listData?.logo}
              alt=""
              width={60}
            />
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
          <Link
            to="/"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Trang chủ
          </Link>
          <Link
            to="/recruit"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Việc làm
          </Link>
          <Link
            to="/company"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Công ty
          </Link>
          <Link
            to="/find-job-fast"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Tìm việc nhanh
          </Link>
        </Popover.Group>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center">
          {isLogin ? (
            <Link
              to={"user/jobfavor"}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              <AiOutlineHeart className="inline-block base-line text-2xl w-20" />
            </Link>

          ) : ""}
          {!isLogin ? (
            ""
          ) : (
            <Popover.Group className="hidden lg:flex outline-none lg:gap-x-5 ">
              <Popover className="relative">
                <Popover.Button className="flex outline-none items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                  {listImage ? (
                    <img
                      src={candidateData?.candidate?.image}
                      className="rounded-full border w-12 h-12"
                      alt="avatar"
                    />
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
                  <Popover.Panel className="absolute -right-1 top-full z-10 mt-3 w-screen max-w-[250px] overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-2">
                      {profile.map((item: any) => (
                        <div
                          onClick={item.onclick}
                          key={item.name}
                          className="group relative flex items-center gap-2 rounded-lg p-2 text-sm leading-6 hover:bg-blue-100"
                        >
                          <div className=" text-gray-600">{item.icon}</div>
                          <div className="flex-auto">
                            <Link
                              to={item.href}
                              className="block font-medium text-gray-600"
                            >
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
          )}
          {isLogin ? (
            ""
          ) : (
            <div className="flex items-center">
              <div className="flex">
                <Link
                  to="/login"
                  className="text-sm font-semibold leading-6  border px-2 rounded py-1 bg-blue-500 text-white"
                >
                  Đăng nhập <span aria-hidden="true"></span>
                </Link>
              </div>
              <Link
                to="/business/signin"
                className="text-sm font-semibold leading-6  ml-4 border px-2 rounded py-1 bg-blue-500 text-white"
              >
                Đăng nhập NDT <span aria-hidden="true"></span>
              </Link>

            </div>
          )}
        </div>
      </nav>

      {/* mobile */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8  w-auto"
                src="https://res.cloudinary.com/dxzlnojyv/image/upload/v1700416379/riqyog9hekgrzdpdwg8w.png"
                alt=""

              />
            </Link>
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
                        <AiFillCaretDown
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex"
                          )}
                          aria-hidden="true"
                        />
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
                <Link
                  to="/recruit"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Việc làm
                </Link>
                <Link
                  to="/company"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Công ty
                </Link>
              </div>
              <div className="py-3">
                <hr />
                <Link
                  to="/dang-nhap"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/business/signin"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Đăng nhập NTD
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
});

export default Header;
