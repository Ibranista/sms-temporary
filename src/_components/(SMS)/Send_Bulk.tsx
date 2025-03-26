import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BulkSmsContent from "./SMS_Bulk_Area";
import { useState } from "react";
import { useFormik } from "formik";
import { Button } from "../ui-elements/button";
import { bulkSMSFormInitialValues as initialValues } from "@/_constants/sms.constants";
import { IShortCodes } from "@/types/sms.interface";
import InputChip from "../FormElements/InputGroup/InputChip";
import { sendBulkSchema as validationSchema } from "@/lib/(schema)/sms.schema";
import Swal from "sweetalert2";
import { useMutation } from "@apollo/client";
import { SEND_BULK_SMS } from "@/lib/(apollo-client)/mutations/sms.mutation";

export default function SendBulkSMS({ shortCodes }: { shortCodes: IShortCodes[] }) {
    const [tags, setTags] = useState<string[]>([]);
    const [createMessage] = useMutation(SEND_BULK_SMS);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            const { phoneNumbers, messages, senderId, shortCodeId } = values ?? {};

            try {
                const response = await createMessage({ variables: { phoneNumbers, messages, senderId, shortCodeId } });
                if (response) {
                    Swal.fire({
                        title: "Message Sent",
                        icon: "success",
                        draggable: false,
                        width: 400
                    })
                }
            } catch (err) {
                console.error("Login failed:", err)
            }

        }
    })

    return (
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            <div>
                <p className="font-medium text-gray-700 mb-3">Bulk SMS Form</p>
                <label className="block text-sm mb-1">Sender ID:</label>
                <select className="w-full mb-3 border p-2 rounded text-sm text-gray-600"
                    onChange={formik.handleChange}
                    value={formik.values.senderId}
                    name="senderId"
                >
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

                {/* <label className="block text-sm mb-1">Select Group ID:</label>
                <select className="w-full mb-3 border p-2 rounded text-sm text-gray-600">
                    <option>--select group id--</option>
                </select> */}
                {/* phone Numbers */}
                <InputChip
                    name="phoneNumbers"
                    chips={tags}
                    onChipsChange={(newTags) => {
                        setTags(newTags);
                        formik.setFieldValue("phoneNumbers", newTags);
                        formik.setFieldTouched("phoneNumbers", true, false);
                    }}
                    placeholder="Add tags and press Enter..."
                    chipColor="bg-gray-100"
                    textColor="text-gray-700"
                    className="w-full"
                />
                {
                    formik && formik.touched.phoneNumbers && formik.errors.phoneNumbers && (
                        <div className="text-red-500 text-sm -mt-0 align-self">
                            {formik.errors.phoneNumbers}
                        </div>
                    )
                }
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
            <BulkSmsContent formik={formik} />

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