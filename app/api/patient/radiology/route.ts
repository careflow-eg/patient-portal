import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Query step results for radiology
    const { data: stepResults } = await supabase
      .from("encounter_step_results")
      .select("*, encounters(*)")
      .eq("status", "SUCCESS");

    let radiologyScans: any[] = [];

    if (stepResults) {
      stepResults.forEach((sr) => {
        const sData = sr.structured_data;
        if (sData && (sData.modality || sData.impression || sData.findings)) {
          const scanDate = sr.created_at ? new Date(sr.created_at).toISOString().split("T")[0] : "2026-08-10";
          radiologyScans.push({
            id: sr.id,
            encounter_id: sr.encounter_id,
            modality: sData.modality || "X-RAY",
            bodyPart: sData.body_part || "Chest",
            scanDate: scanDate,
            radiologist: "Dr. Ahmed Hassan, MD (Diagnostic Radiology)",
            vlmImpression: sData.impression || sData.insight || "No significant acute cardiopulmonary abnormality.",
            segmentationFindings: Array.isArray(sData.findings) ? sData.findings.join("; ") : "Lungs are clear. Heart size normal.",
            imageUrl: sData.modality === "MRI" 
              ? "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80" 
              : "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80",
          });
        }
      });
    }

    return NextResponse.json({
      success: true,
      count: radiologyScans.length,
      data: radiologyScans,
    });
  } catch (error) {
    console.error("Patient radiology API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch patient radiology scans" },
      { status: 500 }
    );
  }
}
