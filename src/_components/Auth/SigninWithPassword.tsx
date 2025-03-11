"use client";
import { EmailIcon, PasswordIcon } from "@/assets/icons";
import Link from "next/link";
import React from "react";
import InputGroup from "../FormElements/InputGroup";
import { Checkbox } from "../FormElements/checkbox";
import { useFormik } from "formik";
import { signInSchema as validationSchema } from "@/lib/(schema)/signIn.auth";
import { initialValues } from "@/_constants/auth.constants";

export default function SigninWithPassword() {
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        console.log("Form submitted:", values);
      }, 1000);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Phone Number Input */}
      <InputGroup
        type="text"
        label="Phone Number"
        className="mb-6 [&_input]:py-[15px] border-stroke rounded-md"
        placeholder="Enter your phone number"
        name="phoneNumber"
        handleChange={formik.handleChange}
        value={formik.values.phoneNumber}
        icon={<EmailIcon />}
      />
      {formik.touched.phoneNumber && formik.errors.phoneNumber && (
        <div className="text-red-500 text-sm mb-4 -mt-4">
          {formik.errors.phoneNumber}
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