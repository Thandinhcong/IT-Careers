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
import { useGetSatisicalJobQuery } from '../../../api/companies/statisticalCompanyApi'
import { VND } from '../../../components/upload'

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
    const { data: datastati }: any = useGetSatisicalJobQuery();
    console.log("data", datastati);
    const Applied = datastati?.Applied;
    const countSuitable = datastati?.countSuitable;
    const countNotSuitable = datastati?.countNotSuitable;
    const JobPost = datastati?.JobPost;
    const countAddCoin = datastati?.finalAddCoin;

    const countSpendCoin = datastati?.finalSpendCoin;
    const arrayDate = datastati?.arrayDate;
    const totalApplied = datastati?.totalApplied
    const countView = datastati?.countView?.view;
    const datas: any = {
        labels: ['Hủy nạp', 'Nạp thành công', 'Đang giao dịch'],
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
        labels: arrayDate,
        datasets: [{
            data: totalApplied,
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
                    callback: (value: any) => value
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
                <Link className='text-gray-500' to="/business">Bảng tin /</Link>
                <span className='text-gray-200' > Báo cáo</span>
            </p>
            <div className='shadow border p-5 mt-5'>
                <nav className=' '>
                    <ul className='flex gap-8'>
                        <li><a href="">Tổng quát</a></li>
                        <li><a href="#hieu-xuat-tin">Hiệu xuất tin</a></li>
                        <li><a href="#bao-cao-tai-chinh">Báo cáo tài chính</a></li>
                    </ul>
                </nav>
                <hr className='w-full my-5 ' />

                {/* <select name="" id="" className='border px-2 py-1 outline-none text-sm  select-all '>
                    <option className='outline-none ' value="">7 ngày qua</option>
                    <option className='outline-none ' value="">14 ngày qua</option>
                    <option className='outline-none ' value="">30 ngày qua</option>
                </select> */}
                <div className='pt-3 grid grid-cols-4 gap-5'>
                    <div className='border shadow p-3 '>
                        <p className='font-semibold'> Số tin đăng</p>
                        <p className='text-xl my-2'>{JobPost?.length}</p>

                    </div>
                    <div className='border shadow p-3 '>
                        <p className='font-semibold'> Số lượt ứng tuyển</p>
                        <p className='text-xl my-2'>{Applied}</p>

                    </div>
                    <div className='border shadow p-3 '>
                        <p className='font-semibold'>Số tiền đã nạp</p>
                        <p className='text-xl my-2'>{VND.format(countAddCoin
                        )}</p>

                    </div>
                    <div className='border shadow p-3 '>
                        <p className='font-semibold'>Số tiền đã tiêu</p>
                        <p className='text-xl my-2'>{VND.format(countSpendCoin)}</p>

                    </div>
                </div>
                <div className=' grid grid-cols-[65%,35%] gap-5'>
                    <div className='mt-5 border shadow p-3'>
                        <h4 className='font-semibold '>Trạng thái hồ sơ</h4>
                        <div>
                            <div className='flex text-sm text-gray-500 my-3 justify-between'>
                                <p>Hồ sơ mới</p>
                                <p>{Applied}</p>
                            </div>
                            <p></p>
                        </div>
                        <div>
                            <div className='flex text-sm text-gray-500 my-3 justify-between'>
                                <p>Phù hợp</p>
                                <p>{countSuitable?.length}</p>
                            </div>
                            <p></p>
                        </div>

                        <div>
                            <div className='flex text-sm text-gray-500 my-3 justify-between'>
                                <p>Từ chối</p>
                                <p>{countNotSuitable?.length}</p>
                            </div>
                            <p></p>
                        </div>

                    </div>

                </div>
            </div>
            <div className=" shadow border p-5 mt-5" id='hieu-xuat-tin'>
                <div className='flex justify-between items-center'>
                    <h4 className='text-lg font-semibold'>Hiệu xuất tin đăng</h4>
                    {/* <select name="" id="" className='border px-2 py-1 outline-none text-sm  select-all '>
                        <option className='outline-none ' value="">7 ngày qua</option>
                        <option className='outline-none ' value="">14 ngày qua</option>
                        <option className='outline-none ' value="">30 ngày qua</option>
                    </select> */}
                </div>

                <div className='grid grid-cols-4 gap-5'>

                    <div className='border shadow p-3'>
                        <p className='text-gray-600 flex justify-between items-center'>
                            <span>
                                Lượt xem tin
                            </span>
                            <i><FiAlertCircle /></i>
                        </p>
                        <p className='text-xl mt-4 '>{countView}</p>
                    </div>
                    <div className='border shadow p-3'>
                        <p className='text-gray-600 flex justify-between items-center'>
                            <span>
                                Lượt ứng tuyển
                            </span>
                            <i><FiAlertCircle /></i>
                        </p>
                        <p className='text-xl mt-4 '>{Applied}</p>
                    </div>
                </div>
            </div>
            <div className='mt-5 '>
                <p className='text-2xl my-5'>Thống kê lượt ứng tuyển</p>
                <Line data={data} options={options}>

                </Line>
            </div>
            <div className=' gap-10 my-10'>
                <div className='shadow border p-5 mt-5' id='bao-cao-tai-chinh' >
                    <div className='flex justify-between items-center'>
                        <h4 className='text-base font-semibold'>Báo cáo tài chính</h4>
                        {/* <select name="" id="" className='border px-2 py-1 outline-none text-sm  select-all '>
                            <option className='outline-none ' value="">7 ngày qua</option>
                            <option className='outline-none ' value="">14 ngày qua</option>
                            <option className='outline-none ' value="">30 ngày qua</option>
                        </select> */}
                    </div>
                    <div>
                        <div className='flex justify-between items-center my-4'>
                            <div className=''>
                                <p className='text-sm text-gray-500'>Số tiền đã nạp</p>
                                <p className='text-2xl'>{VND.format(countAddCoin)}</p>
                            </div>
                            <i className='text-3xl text-blue-500'>
                                <HiCircleStack />
                            </i>
                        </div>
                        <div className='flex justify-between items-center my-4'>
                            <div className=''>
                                <p className='text-sm text-gray-500'>Số tiền đã chi tiêu</p>
                                <p className='text-2xl'>{VND.format(countSpendCoin)}</p>
                            </div>
                            <i className='text-3xl text-blue-500'>
                                <PiMoneyLight />
                            </i>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyReports
