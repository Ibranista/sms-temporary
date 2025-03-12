import Signin from "@/_components/Auth/Signin";
import { options } from "@/app/api/auth/[...nextauth]/options";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Sign in",
};

export default async function SignIn() {

  const session = await getServerSession(options);
  if (session) {
    redirect("/");
  }

  return (
    <>
      <div className="items-center h-screen grid grid-cols-[1fr_2fr]">
        <div className="w-full p-7.5 bg-primary h-full box-border">
          <div className="overflow-hidden rounded-2xl px-12.5 dark:!bg-dark-2 dark:bg-none flex flex-col justify-center h-full">
            <Link className="mb-10 inline-block text-white" href="/">
              Tamcon SMS Gateway
            </Link>
            <p className="mb-3 text-xl font-medium dark:text-white text-white">
              Sign in to your account
            </p>
            <h1 className="mb-4 text-2xl font-bold dark:text-white sm:text-heading-3 text-white">
              Welcome Back!
            </h1>
            <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
              Please sign in to your account by completing the necessary fields below
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="w-full p-4 sm:p-12.5 xl:p-15 max-w-[50%] mx-auto">
            <p className="text-center font-medium text-primary text-4xl">Sign In</p>
            <Signin />
          </div>
        </div>
      </div>
    </>
  );
}
