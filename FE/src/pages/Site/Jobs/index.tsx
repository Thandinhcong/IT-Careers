import { useEffect } from 'react'
import Recruitment from '../../main/Recruitment'
import DreamJob from '../../main/DreamJob'
import ToRecruitment from '../../main/ToRecruitment'
import SearchJobs from '../Recruit/SearchJobs'

const Jobs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div className=''>
            <div className='max-w-screen-xl mx-auto'>
                <SearchJobs />
                <Recruitment />
                <DreamJob />
                <ToRecruitment />
            </div>
        </div>
    )
}

export default Jobs