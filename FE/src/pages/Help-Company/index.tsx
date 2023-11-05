import { Outlet } from 'react-router-dom'
import SideBarHelp from '../../Layout/buisness/SideBarHelp'
import HeaderHelp from '../../Layout/buisness/HeaderHelp'

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