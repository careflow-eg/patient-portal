"use client";

import React, { useEffect } from "react";
import { ScanLine, FileText, Download, Eye, Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";
import { usePatientStore } from "@/stores/usePatientStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function RadiologyPage() {
  const { radiologyScans, fetchLivePatientData, isLoading } = usePatientStore();

  useEffect(() => {
    fetchLivePatientData();
  }, [fetchLivePatientData]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
            <ScanLine className="size-7 text-[#06635d] dark:text-[#14b8a6]" />
            Radiology Imaging & Vision AI Findings
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            View high-resolution DICOM scans, MedGemma VLM report impressions, and MedSAM 2.0 segmentation ROIs
          </p>
        </div>

        <Badge variant="outline" className="gap-1 text-xs text-[#06635d] dark:text-[#14b8a6] border-[#06635d]/30">
          <Sparkles className="size-3.5 text-[#14b8a6]" />
          <span>MedGemma & MedSAM2 Evaluated</span>
        </Badge>
      </div>

      {isLoading && (
        <div className="p-8 text-center text-xs text-muted-foreground animate-pulse">
          Loading radiology scans and AI vision impressions from Supabase vault...
        </div>
      )}

      <div className="space-y-6">
        {radiologyScans.map((scan) => (
          <Card key={scan.id} className="glass-card hover:shadow-xl transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-[#e2e8f0] dark:border-[#1e3a40]">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-[#06635d]/10 text-[#06635d] dark:text-[#14b8a6] flex items-center justify-center font-bold">
                  <ScanLine className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-base">{scan.bodyPart}</CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Scan Date: {scan.scanDate} • Radiologist: {scan.radiologist}
                  </p>
                </div>
              </div>

              <Badge variant="default" className="text-xs">
                {scan.modality}
              </Badge>
            </CardHeader>

            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Scan Image Preview */}
                <div className="relative rounded-xl overflow-hidden border border-[#06635d]/20 bg-black group">
                  <img
                    src={scan.imageUrl}
                    alt={scan.bodyPart}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-[11px] text-white font-medium flex items-center gap-1">
                      <Eye className="size-3.5" />
                      16-bit DICOM Preview
                    </span>
                  </div>
                </div>

                {/* Right 2 Columns: Vision AI Report & Segmentation Findings */}
                <div className="md:col-span-2 space-y-4 text-xs">
                  {/* VLM Findings */}
                  <div className="p-4 rounded-xl bg-white dark:bg-[#0b1f24] border border-[#e2e8f0] dark:border-[#1e3a40] space-y-1">
                    <p className="font-bold text-[#06635d] dark:text-[#14b8a6] flex items-center gap-1 text-xs">
                      <Sparkles className="size-4" />
                      MedGemma VLM Impression:
                    </p>
                    <p className="text-foreground leading-relaxed font-medium">{scan.vlmImpression}</p>
                  </div>

                  {/* MedSAM2 ROI Findings */}
                  <div className="p-4 rounded-xl bg-[#06635d]/5 dark:bg-[#14b8a6]/10 border border-[#06635d]/20 space-y-1">
                    <p className="font-bold text-[#06635d] dark:text-[#14b8a6] flex items-center gap-1 text-xs">
                      <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
                      MedSAM 2.0 ROI Segmentation Metrics:
                    </p>
                    <p className="text-foreground font-medium">{scan.segmentationFindings}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end pt-2">
                    <Button size="sm" variant="outline" className="gap-1.5 text-xs">
                      <Download className="size-3.5" />
                      <span>Download DICOM Study Package</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
