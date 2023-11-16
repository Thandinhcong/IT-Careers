import { useEffect } from "react"

const Policy = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className="col-span-3">
            <h1 className="font-bold text-xl my-4">Điều khoản sử dụng</h1>
            <hr className='py-4' />
            <div className=''>
                <div className="flex justify-start">
                    <span className="bg-gray-600 text-white font-bold px-4 py-2 text-center">1</span>
                    <p className="border-b border-gray-900 w-full pl-4 font-bold pt-1 text-lg">Quyền và trách nhiệm của Ban quản trị website BEWORK</p>
                </div>
                <p className='font-bold text-lg my-4'>1. Quyền</p>
                <div className='grid grid-cols-1 gap-4 text-gray-600 text-md pb-4'>
                    <p><span className="w-10 inline-block base-line"></span>Yêu cầu Ứng Viên phải cung cấp thông tin đầy đủ, chính xác và trung thực.Trong trường hợp có cơ sở chứng minh Ứng Viên cung cấp thông tin không chính xác, sai lệnh, không đầy đủ hoặc vi phạm pháp luật hay thuần phong mỹ tục Việt Nam thì Công ty có quyền từ chối, tạm ngừng hoặc chấm dứt quyền sử dụng dịch vụ của Ứng Viên/Nhà Tuyển Dụng</p>
                    <p><span className="w-10 inline-block base-line"></span>Tạm ngừng hiển thị Tin Tuyển Dụng, chỉnh sửa hoặc xóa nội dung Tin Tuyển Dụng ra khỏi Website  https://bework.com/ nếu Công ty phát hiện Tin Tuyển Dụng đó có nội dung vi phạm pháp luật, xâm phạm danh dự và nhân phẩm của người khác.</p>
                    <p><span className="w-10 inline-block base-line"></span>Giữ bản quyền về tất cả các nội dung, biểu tượng được thể hiện/đăng tải trên Website  https://bework.com/ theo các quy định pháp luật về bảo hộ sở hữu trí tuệ tại Việt Nam. Website  https://bework.com/. Nghiêm cấm mọi hành vi sao chép, sử dụng và phổ biến bất hợp pháp các biểu tượng, nội dung thuộc quyền sở hữu của Công ty.</p>
                    <p><span className="w-10 inline-block base-line"></span>Thay đổi, sửa đổi/bổ sung các quy định, chính sách và các nội dung khác được đăng tải trên Website  https://bework.com/ theo từng thời điểm và tình hình hoạt động kinh doanh thực tế của Website  https://bework.com/</p>
                    <p><span className="w-10 inline-block base-line"></span>Và các quyền khác theo quy định của pháp luật Việt Nam.</p>
                </div>
                <p className='font-bold text-lg my-4'>2. Trách nhiệm</p>
                <div className='grid grid-cols-1 gap-4 text-gray-600 text-md pb-4'>
                    <p><span className="w-10 inline-block base-line"></span>Đăng ký thiết lập Website  https://bework.com/ cung cấp dịch vụ sàn giao dịch thương mại điện tử theo quy định tại Mục 2 Chương IV Nghị định này và công bố các thông tin đã đăng ký trên trang chủ Website  https://bework.com/.</p>
                    <p><span className="w-10 inline-block base-line"></span>Xây dựng và công bố công khai trên Website  https://bework.com/ quy chế hoạt động của sàn giao dịch thương mại điện tử; theo dõi và bảo đảm việc thực hiện quy chế đó trên Website  https://bework.com/

                    </p>
                    <p><span className="w-10 inline-block base-line"></span>Yêu cầu thương nhân, tổ chức, cá nhân là người bán trên Website  https://bework.com/ cung cấp thông tin theo quy định tại Điều 29 Nghị định này khi đăng ký sử dụng dịch vụ.</p>
                    <p><span className="w-10 inline-block base-line"></span>Xây dựng cơ chế kiểm tra, giám sát để đảm bảo việc cung cấp thông tin của Nhà Tuyển Dụng trên Website  https://bework.com/ được thực hiện chính xác, đầy đủ.</p>
                    <p><span className="w-10 inline-block base-line"></span>Và các trách nhiệm khác được quy định tại Quy chế này và quy định của pháp luật.</p>
                </div>
            </div>
            <div>
                <div className="flex justify-start">
                    <span className="bg-gray-600 text-white font-bold px-4 py-2 text-center">2</span>
                    <p className="border-b border-gray-900 w-full pl-4 font-bold pt-1 text-lg">Quyền và trách nhiệm của Ứng Viên</p>
                </div>
                <p className='font-bold text-lg my-4'>1. Quyền</p>
                <div className='grid grid-cols-1 gap-4 text-gray-600 text-md pb-4'>
                    <p><span className="w-10 inline-block base-line"></span>Tạo CV online và ứng tuyển vào các vị trí công việc theo Tin Tuyển Dụng được đăng tải trên Website  https://bework.com/.</p>
                    <p><span className="w-10 inline-block base-line"></span>Được hưởng các chính sách ưu đãi do Website  https://bework.com/cung cấp. Chính sách ưu đãi sẽ được đăng tải trực tiếp trên trang chủ của Website  https://bework.com/ và các kênh thông tin khác.</p>
                    <p><span className="w-10 inline-block base-line"></span>Đóng góp ý kiến cho Ban quản trị trong quá trình ứng tuyển. Mọi kiến nghị được gửi trực tiếp qua thư, điện thoại, email. Tất cả các ý kiến, thắc mắc sẽ được phòng chăm sóc khách hàng giải đáp trong thời gian ngắn nhất có thể.</p>
                </div>
                <p className='font-bold text-lg my-4'>2. Trách nhiệm</p>
                <div className='grid grid-cols-1 gap-4 text-gray-600 text-md pb-4'>
                    <p><span className="w-10 inline-block base-line"></span>Bảo mật, lưu giữ tài khoản đăng nhập, email đã đăng ký trên Website  https://bework.com/. Trong trường hợp bị lộ/mất một trong các thông tin nêu trên thì Ứng Viên có trách nhiệm thông báo ngay lập tức cho Ban quản trị.</p>
                    <p><span className="w-10 inline-block base-line"></span>Tự chịu trách nhiệm về mọi hoạt động được thực hiện dưới tài khoản đăng nhập trên Website  https://bework.com/, email đã đăng ký trên Website  https://bework.com/.</p>
                    <p><span className="w-10 inline-block base-line"></span>Không sao chép, sửa đổi, truyền bá, phân phối các Tin Tuyển Dụng hoặc tạo các Website, giao diện, tính năng tương tự như Website  https://bework.com/ khi chưa có sự đồng ý bằng văn bản của Ban quản trị.</p>
                    <p><span className="w-10 inline-block base-line"></span>Không được thực hiện các hành vi, lời nói gây mất uy tín của Website https://bework.com/ dưới mọi hình thức.</p>
                    <p><span className="w-10 inline-block base-line"></span>Và các trách nhiệm khác được quy định tại Quy chế này và quy định của pháp luật.</p>
                </div>
            </div>
        </div>
    )
}

export default Policy