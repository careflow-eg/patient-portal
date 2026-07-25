import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "CareFlow Patient Care Portal",
  description: "AI-powered patient medical vault, health insights, lab results, radiology scans, and prescriptions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-[#14b8a6]/20 selection:text-[#06635d]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
