"use client";

import React from "react";
import Link from "next/link";
import {
  Heart,
  Activity,
  Droplet,
  Flame,
  Sparkles,
  FlaskConical,
  ScanLine,
  FolderArchive,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Scale,
} from "lucide-react";
import { usePatientStore } from "@/stores/usePatientStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedSection, AnimatedCard } from "@/components/layout/AnimatedWrapper";

export default function DashboardPage() {
  const { patientName, mrn, age, gender, bloodType, allergies, vitals, insights, labResults, radiologyScans } =
    usePatientStore();

  return (
    <div className="space-y-6">
      {/* Patient Header Vault Banner */}
      <AnimatedSection>
      <div className="relative rounded-2xl p-6 md:p-8 overflow-hidden bg-gradient-to-r from-[#06635d] to-[#14b8a6] text-white shadow-xl">
        <div className="absolute -right-10 -bottom-10 size-60 rounded-full bg-white/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <Badge className="bg-white/20 text-white border-none text-xs gap-1">
              <ShieldCheck className="size-3.5" />
              <span>HIPAA Encrypted Patient Record</span>
            </Badge>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Patient Medical Vault & Insights
            </h1>
            <p className="text-sm text-emerald-100 leading-relaxed">
              Welcome, <span className="font-bold text-white">{patientName}</span> ({gender}, {age} yrs) • MRN: <span className="font-mono">{mrn}</span>
            </p>

            <div className="flex flex-wrap gap-2 pt-2 text-xs">
              <Badge variant="outline" className="bg-white/10 text-white border-white/30">
                Blood Type: {bloodType}
              </Badge>
              <Badge variant="outline" className="bg-white/10 text-white border-white/30">
                Allergies: {allergies.join(", ")}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      </AnimatedSection>

      {/* Vitals Summary Grid */}
      <AnimatedSection>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Heart Rate */}
        <Card className="glass-card">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Heart Rate</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-foreground">{vitals.heartRate}</span>
                <span className="text-xs text-muted-foreground">bpm</span>
              </div>
            </div>
            <div className="size-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <Heart className="size-5 animate-pulse" />
            </div>
          </CardContent>
        </Card>

        {/* Blood Pressure */}
        <Card className="glass-card">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Blood Pressure</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-foreground">{vitals.bloodPressure}</span>
                <span className="text-xs text-muted-foreground">mmHg</span>
              </div>
            </div>
            <div className="size-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Activity className="size-5" />
            </div>
          </CardContent>
        </Card>

        {/* SpO2 Oxygen */}
        <Card className="glass-card">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Oxygen SpO2</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-foreground">{vitals.spo2}%</span>
              </div>
            </div>
            <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Droplet className="size-5" />
            </div>
          </CardContent>
        </Card>

        {/* Fasting Glucose */}
        <Card className="glass-card">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Fasting Glucose (SI)</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-foreground">{vitals.glucoseMmolL}</span>
                <span className="text-xs text-muted-foreground">mmol/L</span>
              </div>
              <p className="text-[10px] text-muted-foreground font-mono">({vitals.glucoseMgDl} mg/dL)</p>
            </div>
            <div className="size-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Flame className="size-5" />
            </div>
          </CardContent>
        </Card>
      </div>
      </AnimatedSection>

      {/* AI Health Insights Section */}
      <AnimatedSection>
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="size-5 text-[#06635d] dark:text-[#14b8a6]" />
            AI Health Insights & Clinical Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {insights.map((ins) => (
            <div
              key={ins.id}
              className="p-4 rounded-xl bg-white dark:bg-[#0b1f24] border border-[#e2e8f0] dark:border-[#1e3a40] space-y-1 text-xs"
            >
              <div className="flex items-center justify-between font-bold">
                <span className="text-foreground">{ins.title}</span>
                {/* P2-6 FIX: Proper 3-way severity mapping.
                    Previously INFO and ATTENTION both mapped to "warning" — misleading.
                    INFO = informational/neutral (outline), ATTENTION = caution (warning),
                    NORMAL = positive/stable (success) */}
                <Badge
                  variant={
                    ins.severity === "NORMAL"
                      ? "success"
                      : ins.severity === "ATTENTION"
                      ? "warning"
                      : "outline"
                  }
                  className="text-[10px]"
                >
                  {ins.category}
                </Badge>
              </div>
              <p className="text-muted-foreground leading-relaxed">{ins.summary}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      </AnimatedSection>

      {/* Highlights Grid */}
      <AnimatedSection>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lab Results Highlight */}
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <FlaskConical className="size-5 text-[#06635d] dark:text-[#14b8a6]" />
              Latest Lab Results
            </CardTitle>
            <Link href="/lab-results">
              <Button variant="ghost" size="sm" className="text-xs text-[#06635d] dark:text-[#14b8a6]">
                View All Labs
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {labResults.slice(0, 3).map((lab) => (
              <div
                key={lab.id}
                className="p-3 rounded-lg bg-white dark:bg-[#0b1f24] border border-[#e2e8f0] dark:border-[#1e3a40] flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-foreground">{lab.analyte}</p>
                  <p className="text-[11px] text-muted-foreground">Range: {lab.referenceRange}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm text-foreground">
                    {lab.value} {lab.unit}
                  </span>
                  <Badge variant={lab.flag === "NORMAL" ? "success" : "warning"} className="text-[10px]">
                    {lab.flag}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Radiology Highlight */}
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <ScanLine className="size-5 text-[#06635d] dark:text-[#14b8a6]" />
              Radiology Scans
            </CardTitle>
            <Link href="/radiology">
              <Button variant="ghost" size="sm" className="text-xs text-[#06635d] dark:text-[#14b8a6]">
                View All Scans
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {radiologyScans.map((scan) => (
              <div
                key={scan.id}
                className="p-3 rounded-lg bg-white dark:bg-[#0b1f24] border border-[#e2e8f0] dark:border-[#1e3a40] flex items-center gap-3 text-xs"
              >
                <img
                  src={scan.imageUrl}
                  alt={scan.bodyPart}
                  className="size-14 rounded-lg object-cover border border-[#06635d]/20 shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">{scan.bodyPart}</span>
                    <Badge variant="outline" className="text-[10px]">
                      {scan.modality}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground line-clamp-2">{scan.vlmImpression}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      </AnimatedSection>
    </div>
  );
}
