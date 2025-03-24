import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SmsContent from "./SmsContent";
import { useState } from "react";
import { useFormik } from "formik";
import { Button } from "../ui-elements/button";
import { singleSMSFormInitialValues as initialValues } from "@/_constants/sms.constants";

export default function SendBulkSMS({ shortCodes }: {
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
        onSubmit: async () => { }
    })
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
                <p className="font-medium text-gray-700 mb-3">Bulk SMS Form</p>
                {/* <label className="block text-sm mb-1">Select Billing:</label>
                        <select className="w-full mb-3 border p-2 rounded text-sm text-gray-600">
                            <option>--select billing--</option>
                        </select> */}
                <label className="block text-sm mb-1">Sender ID:</label>
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
                <label className="block text-sm mb-1">Select Group ID:</label>
                <select className="w-full mb-3 border p-2 rounded text-sm text-gray-600">
                    <option>--select group id--</option>
                </select>
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
        </div>
    )
}