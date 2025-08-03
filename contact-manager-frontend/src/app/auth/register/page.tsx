import Link from "next/link";
import { UserPlus } from "lucide-react";

import AuthLayout from "../components/AuthLayout";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle={
        <>
          Or{" "}
          <Link
            href="/auth/login"
            className="font-medium text-white hover:text-gray-300"
          >
            sign in to your existing account
          </Link>
        </>
      }
      icon={<UserPlus className="h-6 w-6 text-black" />}
    >
      <RegisterForm />
    </AuthLayout>
  );
}
