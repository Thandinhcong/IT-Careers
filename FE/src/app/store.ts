import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import workingFormApi, { workingFormReducer } from "../api/workingFormApi";
import jobpositionApi, { JoppositionFormReducer } from "../api/jobpositionApi";
import skillApi, { skillReducer } from "../api/skill";
import JobPostApi, { jobPostReducer } from "../api/jobPost";
import packageApi, { packageReducer } from "../api/package";
import SalaryTypeApi, { SalaryTypeReducer } from "../api/salaryType";
import experienceApi, { experienceReducer } from "../api/experienceApi";
import LevelApi, { LevelReducer } from "../api/levelApi";
import MajorApi, { MajorReducer } from "../api/majorApi";
import authApi, { authsReducer } from "../api/auths";
import authCompaniesApi from "../api/auth/Companies";
import AccountApi, { AccountReducer } from "../api/accountApi";

import companyApi, { companyReducer } from "../api/companyApi";
import jobsApi, { JobsReducer } from "../api/jobApi";
import companysApi, { companysReducer } from "../api/CompanymanagerApi";
import jobPostApply, { JobPostApplyReducer } from "../api/jobPostApply";
import AdminLogin, { adminLoginReducer } from "../api/admin/loginAdminApi";
import CompnayInfoApi, { CompanyInfoReducer } from "../api/CompanyInfoApi";
import JobPostCompanyApi, {
  jobPostCompanyReducer,
} from "../api/companies/jobPostCompany";
import findJobApi, { findJobReducer } from "../api/find-Job/find_jobApi";
import authGooleApi, { authsGooleReducer } from "../api/authGoogle/authGoogle";
import candidateappliedApi, {
  candidateappliedReducer,
} from "../api/listCandidateapplied";
import CvApplyApi, { CvApplyReducer } from "../api/companies/cvApply";
import FindJobCompanyApi, {
  FindJobCompanyReducer,
} from "../api/companies/findJob";
import ManageWebsiteApi, {
  ManageWebsiteReducer,
} from "../api/admin/manageWebsiteApi";
import manageWebAllApi, {
  manageWebAllApiReducer,
} from "../api/manageWebsiteApi/manageWebApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", ""],
};
const rootReducer = combineReducers({
  [MajorApi.reducerPath]: MajorReducer,
  [workingFormApi.reducerPath]: workingFormReducer,
  [jobpositionApi.reducerPath]: JoppositionFormReducer,
  [skillApi.reducerPath]: skillReducer,
  [JobPostApi.reducerPath]: jobPostReducer,
  [packageApi.reducerPath]: packageReducer,
  [SalaryTypeApi.reducerPath]: SalaryTypeReducer,
  [experienceApi.reducerPath]: experienceReducer,
  [LevelApi.reducerPath]: LevelReducer,
  [authApi.reducerPath]: authsReducer,
  [authCompaniesApi.reducerPath]: authCompaniesApi.reducer,
  [AccountApi.reducerPath]: AccountReducer,
  [companyApi.reducerPath]: companyReducer,
  [companysApi.reducerPath]: companysReducer,
  [jobsApi.reducerPath]: JobsReducer,
  [jobPostApply.reducerPath]: JobPostApplyReducer,
  [AdminLogin.reducerPath]: adminLoginReducer,
  [CompnayInfoApi.reducerPath]: CompanyInfoReducer,
  [JobPostCompanyApi.reducerPath]: jobPostCompanyReducer,
  [findJobApi.reducerPath]: findJobReducer,
  [authGooleApi.reducerPath]: authsGooleReducer,
  [candidateappliedApi.reducerPath]: candidateappliedReducer,

  [CvApplyApi.reducerPath]: CvApplyReducer,
  [FindJobCompanyApi.reducerPath]: FindJobCompanyReducer,
  [ManageWebsiteApi.reducerPath]: ManageWebsiteReducer,
  [manageWebAllApi.reducerPath]: manageWebAllApiReducer,
});
const middleware = [
  MajorApi.middleware,
  workingFormApi.middleware,
  jobpositionApi.middleware,
  skillApi.middleware,
  JobPostApi.middleware,
  packageApi.middleware,
  SalaryTypeApi.middleware,
  experienceApi.middleware,
  LevelApi.middleware,
  authApi.middleware,
  authCompaniesApi.middleware,
  AccountApi.middleware,
  companyApi.middleware,
  companysApi.middleware,
  jobsApi.middleware,
  jobPostApply.middleware,
  AdminLogin.middleware,
  CompnayInfoApi.middleware,
  JobPostCompanyApi.middleware,
  findJobApi.middleware,
  authGooleApi.middleware,
  candidateappliedApi.middleware,
  CvApplyApi.middleware,
  FindJobCompanyApi.middleware,
  ManageWebsiteApi.middleware,
  manageWebAllApi.middleware,
];

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(...middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default persistStore(store);
