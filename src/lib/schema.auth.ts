import * as Yup from 'yup';

export const registerUserSchema = Yup.object({
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Must be a valid phone number')
    .min(10, 'Must be at least 10 digits')
    .max(15, 'Must be 15 digits or less'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
});

export const otpFormSchema = Yup.object().shape({
  otp0: Yup.string().required('Required').matches(/^\d$/, 'Must be a number'),
  otp1: Yup.string().required('Required').matches(/^\d$/, 'Must be a number'),
  otp2: Yup.string().required('Required').matches(/^\d$/, 'Must be a number'),
  otp3: Yup.string().required('Required').matches(/^\d$/, 'Must be a number'),
});

export const snedOtpSchema = Yup.object({
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Must be a valid phone number')
    .min(10, 'Must be at least 10 digits')
    .max(15, 'Must be 15 digits or less'),
});
