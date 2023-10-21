export interface IPackages {
    id?: number,
    title?: string,
    coin?: number,
    price?: number,
    reduced_price?: number,
    status?: number,
    type_account?: number

}
export interface IMajors {
    id?: number,
    major: string,
    description?: string,
}
export interface IWorkingForm {
    id?: number,
    working_form: string,
    description: string,
}
export interface ISkill {
    id?: number,
    skill?: string,
    description?: string,
}
export interface ISalaryType {
    id?: number,
    salary_type?: string | number,
}
export interface IJobposition {
    id?: number,
    job_position: string,
    description: string,
}
export interface IJobPost {
    id?: number,
    title?: string,
    job_position_id?: number,
    exp_id?: number,
    skill_id?: number,
    quantity?: number,
    gender?: number,
    require?: string, //yêu cầu
    min_salary?: number,
    max_salary?: number,
    level_id?: number,
    company_id?: number,
    area_id?: number,
    working_form_id?: number,
    academic_level_id?: number,
    ranks_id?: number,
    major_id?: number,
    interest?: string, //quyền lợi
    start_date?: string,
    end_date?: string,
    status?: number,
}
export interface ILevel {
    id?: number,
    level?: string,
    description?: string,
}
export interface IExperience {
    id?: number,
    experience?: string,
    description?: string,
}
export interface ILogin {
    id?: number | string,
    email: string,
    password: string,
}
export interface ISignup {
    id: number | string,
    name: string,
    email: string,
    password: string,
    numberPhone: string
}
export interface IListData {
    status: string
    list_company: ICompanys[],
}

export interface ICompanys {
    id?: string | number,
    company_name: string,
    tax_code: string,
    address: string,
    founded_in: Date,
    name: string,
    office: string,
    email: string,
    phone: string,
    map: string,
    logo: string,
    link_web: string,
    image_paper: string,
    desc: string,
    coin: number,
    status: Selection,

}

export interface IListOneCompany {
    status: string
    company: ICompanys[],
}