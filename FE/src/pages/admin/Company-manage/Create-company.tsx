import React from 'react'

const Createcompany = () => {
    return (
        < section className="bg-gray-100" >
            <div className="mx-auto  px-4 py-16 sm:px-6 lg:px-8 ">
                <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-2">
                    <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                        <h3 className='text-center text-2xl mb-10 text-red-400'>Form Thêm Công Ty</h3>
                        <form action="" className="space-y-8">
                            <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
                                <div>
                                    <p className="mr-[400px] mb-2 font-medium text-gray-900">Name Company * </p>
                                    <label className="sr-only" htmlFor="name">Name Company</label>
                                    <input
                                        className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                                        placeholder="Name Company *"
                                        type="text"
                                        id="name"
                                    />
                                </div>
                                <div>
                                    <p className="mr-[430px] mb-2 font-medium text-gray-900">Tax Code *</p>
                                    <label className="sr-only" htmlFor="Tax">Tax Code</label>
                                    <input
                                        className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                                        placeholder="Tax Code *"
                                        type="number"
                                        id="tax"
                                    />
                                </div>

                            </div>
                            <div>
                                <p className="ml-4 mb-2 font-medium text-gray-900 ">Adderss</p>
                                <label className="sr-only" htmlFor="Address">Adderss</label>
                                <input
                                    className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                                    placeholder="Address"
                                    type="text"
                                    id="address"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
                                <div>
                                    <p className="mr-[400px] mb-2 font-medium text-gray-900">Name</p>
                                    <label className="sr-only" htmlFor="name">Name </label>
                                    <input
                                        className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                                        placeholder="Name"
                                        type="text"
                                        id="name"
                                    />
                                </div>
                                <div>
                                    <p className="mr-[400px] mb-2 font-medium text-gray-900">Founded_in</p>
                                    <label className="sr-only" htmlFor="founded">Founded_in</label>
                                    <input
                                        className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                                        placeholder="Founded_in"
                                        type="date"
                                        id="founded"
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
                                    />
                                </div>

                            </div>
                            <div>
                                <p className="ml-4 mb-2 font-medium text-gray-900">Email</p>
                                <label className="sr-only" htmlFor="email">Email</label>
                                <input
                                    className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                                    placeholder="Email address"
                                    type="email"
                                    id="email"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">

                                <div>
                                    <p className="mr-[400px] mb-2 font-medium text-gray-900">Office</p>

                                    <label className="sr-only" htmlFor="office">Office</label>
                                    <input
                                        className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                                        placeholder="Office"
                                        type="text"
                                        id="office"
                                    />
                                </div>
                                <div>
                                    <p className="mr-[400px] mb-2 font-medium text-gray-900">PassWord</p>
                                    <label className="sr-only" htmlFor="password">PassWord</label>
                                    <input
                                        className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                                        placeholder="PassWord"
                                        type="text"
                                        id="password"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
                                <div>
                                    <p className="mr-[400px]  mb-2 font-medium text-gray-900">Logo</p>
                                    <label className="sr-only" htmlFor="logo">Logo</label>
                                    <input
                                        className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                                        placeholder="LoGo"
                                        type="file"
                                        id="logo"
                                    />
                                </div>  <div>

                                    <p className="mr-[400px]  mb-2 font-medium text-gray-900">Image Paper</p>
                                    <label className="sr-only" htmlFor="image">Image Paper</label>
                                    <input
                                        className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                                        placeholder="Image Paper"
                                        type="file"
                                        id="image"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
                                <div>
                                    <p className="ml-4 mb-2 font-medium text-gray-900 ">Map</p>
                                    <label className="sr-only" htmlFor="map">Map</label>
                                    <input
                                        className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                                        placeholder="Map"
                                        type="text"
                                        id="map"
                                    />
                                </div>

                                <div>
                                    <p className="ml-4 mb-2 font-medium text-gray-900 ">Website</p>
                                    <label className="sr-only" htmlFor="website">Website</label>
                                    <input
                                        className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                                        placeholder="Website"
                                        type="text"
                                        id="website"
                                    />
                                </div>

                                {/* <div>
                                    <p className="ml-4 mb-2 font-medium text-gray-900 ">Token</p>
                                    <label className="sr-only" htmlFor="token">Token</label>
                                    <input
                                        className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                                        placeholder="Token"
                                        type="text"
                                        id="token"
                                    />
                                </div> */}
                            </div>
                            <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-2">
                                {/* <div>
                                    <p className="mr-[400px] mb-2  font-medium text-gray-900">Coin-Number</p>
                                    <label className="sr-only" htmlFor="coin">Coin-Number</label>
                                    <input
                                        className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                                        placeholder="Coin-Number"
                                        type="number"
                                        id="coin"
                                    />
                                </div> */}
                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-gray-900">
                                        Status
                                    </label>

                                    <select
                                        name="HeadlineAct"
                                        id="HeadlineAct"
                                        className="w-full rounded-lg border border-gray-500 p-3 text-sm mt-2.5"
                                    >
                                        <option value="">Please select</option>
                                        <option value="KH">Kích Hoạt</option>
                                        <option value="CKH"> Chưa Kích Hoạt</option>
                                        <option value="CH">Chặn</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <p className="ml-4 mb-2  font-medium text-gray-900">Desc</p>
                                <label className="sr-only" htmlFor="desc">Desc</label>

                                <textarea
                                    className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                                    placeholder="Desc"
                                    rows={5}
                                    id="desc"
                                ></textarea>
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

export default Createcompany