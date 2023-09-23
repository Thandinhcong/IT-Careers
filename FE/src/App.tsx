import React from "react"
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "./pages/main"

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
