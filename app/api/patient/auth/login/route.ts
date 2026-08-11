import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Query patient account by email
    const { data: account, error: accError } = await supabase
      .from("patient_accounts")
      .select("*, patients(*)")
      .eq("email", email)
      .single();

    if (accError || !account) {
      return NextResponse.json(
        { error: "Invalid patient account credentials" },
        { status: 401 }
      );
    }

    // Prepare patient session data
    const patientData = account.patients || {
      id: account.patient_id,
      full_name: account.full_name,
      mrn: "MRN-PATIENT",
      age: 30,
      gender: "Male",
      contact_number: account.phone_number || "",
    };

    const token = `pat_jwt_${account.id}_${Date.now()}`;

    return NextResponse.json({
      success: true,
      access_token: token,
      token_type: "bearer",
      user: {
        id: account.id,
        email: account.email,
        full_name: account.full_name,
        role: "PATIENT",
        patient_id: account.patient_id,
        patient: patientData,
      },
    });
  } catch (error) {
    console.error("Patient login error:", error);
    return NextResponse.json(
      { error: "Internal server error during patient authentication" },
      { status: 500 }
    );
  }
}
