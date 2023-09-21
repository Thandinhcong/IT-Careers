
import SignIn from "./component/Layout/SignIn"
import SignUp from "./component/Layout/SignUp"
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='signin' element={< SignIn />} />
        <Route path='signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
