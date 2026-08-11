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

    // 2. Query real artifacts from encounter_artifacts table
    const { data: artifacts, error: artErr } = await supabase
      .from("encounter_artifacts")
      .select("*")
      .in("encounter_id", encounterIds)
      .order("created_at", { ascending: false });

    if (artErr) {
      console.error("Fetch artifacts error:", artErr);
      return NextResponse.json({ error: artErr.message }, { status: 500 });
    }

    const archiveItems = (artifacts || []).map((art) => ({
      id: art.id,
      documentTitle: art.filename || "Clinical Document",
      documentType: art.artifact_type || "CLINICAL_NOTE",
      uploadDate: art.created_at ? new Date(art.created_at).toISOString().split("T")[0] : "",
      fileSizeMb: art.file_size_bytes ? parseFloat((art.file_size_bytes / (1024 * 1024)).toFixed(2)) : 0.5,
      fileUrl: art.file_url || art.storage_path || "#",
      uploadedBy: "CareFlow Clinical Network",
    }));

    return NextResponse.json({
      success: true,
      count: archiveItems.length,
      data: archiveItems,
    });
  } catch (error) {
    console.error("Patient archives API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch patient archives from database" },
      { status: 500 }
    );
  }
}
