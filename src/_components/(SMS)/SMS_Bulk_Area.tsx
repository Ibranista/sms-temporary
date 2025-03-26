import { bulkSMSFormInitialValues } from "@/_constants/sms.constants";
import { charEncoding } from "@/lib/utils";
import { FormikProps } from "formik";

function SmsContent({ formik }: { formik: FormikProps<typeof bulkSMSFormInitialValues> }) {

    const calculateSmsDetails = (message: string) => {

        const charsUsed = message?.length;
        const smsParts = Math.ceil(charsUsed / 159);
        const pricePerSms = 0.01;
        const smsPrice = smsParts * pricePerSms;
        const charType = charEncoding(message);
        return { charType, charsUsed, smsParts, smsPrice };
    };

    const { charsUsed, smsParts, smsPrice, charType } = calculateSmsDetails(formik.values.messages);

    return (
        <div className="">
            <p className="font-medium text-gray-700 mb-3">SMS Content</p>

            <textarea
                name="messages"
                value={formik.values.messages}
                onChange={formik.handleChange}
                className="w-full border p-2 rounded text-sm h-32 outline-[#5750F1]"
                placeholder="Type your message here..."
            />
            {
                formik && formik.touched.messages && formik.errors.messages && (
                    <div className="text-red-500 text-sm -mt-0 align-self">
                        {formik.errors.messages}
                    </div>
                )
            }
            <div className="mt-4 text-sm text-gray-600 flex flex-col gap-2 mb-5">
                <p>Encoding: {charType}</p>
                <p>SMS Parts: {smsParts}</p>
                <p>Chars Used: {charsUsed}</p>
                <p>Price: {smsPrice.toFixed(2)} ETB</p>
            </div>
        </div>
    )
}

export default SmsContent;