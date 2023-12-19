import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend);

const JobPost = ({ data }: any) => {
    const day = data?.data?.day;
    const staticJobFollowDay = data?.data?.folowDay?.['staticJobFollowDay '];
    const staticJobNormalFollowDay = data?.data?.folowDay?.staticJobNormalFollowDay;
    const staticJobVipFollowDay = data?.data?.folowDay?.['staticJobVipFollowDay '];
    const months = data?.data?.time;
    const staticJobFollowMonth = data?.data?.folowMonth?.staticJobFollowMonth;
    const staticJobNormalFollowMonth = data?.data?.folowMonth?.staticJobNormalFollowMonth;
    const staticJobVipFollowMonth = data?.data?.folowMonth?.staticJobVipFollowMonth;
    const [selectedOption, setSelectedOption] = useState('all'); // all, vip, normal
    const [selectedOption1, setSelectedOption1] = useState('all');

    const getDataByOption = () => {
        switch (selectedOption) {
            case 'vip':
                return {
                    labels: day,
                    datasets: [
                        {
                            data: staticJobVipFollowDay,
                            backgroundColor: 'transparent',
                            borderColor: '#f26c6d',
                            pointBorderColor: 'transparent',
                            pointBorderWidth: 4,
                            tension: 0.5,
                        },
                    ],
                };
            case 'normal':
                return {
                    labels: day,
                    datasets: [
                        {
                            data: staticJobNormalFollowDay,
                            backgroundColor: 'transparent',
                            borderColor: '#f26c6d',
                            pointBorderColor: 'transparent',
                            pointBorderWidth: 4,
                            tension: 0.5,
                        },
                    ],
                };
            default:
                return {
                    labels: day,
                    datasets: [
                        {
                            data: staticJobFollowDay,
                            backgroundColor: 'transparent',
                            borderColor: '#f26c6d',
                            pointBorderColor: 'transparent',
                            pointBorderWidth: 4,
                            tension: 0.5,
                        },
                    ],
                };
        }
    };
    const getDataByOption1 = () => {
        switch (selectedOption1) {
            case 'vip':
                return {
                    labels: months,
                    datasets: [
                        {
                            data: staticJobVipFollowMonth,
                            backgroundColor: 'transparent',
                            borderColor: '#f26c6d',
                            pointBorderColor: 'transparent',
                            pointBorderWidth: 4,
                            tension: 0.5,
                        },
                    ],
                };
            case 'normal':
                return {
                    labels: months,
                    datasets: [
                        {
                            data: staticJobNormalFollowMonth,
                            backgroundColor: 'transparent',
                            borderColor: '#f26c6d',
                            pointBorderColor: 'transparent',
                            pointBorderWidth: 4,
                            tension: 0.5,
                        },
                    ],
                };
            default:
                return {
                    labels: months,
                    datasets: [
                        {
                            data: staticJobFollowMonth,
                            backgroundColor: 'transparent',
                            borderColor: '#f26c6d',
                            pointBorderColor: 'transparent',
                            pointBorderWidth: 4,
                            tension: 0.5,
                        },
                    ],
                };
        }
    };
    const options: any = {
        // maintainAspectRatio: false,
        plugins: {
            legend: false,
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    stepSize: 2,
                    callback: (value: any) => value,
                },
                grid: {
                    borderDash: [10],
                },
            },
        },
    };

    return (
        <div className='my-10'>
            <div className='flex justify-between '>
                <h2 className='text-2xl'>Bài đăng</h2>
                <select
                    name=''
                    id=''
                    className='outline-none px-2 py-2 border rounded'
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                >
                    <option value='all'>Tất cả các bài đăng</option>
                    <option value='vip'>Số bài đăng VIP</option>
                    <option value='normal'>Số bài đăng thường</option>
                </select>
            </div>
            <p className='text-blue-500'> 1 Tuần qua</p>
            <Line className='h-[400px]' data={getDataByOption()} options={options} />
            <div className='flex justify-between my-5'>
                <p className='text-2xl '>Số bài đăng theo tháng</p>
                <select
                    name=''
                    id=''
                    className='outline-none px-2 py-2 border rounded'
                    value={selectedOption1}
                    onChange={(e) => setSelectedOption1(e.target.value)}
                >
                    <option value='all'>Tất cả các bài đăng</option>
                    <option value='vip'>Số bài đăng VIP</option>
                    <option value='normal'>Số bài đăng thường</option>
                </select>
            </div>
            <Line className='h-[400px]' data={getDataByOption1()} options={options} />

        </div>
    );
};

export default JobPost;
