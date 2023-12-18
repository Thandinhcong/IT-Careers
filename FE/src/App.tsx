
import ForgotPass from "./pages/Account/ForgotPass"
import SignIn from "./pages/Account/SignIn"
import SignUp from "./pages/Account/SignUp"
import ChangePass from "./pages/Account/ChangePass"
import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "./pages/main"
import Contact from "./pages/Site/Help/Contact"
import Layout from "./Layout/customer"
import Help from "./pages/Site/Help/Help"
import Recruit from "./pages/Site/Recruit"
import Policy from "./pages/Site/Help/Policy"
import FAQ from "./pages/Site/Help/FAQ"
import DisputeResolution from "./pages/Site/Help/DisputeResolution"
import LayoutUser from "./pages/Site/User"
import ListCV from "./pages/Site/User/ListCV"
import JobApply from "./pages/Site/User/JobApply"
import JobFavor from "./pages/Site/User/JobFavor"
import Profile from "./pages/Site/User/Profile"
import Company from "./pages/Site/Company"
import CompanyDetail from "./pages/Site/Company-detail"
import Reviews from "./pages/Site/Company-detail-reviews/Reviews"
import LayoutCompany from "./Layout/buisness"
import Companys from "./pages/Companys"
import CreateCampaign from "./pages/Companys/Create_campaign"
import LayoutBusinessSetting from "./pages/Companys/Business_Setting"
import ContactCompanySetting from "./pages/Companys/Business_Setting/Contact"
import ChangePassCompany from "./pages/Companys/Business_Setting/ChangePass"
import BusinessSetting from "./pages/Companys/Business_Setting/Business"
import CompanySetting from "./pages/Companys/Business_Setting/Company"
import FindJob from "./pages/Companys/Find-job"
import Deposit from "./pages/Companys/Deposit/Deposit"
import CVApply from "./pages/Companys/CV_apply"
import JobsManage from "./pages/Companys/Jobs-manage"
import JobDetail from "./pages/Site/Job-detail/JobDetail"
import Helpcompanys from "./pages/Help-Company"
import HelpText1 from "./pages/Help-Company/HelpText1"
import CompanyReports from "./pages/Companys/Company_reports"
import Activity_History from "./pages/Companys/Activity_History"
import All_History from "./pages/Companys/Activity_History/All"
import History_Recruitment from "./pages/Companys/Activity_History/Recruitment"
import History_Transaction from "./pages/Companys/Activity_History/Transaction"
import History_Account from "./pages/Companys/Activity_History/Account"
import History_Candidate from "./pages/Companys/Activity_History/Candidate"
import History_Other from "./pages/Companys/Activity_History/Other"
import Transaction from "./pages/Companys/Transaction"
import Add_Money from "./pages/Companys/Transaction/Add_Money"
import Payment from "./pages/Companys/Transaction/Payment"
import JobCreate from "./pages/Companys/JobCreate"
import LayoutAdmin from "./Layout/admin/LayoutAdmin"
import DashBoard from "./pages/admin/Dashboard"
import PostManage from "./pages/admin/post-manage"
import ListWorkingForm from "./pages/admin/WorkingForm/ListWorkingForm"
import AddWorkingForm from "./pages/admin/WorkingForm/AddWorkingForm"
import UpdateWorkingForm from "./pages/admin/WorkingForm/UpdateWorkingForm"
import AccountManage from "./pages/admin/Account-manage"
import CreateAccount from "./pages/admin/Account-manage/CreateAccount"
import UpdateAccount from "./pages/admin/Account-manage/UpdateAccount"
import Companymanage from "./pages/admin/Company-manage"
import JobpositionManage from "./pages/admin/Jobposition-manage"
import AddJobposition from "./pages/admin/Jobposition-manage/create-jobpostion"
import EditJobposition from "./pages/admin/Jobposition-manage/edit-jobposition"
import SkillManage from "./pages/admin/skill-manage"
import AddSkill from "./pages/admin/skill-manage/AddSkill"
import EditSkill from "./pages/admin/skill-manage/EditSkill"
import PackageManage from "./pages/admin/package-manage"
import AddPackage from "./pages/admin/package-manage/AddPackage"
import EditPackage from "./pages/admin/package-manage/EditPackage"
import SalaryTypeManage from "./pages/admin/salaryType-manage"
import AddSalary from "./pages/admin/salaryType-manage/AddSalary"
import EditSalary from "./pages/admin/salaryType-manage/EditSalary"
import ExperienceManage from "./pages/admin/Experience-manage"
import AddExperience from "./pages/admin/Experience-manage/AddExperience"
import EditExperience from "./pages/admin/Experience-manage/EditExperience"
import LevelManage from "./pages/admin/Level-manage"
import AddLevel from "./pages/admin/Level-manage/AddLevel"
import EditLevel from "./pages/admin/Level-manage/EditLevel"
import MajorManage from "./pages/admin/Major-manage"
import AddMajors from "./pages/admin/Major-manage/Addmajor"
import EditMajors from "./pages/admin/Major-manage/Editmajor"
import Account from "./pages/Site/User/Account"
import SignInCompanies from "./pages/Account/Companies/SignIn"
import SignupCompanies from "./pages/Account/Companies/Signup"
import LoginAdmin from "./pages/admin/login/Login"
import PostEdit from "./pages/Companys/Jobs-manage/PostEdit"
import IsLogin from "./pages/auths/isLogin"
import NotFound from "./pages/notFound/NotFound"
import CvCandodateDetail from "./pages/Companys/CV_apply_jobpost/CvCandidateDetail";
import CandidateInformation from "./pages/Site/User/CandidateInformation"
import ChangePassCandidate from "./pages/Site/User/ChangePassCandidate"
import CVApplyJobPost from "./pages/Companys/CV_apply_jobpost/CVApplyJobPost"
import IsCheckLogin from "./pages/auths/isCheckLogin"
import IsCheckLoginCompany from "./pages/auths/isCheckLoginCompany"
import Manage_Website from "./pages/admin/Manage-Website"
import UpdateManage from "./pages/admin/Manage-Website/Update"
import CreateCvTest from "./pages/Site/CreateCv/CreateCv"
import RefillPackage from "./pages/Site/User/RefillPackage"
import HistoryPayment from "./pages/Site/User/HistoryPayment"
import IsCheckLoginAdmin from "./pages/auths/isCheckAdmin"
import PostingPackages from "./pages/admin/PostingPackages"
import UpdatePostingPackages from "./pages/admin/PostingPackages/update"
import AddPostingPackages from "./pages/admin/PostingPackages/add"
import ForgotPassCompany from "./pages/Account/Companies/ForgotPassword"
import FindJobFast from "./pages/Site/FindJobFast"
import UploadCV from "./pages/Site/User/UploadCV"


