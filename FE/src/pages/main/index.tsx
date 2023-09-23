import React from 'react'
import SearchJob from './SearchJob'
import RecruiterEmployer from './recruiter'
import PopularSearches from './Popularsearches'
import Recruitment from './Recruitment'
import TopArea from './TopArea'
import DreamJob from './DreamJob'
import Utilities from './Utilities'
import Connect from './connect'
import Reviews from './Review'
import ToRecruitment from './ToRecruitment'

const Main = () => {
    return (
        <div>
            <SearchJob />
            <div className='px-5 sm:px-12'>
                <RecruiterEmployer />
                <PopularSearches />
                <Recruitment />
                <TopArea />
                <DreamJob />
                <Utilities />
                <Connect />
                <Reviews />
                <ToRecruitment />
            </div>
        </div>
    )
}

export default Main