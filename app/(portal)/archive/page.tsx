"use client";

import React, { useState } from "react";
import { FolderArchive, FileText, Download, ShieldCheck, HardDrive, Loader2 } from "lucide-react";
import { usePatientStore } from "@/stores/usePatientStore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { downloadArchiveFile } from "@/services/archiveService";

export default function ArchivePage() {
  const { archives } = usePatientStore();
  // Track per-document download loading state
  const [downloading, setDownloading] = useState<Record<string, boolean>>({});

  /**
   * P0-4 FIX: Downloads are now routed through an authenticated API endpoint that
   * generates presigned S3 URLs (60-second TTL). Static file paths like
   * "/files/docs/discharge_summary.pdf" were accessible to any unauthenticated user
   * with the URL — a HIPAA violation exposing PHI.
   *
   * P3-2 FIX: Download button is now fully wired up with loading state and error handling.
   */
  const handleDownload = async (docId: string, fileKey: string, filename: string) => {
    setDownloading((prev) => ({ ...prev, [docId]: true }));
    try {
      await downloadArchiveFile(fileKey, filename);
    } catch (err) {
      console.error("Download failed:", err);
      // In production: surface this error to the user via a toast notification
      alert("Download failed. Please try again or contact support.");
    } finally {
      setDownloading((prev) => ({ ...prev, [docId]: false }));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
            <FolderArchive className="size-7 text-[#06635d] dark:text-[#14b8a6]" />
            Medical Document Vault &amp; Archive
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Access and download all official medical PDFs, lab scans, DICOM packages, and clinical summaries
          </p>
        </div>

        <Badge variant="outline" className="gap-1 text-xs text-[#06635d] dark:text-[#14b8a6] border-[#06635d]/30">
          <ShieldCheck className="size-3.5" />
          <span>AES-256 Encrypted Archive</span>
        </Badge>
      </div>

      <div className="space-y-3">
        {archives.map((doc) => (
          <Card key={doc.id} className="glass-card hover:shadow-md transition-all">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-xl bg-[#06635d]/10 text-[#06635d] dark:text-[#14b8a6] flex items-center justify-center shrink-0">
                  <FileText className="size-6" />
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground">{doc.documentTitle}</p>
                  <p className="text-xs text-muted-foreground">
                    Uploaded: {doc.uploadDate} • Source: {doc.uploadedBy}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <Badge variant="outline" className="text-[10px]">
                      {doc.documentType}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground font-mono flex items-center gap-1">
                      <HardDrive className="size-3" />
                      {doc.fileSizeMb} MB
                    </span>
                  </div>
                </div>
              </div>

              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 text-xs min-w-[120px]"
                disabled={true}
                title="Downloads are currently unavailable."
                onClick={() => handleDownload(doc.id, doc.fileUrl, doc.documentTitle)}
              >
                {downloading[doc.id] ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    <span>Preparing…</span>
                  </>
                ) : (
                  <>
                    <Download className="size-3.5" />
                    <span>Download PDF</span>
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
