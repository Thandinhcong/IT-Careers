import React from 'react'

const AsideDeposit = () => {
    return (
        <div>
            <h2 className='font-semibold text-lg'>Khuyến mãi khi mua xu</h2>
            <p className='text-gray-500'>Danh sách các gói khuyến mãi hiện có khi bạn nạp xu thành công cho tài khoản .</p>
            <p className='font-semibold my-3'>1. Gói nạp cố định</p>
            <table className="border-collapse border border-slate-400 w-full table-fixed">
                <thead>
                    <tr>
                        <th className="border border-slate-300 p-1 ">Gói</th>
                        <th className="border border-slate-300 p-1 ">Giá trị giao dịch</th>
                        <th className="border border-slate-300 p-1 ">Ưu đãi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='text-center'>
                        <td className="border border-slate-300 p-1">Thạch Anh Tím</td>
                        <td className="border border-slate-300 p-1">500,000 ~ 1,500,000</td>
                        <td className="border border-slate-300 p-1">100,000</td>
                    </tr>
                    <tr className='text-center'>
                        <td className="border border-slate-300 p-1 ">Hoàng Ngọc	</td>
                        <td className="border border-slate-300 p-1 ">1,500,000 ~ 2,500,000</td>
                        <td className="border border-slate-300 p-1 ">250,000</td>

                    </tr>
                    <tr className='text-center'>
                        <td className="border border-slate-300 p-1 ">Ngọc Lục Bảo</td>
                        <td className="border border-slate-300 p-1 ">2,500,000 ~ 3,500,000</td>
                        <td className="border border-slate-300 p-1 ">400,000</td>
                    </tr>
                    <tr className='text-center'>
                        <td className="border border-slate-300 p-1 ">Hồng Ngọc</td>
                        <td className="border border-slate-300 p-1 ">3,500,000</td>
                        <td className="border border-slate-300 p-1 ">700,000</td>

                    </tr>
                </tbody>
            </table>
            <p className='font-semibold my-3'>2. Sự kiện khuyến mãi</p>
            <table className="border-collapse border border-slate-400 w-full table-fixed">
                <thead>
                    <tr>
                        <th className="border border-slate-300 p-1">Sự kiện</th>
                        <th className="border border-slate-300 p-1">Thời gian</th>
                        <th className="border border-slate-300 p-1">Ưu đãi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-slate-300 p-1">Nạp tiền lần đầu</td>
                        <td className="border border-slate-300 p-1">Không thời hạn</td>
                        <td className="border border-slate-300 p-1">10%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default AsideDeposit