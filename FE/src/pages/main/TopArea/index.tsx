import { Link } from 'react-router-dom'

const TopArea = () => {
    return (
        <div className='mb-10 rounded-2xl '>
            <h2 className='text-2xl'>Các khu vực <span className='text-blue-500'> hàng đầu</span></h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                <div className='shadow-md mt-10'>
                    <img
                        src="https://media.vietravel.com/images/news/ha-noi-1.jpg"
                        className='rounded-t-2xl mb-2'
                        alt=""
                    />
                    <Link to="" className='font-semibold p-2 my-3 hover:text-blue-500'>Hà Nội</Link>
                    <p className='p-2'>36.549 việc làm</p>
                </div>
                <div className='shadow-md mt-10'>
                    <img
                        src="https://media.vietravel.com/images/news/ha-noi-1.jpg"
                        className='rounded-t-2xl mb-2'
                        alt=""
                    />
                    <Link to="" className='font-semibold p-2 my-3  hover:text-blue-500'>Hồ Chí Minh</Link>
                    <p className='p-2'>36.549 việc làm</p>
                </div>
                <div className='shadow-md mt-10'>
                    <img
                        src="https://media.vietravel.com/images/news/ha-noi-1.jpg"
                        className='rounded-t-2xl mb-2'
                        alt=""
                    />
                    <Link to="" className='font-semibold p-2 my-3 hover:text-blue-500'>Đà Nẵng</Link>
                    <p className='p-2'>36.549 việc làm</p>
                </div>
            </div>
        </div>
    )
}

export default TopArea