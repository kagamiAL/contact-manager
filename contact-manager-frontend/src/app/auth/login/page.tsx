import Link from "next/link";
import { LogIn } from "lucide-react";

import AuthLayout from "../components/AuthLayout";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="welcome back"
      subtitle={
        <>
          or{" "}
          <Link
            href="/auth/register"
            className="text-white border-b border-white/40 hover:border-white transition-colors duration-300"
          >
            create account
          </Link>
        </>
      }
      icon={<LogIn className="h-6 w-6 text-black" />}
    >
      <LoginForm />
    </AuthLayout>
  );
}
