import React from 'react'
import SideBarCompany from './SideBar'
import HeaderCompany from './Header'
import { Outlet } from 'react-router-dom'

const LayoutCompany = () => {
    return (
        <div className='grid grid-cols-[20%,80%]'>
            <SideBarCompany />
            <div>
                <HeaderCompany />
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutCompany