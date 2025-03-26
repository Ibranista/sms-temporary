import { singleSMSFormInitialValues } from "@/_constants/sms.constants";
import { charEncoding } from "@/lib/utils";
import { FormikProps } from "formik";

function SmsContent({ setMessage, formik }: { setMessage: React.Dispatch<React.SetStateAction<string>>, formik: FormikProps<typeof singleSMSFormInitialValues> }) {

    const calculateSmsDetails = (message: string) => {

        const charsUsed = message?.length;
        const smsParts = Math.ceil(charsUsed / 159);
        const pricePerSms = 0.01;
        const smsPrice = smsParts * pricePerSms;
        const charType = charEncoding(message);
        return { charType, charsUsed, smsParts, smsPrice };
    };

    const { charsUsed, smsParts, smsPrice, charType } = calculateSmsDetails(formik.values.message);

    const insertPlaceholder = (placeholder: string) => {
        setMessage((prev: any) => `${prev} [[${placeholder}]]`);
    };

    return (
        <div className="">
            <p className="font-medium text-gray-700 mb-3">SMS Content</p>
            <div className="flex space-x-2 mb-2">
                {["First Name", "Last Name", "Birthday", "Phone", "Date", "Sex"].map(
                    (field: string) => (
                        <button
                            key={field}
                            className="px-2 py-1 border text-sm rounded bg-gray-100 hover:bg-gray-200 border-dotted border-solid border-2 border-slate-300"
                            onClick={() => insertPlaceholder(field)}
                        >
                            {field}
                        </button>
                    )
                )}
            </div>
            <textarea
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                className="w-full border p-2 rounded text-sm h-32 outline-[#5750F1]"
                placeholder="Type your message here..."
            />
            {
                formik && formik.touched.message && formik.errors.message && (
                    <div className="text-red-500 text-sm -mt-0 align-self">
                        {formik.errors.message}
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