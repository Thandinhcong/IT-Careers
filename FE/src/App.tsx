import React from "react"
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import BaseLayout from "./app/Layout/BaseLayout"
import Contact from "./app/pages/Contact"

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='' element={< BaseLayout />}>
          <Route path='/lien-he' element={< Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
