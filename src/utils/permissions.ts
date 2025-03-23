import { extractResources } from "./extractResources";

const roles = ["admin", "temp"];
export const permissions = [
    {
        "name": "send:bulk:sms"
    },
    {
        "name": "view:sms"
    },
    {
        "name": "view:otp"
    },
    {
        "name": "update:ticketRequest:status"
    },
    {
        "name": "view:team:user"
    },
    {
        "name": "delete:shortCode"
    },
    {
        "name": "view:logs"
    },
    {
        "name": "access:api"
    },
    {
        "name": "delete:team"
    },
    {
        "name": "create:user"
    },
    {
        "name": "view:ticketRequest:report"
    }
];

export const allowedResources = extractResources(permissions);
