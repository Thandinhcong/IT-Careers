import React from 'react'

import { Outlet } from 'react-router-dom'
import SideBarHelp from '../../Layout/company/SideBarHelp'
import HeaderHelp from '../../Layout/company/HeaderHelp'

const Helpcompanys = () => {
    return (
        <div className='grid grid-cols-[20%,80%]'>
            <SideBarHelp />
            <div>
                <HeaderHelp />
                <Outlet />
            </div>
        </div>
    )
}

export default Helpcompanys