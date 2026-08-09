import { NextResponse } from 'next/server';

export async function GET() {
  const mockPatientData = {
    patientName: "Ahmed Hassan",
    mrn: "MRN-8472910",
    age: 45,
    gender: "Male",
    bloodType: "O+",
    allergies: ["Penicillin", "Peanuts"],
    vitals: {
      heartRate: 72,
      bloodPressure: "120/80",
      spo2: 98,
      glucoseMgDl: 95,
      glucoseMmolL: 5.3,
      weightKg: 78,
      bmi: 24.1,
      lastUpdated: new Date().toISOString(),
    },
    insights: [],
    labResults: [],
    radiologyScans: [],
    archives: [],
    prescriptions: [],
    historyEncounters: []
  };

  return NextResponse.json(mockPatientData, { status: 200 });
}
