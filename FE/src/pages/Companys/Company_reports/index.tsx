
import { FiAlertCircle } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Line } from "react-chartjs-2"
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
import { useGetSatisicalJobQuery } from '../../../api/companies/statisticalCompanyApi'
import { VND } from '../../../components/upload'
import Finance from './Finance'
import { useState } from 'react'

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
    console.log("datastati", datastati);

    const [selectedOption1, setSelectedOption1] = useState('all');
    const Applied = datastati?.count_all_apply;
    const countSuitable = datastati?.countSuitable;
    const countNotSuitable = datastati?.countNotSuitable;
    const JobPost = datastati?.count_apply_post;
    const countAddCoin = datastati?.coin_payment;

    const countSpendCoin = datastati?.spend_coin;
    const arrayDate = datastati?.day;
    const totalApplied = datastati?.count_apply_by_day;
    const countView = datastati?.count_view;
    const months = datastati?.month;
    const count_apply_by_month = datastati?.count_apply_by_month;
    const profileNew = datastati?.count_profile_new;
    //phù hợp
    const count_matching_qualifiers = datastati?.count_matching_qualifiers;
    //không phù hợp
    const count_inappropriate_qualifiers = datastati?.count_inappropriate_qualifiers;

    const getDataByOption1 = () => {
        switch (selectedOption1) {
            case 'all':
                return {
                    labels: arrayDate,
                    datasets: [{
                        label: 'Số lượt ứng tuyển',
                        data: totalApplied,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)'
                        ],
                        borderWidth: 1
                    }]
                };
            default:
                return {
                    labels: months,
                    datasets: [{
                        label: 'Số lượt ứng tuyển',
                        data: count_apply_by_month,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(201, 203, 207, 0.2)'
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                            'rgb(75, 192, 192)',
                            'rgb(54, 162, 235)',
                            'rgb(153, 102, 255)',
                            'rgb(201, 203, 207)'
                        ],
                        borderWidth: 1
                    }]
                };
        }
    };
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
            <div className='text-sm'>
                <Link className='text-gray-500' to="/business">Bảng tin /</Link>
                <span className='text-gray-200' > Báo cáo</span>
            </div>
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
                                <p>{profileNew}</p>
                            </div>
                            <p></p>
                        </div>
                        <div>
                            <div className='flex text-sm text-gray-500 my-3 justify-between'>
                                <p>Phù hợp</p>
                                <p>{count_matching_qualifiers}</p>
                            </div>
                            <p></p>
                        </div>

                        <div>
                            <div className='flex text-sm text-gray-500 my-3 justify-between'>
                                <p>Không phù hợp</p>
                                <p>{count_inappropriate_qualifiers}</p>
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
                        <div className='text-gray-600 flex justify-between items-center'>
                            <span>
                                Lượt xem tin
                            </span>
                            <i><FiAlertCircle /></i>
                        </div>
                        <p className='text-xl mt-4 '>{countView}</p>
                    </div>
                    <div className='border shadow p-3'>
                        <div className='text-gray-600 flex justify-between items-center'>
                            <span>
                                Lượt ứng tuyển
                            </span>
                            <i><FiAlertCircle /></i>
                        </div>
                        <p className='text-xl mt-4 '>{Applied}</p>
                    </div>
                </div>
            </div>
            <div className=' my-5'>
                <div className='flex justify-between'>
                    <h2 className='text-2xl '>Thống kê lượt ứng tuyển</h2>
                    <select
                        name=''
                        id=''
                        className='outline-none px-2 py-2 border rounded'
                        value={selectedOption1}
                        onChange={(e) => setSelectedOption1(e.target.value)}
                    >
                        <option value='all'>7 ngày qua</option>
                        <option value='openProfile'>Các tháng qua</option>
                    </select>
                </div>
                <Line data={getDataByOption1()} options={options}>
                </Line>
            </div>
            <Finance data={datastati} />
        </div>
    )
}

export default CompanyReports
