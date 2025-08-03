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

interface RegisterForm extends AuthorizationRequest {
  confirmPassword: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const password = watch("password");

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const response = await authAPI.register({
        email: data.email,
        password: data.password,
      });

      // Assuming the response contains user info, adjust based on your backend
      const user = response.user || {
        id: 1,
        username: data.email.split("@")[0], // Extract username from email
        email: data.email,
      };

      login(response.token, user);
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
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
            autoComplete="new-password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
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

        <div className="relative animate-in slide-in-from-right duration-500 delay-400">
          <Input
            label="confirm password"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            error={errors.confirmPassword?.message}
          />
          <button
            type="button"
            className="absolute right-0 top-8 flex items-center text-white/40 hover:text-white transition-all duration-300 transform hover:scale-110"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="animate-in slide-in-from-bottom duration-500 delay-500">
        <Button
          type="submit"
          className="w-full"
          loading={isLoading}
          disabled={isLoading}
        >
          join
        </Button>
      </div>
    </form>
  );
}
