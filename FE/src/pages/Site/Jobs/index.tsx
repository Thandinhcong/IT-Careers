import { useEffect } from 'react'
import Recruitment from '../../main/Recruitment'
import DreamJob from '../../main/DreamJob'
import Utilities from '../../main/Utilities'
import ToRecruitment from '../../main/ToRecruitment'
import Connect from '../../main/connect'
import SearchJobs from '../Recruit/SearchJobs'

const Jobs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div className=''>

            <div className='max-w-screen-xl mx-auto'>
                <SearchJobs />
                <Connect />
                <Recruitment />
                <DreamJob />
                <Utilities />
                <ToRecruitment />
            </div>
        </div>
    )
}

export default Jobs