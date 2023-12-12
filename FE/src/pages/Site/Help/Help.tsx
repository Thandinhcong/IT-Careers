import { useEffect } from "react"
import { Link, Outlet } from "react-router-dom"

const Help = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div className="max-w-screen-lg mx-auto grid grid-cols-4 gap-8 py-10">
      <div className="col-span-1 shadow-3xl py-4 max-h-60 overflow-y-auto">
        <ul className="space-y-1">
          <li>
            <Link
              to="contact"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Liên hệ
            </Link>
          </li>

          <li>
            <Link
              to="policy"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Điều khoản sử dụng
            </Link>
          </li>

          {/* <li>
            <Link
              to=""
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Quy chế hoạt động
            </Link>
          </li> */}

          {/* <li>
            <Link
              to="faq"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Câu hỏi thường gặp
            </Link>
          </li> */}

          <li>
            <Link
              to="dispute-resolution"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Giải quyết khiếu nại
            </Link>
          </li>
        </ul>
      </div>
      <Outlet></Outlet>
    </div>
  )
}

export default Help