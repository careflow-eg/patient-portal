/**
 * Archive Service — Secure Document Downloads
 *
 * P0-4 FIX: Patient medical documents (discharge summaries, lab PDFs, DICOM packages)
 * must NEVER be served from unauthenticated static paths. This service routes download
 * requests through the authenticated API endpoint which generates presigned S3 URLs
 * with a 60-second TTL, ensuring only the authenticated patient can access their files.
 *
 * Previously: <a href="/files/docs/discharge_summary_july2026.pdf"> (HIPAA violation)
 * Now:         fetch('/api/patient/archive/download?key=...') → presigned URL (60s TTL)
 */

export async function getSecureDownloadUrl(fileKey: string): Promise<string> {
  const res = await fetch(
    `/api/patient/archive/download?key=${encodeURIComponent(fileKey)}`,
    {
      method: "GET",
      credentials: "include", // send session cookie / JWT
    }
  );

  if (!res.ok) {
    const msg = await res.text().catch(() => "Unknown error");
    throw new Error(`Failed to generate download URL: ${res.status} ${msg}`);
  }

  const data = await res.json();
  if (!data.url) {
    throw new Error("Server did not return a download URL");
  }
  return data.url;
}

/**
 * Trigger a secure file download by fetching a presigned URL and opening it.
 * Shows the browser's native Save dialog via a temporary anchor element.
 */
export async function downloadArchiveFile(
  fileKey: string,
  filename: string
): Promise<void> {
  const url = await getSecureDownloadUrl(fileKey);

  // Open presigned URL in new tab — respects browser download settings
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
