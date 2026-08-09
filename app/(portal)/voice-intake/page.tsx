"use client";

import React from "react";
import { VoiceRecorderWidget } from "@/components/voice/VoiceRecorderWidget";
import { ShieldCheck, Info, HeartPulse } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function VoiceIntakePage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
            <HeartPulse className="size-7 text-[#06635d] dark:text-[#14b8a6]" />
            Conversational Voice AI Intake (Clinical Transcript)
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Speak naturally — CareFlow AI extracts symptoms and formats HPI records for your physician
          </p>
        </div>

        <Badge variant="outline" className="gap-1.5 text-xs text-[#06635d] dark:text-[#14b8a6] border-[#06635d]/30 self-start">
          <ShieldCheck className="size-4" />
          <span>Sample Record</span>
        </Badge>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Main Interactive Audio Widget */}
        <div className="lg:col-span-2">
          <VoiceRecorderWidget />
        </div>

        {/* Right 1 Column: Tips & Guidelines */}
        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Info className="size-5 text-[#06635d] dark:text-[#14b8a6]" />
                Intake Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs leading-relaxed text-muted-foreground">
              <div className="p-3 rounded-lg bg-white dark:bg-[#0b1f24] border border-[#e2e8f0] dark:border-[#1e3a40]">
                <p className="font-bold text-foreground mb-1">1. Specify Pain Location & Onset</p>
                <p>Example: (Chest tightness for 2 hours radiating to left arm)</p>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-[#0b1f24] border border-[#e2e8f0] dark:border-[#1e3a40]">
                <p className="font-bold text-foreground mb-1">2. Mention Associated Symptoms</p>
                <p>Such as cold diaphoresis, dyspnea, or nausea</p>
              </div>

              <div className="p-3 rounded-lg bg-white dark:bg-[#0b1f24] border border-[#e2e8f0] dark:border-[#1e3a40]">
                <p className="font-bold text-foreground mb-1">3. Natural Speech</p>
                <p>CareFlow model processes clinical symptoms automatically</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
