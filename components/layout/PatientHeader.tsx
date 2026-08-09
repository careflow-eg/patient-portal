"use client";

import React from "react";
import { Search, Bell, ShieldCheck, Sun, Moon } from "lucide-react";
import { usePatientStore } from "@/stores/usePatientStore";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function PatientHeader() {
  const { patientName } = usePatientStore();
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <header className="h-16 border-b border-[#e2e8f0] dark:border-[#1e3a40] bg-white/80 dark:bg-[#0b1f24]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="flex items-center gap-2 max-w-md w-full bg-[#f1f5f9] dark:bg-[#11262a] px-3 py-2 rounded-xl border border-[#e2e8f0] dark:border-[#1e3a40]">
        <Search className="size-4 text-muted-foreground dark:text-[#94a3b8]" />
        <input
          type="text"
          placeholder="Search lab results, radiology scans, or medical documents..."
          className="bg-transparent text-xs w-full focus:outline-none text-foreground"
        />
      </div>

      {/* Right Header Actions */}
      <div className="flex items-center gap-3">
        {/* Dark Mode Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          className="text-muted-foreground dark:text-[#94a3b8] hover:text-foreground hover:bg-[#f1f5f9] dark:hover:bg-[#11262a] rounded-xl"
          title="Toggle Dark/Light Mode"
        >
          {resolvedTheme === "dark" ? (
            <Sun className="size-5 text-amber-400" />
          ) : (
            <Moon className="size-5 text-slate-700" />
          )}
        </Button>

        {/* Notification Bell */}
        <div className="relative">
          <Button variant="ghost" size="icon" className="text-muted-foreground dark:text-[#94a3b8] rounded-xl">
            <Bell className="size-5" />
          </Button>
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-[#14b8a6] animate-ping" />
        </div>

        {/* User Greeting */}
        <div className="flex items-center gap-2.5 border-l border-[#e2e8f0] dark:border-[#1e3a40] pl-4">
          <div className="size-9 rounded-xl bg-[#06635d] text-white flex items-center justify-center font-bold text-xs shadow-sm">
            {patientName.charAt(0)}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-foreground leading-tight">{patientName}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
