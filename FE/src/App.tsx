import React from "react"
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "./pages/main"
import Contact from "./pages/Contacts/Contact"
import Layout from "./Layout/customer"

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={< Layout />}>
          <Route index element={<Main />} />
          <Route path='lien-he' element={< Contact />} />
        </Route>
      </Routes>
    </BrowserRouter >

  )
}

export default App
