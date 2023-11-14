import { FcGoogle } from 'react-icons/fc'
import { SlSocialFacebook } from 'react-icons/sl'
import { Link } from 'react-router-dom'
import { TEModal, TEModalBody, TEModalContent, TEModalDialog, TEModalHeader } from 'tw-elements-react'

const ModalLogin = () => {
    return (
        <TEModal show >
            <TEModalDialog>
                <TEModalContent>
                    <TEModalHeader>
                        Đăng nhập
                    </TEModalHeader>
                    <TEModalBody>
                        <form className="space-y-4 md:space-y-6" >
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    // {...regiterLogin("email")}
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                                    placeholder="name@company.com" />
                                <div className="text-red-500 my-2">
                                    {/* {ErrorLogin.email && ErrorLogin.email.message} */}
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                <input
                                    // {...regiterLogin('password')}
                                    type="password"
                                    name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" />
                                <div className="text-red-500 my-2">
                                    {/* {ErrorLogin.password && ErrorLogin.password.message} */}
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <Link to="/forgot" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>

                            </div>
                            <div className="flex justify-center">
                                <button className="rounded-lg bg-gray-200 text-black flex items-center space-x-2 px-9 py-2 mt-4 mr-2">
                                    <span className="w-10"><FcGoogle /></span>

                                    <span> Google</span>
                                </button>
                                <button className="rounded-lg bg-blue-800 text-white flex items-center space-x-2 px-9 py-2 mt-4 ml-2">
                                    <span className="w-10">< SlSocialFacebook /></span>
                                    <span> Facebook</span>
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="w-full mx-auto text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                            </p>
                        </form>
                    </TEModalBody>

                </TEModalContent>
            </TEModalDialog>
        </TEModal>
    )
}

export default ModalLogin