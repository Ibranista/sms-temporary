"use client";
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import Link from "next/link";
import React from "react";
import InputGroup from "../FormElements/InputGroup";
import { Checkbox } from "../FormElements/checkbox";
import { useFormik } from "formik";
import { LOGIN } from "@/lib/(apollo-client)/mutations/auth.mutation";
import { signInSchema as validationSchema } from "@/lib/(schema)/signIn.auth";
import { initialValues } from "@/_constants/auth.constants";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";

export default function SigninWithPassword() {
  const [logIn, { data, loading: loginLoading, error }] = useMutation(LOGIN);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const { email, password } = values ?? {};
      setLoading(true);
      try {
        console.log("loggin in")
        const response = await logIn({ variables: { email, password } });
        if (response && data) {
          const { accessToken, user } = data.logIn ?? {};
          const result = await signIn('Signin', {
            redirect: false,
            accessToken,
            user
          });
        }
      } catch (err) {
        console.error("Login failed:", err)
      }
      setLoading(false);
      // setTimeout(() => {
      //   setLoading(false);
      //   console.log("Form submitted:", values);
      // }, 1000);

      // const response = await signIn("credentials", {
      //   email: email,
      //   password: password,
      //   redirect: false
      // });

      // if (response?.error) {
      //   setLoading(false);
      //   // setError("Incorrect phonenumber or password");
      // } else if (response?.ok) {
      //   setLoading(false);
      //   router.push("/");
      //   router.refresh();
      // }

    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Phone Number Input */}
      <InputGroup
        type="email"
        label="email"
        className="mb-6 [&_input]:py-[15px] border-stroke rounded-md"
        placeholder="Enter your Email"
        name="email"
        handleChange={formik.handleChange}
        value={formik.values.email}
      // icon={<EmailIcon />}
      />
      {formik.touched.email && formik.errors.email && (
        <div className="text-red-500 text-sm mb-4 -mt-4">
          {formik.errors.email}
        </div>
      )}

      {/* Password Input */}
      <InputGroup
        type="password"
        label="Password"
        className="mb-2 [&_input]:py-[15px] border-stroke rounded-md"
        placeholder="Enter your password"
        name="password"
        handleChange={formik.handleChange}
        value={formik.values.password}
        icon={<PasswordIcon />}
      />
      {formik.touched.password && formik.errors.password && (
        <div className="text-red-500 text-sm mb-4 mt-2">
          {formik.errors.password}
        </div>
      )}

      {/* Remember Me and Forgot Password */}
      <div className="mb-6 flex items-center justify-between gap-2 py-2 font-medium">
        <Checkbox
          label="Remember me"
          name="remember"
          withIcon="check"
          minimal
          radius="md"
          onChange={(e) =>
            formik.setFieldValue("remember", e.target.checked)
          }
        // checked={formik.values.remember}
        />
        <Link
          href="/auth/forgot-password"
          className="hover:text-primary dark:text-white dark:hover:text-primary"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Submit Button */}
      <div className="mb-4.5">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
          disabled={loading}
        >
          Sign In
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
          )}
        </button>
      </div>
    </form>
  );
}