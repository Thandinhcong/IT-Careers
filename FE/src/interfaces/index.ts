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
    description: string,
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
    require?: string,
    interest?: string,
    level_id?: number,
    company_id?: number,
    area_id?: number,
    working_form_id?: number,
    academic_level_id?: number,
    ranks_id?: number,
    major_id?: number,
    start_date?: Date,
    end_date?: Date,
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