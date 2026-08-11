import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get("patient_id") || "06ea3b09-2c40-4cdf-8ca1-bbebd6527682";

    // Query step results containing lab data
    const { data: stepResults } = await supabase
      .from("encounter_step_results")
      .select("*, encounters(*)")
      .eq("status", "SUCCESS");

    let labResultsList: any[] = [];

    if (stepResults) {
      stepResults.forEach((sr) => {
        const sData = sr.structured_data;
        if (sData && sData.results && Array.isArray(sData.results)) {
          const encounterDate = sr.created_at ? new Date(sr.created_at).toISOString().split("T")[0] : "2026-08-10";
          sData.results.forEach((item: any, idx: number) => {
            const isHigh = item.flag === "HIGH" || item.flag === "*";
            const isLow = item.flag === "LOW";
            const flagStatus = isHigh ? "HIGH" : isLow ? "LOW" : "NORMAL";

            labResultsList.push({
              id: `${sr.id}-lab-${idx}`,
              encounter_id: sr.encounter_id,
              analyte: item.test_name,
              value: parseFloat(item.result_value) || item.result_value,
              unit: item.unit || "",
              referenceRange: item.reference_range || "Normal",
              flag: flagStatus,
              category: item.test_name.includes("Lymphocytes") || item.test_name.includes("Neutrophils") || item.test_name.includes("White") ? "HEMATOLOGY" : "METABOLIC",
              date: encounterDate,
              notes: item.notes || null,
            });
          });
        }
      });
    }

    return NextResponse.json({
      success: true,
      count: labResultsList.length,
      data: labResultsList,
    });
  } catch (error) {
    console.error("Patient labs API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch patient lab results" },
      { status: 500 }
    );
  }
}
