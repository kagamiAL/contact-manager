"use client";

import { LogOut, User } from "lucide-react";
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
    <header className="bg-black shadow-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-white">Contact Manager</h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-black" />
                </div>
                <span className="text-sm font-medium text-gray-300">
                  {user?.username}
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="p-2 text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
