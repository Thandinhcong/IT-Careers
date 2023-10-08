import React from 'react'
import { BsArrowUp } from 'react-icons/bs'
import { FiAlertCircle } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Line, Doughnut } from "react-chartjs-2"
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js"
import { HiArrowTrendingUp, HiCircleStack } from 'react-icons/hi2'
import { PiMoneyLight } from 'react-icons/pi'
import { RiVipCrown2Line } from 'react-icons/ri'

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    Tooltip,
    Legend

)
const CompanyReports = () => {
    const datas: any = {
        labels: ['Violet', 'Blue', 'Yellow'],
        datasets: [
            {
                label: '# of Hủy nạp',
                data: [12, 19, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',

                ],
                borderWidth: 1,
            },
        ],
    }
    const data: any = {
        labels: ['01/10/2023', '02/10/2023', '03/10/2023', '04/10/2023', '05/10/2023', '06/10/2023', '07/10/2023', '08/10/2023', '09/10/2023', '10/10/2023', '11/10/2023', '12/10/2023', '13/10/2023', '14/10/2023', '15/10/2023'],
        datasets: [{
            data: [1, 3, 4, 6, 6, 8, 22, 5, 32, 56, 44, 22],
            backgroundColor: 'transparent',
            borderColor: '#f26c6d',
            pointBorderColor: 'transparent',
            pointBorderWidth: 4,
            tension: 0.5
        }]
    }
    const options: any = {
        plugins: {
            legend: false
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {

                ticks: {
                    stepSize: 2,
                    callback: (value: any) => value + "K"
                },
                grid: {
                    borderDash: [10]
                }
            }
        }
    }
    return (
        <div className='mx-5 mt-16 py-5'>
            <p className='text-sm'>
                <Link className='text-gray-500' to="/companys">Bảng tin /</Link>
                <span className='text-gray-200' > Báo cáo</span>
            </p>
            <div className='shadow border p-5 mt-5'>
                <nav className=' '>
                    <ul className='flex gap-8'>
                        <li><a href="">Tổng quát</a></li>
                        <li><a href="">Hiệu xuất tin</a></li>
                        <li><a href="">Báo cáo tài chính</a></li>
                    </ul>
                </nav>
                <hr className='w-full my-5 ' />

                <select name="" id="" className='border px-2 py-1 outline-none text-sm  select-all '>
                    <option className='outline-none ' value="">7 ngày qua</option>
                    <option className='outline-none ' value="">14 ngày qua</option>
                    <option className='outline-none ' value="">30 ngày qua</option>
                </select>
                <div className='pt-3 grid grid-cols-4 gap-5'>
                    <div className='border shadow p-3 '>
                        <p className='font-semibold'> Số tin đăng</p>
                        <p className='text-xl my-2'>1</p>
                        <span className='text-sm flex gap-2 items-center font-sans'>
                            <span className='flex items-center text-green-500 gap-1'>
                                <BsArrowUp />
                                <span>100%</span>
                            </span>
                            <span>so với 7 ngày qua</span>
                        </span>
                    </div>
                    <div className='border shadow p-3 '>
                        <p className='font-semibold'> Số lượt ứng tuyển</p>
                        <p className='text-xl my-2'>1</p>
                        <span className='text-sm flex gap-2 items-center font-sans'>
                            <span className='flex items-center text-green-500 gap-1'>
                                <BsArrowUp />
                                <span>100%</span>
                            </span>
                            <span>so với 7 ngày qua</span>
                        </span>
                    </div>
                    <div className='border shadow p-3 '>
                        <p className='font-semibold'>Số tiền đã nạp</p>
                        <p className='text-xl my-2'>1</p>
                        <span className='text-sm flex gap-2 items-center font-sans'>
                            <span className='flex items-center text-green-500 gap-1'>
                                <BsArrowUp />
                                <span>100%</span>
                            </span>
                            <span>so với 7 ngày qua</span>
                        </span>
                    </div>
                    <div className='border shadow p-3 '>
                        <p className='font-semibold'>Số tiền đã tiêu</p>
                        <p className='text-xl my-2'>1</p>
                        <span className='text-sm flex gap-2 items-center font-sans'>
                            <span className='flex items-center text-green-500 gap-1'>
                                <BsArrowUp />
                                <span>100%</span>
                            </span>
                            <span>so với 7 ngày qua</span>
                        </span>
                    </div>
                </div>
                <div className=' grid grid-cols-[65%,35%] gap-5'>
                    <div className='mt-5 border shadow p-3'>
                        <h4 className='font-semibold '>Trạng thái hồ sơ</h4>
                        <div>
                            <div className='flex text-sm text-gray-500 my-3 justify-between'>
                                <p>Hồ sơ mới</p>
                                <p>5</p>
                            </div>
                            <p></p>
                        </div>
                        <div>
                            <div className='flex text-sm text-gray-500 my-3 justify-between'>
                                <p>Phù hợp</p>
                                <p>5</p>
                            </div>
                            <p></p>
                        </div>
                        <div>
                            <div className='flex text-sm text-gray-500 my-3 justify-between'>
                                <p>Hẹn phỏng vấn</p>
                                <p>5</p>
                            </div>
                            <p></p>
                        </div>
                        <div>
                            <div className='flex text-sm text-gray-500 my-3 justify-between'>
                                <p>Nhận việc</p>
                                <p>5</p>
                            </div>
                            <p></p>
                        </div>
                        <div>
                            <div className='flex text-sm text-gray-500 my-3 justify-between'>
                                <p>Từ chối</p>
                                <p>5</p>
                            </div>
                            <p></p>
                        </div>
                        <div>
                            <div className='flex text-sm text-gray-500 my-3 justify-between'>
                                <p>Khác</p>
                                <p>5</p>
                            </div>
                            <p></p>
                        </div>
                    </div>
                    <div className='mt-5 border shadow p-3'>
                        <h4 className='font-semibold '>Chi phí chuyển đổi</h4>
                        <div className='flex justify-between text-sm items-center my-2'>
                            <p>
                                <span className='text-blue-500 text-xl'>.</span>
                                <span>Hồ sơ mới</span>
                            </p>
                            <p className='text-blue-500'>8.571 đ</p>
                        </div>
                        <div className='flex justify-between text-sm items-center my-2'>
                            <p>
                                <span className='text-violet-500 text-xl'>.</span>
                                <span>Phù hợp</span>
                            </p>
                            <p className='text-violet-500'>1.714 đ</p>
                        </div>
                        <div className='flex justify-between text-sm items-center my-2'>
                            <p>
                                <span className='text-yellow-500 text-xl'>.</span>
                                <span>Hẹn phỏng vấn</span>
                            </p>
                            <p className='text-yellow-500'>8.571 đ</p>
                        </div>
                        <div className='flex justify-between text-sm items-center my-2'>
                            <p>
                                <span className='text-green-500 text-xl'>.</span>
                                <span>Nhận việc</span>
                            </p>
                            <p className='text-green-500'>8.571 đ</p>
                        </div>
                        <div className='flex justify-between text-sm items-center my-3'>
                            <p>
                                <span className='text-red-500 text-xl'>.</span>
                                <span>Từ chối</span>
                            </p>
                            <p className='text-red-500'>8.571 đ</p>
                        </div>
                        <div className='flex justify-between text-sm items-center my-3'>
                            <p>
                                <span className='text-blue-500 text-xl'>.</span>
                                <span>Khác</span>
                            </p>
                            <p className='text-blue-500'>8.571 đ</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" shadow border p-5 mt-5">

                <div className='flex justify-between items-center'>
                    <h4 className='text-lg font-semibold'>Hiệu xuất tin đăng</h4>
                    <select name="" id="" className='border px-2 py-1 outline-none text-sm  select-all '>
                        <option className='outline-none ' value="">7 ngày qua</option>
                        <option className='outline-none ' value="">14 ngày qua</option>
                        <option className='outline-none ' value="">30 ngày qua</option>
                    </select>
                </div>
                <div className='grid grid-cols-[30%,70%] my-5  items-center '>
                    <p>Kết quả tin đăng :</p>
                    <select name="" id="" className='border mr-3 px-2 py-2 outline-none text-sm w-full  select-all '>
                        <option className='outline-none ' value="">7 ngày qua</option>
                        <option className='outline-none ' value="">14 ngày qua</option>
                        <option className='outline-none ' value="">30 ngày qua</option>
                    </select>
                </div>
                <div className='grid grid-cols-4 gap-5'>
                    <div className='border shadow p-3'>
                        <p className='text-gray-600 flex justify-between items-center'>
                            <span>
                                Lượt hiển thị
                            </span>
                            <i><FiAlertCircle /></i>
                        </p>
                        <p className='text-xl mt-4 '>235</p>
                    </div>
                    <div className='border shadow p-3'>
                        <p className='text-gray-600 flex justify-between items-center'>
                            <span>
                                Lượt xem tin
                            </span>
                            <i><FiAlertCircle /></i>
                        </p>
                        <p className='text-xl mt-4 '>235</p>
                    </div>
                    <div className='border shadow p-3'>
                        <p className='text-gray-600 flex justify-between items-center'>
                            <span>
                                Lượt ứng tuyển
                            </span>
                            <i><FiAlertCircle /></i>
                        </p>
                        <p className='text-xl mt-4 '>235</p>
                    </div>
                </div>
            </div>
            <div className='mt-5 '>
                <Line data={data} options={options}>

                </Line>
            </div>
            <div className='grid grid-cols-2 gap-10 my-10'>

                <div className='shadow border p-5 mt-5' >
                    <div className='flex justify-between items-center'>
                        <h4 className='text-base font-semibold'>Báo cáo mua xu</h4>
                        <select name="" id="" className='border px-2 py-1 outline-none text-sm  select-all '>
                            <option className='outline-none ' value="">7 ngày qua</option>
                            <option className='outline-none ' value="">14 ngày qua</option>
                            <option className='outline-none ' value="">30 ngày qua</option>
                        </select>
                    </div>
                    <div className='my-5'>
                        <Doughnut data={datas} />


                    </div>
                </div>
                <div className='shadow border p-5 mt-5' >
                    <div className='flex justify-between items-center'>
                        <h4 className='text-base font-semibold'>Báo cáo tài chính</h4>
                        <select name="" id="" className='border px-2 py-1 outline-none text-sm  select-all '>
                            <option className='outline-none ' value="">7 ngày qua</option>
                            <option className='outline-none ' value="">14 ngày qua</option>
                            <option className='outline-none ' value="">30 ngày qua</option>
                        </select>
                    </div>
                    <div>
                        <div className='flex justify-between items-center my-4'>
                            <div className=''>
                                <p className='text-sm text-gray-500'>Số tiền đã nạp</p>
                                <p className='text-2xl'>0 đ</p>
                            </div>
                            <i className='text-3xl text-blue-500'>
                                <HiCircleStack />
                            </i>
                        </div>
                        <div className='flex justify-between items-center my-4'>
                            <div className=''>
                                <p className='text-sm text-gray-500'>Số tiên đã tiêu</p>
                                <p className='text-2xl'>0 đ</p>
                            </div>
                            <i className='text-3xl text-blue-500'>
                                <PiMoneyLight />
                            </i>
                        </div>
                        <div className='flex justify-between items-center my-4'>
                            <div className=''>
                                <p className='text-sm text-gray-500'>Số tiền chi tiêu cho tin vip</p>
                                <p className='text-2xl'>0 đ</p>
                            </div>
                            <i className='text-3xl text-blue-500'>
                                <RiVipCrown2Line />
                            </i>
                        </div>
                        <div className='flex justify-between items-center my-4'>
                            <div className=''>
                                <p className='text-sm text-gray-500'>Số tiền chi tiêu đẩy tin</p>
                                <p className='text-2xl'>0 đ</p>
                            </div>
                            <i className='text-3xl text-blue-500'>
                                <HiArrowTrendingUp />
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyReports
