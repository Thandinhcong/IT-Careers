import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";
import { useState } from "react";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    Tooltip,
    Legend
);

const Statistical = ({ data }: any) => {
    const months = data?.months;
    const day = data?.data?.day;
    const staticMoneyFollowDay = data?.data?.folowDay?.staticMoneyFollowDay;
    const [selectedOption1, setSelectedOption1] = useState('normal');
    const totalMoneyMonth = data?.totalMoneyMonth;
    const getDataByOption1 = () => {
        switch (selectedOption1) {
            case 'normal':
                return {
                    labels: day,
                    datasets: [{
                        label: 'Doanh thu',
                        data: staticMoneyFollowDay,
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
                        label: 'Doanh thu',
                        data: totalMoneyMonth,
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
        <div className='mt-10'>
            <div className='flex justify-between my-5'>
                <p className='text-2xl '>Tài chính</p>
                <select
                    name=''
                    id=''
                    className='outline-none px-2 py-2 border rounded'
                    value={selectedOption1}
                    onChange={(e) => setSelectedOption1(e.target.value)}
                >
                    <option value='normal'>Tuần qua</option>
                    <option value='years'>Tháng qua</option>
                </select>
            </div>
            {/* Thay Line bằng Bar */}
            <Bar className='h-[100px]' data={getDataByOption1()} options={options} />
        </div>
    );
};

export default Statistical;
