import React from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";

export default function Signup() {
  return (
    <AuthLayout title="Create a new account">
      <SignupForm />
    </AuthLayout>
  );
}
