import React from 'react'
import SideBarCompany from './SideBar'
import HeaderCompany from './Header'

const LayoutCompany = () => {
    return (
        <div className='grid grid-cols-[20%,80%]'>
            <SideBarCompany />
            <div>
                <HeaderCompany />
            </div>
        </div>
    )
}

export default LayoutCompany