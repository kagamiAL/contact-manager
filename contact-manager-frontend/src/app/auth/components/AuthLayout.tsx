"use client";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: React.ReactNode;
  icon: React.ReactNode;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  icon,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-white">
            {icon}
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
