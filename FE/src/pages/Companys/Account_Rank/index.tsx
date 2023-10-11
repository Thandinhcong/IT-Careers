import React from 'react'
import { AiOutlineArrowRight, AiOutlineSearch } from 'react-icons/ai'
import { BsFillClipboardCheckFill, BsFillJournalBookmarkFill, BsFillStarFill } from 'react-icons/bs'
import { GiPresent } from 'react-icons/gi'

import { Link } from 'react-router-dom'
import Slider from 'react-slick'

const AccRank = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className=''>
            <div className='mt-20 ml-10 '>
                <p className='text-sm my-5 ml-3' >
                    <Link to="/companys">Bảng tin </Link> /
                    <span className='text-gray-500'> Hạng Tài Khoản</span>
                </p>
                <div className="flex justify-end mt-3">
                    <Link to="" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-8">
                        Phân Loại Hạng Tài Khoản
                    </Link>
                    <Link to="" className="bg-white hover:bg-blue-500 hover:text-white border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded mr-8">
                        Quản Lý Hạng Của Tôi
                    </Link>
                </div>
                <div className='border shadow p-3 mr-3 ml-3 mt-3 bg-white'>
                    <h3 className='text-2xl ml-5'>Hạng Tài Khoản ? </h3>
                    <p className=' ml-2 mt-3 text-gray-500'>IT Cassers nhận thấy hiện nay, các chính sách ưu đãi cho các nhà tuyển dụng lớn là chưa có nhiều, chính vì vậy tính năng Hạng tài khoản này được ra mắt nhằm cung cấp các quyền lợi, chính sách ưu đãi nhất cho các nhà tuyển dụng sử dụng dịch vụ của IT Cassers.</p>
                    <div className='border shadow p-3 mr-3 mt-5'>
                        <h3 className='ml-3'>Tài Liệu Nên Xem</h3>
                        <Link to="" target="_blank" rel="noopener noreferrer" className="flex  p-2 bg-blue-100 rounded-full shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-lg border border-solid border-gray-300 mt-8 mb-8 ml-5 ">

                            <span className=' flex-grow text-blue-600 ml-3 mt-2 mb-2'>Khái Niệm Về Tài Khoản</span>
                            <AiOutlineArrowRight className="ml-3 mt-3 mb-2" />
                        </Link>
                        <Link to="" target="_blank" rel="noopener noreferrer" className="flex  p-2 bg-blue-100 rounded-full shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 rounded-lg border border-solid border-gray-300 mt-8 mb-8 ml-5 ">

                            <span className=' flex-grow text-blue-600 ml-3 mt-2 mb-2'>Các loại tài khoản ? Bạn phù hợp với loại nào? </span>
                            <AiOutlineArrowRight className="ml-30 mt-3 mb-2" />
                        </Link>
                    </div>
                    < p className=' ml-2 mt-3 text-gray-500'>Hiểu về các chính sách từ các loại hạng tài khoản, nhà tuyển dụng có thể giúp mình tối ưu được số tiền bỏ ra, cũng như là nhận được cho mình các ưu đãi và chính sách tốt nhất từ 123job một cách tối ưu nhất !</p>

                </div>
                <div className='border shadow p-3 mr-3 ml-3 mt-3 mb-10 bg-white  '>
                    <h3 className='text-2xl ml-5 mb-10'> Phân Loại Hạng Tài Khoản ? </h3>
                    <Slider {...settings}>
                        <div>
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mb-10">
                                <div className="h-[400px] rounded-lg  border h-50">
                                    <div className='flex items-center justify-center'>
                                        <img src="https://business.123job.vn/images/rank_d.png" className='w-20 mt-5 mb-5' />
                                    </div>
                                    <p className='text-center'>Hạng D</p>
                                    <div className="leading-8 text-sm mt-10 ml-20">
                                        <p className='mt-5'>
                                            <BsFillJournalBookmarkFill className="text-yellow-400 inline-block mr-3 ml-5" />
                                            2 nhiệm vụ ưu đãi
                                        </p>
                                        <p className='mt-3'>
                                            <BsFillClipboardCheckFill className="text-red-400 inline-block mr-3 ml-5" />
                                            1 yêu cầu kích hoạt
                                        </p>
                                    </div>
                                    <div className='mt-[100px] ml-[100px]'>
                                        <Link to=""><AiOutlineSearch className="text-blue-400 inline-block mr-3 ml-5" /> Tra Cứu</Link>
                                    </div>

                                </div>
                                <div className="h-[400px] rounded-lg  border h-50">
                                    <div className='flex items-center justify-center'>
                                        <img src="https://business.123job.vn/images/rank_c.png" className='w-20 mt-5 mb-5' />
                                    </div>
                                    <p className='text-center'>Hạng C</p>
                                    <div className="leading-8 text-sm mt-10 ml-20">
                                        <p className='mt-5'>
                                            <BsFillJournalBookmarkFill className="text-yellow-400 inline-block mr-3 ml-5" />
                                            2 nhiệm vụ ưu đãi
                                        </p>
                                        <p className='mt-3'>
                                            <BsFillClipboardCheckFill className="text-red-400 inline-block mr-3 ml-5" />
                                            2 yêu cầu kích hoạt
                                        </p>
                                        <p className='mt-3'>
                                            <BsFillStarFill className="text-green-400 inline-block mr-3 ml-5" />
                                            1 phúc lợi
                                        </p>
                                    </div>
                                    <div className='mt-[55px] ml-[100px]'>
                                        <Link to=""><AiOutlineSearch className="text-blue-400 inline-block mr-3 ml-5" /> Tra Cứu</Link>
                                    </div>

                                </div>
                                <div className="h-[400px] rounded-lg  border h-50">
                                    <div className='flex items-center justify-center'>
                                        <img src="https://business.123job.vn/images/rank_b.png" className='w-20 mt-5 mb-5' />
                                    </div>
                                    <p className='text-center'>Hạng B</p>
                                    <div className="leading-8 text-sm mt-5 ml-20">
                                        <p className='mt-5'>
                                            <BsFillJournalBookmarkFill className="text-yellow-400 inline-block mr-3 ml-5" />
                                            3 nhiệm vụ ưu đãi
                                        </p>
                                        <p className='mt-3'>
                                            <BsFillClipboardCheckFill className="text-red-400 inline-block mr-3 ml-5" />
                                            2 yêu cầu kích hoạt
                                        </p>
                                        <p className='mt-3'>
                                            <BsFillStarFill className="text-green-400 inline-block mr-3 ml-5" />
                                            1 phúc lợi
                                        </p>
                                        <p className='mt-3'>
                                            <GiPresent className="text-
