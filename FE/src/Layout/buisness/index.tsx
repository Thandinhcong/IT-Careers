import SideBarCompany from './SideBar'
import HeaderCompany from './Header'
import { Outlet } from 'react-router-dom'

const LayoutCompany = () => {
    return (
        <div className='grid grid-cols-[18%,82%]'>
            <SideBarCompany />
            <div>
                <HeaderCompany />
                <div className='mt-14'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default LayoutCompany