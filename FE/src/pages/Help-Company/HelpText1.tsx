
import { FaFile } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HelpText1 = () => {

    return (
        <div className='max-w-screen-xl mx-auto ml-20 mr-60 mt-10 ' >
            <h1 className="text-5xl mb-10 ml-30">Trung Tâm Trợ giúp - IT Cassers</h1>
            <span className="text-gray-500 text-xl ">IT Cassers Help là trang nội dung trợ giúp giải đáp cho nhà tuyển dụng những thông tin được hướng dẫn trực tiếp và dễ hiểu nhất để sử dụng các công cụ dành cho nhà tuyển dụng được phát triển bởi IT Cassers .</span>
            <p className="mt-8 mb-8"> Với tầm nhìn trở thành website tuyển dụng hàng đầu Việt Nam, 123job không ngừng cố gắng, nỗ lực và phát triển, luôn mong muốn mang lại những sản phẩm, giải pháp chất lượng cao dành cho người dùng và nhà tuyển dụng.</p>

            <div>
                <h3 className="text-2xl mb-3">Tổng Hợp Dịch Vụ</h3>
                <p className='mb-3'>Những sản phẩm và dịch vụ hỗ trợ giúp bạn tuyển dụng hiệu quả, tiện lợi và dễ dàng hơn.</p>

                <Link to="" target="_blank" rel="noopener noreferrer" className="flex  p-2 bg-white-200 rounded-full shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500  border border-solid border-gray-300 mt-8 mb-8 ">
                    <FaFile className="h-10 w-9 ml-5  text-gray-700" />
                    <span className='ml-3 mt-2'>Sản Phẩm Và Dịch Vụ</span>
                </Link>
                <Link to="https://example.com" target="_blank" rel="noopener noreferrer" className="flex  p-2 bg-white-200 rounded-full shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500  border border-solid border-gray-300 mt-8 mb-8 ">
                    <FaFile className="h-10 w-9 ml-5  text-gray-700" />
                    <span className='ml-3 mt-2'> Dịch vụ hỗ trợ đăng tin</span>
                </Link>
                <Link to="https://example.com" target="_blank" rel="noopener noreferrer" className="flex  p-2 bg-white-200 rounded-full shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500  border border-solid border-gray-300 mt-8 mb-8 ">
                    <FaFile className="h-10 w-9 ml-5  text-gray-700" />
                    <span className='ml-3 mt-2'>Tìm kiếm hồ sơ ứng viên</span>
                </Link>
                <Link to="https://example.com" target="_blank" rel="noopener noreferrer" className="flex  p-2 bg-white-200 rounded-full shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500  border border-solid border-gray-300mt-8 mb-8 ">
                    <FaFile className="h-10 w-9 ml-5  text-gray-700" />
                    <span className='ml-3 mt-2'>Chuyên trang tuyển dụng</span>
                </Link>
                <Link to="https://example.com" target="_blank" rel="noopener noreferrer" className="flex  p-2 bg-white-200 rounded-full shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500  border border-solid border-gray-300 mt-8 mb-8 ">
                    <FaFile className="h-10 w-9 ml-5  text-gray-700" />
                    <span className='ml-3 mt-2'>Kết nối ứng viên</span>
                </Link>


            </div>
            <div>
                <h3 className="text-2xl mb-3">Gợi ý Nhanh</h3>
                <p className='mb-3'>Một số hướng dẫn, gợi ý để bạn thiết lập sản phẩm của chúng tôi nhanh chóng.</p>

                <Link to="https://example.com" target="_blank" rel="noopener noreferrer" className="flex  p-2 bg-white-200 rounded-full shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500  border border-solid border-gray-300 mt-8 mb-8 ">
                    <FaFile className="h-10 w-9 ml-5  text-gray-700" />
                    <span className='ml-3 mt-2'>Đăng tin tuyển dụng</span>
                </Link>
                <Link to="https://example.com" target="_blank" rel="noopener noreferrer" className="flex  p-2 bg-white-200 rounded-full shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500  border border-solid border-gray-300 mt-8 mb-8 ">
                    <FaFile className="h-10 w-9 ml-5  text-gray-700" />
                    <span className='ml-3 mt-2'>Mẹo chiến dịch thu hút</span>
                </Link>
                <Link to="https://example.com" target="_blank" rel="noopener noreferrer" className="flex  p-2 bg-white-200 rounded-full shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500  border border-solid border-gray-300 mt-8 mb-8 ">
                    <FaFile className="h-10 w-9 ml-5  text-gray-700" />
                    <span className='ml-3 mt-2'>Tạo chiến dịch hiệu quả</span>
                </Link>
            </div>
            <hr className="custom-hr mb-10" />
            <p className='text-gray-400 mb-10'>Last modefiled 10/05/2023 </p>

        </div>
    )
}

export default HelpText1