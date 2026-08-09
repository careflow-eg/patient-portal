"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PatientSidebar } from "@/components/layout/PatientSidebar";
import { PatientHeader } from "@/components/layout/PatientHeader";
import { useAuthStore } from "@/stores/authStore";
import { usePatientStore } from "@/stores/usePatientStore";
import { authService } from "@/services/authService";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();
  const { setPatientData } = usePatientStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const fetchMe = async () => {
      try {
        const user = await authService.getMe();
        const res = await fetch("/api/patient/me");
        if (res.ok) {
          const patientData = await res.json();
          setPatientData({
            ...patientData,
            patientName: user.full_name || patientData.patientName,
            mrn: user.id.slice(0, 8).toUpperCase() || patientData.mrn,
          });
        } else {
          setPatientData({
            patientName: user.full_name,
            mrn: user.id.slice(0, 8).toUpperCase(),
          });
        }
      } catch (err) {
        logout();
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, [isAuthenticated, router, setPatientData, logout]);

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[#14b8a6] border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-[#14b8a6] font-medium">Loading Vault...</p>
        </div>
      </div>
    );
  }

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
