
import ForgotPass from "./component/Account/ForgotPass"
import SignIn from "./component/Account/SignIn"
import SignUp from "./component/Account/SignUp"
import ChangePass from "./component/Account/ChangePass"
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='signin' element={< SignIn />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='/forgot' element={<ForgotPass />} />
        <Route path='/change' element={<ChangePass />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
