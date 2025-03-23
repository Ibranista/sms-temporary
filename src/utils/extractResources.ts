import { AnyARecord } from "node:dns";

export const extractResources = (permissions: any) => {
    const resourceSet = new Set();

    permissions.forEach(({ name }) => {
        const parts = name.split(':');
        if (parts.length > 1) {
            resourceSet.add(parts[parts.length - 1].toLowerCase());
        }
    });

    return resourceSet;
};