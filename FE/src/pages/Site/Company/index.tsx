import { BsSearch } from 'react-icons/bs';
import TextLoop from 'react-text-loop';
import ContentCompany from './Content';
import React from 'react';

const Company = () => {
    const textList = [
        "Review có tâm,chính xác nhất",
        "Tìm nơi làm việc tuyệt vời",
        "Review lương bổng, HR,sếp và công việc"
    ];
    return (
        <div>
            <div className='max-w-screen-xl mx-auto px-8 '>
                <div className='py-4'>
                    <p className='text-3xl font-bold py-3'>
                        Review công ty-{' '}
                        <TextLoop interval={3000}>
                            {textList.map((text, index) => (
                                <span className='text-blue-500' key={index}>{text}</span>
                            ))}
                        </TextLoop>
                    </p>
                    <p className='text-lg text-gray-500'>Đánh giá công ty và tìm kiếm nơi làm việc tốt nhất cho sự nghiệp của bạn</p>
                </div>
                <form className='grid grid-cols-3'>
                    <div className='col-span-2 border rounded-xl bg-white justify-between px-2 my-7 flex items-center py-3'>
                        <input type="text"
                            className='outline-none ml-3  lg:w-[350px]'
                            placeholder='Tìm kiếm theo tên công ty' />
                        <span className='pr-5'><BsSearch /></span>
                    </div>
                    <button className='col-span-1 bg-blue-600 px-10 lg:my-7 lg:ml-2 rounded-xl text-white font-semibold  w-full lg:w-auto'>Tìm công ty</button>
                </form>
            </div>
            <ContentCompany />
            <div className='bg-gray-100'>
                <div className="max-w-screen-xl mx-auto flow-root px-8">
                    <p className='font-bold text-xl text-gray-800'>Câu hỏi thường gặp khi review công ty</p>
                    <div className="my-8 grid grid-cols-1 gap-4">
                        <details className="group py-4 [&_summary::-webkit-details-marker]:hidden bg-white rounded-2xl shadow-md hover:shadow-lg px-6">
                            <summary
                                className="flex cursor-pointer items-center justify-between text-gray-700"
                            >
                                <h2 className="text-lg font-medium transition-colors duration-300 group-open:text-blue-600">
                                    1. Hiện tại có bao nhiêu công ty được review trên 123job?
                                </h2>

                                <span className="relative h-5 w-5 shrink-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </span>
                            </summary>

                            <p className="mt-4 leading-relaxed text-gray-700">
                                Có hơn 60000+ công ty đang được review trên 123job.
                            </p>
                        </details>

                        <details className="group py-4 [&_summary::-webkit-details-marker]:hidden bg-white rounded-2xl shadow-md hover:shadow-lg px-6">
                            <summary
                                className="flex cursor-pointer items-center justify-between text-gray-700"
                            >
                                <h2 className="text-lg font-medium transition-colors duration-300 group-open:text-blue-600">
                                    2. Làm thế nào để thêm công ty muốn review?
                                </h2>

                                <span className="relative h-5 w-5 shrink-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </span>
                            </summary>

                            <p className="mt-4 leading-relaxed text-gray-700">
                                Bạn cập nhật thông tin công ty khi tạo tài khoản nhà tuyển dụng trên 123job. Công ty của bạn sẽ được hiện thị trên website, quá trình này có thể mất một chút thời gian.
                            </p>
                        </details>

                        <details className="group py-4 [&_summary::-webkit-details-marker]:hidden bg-white rounded-2xl shadow-md hover:shadow-lg px-6">
                            <summary
                                className="flex cursor-pointer items-center justify-between text-gray-700"
                            >
                                <h2 className="text-lg font-medium transition-colors duration-300 group-open:text-blue-600">
                                    3. Có nên đọc review công ty không?
                                </h2>

                                <span className="relative h-5 w-5 shrink-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </span>
                            </summary>

                            <p className="mt-4 leading-relaxed text-gray-700">
                                Có thể nói, đọc Review công ty là một bước “nhất định phải làm” nếu ứng viên muốn tăng tỉ lệ tìm việc phù hợp hoặc nhà tuyển dụng/quản lý có tham vọng biến công ty của mình trở thành “nơi làm việc đáng mơ ước nhất” cho tất cả mọi người.
                            </p>
                        </details>

                        <details className="group py-4 [&_summary::-webkit-details-marker]:hidden bg-white rounded-2xl shadow-md hover:shadow-lg px-6">
                            <summary
                                className="flex cursor-pointer items-center justify-between text-gray-700"
                            >
                                <h2 className="text-lg font-medium transition-colors duration-300 group-open:text-blue-600">
                                    4. Review công ty trên 123job có uy tín và tin cậy không?
                                </h2>

                                <span className="relative h-5 w-5 shrink-0">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="absolute inset-0 h-5 w-5 opacity-100 group-open:opacity-0"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>

                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="absolute inset-0 h-5 w-5 opacity-0 group-open:opacity-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </span>
                            </summary>

                            <p className="mt-4 leading-relaxed text-gray-700">
                                Review công ty trên 123job được chính đội ngũ nhân sự đã và đang làm việc tại các công ty đánh giá nên đảm bảo về sự uy tín và đáng tin cậy.
                            </p>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Company