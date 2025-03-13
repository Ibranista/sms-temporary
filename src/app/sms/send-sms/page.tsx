import SingleBulkSms from "@/_components/(SMS)/Single_Bulk";
import Breadcrumb from "@/_components/Breadcrumbs/Breadcrumb";

export default function SendSMS() {
    return (
        <div className="mx-auto">
            <Breadcrumb pageName="Send SMS" />
            {/* single sms and bulk sms */}
            <SingleBulkSms />
        </div>
    )
}