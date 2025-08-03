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
    <div className="min-h-screen flex items-center justify-center bg-black px-8">
      <div className="max-w-sm w-full">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-extralight text-white mb-4 tracking-wider">
            {title.toLowerCase()}
          </h2>
          <p className="text-white/40 text-sm font-light">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
