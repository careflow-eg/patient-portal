"use client";

import React from "react";
import { Mic, MicOff, Sparkles, CheckCircle2, AlertTriangle, Send, RefreshCw } from "lucide-react";
import { useVoiceIntakeStore } from "@/stores/useVoiceIntakeStore";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function VoiceRecorderWidget() {
  const {
    isRecording,
    isProcessing,
    isCompleted,
    waveformAmplitudes,
    turns,
    chiefComplaintEn,
    associatedSymptoms,
    startRecording,
    stopRecording,
    finalizeSession,
    resetSession,
  } = useVoiceIntakeStore();

  return (
    <Card className="glass-card shadow-lg border-[#06635d]/20 dark:border-[#14b8a6]/30 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-[#06635d]/10 to-[#14b8a6]/10 border-b border-[#06635d]/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-[#06635d] text-white flex items-center justify-center">
              <Sparkles className="size-4 animate-spin" />
            </div>
            <div>
              <CardTitle className="text-base">Conversational Voice AI Intake</CardTitle>
              <p className="text-xs text-muted-foreground">
                Speak naturally — CareFlow AI extracts symptoms for your physician
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs border-[#06635d]/40 text-[#06635d] dark:text-[#14b8a6]">
            ● {isRecording ? "Recording..." : "Ready"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Waveform Visualizer & Mic Controls */}
        <div className="flex flex-col items-center justify-center p-8 rounded-2xl bg-[#021418]/5 dark:bg-[#021418]/40 border border-[#06635d]/10 relative overflow-hidden">
          {/* Animated Waveform */}
          <div className="flex items-center gap-1.5 h-16 mb-6">
            {waveformAmplitudes.map((amp, idx) => (
              <div
                key={idx}
                className={`w-1.5 rounded-full transition-all duration-300 ${
                  isRecording
                    ? "bg-gradient-to-t from-[#06635d] to-[#14b8a6] animate-wave-bar"
                    : "bg-[#06635d]/20 dark:bg-[#14b8a6]/30 h-3"
                }`}
                style={{
                  height: isRecording ? `${Math.max(12, amp)}px` : "12px",
                  animationDelay: `${idx * 0.1}s`,
                }}
              />
            ))}
          </div>

          {/* Main Recording Button */}
          <div className="relative">
            {isRecording && (
              <div className="absolute -inset-3 rounded-full bg-[#14b8a6]/30 animate-ping" />
            )}
            <Button
              size="lg"
              onClick={isRecording ? stopRecording : startRecording}
              className={`size-20 rounded-full shadow-xl transition-all transform hover:scale-105 ${
                isRecording
                  ? "bg-rose-600 hover:bg-rose-700 text-white"
                  : "bg-gradient-to-tr from-[#06635d] to-[#14b8a6] text-white"
              }`}
            >
              {isRecording ? <MicOff className="size-8" /> : <Mic className="size-8" />}
            </Button>
          </div>

          <p className="text-xs font-semibold mt-4 text-[#06635d] dark:text-[#14b8a6]">
            {isRecording
              ? "Click to stop recording and compile report"
              : "Tap microphone to speak with AI Physician Assistant"}
          </p>
        </div>

        {/* Real-time Conversation Turn Stream */}
        <div className="space-y-3 max-h-64 overflow-y-auto p-3 rounded-xl bg-muted/40 dark:bg-[#11262a]/40 border border-[#e2e8f0] dark:border-[#1e3a40]">
          {turns.map((turn) => (
            <div
              key={turn.id}
              className={`flex gap-3 p-3 rounded-lg text-xs leading-relaxed transition-all ${
                turn.speaker === "PATIENT"
                  ? "bg-white dark:bg-[#0b1f24] border border-[#06635d]/20 ml-6"
                  : "bg-[#06635d]/10 dark:bg-[#14b8a6]/20 border border-[#06635d]/30 mr-6"
              }`}
            >
              <div className="size-6 rounded-full bg-[#06635d] text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                {turn.speaker === "PATIENT" ? "P" : "AI"}
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#06635d] dark:text-[#14b8a6]">
                    {turn.speaker === "PATIENT" ? "You (Patient)" : "CareFlow AI Doctor"}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{turn.timestamp}</span>
                </div>
                <p className="text-foreground font-medium">{turn.textEn}</p>

                {turn.redFlag && (
                  <Badge variant="danger" className="text-[10px] gap-1 mt-1">
                    <AlertTriangle className="size-3" />
                    <span>Red Flag: Radiating Chest Pain</span>
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Extracted HPI Summary Card */}
        {chiefComplaintEn && (
          <div className="p-4 rounded-xl bg-[#06635d]/5 dark:bg-[#14b8a6]/10 border border-[#06635d]/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#06635d] dark:text-[#14b8a6] flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
                Extracted Chief Complaint:
              </span>
              <span className="text-[11px] text-muted-foreground">Confidence: 98.6%</span>
            </div>

            <p className="text-xs font-medium text-foreground italic">"{chiefComplaintEn}"</p>

            {/* Extracted Symptoms Badges */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {associatedSymptoms.map((symp, i) => (
                <Badge key={i} variant="outline" className="text-[11px] bg-white dark:bg-[#0b1f24]">
                  {symp}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="outline" size="sm" onClick={resetSession} className="gap-1 text-xs">
            <RefreshCw className="size-3.5" />
            <span>Reset Intake</span>
          </Button>

          <Button
            size="sm"
            onClick={finalizeSession}
            disabled={isCompleted || turns.length === 0}
            className="gap-1.5 text-xs bg-gradient-to-r from-[#06635d] to-[#14b8a6]"
          >
            <Send className="size-3.5" />
            <span>Submit to Doctor Portal</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
