import "@/css/satoshi.css";
import "@/css/style.css";

import { Sidebar } from "@/_components/Layouts/sidebar";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import { Header } from "@/_components/Layouts/header";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ApolloWrapper } from "@/lib/(apollo-client)/ApolloWrapper";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: {
    template: "%s | NextAdmin - Next.js Dashboard Kit",
    default: "NextAdmin - Next.js Dashboard Kit",
  },
  description:
    "Next.js admin dashboard toolkit with 200+ templates, UI components, and integrations for fast dashboard development.",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(options);
  console.log("the session==>", session)
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader showSpinner={false} />

          {/* <div className="flex min-h-screen"> */}
          {/* <Sidebar /> */}

          {/* <div className="w-full bg-gray-2 dark:bg-[#020d1a]"> */}
          {/* <Header /> */}

          {/* <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10"> */}
          <ApolloWrapper>
            {children}
          </ApolloWrapper>
          {/* </main> */}
          {/* </div> */}
          {/* </div> */}
        </Providers>
      </body>
    </html>
  );
}
