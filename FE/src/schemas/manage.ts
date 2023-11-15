import * as yup from "yup";

export const schemaUpdateManage = yup.object({
  logo: yup.string(),
  email: yup.string().email(),
  banner: yup.string(),
  name_web: yup.string(),
  company_name: yup.string(),
  address: yup.string(),
  phone: yup.string(),
  sdt_lienhe: yup.string(),
});

export type FormManage = yup.InferType<typeof schemaUpdateManage>;
