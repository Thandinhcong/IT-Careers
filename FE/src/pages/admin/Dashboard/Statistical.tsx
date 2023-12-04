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
import React from "react";


ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    Tooltip,
    Legend

)
const Statistical = React.memo(({ data }: any) => {
    const months = data?.months;
    const totalMoneyMonth = data?.totalMoneyMonth;
    const datas: any = {

        labels: months,
        datasets: [{
            data: totalMoneyMonth,
            backgroundColor: 'transparent',
            borderColor: '#f26c6d',
            pointBorderColor: 'transparent',
            pointBorderWidth: 4,
            tension: 0.5
        }]
    }
    const options: any = {
        maintainAspectRatio: false,
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
                    callback: (value: any) => value + "m"
                },
                grid: {
                    borderDash: [10]
                }
            }
        }
    }

    return (
        <div className='mt-10'>
            <Line className='h-[500px]' data={datas} options={options}>

            </Line>
        </div>
    )
});

export default Statistical