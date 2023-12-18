import { useState } from 'react';
import { HiCircleStack } from 'react-icons/hi2'
import { PiMoneyLight } from 'react-icons/pi'
import { VND } from '../../../components/upload';
import { Bar } from 'react-chartjs-2';

const Finance = ({ data }: any) => {
    const [selectedOption1, setSelectedOption1] = useState('all');
    const [selectedOption2, setSelectedOption2] = useState('all');
    // 7 ngày

    const day = data?.day;
    const countAddCoin = data?.coin_payment;
    const countSpendCoin = data?.spend_coin;
    const OpenProfile = data?.coin_open_profile_by_day;
    const coin_post_normal_by_day = data?.coin_post_normal_by_day;
    const coin_post_vip_by_day = data?.coin_post_vip_by_day;
    const spend_coin_day = data?.spend_coin_day;

    // 1 tháng
    const months = data?.month
    const spend_coin_month = data?.spend_coin_month;
    const coin_open_profile_by_month = data?.coin_open_profile_by_month;
    const coin_post_normal_by_month = data?.coin_post_normal_by_month;
    const coin_post_vip_by_month = data?.coin_post_vip_by_month;
    const getDataByOption1 = () => {
        switch (selectedOption1) {
            case 'all':
                return {
                    labels: day,
                    datasets: [{
                        label: 'Chi tiêu',
                        data: spend_coin_day,
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
            case 'openProfile':
                return {
                    labels: day,
                    datasets: [{
                        label: 'Chi tiêu',
                        data: OpenProfile,
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
            case 'normal':
                return {
                    labels: day,
                    datasets: [{
                        label: 'Chi tiêu',
                        data: coin_post_normal_by_day,
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
                    labels: day,
                    datasets: [{
                        label: 'Chi tiêu',
                        data: coin_post_vip_by_day,
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
    const getDataByOption2 = () => {
        switch (selectedOption2) {
            case 'all':
                return {
                    labels: months,
                    datasets: [{
                        label: 'Chi tiêu',
                        data: spend_coin_month,
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
            case 'openProfile':
                return {
                    labels: months,
                    datasets: [{
                        label: 'Chi tiêu',
                        data: coin_open_profile_by_month,
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
            case 'normal':
                return {
                    labels: months,
                    datasets: [{
                        label: 'Chi tiêu',
                        data: coin_post_normal_by_month,
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
                        label: 'Chi tiêu',
                        data: coin_post_vip_by_month,
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
    const options: any = {
        // maintainAspectRatio: false,
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
                    callback: (value: any) => value + "đ"
                },
                grid: {
                    borderDash: [10]
                }
            }
        }
    };
    return (
        <div className=' gap-10 my-10'>
            <div className='shadow border p-5 mt-5' id='bao-cao-tai-chinh' >
                <div className='flex justify-between items-center'>
                    <h4 className='text-base font-semibold'>Báo cáo tài chính 7 ngày qua</h4>
                    <select
                        name=''
                        id=''
                        className='outline-none px-2 py-2 border rounded'
                        value={selectedOption1}
                        onChange={(e) => setSelectedOption1(e.target.value)}
                    >
                        <option value='all'>Tất cả chi tiêu</option>
                        <option value='openProfile'>Mở hồ sơ</option>
                        <option value='normal'>Chi tiêu cho bài đăng thường</option>
                        <option value='vip'>Chi tiêu cho bài đăng vip</option>

                    </select>
                </div>
                <Bar className='h-[100px]' data={getDataByOption1()} options={options} />

            </div>
            <div className='shadow border p-5 mt-5' id='bao-cao-tai-chinh' >
                <div className='flex justify-between items-center'>
                    <h4 className='text-base font-semibold'>Báo cáo tài chính các tháng qua</h4>
                    <select
                        name=''
                        id=''
                        className='outline-none px-2 py-2 border rounded'
                        value={selectedOption2}
                        onChange={(e) => setSelectedOption2(e.target.value)}
                    >
                        <option value='all'>Tất cả chi tiêu</option>
                        <option value='openProfile'>Mở hồ sơ</option>
                        <option value='normal'>Chi tiêu cho bài đăng thường</option>
                        <option value='vip'>Chi tiêu cho bài đăng vip</option>

                    </select>
                </div>
                <Bar className='h-[100px]' data={getDataByOption2()} options={options} />
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
    )
}

export default Finance