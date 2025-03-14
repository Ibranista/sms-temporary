import * as Yup from "yup";

export const sendSingleSchema = Yup.object({
    phoneNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
        .required("phone number is required"),

    message: Yup.string()
        .required("message is required")
    ,

    // smsType: Yup.string()
    //     .oneOf(["NOTIFICATION", "PROMOTIONAL", "TRANSACTIONAL", "OTP"], "Invalid SMS type")
    //     .required("SMS type is required"),
});
