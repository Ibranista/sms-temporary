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
import { Button } from "../ui-elements/button";

export default function SendSingleSMS({ shortCodes }: {
    shortCodes: {
        SenderID: {
            senderID: string
        },
        shortCode: string
    }[]
}) {
    const [message, setMessage] = useState<string>("");

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            const { phoneNumber, message } = values;
            try {
                console.log(values)
                // const response = await sendSMS({ variables: { phoneNumber, message } })
                // if (response) {
                setTimeout(() => {
                    Swal.fire({
                        title: "Message Sent",
                        icon: "success",
                        draggable: false,
                        width: 400
                    })
                }, 500)
                // }
            } catch (err) {
                console.error("Login failed:", err)
            }
        },
    });

    // const submitted = () => {
    //     Swal.fire({
    //         title: "Successfully registered",
    //         icon: "success",
    //         draggable: false
    //     })
    // }

    return (
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 gap-y-0 pt-6">
            <div>
                <div className="mb-4">
                    <p className="font-medium text-gray-700 mb-2">Choose Contact</p>
                    <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-md border">
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
                    <label className="block text-sm mb-1">Sender ID:</label>
                    {/* sender id */}
                    <select className="w-full mb-3 border p-2 rounded text-sm text-gray-600">
                        {
                            shortCodes?.map((shortcode, key) => (
                                <option key={key}>{shortcode?.SenderID?.senderID}</option>
                            ))
                        }
                    </select>
                    <label className="block text-sm mb-1">Select ShortCode:</label>
                    <select className="w-full mb-3 border p-2 rounded text-sm text-gray-600">
                        {
                            shortCodes?.map((shortcode, key) => (
                                <option key={key}>{shortcode?.shortCode}</option>
                            ))
                        }
                    </select>
                    <div className="flex items-baseline mb-3 flex-col gap-3">
                        <InputGroup
                            type="phoneNumber"
                            label="phoneNumber"
                            className="mb-6 border-stroke rounded-md w-full"
                            placeholder="Enter your phone number"
                            name="phoneNumber"
                            handleChange={formik.handleChange}
                            value={formik.values.phoneNumber}
                        />
                        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                            <div className="text-red-500 text-sm -mt-7 align-self">
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
            <SmsContent message={message} setMessage={setMessage} formik={formik} />

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2 flex justify-start">
                <Button
                    type="submit"
                    variant={"primary"}
                    className="rounded-md"
                    size={"small"}
                    disabled={formik.isSubmitting}
                    label={formik.isSubmitting ? "Sending..." : "Send SMS"}
                />
            </div>
        </form>

    )
}