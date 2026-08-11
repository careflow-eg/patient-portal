import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "CareFlow Patient Care Portal",
  description: "AI-powered patient medical vault, health insights, lab results, radiology scans, and prescriptions.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
      { url: "/assets/img/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/assets/img/apple-touch-icon.png",
  },
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
