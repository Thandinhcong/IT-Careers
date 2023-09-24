import React from 'react'

const PopularSearches = () => {
    return (
        <div className='my-10'>
            <h2 className='text-2xl mb-5'>Tìm kiếm <span className='text-blue-500'>phổ biến</span></h2>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7'>
                <a href="#" className='mr-4 rounded-lg border border-gray-100  shadow-2xl px-6 py-3 flex items-center hover:text-blue-500'>ReactJS</a>
                <a href="#" className='mr-4 rounded-lg border border-gray-100  shadow-2xl px-6 py-3 flex items-center hover:text-blue-500'>AngularJs</a>
            </div>
        </div>
    )
}

export default PopularSearches