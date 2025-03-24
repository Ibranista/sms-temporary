import "@/css/satoshi.css";
import "@/css/style.css";


import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import LayoutContainer from "@/_components/Layouts/layout-container";

export const metadata: Metadata = {
    title: {
        template: "%s | Tamcon SMS Gateway Admin Dashboard",
        default: "Tamcon SMS Gateway Admin Dashboard",
    },
    description:
        "Tamcon SMS Gateway.",
};

export default async function RootLayout({ children }: PropsWithChildren) {
    return (
        <LayoutContainer>
            {children}
        </LayoutContainer>
    );
}
