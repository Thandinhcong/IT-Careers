

const UpdateAccount = () => {
    return (
        < section className="bg-gray-100" >
            <div className="mx-auto  px-4 py-16 sm:px-6 lg:px-8 ">
                <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-2">
                    <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                        <h3 className='text-center text-2xl mb-10 text-red-400'>Form Sửa Tài Khoản</h3>
                        <form action="" className="space-y-8">
                            <div>
                                <p className=" mb-2 font-medium text-gray-900 ">Username</p>
                                <label className="sr-only" htmlFor="Username">Username</label>
                                <input
                                    className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                                    placeholder="Username"
                                    type="text"
                                    id="username"
                                    value={"Le Quoc Dat"}
                                />
                            </div>
                            <div>
                                <p className="mb-2 font-medium text-gray-900">Email</p>
                                <label className="sr-only" htmlFor="email">Email</label>
                                <input
                                    className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                                    placeholder="Email address"
                                    type="email"
                                    id="email"
                                    value={"dat123@gmail.com"}
                                />
                            </div>
                            <div className="flex justify-between gap-4 text-center">
                                <div>
                                    <p className="mr-[400px] mb-2 font-medium text-gray-900">Password</p>
                                    <label className="sr-only" htmlFor="password">Password</label>
                                    <input
                                        className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                                        placeholder="Password"
                                        type="text"
                                        id="name"
                                        value={"password"}
                                    />
                                </div>

                                <div>
                                    <p className="mr-[400px] mb-2 font-medium text-gray-900">Phone</p>
                                    <label className="sr-only" htmlFor="phone">Phone </label>
                                    <input
                                        className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                                        placeholder="Phone Number"
                                        type="tel"
                                        id="phone"
                                        value={"012345678"}
                                    />
                                </div>

                            </div>
                            <div>
                                <p className="mb-2 font-medium text-gray-900">Ảnh đại diện</p>
                                <label className="sr-only" htmlFor="avatar">Avatar</label>
                                <input
                                    className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                                    type="file"
                                    id="email"
                                />
                            </div>
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                                >
                                    Send Enquiry
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </ section>
    )
}

export default UpdateAccount