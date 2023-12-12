export interface IPackage {
  data: IPackages[];
}
export interface IOnePackage {
  package: IPackages;
  status: number;
}
export interface IPackages {
  id?: number;
  title?: string;
  coin?: number;
  price?: number;
  status?: number;
  amount?: number;
  invoice_id: number;
  package_id?: number;
}
export interface IMajors {
  id?: number | string;
  major: string;
  description?: string;
}
export interface IWorkingForm {
  id?: number;
  working_form: string;
  description: string;
}
export interface ISkill {
  id?: number;
  skill?: string;
  description?: string;
}
export interface ISalaryType {
  id?: number;
  salary_type?: string | number;
}
export interface IJobposition {
  id?: number;
  job_position: string;
  description: string;
}
export interface IJobPost {
  job_position?: string;
  company_name?: string;
  id?: number;
  title?: string;
  job_position_id?: number;
  exp_id?: number;
  skill_id?: number;
  quantity?: number;
  gender?: number;
  requirement?: string; //yêu cầu
  min_salary?: number;
  max_salary?: number;
  level_id?: number;
  company_id?: number;
  province?: string; //TỈnh thành phố
  district?: string; //Quận, Huyện
  province_id?: number | string; //TỈnh thành phố
  district_id?: number | string; //Quận, Huyện
  working_form_id?: number;
  academic_level_id?: number;
  ranks_id?: number;
  major_id?: number;
  interest?: string; //quyền lợi
  start_date?: string | any;
  end_date?: string | any;
  status?: number;
  office?: number;
  address?: string;
  experience?: string;
  academic_level?: string;
  major?: string;
  area_id?: number;
  working_form?: string;
  name: string | number;
  view: number;
  desc: string;
  level: IJobPost;
  data: IJobPost[];
  length: string | number;
  type_job_post_id: number;
  type_job_post: string;
  require: string;
  quantity_apply: number;
}
export interface ICvApply {
  id?: number;
  job_post_id?: number | string;
  curriculum_vitae_id: number;
  evaluate?: string; // đánh giá
  introduce?: string; // giới thiệu
  status?: number;
  qualifying_round_id?: number; // vòng hồ sơ
  name?: string;
  phone?: string;
  email?: string;
  candidate_id?: number | string;
  data: ICvApply;
  profile: string | number;
  time_apply: string;
  candidate_code: number;
  job_post_name: string;
  list_candidate_apply_job: ICvApply;
  image: string;
  length: string | number;
  filter: CallableFunction;
  path_cv: string;
  created_at: string;
}
export interface IFindJob {
  id: string | number;
  candidate_id: number | string;
  image: string;
  cv_id: string;
  patch_cv: string;
  name: string;
  email: string;
  phone: string;
  birth: string;
  created_at: string;
  save_profile: string;
  data: IFindJob;
  filter: CallableFunction;
  map: CallableFunction;
  length: string | number;
  address: string;
  title: string;
  salary: string;
  find_job: number;
  open_profile: string;
  total_exp: number;
  desired_salary: string | number;
  major: string;
  coin: number;
  province: string;
  district: string;
  path_cv: string;
  start: number;
  experience: string | number;
  comment: string;
  count: string;
}
export interface ICompanyInfor {
  id?: string | number;
  company_name?: string;
  tax_code?: number;
  address?: string;
  founded_in?: Date;
  name?: string;
  office?: string;
  email?: string;
  phone?: number;
  password?: string;
  map?: string;
  logo?: string;
  link_web?: string;
  image_paper?: string;
  description?: string;
  company_size_max?: number;
  company_size_min?: number;
  status?: number;
  coin: number;
  company: ICompanyInfor;
}
export interface IListInfo {
  status: string;
  company_info: ICompanyInfor[];
}
export interface IListOneInfo {
  status: string;
  company_info: ICompanyInfor[];
}
export interface ILevel {
  id?: number;
  level?: string;
  description?: string;
}
export interface IExperience {
  id?: number;
  experience?: string;
  description?: string;
}
export interface ILogin {
  id?: number | string;
  email: string;
  password: string;
}
export interface ISignup {
  id: number | string;
  name: string;
  email: string;
  password: string;
  numberPhone: string;
}
export interface IAccount {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  image?: string | any;
  address?: string;
  gender?: number;
  type?: number;
  status?: number;
  coin?: string;
  password_confirmation?: string;
  re_password?: string;
  password_old?: string;
  avatar: string;
}

export interface IChangePass {
  password?: string;
  password_old?: string;
  re_password?: string;
}
export interface IListData {
  status: string;
  list_company: ICompanys[];
}

export interface ICompanys {
  id?: string | number;
  company_name: string;
  tax_code: string;
  address: string;
  founded_in: Date;
  name: string;
  office: string;
  email: string;
  phone: string;
  map: string;
  logo: string;
  link_web: string;
  image_paper: string;
  description: string;
  coin: number;
  status?: any;
  company_size_min: number;
  company_size_max: number;
  job_post_company: string;
}
export interface IListOneCompany {
  status: string;
  company: ICompanys[];
}
export interface IListJobs {
  id?: string | number;
  title: string;
  min_salary: number;
  max_salary: number;
  company_name: string;
  logo: string;
  area: string;
  status: number;
  province: string;
  district: string;
  end_date: string;
  description: string;
  address: string;
  company_id: string;
  company_size_min: string;
  company_size_max: string;
}
export interface IListDataJobs {
  status: IJobPost;
  job_list: IListJobs[];
}
export interface IListOneJobs {
  status: string;
  job_detail: IListJobsDetail[];
}
export interface IListOneJob {
  status: string;
  job_detail: IListJobsDetail;
}
export interface IListJobsDetail {
  id: string | number;
  title: string;
  min_salary: number;
  max_salary: number;
  company_name: string;
  level: string;
  job_position: string;
  experience: string;
  description: string;
  address: string;
  working_form: string;
  academic_level: string;
  major: string;
  start_date: Date;
  end_date: Date;
  quantity: number;
  require: string;
  interest: string;
  province: string;
  district: string;
  status: number;
  logo: string;
}
export interface ISaveJobs {
  id?: number | string;
  candidate_id?: number | string;
  job_post_id?: number | string;
}
