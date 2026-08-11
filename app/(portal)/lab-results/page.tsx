"use client";

import React, { useEffect } from "react";
import { FlaskConical, CheckCircle2, AlertTriangle, Filter, ShieldCheck } from "lucide-react";
import { usePatientStore } from "@/stores/usePatientStore";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function LabResultsPage() {
  const { labResults, fetchLivePatientData, isLoading } = usePatientStore();
  const [selectedCategory, setSelectedCategory] = React.useState<string>("ALL");

  useEffect(() => {
    fetchLivePatientData();
  }, [fetchLivePatientData]);

  const categories = ["ALL", "HEMATOLOGY", "METABOLIC", "RENAL", "LIPID"];

  const filteredLabs =
    selectedCategory === "ALL"
      ? labResults
      : labResults.filter((l) => l.category === selectedCategory);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
            <FlaskConical className="size-7 text-[#06635d] dark:text-[#14b8a6]" />
            Laboratory Tests & Blood Work Summary
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            OCR extracted lab panel values with standardized reference ranges and abnormal flags (HIGH/LOW)
          </p>
        </div>

        <Badge variant="outline" className="gap-1 text-xs text-[#06635d] dark:text-[#14b8a6] border-[#06635d]/30">
          <ShieldCheck className="size-3.5" />
          <span>UCUM Standardized</span>
        </Badge>
      </div>

      {/* Category Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="size-4 text-muted-foreground shrink-0" />
        {categories.map((cat) => (
          <Button
            key={cat}
            size="sm"
            variant={selectedCategory === cat ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat)}
            className="text-xs"
          >
            {cat}
          </Button>
        ))}
      </div>

      {isLoading && (
        <div className="p-8 text-center text-xs text-muted-foreground animate-pulse">
          Loading laboratory test results from Supabase vault...
        </div>
      )}

      {/* Lab Results Grid */}
      <div className="space-y-3">
        {filteredLabs.map((lab) => (
          <Card key={lab.id} className="glass-card hover:shadow-md transition-all">
            <div className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-foreground">{lab.analyte}</span>
                  <Badge variant="outline" className="text-[10px]">
                    {lab.category}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Reference Range: <span className="font-semibold text-foreground">{lab.referenceRange}</span>
                </p>
                <p className="text-[10px] text-muted-foreground">Date: {lab.date}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-lg font-extrabold text-[#06635d] dark:text-[#14b8a6]">
                    {lab.value} <span className="text-xs font-normal text-muted-foreground">{lab.unit}</span>
                  </p>
                </div>

                <Badge
                  variant={lab.flag === "NORMAL" ? "success" : lab.flag === "HIGH" ? "warning" : "danger"}
                  className="text-xs px-3 py-1 gap-1"
                >
                  {lab.flag === "NORMAL" ? (
                    <CheckCircle2 className="size-3.5" />
                  ) : (
                    <AlertTriangle className="size-3.5" />
                  )}
                  <span>{lab.flag}</span>
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
