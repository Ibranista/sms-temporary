import "@/css/satoshi.css";
import "@/css/style.css";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { Providers } from "./providers";
import { ApolloWrapper } from "@/lib/(apollo-client)/ApolloWrapper";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: {
    template: "%s | TamconSms - SMS Gateway",
    default: "TamconSms - SMS Gateway",
  },
  description:
    "Your trusted SMS gateway.",
};

export default async function RootLayout({ children }: PropsWithChildren) {

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
          <SessionProvider>
            <ApolloWrapper>
              {children}
            </ApolloWrapper>
          </SessionProvider>
          {/* </main> */}
          {/* </div> */}
          {/* </div> */}
        </Providers>
      </body>
    </html>
  );
}
