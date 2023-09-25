import RecruiterEmployer from './recruiter'
import PopularSearches from './Popularsearches'
import Recruitment from './Recruitment'
import TopArea from './TopArea'
import DreamJob from './DreamJob'
import Utilities from './Utilities'
import Connect from './connect'
import Reviews from './Review'
import ToRecruitment from './ToRecruitment'
import Banner from './Banner'


const Main = () => {
    return (
        <div className=''>
            <Banner />
            <div className='max-w-screen-xl mx-auto'>
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