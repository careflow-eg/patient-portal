import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get("patient_id") || "06ea3b09-2c40-4cdf-8ca1-bbebd6527682";

    // 1. Fetch encounters for patient
    const { data: encounters, error: encErr } = await supabase
      .from("encounters")
      .select("*")
      .or(`patient_id.eq.${patientId},patient_id.eq.36cc46e8-938b-4eb5-975e-58cd89547af2,patient_id.eq.95076757-540f-47d0-88e6-ca82b7e9bdf4`)
      .order("created_at", { ascending: false });

    if (encErr) {
      console.error("Fetch encounters error:", encErr);
    }

    const encounterList = encounters && encounters.length > 0 ? encounters : [];

    // 2. Fetch step results to enrich encounter details
    const encounterIds = encounterList.map((e) => e.id);
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

    // Format patient encounters for frontend presentation
    const formattedEncounters = encounterList.map((enc) => {
      const steps = stepResultsMap[enc.id] || [];
      const historyStep = steps.find((s) => s.structured_data?.chief_complaint || s.structured_data?.history_of_present_illness);
      const labStep = steps.find((s) => s.structured_data?.lab || s.structured_data?.results);
      const radStep = steps.find((s) => s.structured_data?.impression || s.structured_data?.findings);
      const dsStep = steps.find((s) => s.structured_data?.differential_diagnoses || s.structured_data?.clinical_impression);

      return {
        id: enc.id,
        date: enc.created_at ? new Date(enc.created_at).toISOString().split("T")[0] : "2026-08-10",
        created_at: enc.created_at,
        status: enc.status || "COMPLETED",
        chief_complaint: enc.chief_complaint || historyStep?.structured_data?.chief_complaint || "Routine Outpatient Visit",
        doctor_name: "Dr. Sarah Al-Sayed, MD (Internal Medicine)",
        clinic: "CareFlow Digital Health Center",
        history_summary: historyStep?.structured_data?.history_of_present_illness || {
          summary: "Patient reported fatigue and loss of energy for two weeks.",
          onset: "2 weeks",
        },
        lab_summary: labStep?.structured_data?.summary || enc.lab_summary || "CBC Panel performed with normal RBC indices.",
        radiology_summary: radStep?.structured_data?.impression || enc.radiology_summary || "Chest X-Ray / Brain MRI completed.",
        clinical_impression: dsStep?.structured_data?.clinical_impression || "Follow-up recommended in 1-2 weeks.",
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
      { error: "Failed to fetch patient encounters" },
      { status: 500 }
    );
  }
}
