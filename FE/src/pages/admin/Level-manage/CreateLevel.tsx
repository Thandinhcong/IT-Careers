import React from 'react'

const CreateLevel = () => {
    return (
        < section className="bg-gray-100" >
            <div className="mx-auto  px-4 py-16 sm:px-6 lg:px-8 ">
                <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-2">
                    <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                        <h3 className='text-center text-2xl mb-10 text-red-400'>Form Thêm Trình Độ</h3>
                        <form action="" className="space-y-8">
                            <div>
                                <p className=" mb-2 font-medium text-gray-900 ">Trình độ</p>
                                <label className="sr-only" htmlFor="Level">Level</label>
                                <input
                                    className="w-full rounded-lg border border-gray-500 p-3 text-sm"
                                    placeholder="Level"
                                    type="text"
                                    id="level"
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

export default CreateLevel