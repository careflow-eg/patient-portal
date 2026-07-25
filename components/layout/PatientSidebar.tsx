"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  FileText,
  FlaskConical,
  ScanLine,
  FolderArchive,
  Pill,
  Sun,
  Moon,
  ShieldCheck,
  Video,
  Watch,
  Dna,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePatientStore } from "@/stores/usePatientStore";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function PatientSidebar() {
  const pathname = usePathname();
  const { patientName, mrn } = usePatientStore();
  const { resolvedTheme, setTheme } = useTheme();

  const mainNavItems = [
    {
      href: "/dashboard",
      label: "Health Insights",
      icon: Activity,
      badge: "AI Live",
    },
    {
      href: "/history",
      label: "Medical History",
      icon: FileText,
    },
    {
      href: "/lab-results",
      label: "Lab Results",
      icon: FlaskConical,
    },
    {
      href: "/radiology",
      label: "Radiology Scans",
      icon: ScanLine,
    },
    {
      href: "/archive",
      label: "Medical Archive",
      icon: FolderArchive,
    },
    {
      href: "/prescriptions",
      label: "Prescriptions",
      icon: Pill,
    },
  ];

  const comingSoonItems = [
    {
      label: "Telehealth Consult",
      icon: Video,
    },
    {
      label: "Wearables & Apple Health",
      icon: Watch,
    },
    {
      label: "Genomic Risk Profile",
      icon: Dna,
    },
  ];

  return (
    <aside className="fixed top-0 left-0 z-40 h-screen w-64 border-r border-[#e2e8f0] dark:border-[#1e3a40] bg-[#f8fafc] dark:bg-[#0b1f24] flex flex-col justify-between p-4 shadow-sm">
      <div>
        {/* Official CareFlow Brand Logo & Header matching doctor-portal Sidebar */}
        <div className="flex h-16 items-center border-b border-[#e2e8f0] dark:border-[#1e3a40] px-2 mb-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 shrink-0 rounded-xl overflow-hidden flex items-center justify-center bg-[#06635d]/10 dark:bg-[#14b8a6]/20 p-1 border border-[#06635d]/20 shadow-sm">
              <img
                src="/assets/img/favicon.png"
                alt="CareFlow Logo"
                className="h-8 w-8 object-contain"
              />
            </div>
            <div>
              <span className="font-extrabold text-foreground whitespace-nowrap text-lg tracking-tight">
                Care<span className="text-[#06635d] dark:text-[#14b8a6]">Flow</span>
              </span>
              <p className="text-[10px] text-muted-foreground whitespace-nowrap font-medium">
                Patient Medical Vault
              </p>
            </div>
          </div>
        </div>

        {/* Security Badge Banner */}
        <div className="mb-4 p-2.5 rounded-xl bg-[#06635d]/5 dark:bg-[#14b8a6]/10 border border-[#06635d]/20 flex items-center gap-2 text-xs">
          <ShieldCheck className="size-4 text-[#06635d] dark:text-[#14b8a6] shrink-0" />
          <span className="text-[11px] text-muted-foreground font-medium">
            HIPAA Encrypted Patient Record
          </span>
        </div>

        {/* Main Navigation List */}
        <nav className="space-y-1">
          <p className="text-[10px] font-bold text-muted-foreground uppercase px-3 mb-2 tracking-wider">
            Patient Vault Navigation
          </p>
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer",
                    isActive
                      ? "bg-[#06635d]/10 text-[#06635d] dark:bg-[#14b8a6]/20 dark:text-[#14b8a6] font-bold border-l-4 border-[#06635d] dark:border-[#14b8a6]"
                      : "text-muted-foreground hover:bg-[#f1f5f9] dark:hover:bg-[#11262a] dark:text-[#94a3b8] hover:text-[#06635d] dark:hover:text-[#14b8a6]"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={cn("size-4", isActive ? "text-[#06635d] dark:text-[#14b8a6]" : "")} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="outline" className="text-[9px] border-[#06635d]/30 text-[#06635d] dark:text-[#14b8a6] py-0 px-1.5">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Coming Soon Features Section */}
        <div className="mt-6 pt-4 border-t border-[#e2e8f0] dark:border-[#1e3a40]">
          <p className="text-[10px] font-bold text-muted-foreground uppercase px-3 mb-2 tracking-wider">
            Coming Soon
          </p>
          <div className="space-y-1 opacity-70">
            {comingSoonItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-muted-foreground bg-muted/30 dark:bg-[#11262a]/30 cursor-not-allowed"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="size-4" />
                    <span className="text-[11px]">{item.label}</span>
                  </div>
                  <Badge variant="secondary" className="text-[9px] py-0 px-1">
                    SOON
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Patient Profile & Theme Toggle */}
      <div className="space-y-3 pt-3 border-t border-[#e2e8f0] dark:border-[#1e3a40]">
        <div className="flex items-center justify-between px-2">
          <span className="text-xs text-muted-foreground font-medium">Theme Mode</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="text-muted-foreground dark:text-[#94a3b8]"
          >
            {resolvedTheme === "dark" ? <Sun className="size-4 text-amber-400" /> : <Moon className="size-4 text-slate-700" />}
          </Button>
        </div>

        {/* Patient Info Card matching doctor-portal user widget */}
        <div className="p-3 rounded-xl bg-white dark:bg-[#0b1f24] border border-[#e2e8f0] dark:border-[#1e3a40] flex items-center gap-3 shadow-sm">
          <div className="size-9 rounded-xl bg-[#06635d]/10 dark:bg-[#14b8a6]/20 text-[#06635d] dark:text-[#14b8a6] flex items-center justify-center font-bold text-sm border border-[#06635d]/20">
            {patientName.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-foreground truncate">{patientName}</p>
            <p className="text-[10px] text-muted-foreground font-mono truncate">{mrn}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
