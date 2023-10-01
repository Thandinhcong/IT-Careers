
import ForgotPass from "./pages/Account/ForgotPass"
import SignIn from "./pages/Account/SignIn"
import SignUp from "./pages/Account/SignUp"
import ChangePass from "./pages/Account/ChangePass"
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "./pages/main"
import Contact from "./pages/Help/Contact"
import Layout from "./Layout/customer"
import Help from "./pages/Help/Help"
import Recruit from "./pages/Recruit"
import LayoutCompany from "./Layout/company"
import Companys from "./pages/Companys"

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={< Layout />}>
          <Route index element={<Main />} />
          <Route path="recruit" element={<Recruit />} />
          <Route path='help' element={<Help />}>
            <Route path='contact' element={< Contact />} />
          </Route>

        </Route>
        <Route>
          <Route path='/signin' element={< SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgot' element={<ForgotPass />} />
          <Route path='/change' element={<ChangePass />} />
        </Route>
        <Route path="/company" element={<LayoutCompany />} >
          <Route index element={<Companys />} />
          <Route />
        </Route>
      </Routes>
    </BrowserRouter >

  )
}

export default App
