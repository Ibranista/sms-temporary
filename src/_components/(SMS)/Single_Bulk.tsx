"use client";

import React, { useState } from "react";
import SmsContent from "./SmsContent";
import SendSingleSMS from "./Send_Single";
import SendBulkSMS from "./Send_Bulk";
import { useMutation } from "@apollo/client";
import { SENDSMS } from "@/lib/(apollo-client)/mutations/sms.mutation";

export default function SingleBulkSms() {
    const [activeTab, setActiveTab] = useState<"single" | "bulk">("single");
    const [schedule, setSchedule] = useState(false);
    const [sendSMS, { data, loading: loginLoading, error }] = useMutation(SENDSMS);

    // const formik = useFormik({
    //     initialValues,
    //     validationSchema,
    //     onSubmit: async (values) => {
    //         setLoading(true);
    //         const { email, password } = values ?? {};
    //         setLoading(true);
    //         try {
    //             console.log("loggin in")
    //             const response = await logIn({ variables: { email, password } });
    //             if (response && data) {
    //                 const { accessToken, user } = data.logIn ?? {};
    //                 const result = await signIn('Signin', {
    //                     redirect: "/",
    //                     accessToken,
    //                     ...user
    //                 });
    //             }
    //         } catch (err) {
    //             console.error("Login failed:", err)
    //         }
    //         setLoading(false);
    //     },
    // });

    const x = async () => {
        const response = await sendSMS({ variables: { phoneNumber: "0919892275", message: "Hello Ibraheem!" } })
        if (response) {
            console.log({ data })
        }
    }

    return (
        <div className="mx-auto bg-white shadow p-6 rounded-sm">
            <button onClick={x}>Send SMS</button>
            <div className="border-b flex space-x-8">
                <button
                    onClick={() => setActiveTab("single")}
                    className={`py-2 px-4 ${activeTab === "single"
                        ? "border-b-4 border-red-500 text-red-500 font-semibold"
                        : "text-gray-500 hover:text-gray-800"
                        }`}
                >
                    Single SMS
                </button>
                <button
                    onClick={() => setActiveTab("bulk")}
                    className={`py-2 px-4 ${activeTab === "bulk"
                        ? "border-b-4 border-red-500 text-red-500 font-semibold"
                        : "text-gray-500 hover:text-gray-800"
                        }`}
                >
                    Bulk SMS
                </button>
            </div>

            {activeTab === "single" && (
                <SendSingleSMS />
            )}
            {/* 
            {activeTab === "bulk" && (
                <SendBulkSMS />
            )} */}

            {/* Schedule part */}
            {/* <div className="mt-4 flex items-center gap-x-2 mb-3">
                <label className="text-md text-gray-700 cursor-pointer text-gray-500">
                    <input
                        type="checkbox"
                        checked={schedule}
                        onChange={() => setSchedule(!schedule)}
                        className="cursor-pointer w-5 mr-2"
                    />
                    Schedule
                </label>
            </div> */}

            {/* message parts */}
            {/* <SmsContent /> */}
        </div>
    );
}