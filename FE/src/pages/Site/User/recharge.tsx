import React from 'react'

const Recharge = () => {
    return (
        <div className='grid grid-cols-3 gap-5 w-full'>

            <div className=''>
                <p>Gói nạp 1</p>
                <p>Gía 100.000 vnđ</p>
                <p>Số xu: 100.000xu</p>
                <p>Chọn</p>
            </div>
            <div className='border border-blue-500 p-5 rounded'>
                <p>Gói nạp 1</p>
                <p>Giá: 100.000 <span className='text-red-500'>vnđ</span></p>
                <p>Số xu: 100.000 <span className='text-red-500'>vnđ</span></p>
                <div className='flex justify-center mt-5'>
                    <button className='text-white bg-blue-500 px-3 rounded py-1 mx-auto'>Chọn</button>
                </div>
            </div>
            <div className=''>
                <p>Gói nạp 1</p>
                <p>Gía 100.000 vnđ</p>
                <p>Số xu: 100.000xu</p>
                <p>Chọn</p>
            </div>
        </div>
    )
}

export default Recharge