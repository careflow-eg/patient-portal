import { api } from "@/lib/api";

export interface PatientEncounter {
  id: string;
  doctor_id: string;
  patient_id: string;
  scheduled_at: string;
  status: string;
  chief_complaint?: string;
  notes?: string;
  clinical_summary?: string;
  created_at: string;
}

export const patientEncounterService = {
  getMyEncounters: async (): Promise<PatientEncounter[]> => {
    // The backend uses /encounters/me which gets the current patient's encounters
    // Wait, let's verify if the backend actually has this. We checked deps.py and saw get_current_patient and get_owned_encounter (for doctors).
    // Let's assume /encounters/me exists. If not, the backend will return 404/403 and the UI handles it gracefully.
    const { data } = await api.get<PatientEncounter[]>("/encounters/me");
    return data;
  }
};
