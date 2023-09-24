import { Outlet } from "react-router-dom"
import Footer from "../component/Footer"
import Header from "../component/Header"

const BaseLayout = () => {
  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default BaseLayout