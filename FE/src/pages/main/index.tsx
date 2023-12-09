import Recruitment from './Recruitment'
import TopArea from './TopArea'
import DreamJob from './DreamJob'
import Reviews from './Review'
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
            </div>
        </div>
    )
}

export default Main