purple-200 inline-block mr-3 ml-5" />
                                            1 quà tặng
                                        </p>
                                    </div>
                                    <div className='mt-[32px] ml-[100px]'>
                                        <Link to=""><AiOutlineSearch className="text-blue-400 inline-block mr-3 ml-5" /> Tra Cứu</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">

                                <div className="h-[400px] rounded-lg  border h-50">
                                    <div className='flex items-center justify-center'>
                                        <img src="https://business.123job.vn/images/rank_a.png" className='w-20 mt-5 mb-5' />
                                    </div>
                                    <p className='text-center'>Hạng A</p>
                                    <div className="leading-8 text-sm mt-5 ml-20">
                                        <p className='mt-5'>
                                            <BsFillJournalBookmarkFill className="text-yellow-400 inline-block mr-3 ml-5" />
                                            4 nhiệm vụ ưu đãi
                                        </p>
                                        <p className='mt-3'>
                                            <BsFillClipboardCheckFill className="text-red-400 inline-block mr-3 ml-5" />
                                            2 yêu cầu kích hoạt
                                        </p>
                                        <p className='mt-3'>
                                            <BsFillStarFill className="text-green-400 inline-block mr-3 ml-5" />
                                            1 phúc lợi
                                        </p>
                                        <p className='mt-3'>
                                            <GiPresent className="text-
purple-200 inline-block mr-3 ml-5" />
                                            1 quà tặng
                                        </p>
                                    </div>
                                    <div className='mt-[32px] ml-[100px]'>
                                        <Link to=""><AiOutlineSearch className="text-blue-400 inline-block mr-3 ml-5" /> Tra Cứu</Link>
                                    </div>

                                </div>
                                <div className="h-[400px] rounded-lg  border h-50">
                                    <div className='flex items-center justify-center'>
                                        <img src="https://business.123job.vn/images/rank_s.png" className='w-20 mt-5 mb-5' />
                                    </div>
                                    <p className='text-center'>Hạng S</p>
                                    <div className="leading-8 text-sm mt-5 ml-20">
                                        <p className='mt-5'>
                                            <BsFillJournalBookmarkFill className="text-yellow-400 inline-block mr-3 ml-5" />
                                            5 nhiệm vụ ưu đãi
                                        </p>
                                        <p className='mt-3'>
                                            <BsFillClipboardCheckFill className="text-red-400 inline-block mr-3 ml-5" />
                                            2 yêu cầu kích hoạt
                                        </p>
                                        <p className='mt-3'>
                                            <BsFillStarFill className="text-green-400 inline-block mr-3 ml-5" />
                                            1 phúc lợi
                                        </p>
                                        <p className='mt-3'>
                                            <GiPresent className="text-
purple-200 inline-block mr-3 ml-5" />
                                            1 quà tặng
                                        </p>
                                    </div>
                                    <div className='mt-[32px] ml-[100px]'>
                                        <Link to=""><AiOutlineSearch className="text-blue-400 inline-block mr-3 ml-5" /> Tra Cứu</Link>
                                    </div>

                                </div>
                                <div className="h-[400px] rounded-lg  border h-50">
                                    <div className='flex items-center justify-center'>
                                        <img src="https://business.123job.vn/images/rank_ss.png" className='w-20 mt-5 mb-5' />
                                    </div>
                                    <p className='text-center'>Hạng SS</p>
                                    <div className="leading-8 text-sm mt-5 ml-20">
                                        <p className='mt-5'>
                                            <BsFillJournalBookmarkFill className="text-yellow-400 inline-block mr-3 ml-5" />
                                            5 nhiệm vụ ưu đãi
                                        </p>
                                        <p className='mt-3'>
                                            <BsFillClipboardCheckFill className="text-red-400 inline-block mr-3 ml-5" />
                                            2 yêu cầu kích hoạt
                                        </p>
                                        <p className='mt-3'>
                                            <BsFillStarFill className="text-green-400 inline-block mr-3 ml-5" />
                                            1 phúc lợi
                                        </p>
                                        <p className='mt-3'>
                                            <GiPresent className="text-
purple-200 inline-block mr-3 ml-5" />
                                            2 quà tặng
                                        </p>
                                    </div>
                                    <div className='mt-[32px] ml-[100px]'>
                                        <Link to=""><AiOutlineSearch className="text-blue-400 inline-block mr-3 ml-5" /> Tra Cứu</Link>
                                    </div>

                                </div>
                            </div>
                        </div>


                    </Slider>

                </div>


            </div>
        </div>
    )

}

export default AccRank

