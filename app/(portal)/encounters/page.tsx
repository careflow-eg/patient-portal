"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { FileText, Calendar, Stethoscope, Mic, Bot } from "lucide-react";
import { usePatientStore } from "@/stores/usePatientStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function EncountersPage() {
  const { historyEncounters, fetchLivePatientData, isLoading } = usePatientStore();

  useEffect(() => {
    fetchLivePatientData();
  }, [fetchLivePatientData]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
            <FileText className="size-7 text-[#06635d] dark:text-[#14b8a6]" />
            Medical History & Past Encounters
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Review past medical consultations, chief complaints, Arabic voice history intake, and diagnostic summaries
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="p-8 text-center text-xs text-muted-foreground animate-pulse">
          Loading clinical encounters from Supabase patient vault...
        </div>
      )}

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
                <p className="font-bold text-muted-foreground mb-1">Chief Complaint & Visit Reason:</p>
                <p className="text-foreground font-medium bg-white dark:bg-[#0b1f24] p-3 rounded-lg border border-[#e2e8f0] dark:border-[#1e3a40]">
                  {enc.chiefComplaint}
                </p>
              </div>

              {enc.voiceTranscriptEn && (
                <div className="p-3 rounded-lg bg-[#06635d]/5 dark:bg-[#14b8a6]/10 border border-[#06635d]/20 space-y-1">
                  <p className="font-bold text-[#06635d] dark:text-[#14b8a6] flex items-center gap-1 text-[11px]">
                    <Mic className="size-3.5" />
                    Voice History Intake Summary:
                  </p>
                  <p className="text-foreground italic">"{enc.voiceTranscriptEn}"</p>
                </div>
              )}

              <div>
                <p className="font-bold text-muted-foreground mb-1">Diagnosis & Clinical Summary:</p>
                <p className="text-foreground font-medium">{enc.diagnosisSummary}</p>
              </div>

              <div className="pt-2">
                <Link href={`/dashboard`}>
                  <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                    <Bot className="size-3.5" />
                    Ask AI Assistant about this encounter
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
