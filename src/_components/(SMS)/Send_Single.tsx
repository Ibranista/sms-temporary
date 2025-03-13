"use client";

import { singleSMSFormInitialValues as initialValues } from "@/_constants/sms.constants";
import { sendSingleSchema as validationSchema, } from "@/lib/(schema)/sms.schema";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import InputGroup from "../FormElements/InputGroup";
import { useState } from "react";
import SmsContent from "./SmsContent";

export default function SendSingleSMS() {
    const [message, setMessage] = useState("");

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            console.log("values==>", values)
        }
    })

    const submitted = () => {
        Swal.fire({
            title: "Successfully registered",
            icon: "success",
            draggable: false
        })
    }

    return (
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
                <div className="mb-4">
                    <p className="font-medium text-gray-700 mb-2">Choose Contact</p>
                    <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-md border">
                        {/* <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 2a6 6 0 100 12 6 6 0 000-12zM2 18a8 8 0 1116 0H2z" />
                                        </svg> */}
                        <FontAwesomeIcon icon={faSearch} width={25} height={5} />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full bg-transparent outline-none"
                        />
                    </div>
                </div>
                <div>
                    <p className="font-medium text-gray-700 mb-3">Single SMS form</p>
                    {/* <label className="block text-sm mb-1">Select Billing:</label>
                                    <select className="w-full mb-3 border p-2 rounded text-sm text-gray-600">
                                        <option>Billing#no 63</option>
                                    </select> */}
                    <label className="block text-sm mb-1">Sender ID:</label>
                    <select className="w-full mb-3 border p-2 rounded text-sm text-gray-600">
                        <option>Tamesol</option>
                    </select>
                    <label className="block text-sm mb-1">Select ShortCode:</label>
                    <select className="w-full mb-3 border p-2 rounded text-sm text-gray-600">
                        <option>Tamesol SMS</option>
                    </select>
                    <div className="flex items-baseline mb-3 flex-col gap-3">
                        <InputGroup
                            type="phoneNumber"
                            label="phoneNumber"
                            className="mb-6 [&_input]:py-[15px] border-stroke rounded-md w-full"
                            placeholder="Enter your phone number"
                            name="phoneNumber"
                            handleChange={formik.handleChange}
                            value={formik.values.phoneNumber}
                        />
                        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                            <div className="text-red-500 text-sm -mt-5 align-self">
                                {formik.errors.phoneNumber}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div>
                <p className="font-medium text-gray-700 mb-3">SMS Templates</p>
                <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-md border">
                    <FontAwesomeIcon icon={faSearch} width={25} height={5} />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-transparent outline-none"
                    />
                </div>
            </div>
            {/* <SmsContent message={message} setMessage={setMessage} /> */}
        </form>
    )
}