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
            className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            sign in to your existing account
          </Link>
        </>
      }
      icon={<UserPlus className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
    >
      <RegisterForm />
    </AuthLayout>
  );
}
