
import { Link } from 'react-router-dom'

const Guide = () => {
    return (
        <div className="font-sans">
            <div className='flex max-w-screen-lg mx-auto mt-20'>
                <div className='w-2/3 '>
                    <h1 className='text-6xl'>Hướng dẫn viết CV chi tiết theo ngành</h1>
                    <br />
                    <span className='text-2xl'>Trong chuyên mục này, bạn nhận được hướng dẫn chi tiết về nội dung và cách trình bày CV theo từng ngành khác nhau. </span>
                </div>
                <div className='w-1/2  flex items-center justify-end'>
                    <img src="https://cdn.123job.vn/123job/resume_thumbnail/2022/01/13/2022_01_13______947e4454e7fd8ff81718d2df228a505c.png" alt="" className='w-1/2 ' />
                </div>
            </div>
            <div className=' flex justify-center max-w-screen-lg mx-auto mt-20 '>
                <div className="w-1/4 bg-while  text-center mr-8 rounded-lg border border-solid border-gray-300 ">
                    <div className=" bg-blue-500 text-2xl text-white ">
                        Danh mục
                    </div>
                    <ul className="mt-4 mb-4 ">
                        <li className="mt-4 mb-4">
                            <Link to={''} >  Hướng dẫn viết CV theo ngành nghề</Link>
                        </li>
                        <li className="mt-4 mb-4">
                            <Link to={''}>Viết CV ngành kinh doanh</Link >
                        </li>
                        <li className="mt-4 mb-4">
                            <Link to={''}>Viết CV ngành Marketing - PR</Link>
                        </li>
                        <li className="mt-4 mb-4">
                            <Link to={''}>Viết CV ngành  tài chính</Link>
                        </li>
                        <li className="mt-4 mb-4">
                            <Link to={''}>Viết CV ngành hành chính </Link>
                        </li>
                        <li className="mt-4 mb-4">
                            <Link to={''}>Viết CV ngành kế toán </Link>
                        </li>
                        <li className="mt-4 mb-4">
                            <Link to={''}>Viết CV ngành bán hàng</Link>
                        </li>
                        <li className="mt-4 mb-4">
                            <Link to={''}>Viết CV ngành IT phần mềm</Link>
                        </li>
                    </ul>

                </div>
                <div className="w-3/4   rounded-lg border border-solid border-gray-300">
                    <table className="mr-10 ml-10 text-center">
                        <h2 className='text-4xl '>Viết CV ngành IT phần mềm</h2>
                        <span >Danh mục tổng hợp các bài hướng dẫn viết mẫu CV ngành IT phần mềm. Cùng 123job tham khảo nội dung CV xin việc các vị trí việc làm chi tiết của ngành IT phần mềm nhé! </span>
                        <tbody>
                            <tr>
                                <td className="p-4 grid grid-cols-2 ">
                                    <ul className="list-disc mr-5 pl-4">
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>Cách để viết CV hoàn hảo cho bất kì ngành nào</Link></li>
                                        <li className='mt-4 mb-4 '><Link className="underline text-indigo-400" to={''}>CV Front End Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Front End Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV PHP Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Web Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Web Developer</Link></li>
                                    </ul>
                                    <ul className="list-disc">
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>Cách để viết CV hoàn hảo cho bất kì ngành nào</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Front End Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Front End Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV PHP Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Web Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Web Developer</Link></li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className=' flex justify-center max-w-screen-lg mx-auto mt-10 '>
                <div className="w-1/4 bg-while  text-center mr-10  ">
                </div>
                <div className='fixed bottom-400 right-3000'>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition-all duration-300">
                        Nút
                    </button>
                </div>
                <div className="w-3/4   rounded-lg border border-solid border-gray-300">
                    <table className="mr-10 ml-10 text-center">
                        <h2 className='text-4xl '>Viết CV ngành IT phần mềm</h2>
                        <span >Danh mục tổng hợp các bài hướng dẫn viết mẫu CV ngành IT phần mềm. Cùng 123job tham khảo nội dung CV xin việc các vị trí việc làm chi tiết của ngành IT phần mềm nhé! </span>
                        <tbody>
                            <tr>
                                <td className="p-4 text-center grid grid-cols-2 ">
                                    <ul className="list-disc mr-5">
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>Cách để viết CV hoàn hảo cho bất kì ngành nào</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Front End Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Front End Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV PHP Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Web Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Web Developer</Link></li>
                                    </ul>
                                    <ul className="list-disc">
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>Cách để viết CV hoàn hảo cho bất kì ngành nào</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Front End Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Front End Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV PHP Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Web Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Web Developer</Link></li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className=' flex justify-center max-w-screen-lg mx-auto mt-10 '>
                <div className="w-1/4 bg-while  text-center mr-10  ">
                </div>
                <div className="w-3/4   rounded-lg border border-solid border-gray-300">
                    <table className="mr-10 ml-10 text-center">
                        <h2 className='text-4xl '>Viết CV ngành IT phần mềm</h2>
                        <span >Danh mục tổng hợp các bài hướng dẫn viết mẫu CV ngành IT phần mềm. Cùng 123job tham khảo nội dung CV xin việc các vị trí việc làm chi tiết của ngành IT phần mềm nhé! </span>
                        <tbody>
                            <tr>
                                <td className="p-4 text-center grid grid-cols-2 ">
                                    <ul className="list-disc mr-5">
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>Cách để viết CV hoàn hảo cho bất kì ngành nào</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Front End Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Front End Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV PHP Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Web Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Web Developer</Link></li>
                                    </ul>
                                    <ul className="list-disc">
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>Cách để viết CV hoàn hảo cho bất kì ngành nào</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Front End Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Front End Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV PHP Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Web Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Web Developer</Link></li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className=' flex justify-center max-w-screen-lg mx-auto mt-10 '>
                <div className="w-1/4 bg-while  text-center mr-10  ">
                </div>
                <div className="w-3/4   rounded-lg border border-solid border-gray-300">
                    <table className="mr-10 ml-10 text-center">
                        <h2 className='text-4xl '>Viết CV ngành IT phần mềm</h2>
                        <span >Danh mục tổng hợp các bài hướng dẫn viết mẫu CV ngành IT phần mềm. Cùng 123job tham khảo nội dung CV xin việc các vị trí việc làm chi tiết của ngành IT phần mềm nhé! </span>
                        <tbody>
                            <tr>
                                <td className="p-4 text-center grid grid-cols-2 ">
                                    <ul className="list-disc mr-5">
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>Cách để viết CV hoàn hảo cho bất kì ngành nào</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Front End Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Front End Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV PHP Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Web Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Web Developer</Link></li>
                                    </ul>
                                    <ul className="list-disc">
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>Cách để viết CV hoàn hảo cho bất kì ngành nào</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Front End Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Front End Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV PHP Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Web Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Web Developer</Link></li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className=' flex justify-center max-w-screen-lg mx-auto mt-10 mb-10'>
                <div className="w-1/4 bg-while  text-center mr-10  ">
                </div>
                <div className="w-3/4  rounded-lg border border-solid border-gray-300">
                    <table className="mr-10 ml-10 text-center">
                        <h2 className='text-4xl '>Viết CV ngành IT phần mềm</h2>
                        <span >Danh mục tổng hợp các bài hướng dẫn viết mẫu CV ngành IT phần mềm. Cùng 123job tham khảo nội dung CV xin việc các vị trí việc làm chi tiết của ngành IT phần mềm nhé! </span>
                        <tbody>
                            <tr>
                                <td className="p-4 text-center grid grid-cols-2 ">
                                    <ul className="list-disc mr-5">
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>Cách để viết CV hoàn hảo cho bất kì ngành nào</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Front End Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Front End Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV PHP Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Web Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Web Developer</Link></li>
                                    </ul>
                                    <ul className="list-disc">
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>Cách để viết CV hoàn hảo cho bất kì ngành nào</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Front End Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Front End Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV PHP Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Web Developer</Link></li>
                                        <li className='mt-4 mb-4'><Link className="underline text-indigo-400" to={''}>CV Web Developer</Link></li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    )
}

export default Guide