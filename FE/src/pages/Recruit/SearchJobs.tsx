import { BsSearch } from 'react-icons/bs'
import { MdRoom } from 'react-icons/md'
import ContentCompany from '../Company/Content'

const SearchJobs = () => {
    return (
        <form className='lg:flex gap-2 my-5 '>
            <div className='border rounded-xl bg-white justify-between px-2 my-7 flex items-center lg:py-3 py-2 '>
                <label htmlFor="tìm kiếm" className='lg:pl-4 pl-2'>Tìm kiếm</label>
                <input type="text" className='outline-none ml-3  lg:w-[350px]' placeholder='Chức danh, từ khóa hoặc công ty' />
                <span className='pr-5'><BsSearch /></span>
            </div>
            <div
                className='border rounded-xl bg-white justify-between px-2 my-7 flex items-center lg:py-3 py-2'>
                <label className='lg:pl-4 pl-2' htmlFor="">Địa điểm</label>
                <input type="text" className='outline-none lg:ml-3 lg:w-[350px]' placeholder='Tỉnh hoặc thành phố' />
                <span className='pr-5'><MdRoom /></span>
            </div>
            <button className='bg-blue-600 px-10 lg:my-7 lg:ml-2 rounded-full text-white font-semibold  w-full lg:w-auto  py-2'>Tìm việc</button>
            <ContentCompany />
        </form>
    )
}

export default SearchJobs