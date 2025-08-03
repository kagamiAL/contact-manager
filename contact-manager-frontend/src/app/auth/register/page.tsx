import Link from "next/link";
import { UserPlus } from "lucide-react";

import AuthLayout from "../components/AuthLayout";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="join us"
      subtitle={
        <>
          or{" "}
          <Link
            href="/auth/login"
            className="text-white border-b border-white/40 hover:border-white transition-colors duration-300"
          >
            sign in
          </Link>
        </>
      }
      icon={<UserPlus className="h-6 w-6 text-black" />}
    >
      <RegisterForm />
    </AuthLayout>
  );
}
