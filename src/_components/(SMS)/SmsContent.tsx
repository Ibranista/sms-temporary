import { useState } from "react";

function SmsContent() {
    const [message, setMessage] = useState("");

    // Helper to calculate SMS details
    const calculateSmsDetails = (message: string) => {
        const charsUsed = message.length;
        const smsParts = Math.ceil(charsUsed / 159);
        const pricePerSms = 0.65; // Example price per SMS
        const smsPrice = smsParts * pricePerSms;

        return { charsUsed, smsParts, smsPrice };
    };

    const { charsUsed, smsParts, smsPrice } = calculateSmsDetails(message);

    const insertPlaceholder = (placeholder: string) => {
        setMessage((prev) => `${prev} [[${placeholder}]]`);
    };

    return (
        <div>
            <p className="font-medium text-gray-700 mb-3">SMS Content</p>
            <div className="flex space-x-2 mb-2">
                {["First Name", "Last Name", "Birthday", "Phone", "Date", "Sex"].map(
                    (field) => (
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-1/2 border p-2 rounded text-sm h-32 outline-[#5750F1]"
                placeholder="Type your message here..."
            />
            <div className="mt-4 text-sm text-gray-600">
                <p>Encoding: GSM</p>
                <p>SMS Parts: {smsParts}</p>
                <p>Chars Used: {charsUsed}</p>
                <p>Price: {smsPrice.toFixed(2)} ETB</p>
            </div>
        </div>
    )
}

export default SmsContent;