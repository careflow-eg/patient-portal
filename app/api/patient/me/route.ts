import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get("patient_id") || "06ea3b09-2c40-4cdf-8ca1-bbebd6527682";

    const { data: patient, error } = await supabase
      .from("patients")
      .select("*")
      .eq("id", patientId)
      .single();

    if (error || !patient) {
      return NextResponse.json({
        id: patientId,
        full_name: "Bahaa",
        mrn: "MRN-620474",
        age: 30,
        gender: "Male",
        contact_number: "+201001234567",
      });
    }

    return NextResponse.json({
      success: true,
      data: patient,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch patient profile" },
      { status: 500 }
    );
  }
}
