"use client";

import { LogOut } from "lucide-react";
import { useAuthStore } from "@/lib/store";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/auth/login");
  };

  return (
    <header className="bg-black">
      <div className="max-w-4xl mx-auto px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <h1 className="text-2xl font-extralight text-white tracking-wider">
              contacts
            </h1>
          </div>

          <div className="flex items-center space-x-8">
            <span className="text-sm font-light text-white/60">
              {user?.username}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="p-0"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
