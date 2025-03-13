import "@/css/satoshi.css";
import "@/css/style.css";

import { Sidebar } from "@/_components/Layouts/sidebar";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import { Header } from "@/_components/Layouts/header";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { ApolloWrapper } from "@/lib/(apollo-client)/ApolloWrapper";
import LayoutContainer from "@/_components/Layouts/layout-container";

export const metadata: Metadata = {
    title: {
        template: "%s | NextAdmin - Next.js Dashboard Kit",
        default: "NextAdmin - Next.js Dashboard Kit",
    },
    description:
        "Next.js admin dashboard toolkit with 200+ templates, UI components, and integrations for fast dashboard development.",
};

export default async function RootLayout({ children }: PropsWithChildren) {
    return (
        <LayoutContainer>
            {children}
        </LayoutContainer>
    );
}
