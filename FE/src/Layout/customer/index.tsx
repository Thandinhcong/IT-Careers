import React from 'react'
import Header from '../../pages/Header/Header'
import { Outlet } from 'react-router'
import Footer from '../../pages/Footer/Footer'

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout