import { Outlet } from "react-router-dom"

const Help = () => {
  return (
    <div className="max-w-screen-lg mx-auto grid grid-cols-4 gap-8 py-10">
      <div className="col-span-1 shadow-3xl py-4 max-h-60 overflow-y-auto">
        <ul className="space-y-1">
          <li>
            <a
              href="contact"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Liên hệ
            </a>
          </li>

          <li>
            <a
              href="policy"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Điều khoản sử dụng
            </a>
          </li>

          <li>
            <a
              href=""
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Quy chế hoạt động
            </a>
          </li>

          <li>
            <a
              href="faq"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Câu hỏi thường gặp
            </a>
          </li>

          <li>
            <a
              href="dispute-resolution"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Giải quyết khiếu nại
            </a>
          </li>
        </ul>
      </div>
      <Outlet></Outlet>
    </div>
  )
}

export default Help