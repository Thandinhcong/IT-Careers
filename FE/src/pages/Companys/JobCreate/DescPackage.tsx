import React from 'react';
import { useGetJobPostSelectByIdQuery } from '../../../api/companies/jobPostCompany';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';

const DescPackage = React.memo(() => {
    const { data } = useGetJobPostSelectByIdQuery();

    const formatCurrency = (amount: number, currency: string) => {
        const formattedAmount = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: currency,
        }).format(amount);

        return formattedAmount;
    };

    return (
        <div className='p-5 h-1/2 sticky top-20 bg-white text-[#526484] w-1/3'>
            <h1 className='text-xl font-semibold text-gray-700 '>Thông tin các gói đăng</h1>
            <div className=''>
                <ul className='mx-3'>
                    {data?.data?.type_job_post.map((packageItem: any) => (
                        <li key={packageItem.id} className='my-4 leading-7'>
                            <span className='text-xl font-bold'>{packageItem.name}</span>
                            <div className="mx-3">
                                <p className='flex items-center text-red-400 font-semibold'>
                                    <MdOutlineAttachMoney />
                                    <span className=''>Giá gói đăng: {formatCurrency(packageItem.salary, 'VND')}/ngày</span>
                                </p>
                                <p className='flex items-center gap-1'><AiOutlineCheck className='text-green-500' />Các tính năng của gói:</p>
                                <p dangerouslySetInnerHTML={{ __html: packageItem.desc }} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
});

export default DescPackage;