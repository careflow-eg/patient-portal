"use client";

import React from "react";
import { FileText, Calendar, Stethoscope, CheckCircle2 } from "lucide-react";
import { usePatientStore } from "@/stores/usePatientStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HistoryPage() {
  const { historyEncounters } = usePatientStore();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
            <FileText className="size-7 text-[#06635d] dark:text-[#14b8a6]" />
            Medical Consultations & Encounter History
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Review past physician visits, chief complaints, and diagnosis summaries
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {historyEncounters.map((enc) => (
          <Card key={enc.id} className="glass-card hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-[#e2e8f0] dark:border-[#1e3a40]">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-[#06635d]/10 text-[#06635d] dark:text-[#14b8a6] flex items-center justify-center font-bold">
                  <Stethoscope className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-base">{enc.doctorName}</CardTitle>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                    <Calendar className="size-3.5" />
                    {enc.date} • {enc.specialty}
                  </p>
                </div>
              </div>

              <Badge variant="success" className="text-xs">
                {enc.status}
              </Badge>
            </CardHeader>

            <CardContent className="p-6 space-y-4 text-xs">
              <div>
                <p className="font-bold text-muted-foreground mb-1">Chief Complaint & HPI:</p>
                <p className="text-foreground font-medium bg-white dark:bg-[#0b1f24] p-3 rounded-lg border border-[#e2e8f0] dark:border-[#1e3a40]">
                  {enc.chiefComplaint}
                </p>
              </div>

              <div>
                <p className="font-bold text-muted-foreground mb-1">Diagnosis & Clinical Summary:</p>
                <p className="text-foreground font-medium">{enc.diagnosisSummary}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
