import Recruitment from './Recruitment'
import TopArea from './TopArea'
import DreamJob from './DreamJob'
import Reviews from './Review'
import ToRecruitment from './ToRecruitment'
import Banner from './Banner'


const Main = () => {
    return (

        <div className=''>
            <Banner />
            <div className='max-w-screen-xl mx-auto'>
                <Recruitment />
                <TopArea />
                <DreamJob />
                <Reviews />
                <ToRecruitment />
            </div>
        </div>
    )
}

export default Main