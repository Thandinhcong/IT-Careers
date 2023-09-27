

const Contact = () => {
    return (
        <div className="col-span-3">
            <h1 className="font-bold text-xl my-4">Liên hệ chúng tôi</h1>
            <hr />
            <p className="py-4"><span className="w-10 inline-block base-line"></span>Cảm ơn bạn đã gia nhập mạng ưới tuyển dụng 123Job.vn của chúng tôi, là 1 website tuyển dụng lớn nhất tại Việt Nam hiện nay. Bạn có thể liên hệ với chúng tôi theo một trong những cách sau:
            </p>
            <div>
                <div className="flex justify-start">
                    <span className="bg-gray-600 text-white font-bold px-4 py-2 text-center">1</span>
                    <p className="border-b border-gray-900 w-full pl-4 font-bold pt-1 text-lg">Bộ phận Tư Vấn Nghề Nghiệp</p>
                </div>
                <p className="py-4"><span className="w-10 inline-block base-line"></span> Nếu bạn có thắc mắc trong quá trình sử dụng trang web 123Job.vn, mời bạn vào trang Hỏi Đáp để xem hướng dẫn sử dụng và giải quyết những vấn đề thường gặp.</p>
                <p><span className="w-10 inline-block base-line"></span>Đối với những vấn đề khác, mời bạn điền vào mẫu thư liên lạc và gửi đi cho chúng tôi theo địa chỉ. Các chuyên viên tư vấn của 123Job.vn sẽ trả lời bạn trong thời gian sớm nhất.</p>
            </div>
            <div>
                <div className="flex justify-start">
                    <span className="bg-gray-600 text-white font-bold px-4 py-2 text-center">2</span>
                    <p className="border-b border-gray-900 w-full pl-4 font-bold pt-1 text-lg">Bộ phận kỹ thuật</p>
                </div>
                <p className="py-4"><span className="w-10 inline-block base-line"></span>Địa chỉ: 102 Thái Thịnh Đống Đa Hà Nội</p>
                <p><span className="w-10 inline-block base-line"></span>Email: contact@123job.vn</p>
                <p className="py-4"><span className="w-10 inline-block base-line"></span>Zalo/Phone: 0368201788</p>
            </div>
        </div>
    )
}

export default Contact