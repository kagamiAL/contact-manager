import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-xs font-light text-white/60 mb-2 uppercase tracking-wide transform transition-all duration-300 hover:text-white/80">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full bg-transparent border-b border-white/20 px-0 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white focus:placeholder:text-white/60 transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-50 transform focus:translate-y-[-2px]",
            error && "border-red-500 focus:border-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
