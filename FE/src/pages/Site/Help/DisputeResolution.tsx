import { useEffect } from "react"

const DisputeResolution = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className="col-span-3">
            <h1 className="font-bold text-xl my-4">Quy trình giải quyết tranh chấp</h1>
            <hr />
            <div>
                <div className="flex justify-start my-4">
                    <span className="bg-gray-600 text-white font-bold px-4 py-2 text-center">1</span>
                    <p className="border-b border-gray-900 w-full pl-4 font-bold pt-1 text-lg">Khi phát sinh khiếu nại liên quan đến Tin Tuyển Dụng, Người Tìm Việc/Nhà Tuyển Dụng thực hiện theo quy trình sau:</p>
                </div>
                <div className='grid grid-cols-1 gap-4 text-gray-600 text-md pb-4'>
                    <p>
                        <span className="w-10 inline-block base-line"></span>
                        <span className="underline">Bước 1 </span>
                        : Người Tìm Việc/Nhà Tuyển Dụng (Bên Khiếu Nại) khiếu nại trực tiếp tới Công ty bằng một trong các cách sau: gửi email tới bework@gmail.com.
                    </p>
                    <p>
                        <span className="w-10 inline-block base-line"></span>
                        <span className="underline">Bước 2 </span>
                        : Trong vòng 03 (ba) ngày làm việc kể từ ngày tiếp nhận khiếu nại, Công ty sẽ kiểm tra, xem xét và xác nhận thông tin khiếu nại và thông báo cho các bên có liên quan. Bên Khiếu Nại cần cung cấp các bằng chứng liên quan tới nội dung khiếu nại theo yêu cầu của Công ty.
                    </p>
                    <p>
                        <span className="w-10 inline-block base-line"></span>
                        <span className="underline">Bước 3 </span>
                        : Công ty thông báo cho Bên Khiếu Nại phương án giải quyết khiếu nại, nếu Bên Khiếu Nại đồng ý với phương án giải quyết Công ty trao đổi, hai bên sẽ tiếp tục thực hiện theo biện pháp đã thỏa thuận. Nếu Bên Khiếu Nại không đồng ý với phương án giải quyết khiếu nại Công ty đã trao đổi thì các Bên sẽ tiếp tục thương lượng để cùng thống nhất các biện pháp khác để phù hợp với hai bên.
                    </p>
                    <p>
                        <span className="w-10 inline-block base-line"></span>
                        <span className="underline">Bước 4 </span>
                        : Nếu trong vòng 30 ngày kể từ ngày phát sinh khiếu nại mà các Bên không thể giải quyết khiếu nại bằng hòa giải, thương lượng thì một trong các Bên có quyền đưa vụ việc lên Tòa án có thẩm quyền tại thành phố Hà Nội để giải quyết theo quy định của pháp luật.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DisputeResolution