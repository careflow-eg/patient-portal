import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, full_name, national_id, phone_number, mrn } = body;

    if (!email || !full_name) {
      return NextResponse.json(
        { error: "Email and Full Name are required" },
        { status: 400 }
      );
    }

    // Check if account exists
    const { data: existing } = await supabase
      .from("patient_accounts")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "A patient account with this email already exists" },
        { status: 400 }
      );
    }

    // Link to existing patient by MRN or create new patient record
    let patientId = null;
    if (mrn) {
      const { data: pat } = await supabase
        .from("patients")
        .select("id")
        .eq("mrn", mrn)
        .single();
      if (pat) patientId = pat.id;
    }

    if (!patientId) {
      const newMrn = mrn || `MRN-${Math.floor(100000 + Math.random() * 900000)}`;
      const { data: newPat, error: patErr } = await supabase
        .from("patients")
        .insert([
          {
            mrn: newMrn,
            full_name: full_name,
            age: 30,
            gender: "Male",
            contact_number: phone_number || "",
          },
        ])
        .select("id")
        .single();

      if (newPat) {
        patientId = newPat.id;
      }
    }

    const userId = `usr-pat-${Date.now()}`;
    const accountId = `pat-acc-${Date.now()}`;

    // Create user and patient account
    await supabase.from("users").insert([
      {
        id: userId,
        email,
        hashed_password: password || "hashed_pass",
        full_name,
        role: "PATIENT",
        is_active: true,
        patient_id: patientId,
      },
    ]);

    const { data: newAcc, error: accErr } = await supabase
      .from("patient_accounts")
      .insert([
        {
          id: accountId,
          patient_id: patientId,
          user_id: userId,
          email,
          hashed_password: password || "hashed_pass",
          full_name,
          national_id: national_id || null,
          phone_number: phone_number || null,
          is_verified: true,
          is_active: true,
        },
      ])
      .select("*")
      .single();

    if (accErr) {
      return NextResponse.json(
        { error: accErr.message || "Failed to create patient account" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Patient account registered successfully",
      data: newAcc,
    });
  } catch (error) {
    console.error("Patient register error:", error);
    return NextResponse.json(
      { error: "Internal server error during registration" },
      { status: 500 }
    );
  }
}
