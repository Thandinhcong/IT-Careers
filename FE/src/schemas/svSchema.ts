import * as yup from "yup";
const passwordRegex = /^[^\s]{2,}$/;
export const schemaProfile = yup.object({
  name: yup.string(),
  email: yup
    .string()
    .email("Email không đúng định dạng!")
    .required("Trường dữ liệu không được để trống"),
  phone: yup.string().required("Trường dữ liệu không được để trống"),
  image: yup.string().required("Trường dữ liệu không được để trống"),
  address: yup.string().required("Trường dữ liệu không được để trống"),
  title: yup.string(),
  birth: yup.date(),
  careers_goal: yup.string(),
});
export type FormProfile = yup.InferType<typeof schemaProfile>;

export const schemaExp = yup.object().shape({
  position: yup.string().required("Trường dữ liệu không được để trống"),
  company_name: yup.string().required("Trường dữ liệu không được để trống"),
  start_date: yup
    .date()
    .required("Ngày bắt đầu là bắt buộc")
    .test({
      name: "start-date-check",
      test: function (value) {
        const { end_date } = this.parent || {};
        return !end_date || value <= end_date;
      },
      message: "Ngày bắt đầu không được lớn hơn ngày kết thúc",
    }),
  end_date: yup
    .date()
    .max(new Date(), "Ngày kết thúc không được lớn hơn ngày hiện tại")
    .test({
      name: "end-date-check",
      test: function (value: any) {
        const { start_date } = this.parent || {};
        return !start_date || value >= start_date;
      },
      message: "Ngày kết thúc không được nhỏ hơn ngày bắt đầu",
    }),
});

export const schema = yup.object().shape({
  exps: yup
    .array()
    .of(
      yup.object().shape({
        position: yup.string().required("Trường dữ liệu không được để trống"),
        company_name: yup
          .string()
          .required("Trường dữ liệu không được để trống"),
        start_date: yup
          .date()
          .required("Ngày bắt đầu là bắt buộc")
          .test({
            name: "start-date-check",
            test: function (value) {
              const { end_date } = this.parent || {};
              return !end_date || value <= end_date;
            },
            message: "Ngày bắt đầu không được lớn hơn ngày kết thúc",
          }),
        end_date: yup
          .date()
          .max(new Date(), "Ngày kết thúc không được lớn hơn ngày hiện tại")
          .test({
            name: "end-date-check",
            test: function (value: any) {
              const { start_date } = this.parent || {};
              return !start_date || value >= start_date;
            },
            message: "Ngày kết thúc không được nhỏ hơn ngày bắt đầu",
          }),
      })
    )
    .required("Vui lòng thêm ít nhất một trải nghiệm"),
});
export type FormExp = yup.InferType<typeof schemaExp>;

export const schemaEdu = yup.object({
  major_id: yup.string().required("Trường dữ không được để trống"),
  name: yup.string().required("Trường dữ liệu không được để trống"),
  gpa: yup.string().required("Trường dữ liệu không được để trống"),
  start_date: yup.date().required("Trường dữ liệu không được để trống"),
  end_date: yup.date().required("Trường dữ liệu không được để trống"),
  type_degree: yup.date().required("Trường dữ liệu không được để trống"),
});
export type FormEdu = yup.InferType<typeof schemaEdu>;

export const schemaProject = yup.object({
  project_name: yup.string().required("Trường dữ không được để trống"),
  position: yup.string().required("Trường dữ liệu không được để trống"),
  desc: yup.string().required("Trường dữ liệu không được để trống"),
  link_project: yup.string().required("Trường dữ liệu không được để trống"),
  start_date: yup
    .date()
    .required("Trường dữ liệu không được để trống")
    .test(
      "start-date",
      "Ngày bắt đầu không được lớn hơn ngày kết thúc",
      function (value) {
        const { end_date } = this.parent;
        return !value || !end_date || new Date(value) <= new Date(end_date);
      }
    ),
  end_date: yup
    .date()
    .required("Trường dữ liệu không được để trống")
    .test(
      "end-date",
      "Ngày kết thúc không được nhỏ hơn ngày bắt đầu",
      function (value) {
        const { start_date } = this.parent;
        const currentDate = new Date();
        return (
          !value ||
          !start_date ||
          (new Date(value) >= new Date(start_date) &&
            new Date(value) <= currentDate)
        );
      }
    ),
});
export type FormProject = yup.InferType<typeof schemaProject>;

export const schemaSkills = yup.object({
  name_skill: yup
    .string()
    .matches(passwordRegex, "Tối thiểu 2 ký tự.")
    .required("Trường dữ không được để trống"),
});
export type FormSkill = yup.InferType<typeof schemaSkills>;
