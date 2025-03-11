import * as Yup from "yup";

export const signInSchema = Yup.object({
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  password: Yup.string().required("Password is required"),
});