import Link from "next/link";
import { LogIn } from "lucide-react";

import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle={
        <>
          Or{" "}
          <Link
            href="/auth/register"
            className="font-medium text-white hover:text-gray-300"
          >
            create a new account
          </Link>
        </>
      }
      icon={<LogIn className="h-6 w-6 text-black" />}
    >
      <LoginForm />
    </AuthLayout>
  );
}
