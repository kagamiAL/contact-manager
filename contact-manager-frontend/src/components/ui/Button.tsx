"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      primary:
        "bg-white text-black hover:bg-white/90 hover:shadow-lg hover:shadow-white/20 focus:outline-none transition-all duration-300 transform hover:scale-105 active:scale-95",
      secondary:
        "bg-transparent border border-white/20 text-white hover:bg-white hover:text-black hover:shadow-lg hover:shadow-white/10 focus:outline-none transition-all duration-300 transform hover:scale-105 active:scale-95",
      danger:
        "bg-transparent border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white focus:outline-none transition-all duration-300 transform hover:scale-105 active:scale-95",
      ghost:
        "text-white/60 hover:text-white focus:outline-none transition-all duration-300 transform hover:scale-105 active:scale-95",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-light tracking-wide disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
