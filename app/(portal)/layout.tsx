"use client";

import React from "react";
import { PatientSidebar } from "@/components/layout/PatientSidebar";
import { PatientHeader } from "@/components/layout/PatientHeader";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex" dir="ltr">
      {/* Sidebar Navigation */}
      <PatientSidebar />

      {/* Main App Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pl-64 transition-all">
        <PatientHeader />
        <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
