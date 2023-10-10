
import ForgotPass from "./pages/Account/ForgotPass"
import SignIn from "./pages/Account/SignIn"
import SignUp from "./pages/Account/SignUp"
import ChangePass from "./pages/Account/ChangePass"
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "./pages/main"
import Contact from "./pages/Help/Contact"
import Layout from "./Layout/customer"
import Help from "./pages/Help/Help"
import Recruit from "./pages/Recruit"
import Policy from "./pages/Help/Policy"
import FAQ from "./pages/Help/FAQ"
import DisputeResolution from "./pages/Help/DisputeResolution"
import LayoutUser from "./pages/User"
import ListCV from "./pages/User/ListCV"
import JobApply from "./pages/User/JobApply"
import JobFavor from "./pages/User/JobFavor"
import Profile from "./pages/User/Profile"
import Company from "./pages/Company"
import CompanyDetail from "./pages/Company-detail"
import Reviews from "./pages/Company-detail-reviews/Reviews"
import LayoutCompany from "./Layout/company"
import Companys from "./pages/Companys"
import CreateCampaign from "./pages/Companys/Create_campaign"
import LayoutBusinessSetting from "./pages/Companys/Business_Setting"
// import CompanySetting from "./pages/Companys/Business_Setting/Company"
// import BusinessSetting from "./pages/Companys/Business_Setting/Business"
import ContactCompanySetting from "./pages/Companys/Business_Setting/Contact"
import ChangePassCompany from "./pages/Companys/Business_Setting/ChangePass"
import Guide from "./pages/Guide/Guide"
import BusinessSetting from "./pages/Companys/Business_Setting/Business"
import CompanySetting from "./pages/Companys/Business_Setting/Company"
import RecruimentCampaign from "./pages/Companys/RecruimentCampaign"
import FindJob from "./pages/Companys/Find-job"
import Deposit from "./pages/Companys/Deposit/Deposit"
import CVApply from "./pages/Companys/CV_apply"

import JobDetail from "./pages/Job-detail/JobDetail"
import Helpcompanys from "./pages/Help-Company"
import HelpText1 from "./pages/Help-Company/HelpText1"
import Jobs from "./pages/Jobs"
import CompanyReports from "./pages/Companys/Company_reports"
import Activity_History from "./pages/Companys/Activity_History"
import All_History from "./pages/Companys/Activity_History/All"
import History_Recruitment from "./pages/Companys/Activity_History/Recruitment"
import History_Transaction from "./pages/Companys/Activity_History/Transaction"
import History_Account from "./pages/Companys/Activity_History/Account"
import History_Candidate from "./pages/Companys/Activity_History/Candidate"
import History_Other from "./pages/Companys/Activity_History/Other"
import Brand_Refer from "./pages/Companys/Transaction"
import Transaction from "./pages/Companys/Transaction"
import Add_Money from "./pages/Companys/Transaction/Add_Money"
import Payment from "./pages/Companys/Transaction/Payment"
import JobCreate from "./pages/Companys/JobCreate"
import AccPro from "./pages/Companys/Account_Rank"
import AccRank from "./pages/Companys/Account_Rank"


function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={< Layout />}>
          <Route index element={<Main />} />
          <Route path="job-detail" element={<JobDetail />} />
          <Route path="recruit" element={<Recruit />} />
          <Route path="company" element={<Company />} />
          <Route path="company/detail" element={<CompanyDetail />} />
          <Route path="company/detail/reviews" element={<Reviews />} />
          <Route path="guide" element={<Guide />} />
          <Route path="jobs" element={<Jobs />} />

          <Route path='help/' element={<Help />}>
            <Route path='contact' element={< Contact />} />
            <Route path='policy' element={< Policy />} />
            <Route path='faq' element={< FAQ />} />
            <Route path='dispute-resolution' element={< DisputeResolution />} />
          </Route>
          <Route path='user' element={<LayoutUser />}>
            <Route path='listcv' element={< ListCV />} />
            <Route path='jobapply' element={< JobApply />} />
            <Route path='jobfavor' element={< JobFavor />} />
            <Route path='profile' element={< Profile />} />
          </Route>

        </Route>
        <Route>
          <Route path='/signin' element={< SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgot' element={<ForgotPass />} />
          <Route path='/change' element={<ChangePass />} />
        </Route>
        <Route path="/companys" element={<LayoutCompany />} >
          <Route index element={<Companys />} />
          <Route path="create_campaign" element={<CreateCampaign />} />
          <Route path="reports" element={<CompanyReports />} />
          <Route path="accrank" element={<AccRank />} />

          <Route path="transaction" element={<Transaction />} >
            <Route path="add_money" element={<Add_Money />} />
            <Route path="payment" element={<Payment />} />
          </Route>
          <Route path='activity_history' element={<Activity_History />}>
            <Route index element={< All_History />} />
            <Route path='transaction' element={< History_Transaction />} />
            <Route path='recruitment' element={< History_Recruitment />} />
            <Route path='account' element={< History_Account />} />
            <Route path='candidate' element={< History_Candidate />} />
            <Route path='other' element={< History_Other />} />
          </Route>
          <Route path="business_setting" element={<LayoutBusinessSetting />} >
            <Route index element={<ContactCompanySetting />} />
            <Route path="company" element={<CompanySetting />} />
            <Route path="business" element={<BusinessSetting />} />
            <Route path="contact" element={<ContactCompanySetting />} />
            <Route path="changepass" element={<ChangePassCompany />} />
          </Route>
          <Route path="recruitment-campaign/form/create" element={<RecruimentCampaign />} />
          <Route path="find-job" element={<FindJob />} />
          <Route path="deposit" element={<Deposit />} />
          <Route path="cv-apply" element={<CVApply />} />
          <Route path="jobs/create" element={<JobCreate />} />
        </Route>
        <Route path='help-companys/' element={<Helpcompanys />}>
          <Route index element={< HelpText1 />} />
          <Route path="help-text1" element={< HelpText1 />} />

        </Route>

      </Routes>
    </BrowserRouter >

  )
}

export default App