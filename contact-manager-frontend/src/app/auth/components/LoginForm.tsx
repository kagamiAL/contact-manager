"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

import { authAPI } from "@/lib/api";
import { useAuthStore } from "@/lib/store";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import type { AuthorizationRequest } from "@/lib/types";

export default function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorizationRequest>();

  const onSubmit = async (data: AuthorizationRequest) => {
    setIsLoading(true);
    try {
      const response = await authAPI.signIn(data);

      // Assuming the response contains user info, adjust based on your backend
      const user = response.user || {
        id: 1,
        username: data.email.split("@")[0], // Extract username from email
        email: data.email,
      };

      login(response.token, user);
      toast.success("Successfully logged in!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div className="animate-in slide-in-from-right duration-500 delay-200">
          <Input
            label="email"
            type="email"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email format",
              },
            })}
            error={errors.email?.message}
          />
        </div>

        <div className="relative animate-in slide-in-from-right duration-500 delay-300">
          <Input
            label="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            {...register("password", { required: "Password is required" })}
            error={errors.password?.message}
          />
          <button
            type="button"
            className="absolute right-0 top-8 flex items-center text-white/40 hover:text-white transition-all duration-300 transform hover:scale-110"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="animate-in slide-in-from-bottom duration-500 delay-400">
        <Button
          type="submit"
          className="w-full"
          loading={isLoading}
          disabled={isLoading}
        >
          enter
        </Button>
      </div>
    </form>
  );
}
