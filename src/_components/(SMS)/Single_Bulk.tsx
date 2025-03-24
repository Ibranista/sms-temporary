"use client";

import React, { useState } from "react";
import SendSingleSMS from "./Send_Single";
import SendBulkSMS from "./Send_Bulk";
import { useMutation } from "@apollo/client";
import { SENDSMS } from "@/lib/(apollo-client)/mutations/sms.mutation";
import { GET_SHORT_CODES } from "@/lib/(apollo-client)/mutations/sms.query";
import { client } from "@/lib/(apollo-client)/mutations/auth.mutation";

export default function SingleBulkSms() {
    const [activeTab, setActiveTab] = useState<"single" | "bulk">("single");
    const [sendSMS, { data, loading: loginLoading, error }] = useMutation(SENDSMS);
    const [shortCodes, setShortCodes] = useState<{
        SenderID: {
            senderID: string
        },
        shortCode: string
    }[]>();


    client
        .query({
            query: GET_SHORT_CODES,
            variables: {
                shortCodesPage: 1,
            },
        })
        .then((response) => {
            setShortCodes(response?.data?.shortCodes)
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });

    return (
        <div className="mx-auto bg-white shadow p-6 rounded-sm">
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
                <SendSingleSMS shortCodes={shortCodes || []} />
            )}

            {activeTab === "bulk" && (
                <SendBulkSMS shortCodes={shortCodes || []} />
            )}

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