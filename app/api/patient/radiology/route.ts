import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get("patient_id") || "06ea3b09-2c40-4cdf-8ca1-bbebd6527682";

    // 1. Get encounter IDs for patient
    const { data: patientEncounters } = await supabase
      .from("encounters")
      .select("id")
      .eq("patient_id", patientId);

    const encounterIds = (patientEncounters || []).map((e) => e.id);

    if (encounterIds.length === 0) {
      return NextResponse.json({ success: true, count: 0, data: [] });
    }

    // 2. Query real step results and artifacts for these encounters
    const [stepResultsRes, artifactsRes] = await Promise.all([
      supabase
        .from("encounter_step_results")
        .select("*")
        .in("encounter_id", encounterIds)
        .eq("status", "SUCCESS"),
      supabase
        .from("encounter_artifacts")
        .select("*")
        .in("encounter_id", encounterIds)
        .eq("artifact_type", "RADIOLOGY_IMAGE"),
    ]);

    const stepResults = stepResultsRes.data || [];
    const artifacts = artifactsRes.data || [];

    const artifactsByEncounter: Record<string, any> = {};
    artifacts.forEach((art) => {
      artifactsByEncounter[art.encounter_id] = art;
    });

    let radiologyScans: any[] = [];

    stepResults.forEach((sr) => {
      const sData = sr.structured_data;
      if (sData && (sData.modality || sData.impression || sData.findings)) {
        const scanDate = sr.created_at ? new Date(sr.created_at).toISOString().split("T")[0] : "";
        const artifact = artifactsByEncounter[sr.encounter_id];

        radiologyScans.push({
          id: sr.id,
          encounter_id: sr.encounter_id,
          modality: sData.modality || "X-RAY",
          bodyPart: sData.body_part || "Diagnostic Region",
          scanDate: scanDate,
          radiologist: "Diagnostic Radiologist",
          vlmImpression: sData.impression || sData.insight || "Radiology findings archived.",
          segmentationFindings: Array.isArray(sData.findings) ? sData.findings.join("; ") : "No acute abnormality detected.",
          imageUrl: artifact?.file_url || artifact?.storage_path ? `https://coumyxguoznbhrivlxnw.supabase.co/storage/v1/object/public/media/${artifact.storage_path}` : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23111827'/%3E%3Ctext x='400' y='300' font-family='sans-serif' font-size='16' fill='%2314b8a6' text-anchor='middle'%3EDICOM Scan Archived in Database%3C/text%3E%3C/svg%3E",
          dicomFileUrl: artifact?.file_url || null,
        });
      }
    });

    return NextResponse.json({
      success: true,
      count: radiologyScans.length,
      data: radiologyScans,
    });
  } catch (error) {
    console.error("Patient radiology API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch patient radiology scans from database" },
      { status: 500 }
    );
  }
}
