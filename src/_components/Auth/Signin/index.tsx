import Link from "next/link";
import SigninWithPassword from "../SigninWithPassword";

export default function Signin() {
  return (
    <section className="mt-8">
      <div>
        <SigninWithPassword />
      </div>

      <div className="mt-6 text-center">
        <p>
          Don’t have any account?{" "}
          <Link href="/auth/sign-up" className="text-primary">
            Contact Us
          </Link>
        </p>
      </div>
    </section>
  );
}
