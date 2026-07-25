"use client";

import React from "react";
import { Pill, RefreshCw } from "lucide-react";
import { usePatientStore } from "@/stores/usePatientStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PrescriptionsPage() {
  const { prescriptions } = usePatientStore();

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
            <Pill className="size-7 text-[#06635d] dark:text-[#14b8a6]" />
            Digital Prescriptions & Medications
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Track active medication dosages, intake instructions, and order pharmacy refills
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {prescriptions.map((rx) => (
          <Card key={rx.id} className="glass-card hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-[#e2e8f0] dark:border-[#1e3a40]">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-[#06635d]/10 text-[#06635d] dark:text-[#14b8a6] flex items-center justify-center">
                  <Pill className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-base">{rx.medicationName}</CardTitle>
                  <p className="text-xs text-muted-foreground font-semibold">{rx.dosage}</p>
                </div>
              </div>

              <Badge variant={rx.refillAvailable ? "success" : "secondary"} className="text-xs">
                {rx.refillAvailable ? "Refill Available" : "Refill Pending"}
              </Badge>
            </CardHeader>

            <CardContent className="p-6 space-y-3 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-muted-foreground">Dosage Instructions:</span>
                <p className="text-foreground font-medium text-sm bg-white dark:bg-[#0b1f24] p-3 rounded-lg border border-[#e2e8f0] dark:border-[#1e3a40]">
                  {rx.frequency}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-muted/40 dark:bg-[#11262a]/40 space-y-1">
                <p className="text-muted-foreground">{rx.instructions}</p>
                <div className="flex items-center justify-between pt-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Prescribed by: {rx.prescribedBy}</span>
                  <span>Valid: {rx.startDate} to {rx.endDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
