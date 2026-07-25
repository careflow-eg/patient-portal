import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - CareFlow Patient Portal",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#021418]">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#021418] via-[#0b1f24] to-[#112344] pointer-events-none" />

      {/* Decorative blurred circles */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#06635d]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#14b8a6]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-3 mb-2 bg-[#06635d]/10 p-1 px-3 rounded-2xl border border-[#06635d]/20 shadow-sm">
            <img
              src="/assets/img/favicon.png"
              alt="CareFlow Logo"
              className="h-9 w-auto object-contain"
            />
            <span className="font-extrabold text-white text-xl tracking-tight">
              Care<span className="text-[#14b8a6]">Flow</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
            Patient Medical Vault & Insights
          </p>
        </div>

        {children}
      </div>
    </div>
  );
}
