import React from "react"
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import BaseLayout from "./app/Layout/BaseLayout"
import Contact from "./app/pages/Contact"
import Main from "./pages/main"

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='' element={< BaseLayout />}>
          <Route index element={<Main />} />
          <Route path='/lien-he' element={< Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