function App() {


  return (

    <BrowserRouter>
      <Routes>
        {/* site */}
        <Route path='/' element={< Layout />}>
          <Route index element={<Main />} />
          <Route path="job-detail/:name/:id" element={<JobDetail />} />
          <Route path="company" element={<Company />} />
          <Route path="company/detail/:id" element={<CompanyDetail />} />
          <Route path="company/detail/reviews" element={<Reviews />} />
          <Route path="recruit" element={<Recruit />} />
          <Route path="find-job-fast" element={<FindJobFast />} />

          <Route element={<IsCheckLogin />} >
            <Route path='account/' element={< Account />} >
              <Route index element={<CandidateInformation />} />
              <Route path="change_pass" element={<ChangePassCandidate />} />
            </Route>
            <Route path='user/' element={<LayoutUser />}>
              <Route path='upload-cv' element={< UploadCV />} />

              <Route path='listcv' element={< ListCV />} />
              <Route path='jobapply' element={< JobApply />} />
              <Route path='jobfavor' element={< JobFavor />} />
              <Route path='profile' element={< Profile />} />
              <Route path='recharge' element={< RefillPackage />} />
              <Route path='historys-payment' element={< HistoryPayment />} />
            </Route >
            <Route path='account' element={< Account />} />
            <Route path="tao-cv/:id" element={<CreateCvTest />} />
          </Route>

          <Route path='help/' element={<Help />}>
            <Route path='contact' element={< Contact />} />
            <Route path='policy' element={< Policy />} />
            <Route path='faq' element={< FAQ />} />
            <Route path='dispute-resolution' element={< DisputeResolution />} />
          </Route>

        </Route>

        {/* Account */}
        < Route element={< IsLogin />}>
          <Route path='/login' element={< SignIn />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/forgot' element={<ForgotPass />} />
          <Route path='/change' element={<ChangePass />} />

        </Route >
        <Route path='/business/signin' element={< SignInCompanies />} />
        <Route path='/business/signup' element={<SignupCompanies />} />
        <Route path='/business/forgot' element={<ForgotPassCompany />} />

        {/* Buisness */}
        <Route element={<IsCheckLoginCompany />} >
          <Route path="/business" element={<LayoutCompany />} >
            <Route index element={<Companys />} />
            <Route path="create_campaign" element={<CreateCampaign />} />
            <Route path="reports" element={<CompanyReports />} />
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
            <Route path="find-profile" element={<FindJob />} />
            <Route path="deposit" element={<Deposit />} />
            <Route path="cv-apply" element={<CVApply />} />
            <Route path="cv-apply/job-post/:id" element={<CVApplyJobPost />} />
            <Route path="jobs-manage" element={<JobsManage />} />
            <Route path="jobs/create" element={<JobCreate />} />
            <Route path="job_post/update/:id" element={<PostEdit />} />
          </Route>
          <Route path="/business/cv-apply/candidate-detail/:id" element={<CvCandodateDetail />} />
        </Route>

        {/* Help */}
        <Route path='help-companys/' element={<Helpcompanys />}>
          <Route index element={< HelpText1 />} />
          <Route path="help-text1" element={< HelpText1 />} />
        </Route>

        {/* admin */}
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route element={<IsCheckLoginAdmin />}>
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<DashBoard />} />
            <Route path="level-manage" element={<LevelManage />} />
            {/* <Route path="level-manage/create-level" element={<CreateLevel />} /> */}
            {/* <Route path="level-manage/update-level" element={<UpdateLevel />} /> */}
            <Route path="account-manage" element={<AccountManage />} />
            <Route path="posting-packages" element={<PostingPackages />} />
            <Route path="posting-packages/add" element={<AddPostingPackages />} />
            <Route path="posting-packages/update/:id" element={<UpdatePostingPackages />} />

            <Route path="account-manage/create-account" element={<CreateAccount />} />
            <Route path="account-manage/update-account" element={<UpdateAccount />} />
            <Route path="post-manage" element={<PostManage />} />
            <Route path="working-form" element={<ListWorkingForm />} />
            <Route path="add/working-form" element={<AddWorkingForm />} />
            <Route path="update/working-form/:id" element={<UpdateWorkingForm />} />
            <Route path="company-manage" element={<Companymanage />} />
            <Route path="jobposition-manage" element={<JobpositionManage />} />
            <Route path="jobposition-manage/create-jobposition" element={<AddJobposition />} />
            <Route path="jobposition-manage/edit-jobposition/:id" element={<EditJobposition />} />
            <Route path="experience-manage" element={<ExperienceManage />} />
            <Route path="experience-manage/add" element={<AddExperience />} />
            <Route path="experience-manage/edit/:id" element={<EditExperience />} />
            <Route path="level-manage" element={<LevelManage />} />
            <Route path="level-manage/add" element={<AddLevel />} />
            <Route path="level-manage/edit/:id" element={<EditLevel />} />
            <Route path="skill-manage" element={<SkillManage />} />
            <Route path="skill-manage/add" element={<AddSkill />} />
            <Route path="skill-manage/edit/:id" element={<EditSkill />} />
            <Route path="salary-type-manage" element={<SalaryTypeManage />} />
            <Route path="salary-type-manage/add" element={<AddSalary />} />
            <Route path="salary-type-manage/edit/:id" element={<EditSalary />} />
            <Route path="package-manage" element={<PackageManage />} />
            <Route path="package-manage/add" element={<AddPackage />} />
            <Route path="package-manage/edit/:id" element={<EditPackage />} />
            <Route path="major-manage" element={<MajorManage />} />
            <Route path="major-manage/create-major" element={<AddMajors />} />
            <Route path="major-manage/edit-major/:id" element={<EditMajors />} />
            <Route path="manage-website" element={<Manage_Website />} />
            <Route path="manage-website/update/:id" element={<UpdateManage />} />

          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes >
    </BrowserRouter >

  )
}

export default App
