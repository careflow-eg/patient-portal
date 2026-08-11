import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get("patient_id") || "06ea3b09-2c40-4cdf-8ca1-bbebd6527682";

    // 1. Fetch real encounters for patient
    const { data: encounters, error: encErr } = await supabase
      .from("encounters")
      .select("*")
      .eq("patient_id", patientId)
      .order("created_at", { ascending: false });

    if (encErr) {
      console.error("Fetch encounters database error:", encErr);
      return NextResponse.json({ error: encErr.message }, { status: 500 });
    }

    const encounterList = encounters || [];
    const encounterIds = encounterList.map((e) => e.id);

    // 2. Fetch real step results for these encounters
    let stepResultsMap: Record<string, any[]> = {};
    if (encounterIds.length > 0) {
      const { data: stepResults } = await supabase
        .from("encounter_step_results")
        .select("*")
        .in("encounter_id", encounterIds);

      if (stepResults) {
        stepResults.forEach((sr) => {
          if (!stepResultsMap[sr.encounter_id]) {
            stepResultsMap[sr.encounter_id] = [];
          }
          stepResultsMap[sr.encounter_id].push(sr);
        });
      }
    }

    // Format real encounter data from database
    const formattedEncounters = encounterList.map((enc) => {
      const steps = stepResultsMap[enc.id] || [];
      const historyStep = steps.find((s) => s.structured_data?.chief_complaint || s.structured_data?.history_of_present_illness);
      const labStep = steps.find((s) => s.structured_data?.lab || s.structured_data?.results);
      const radStep = steps.find((s) => s.structured_data?.impression || s.structured_data?.findings);
      const dsStep = steps.find((s) => s.structured_data?.differential_diagnoses || s.structured_data?.clinical_impression);

      const hpiObj = historyStep?.structured_data?.history_of_present_illness;
      const hpiSummary = typeof hpiObj === "object" && hpiObj !== null
        ? `${hpiObj.character || ""} ${hpiObj.location || ""} ${hpiObj.associated_symptoms ? "Symptoms: " + hpiObj.associated_symptoms.join(", ") : ""}`.trim()
        : "Complete medical history interview archived.";

      return {
        id: enc.id,
        date: enc.created_at ? new Date(enc.created_at).toISOString().split("T")[0] : "",
        created_at: enc.created_at,
        status: enc.status || "COMPLETED",
        chief_complaint: enc.chief_complaint && enc.chief_complaint !== "string" ? enc.chief_complaint : historyStep?.structured_data?.chief_complaint || "Medical Encounter",
        doctor_name: enc.doctor_id ? `Doctor ID: ${enc.doctor_id}` : "Attending Physician",
        specialty: "Clinical Specialist",
        history_summary: {
          summary: hpiSummary || "History intake stored in database.",
        },
        lab_summary: labStep?.structured_data?.summary || enc.lab_summary || null,
        radiology_summary: radStep?.structured_data?.impression || enc.radiology_summary || null,
        clinical_impression: dsStep?.structured_data?.clinical_impression || "Clinical evaluation completed.",
        differential_diagnoses: dsStep?.structured_data?.differential_diagnoses || [],
      };
    });

    return NextResponse.json({
      success: true,
      count: formattedEncounters.length,
      data: formattedEncounters,
    });
  } catch (error) {
    console.error("Patient encounters API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch patient encounters from database" },
      { status: 500 }
    );
  }
}
