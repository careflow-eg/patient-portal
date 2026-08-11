import { create } from "zustand";

export interface VitalsSummary {
  heartRate: number;
  bloodPressure: string;
  spo2: number;
  glucoseMgDl: number;
  glucoseMmolL: number;
  weightKg: number;
  bmi: number;
  lastUpdated: string;
}

export interface HealthInsight {
  id: string;
  title: string;
  category: "CARDIOVASCULAR" | "METABOLIC" | "PREVENTIVE";
  summary: string;
  severity: "INFO" | "ATTENTION" | "NORMAL";
  date: string;
}

export interface LabResultItem {
  id: string;
  analyte: string;
  value: number;
  unit: string;
  referenceRange: string;
  flag: "NORMAL" | "HIGH" | "LOW";
  category: "METABOLIC" | "LIPID" | "RENAL" | "HEMATOLOGY";
  date: string;
  sourceDocumentUrl?: string;
}

export interface RadiologyScanItem {
  id: string;
  modality: "X-RAY" | "CT" | "MRI" | "ULTRASOUND";
  bodyPart: string;
  scanDate: string;
  radiologist: string;
  vlmImpression: string;
  segmentationFindings: string;
  imageUrl: string;
  dicomFileUrl?: string;
}

export interface MedicalArchiveItem {
  id: string;
  documentTitle: string;
  documentType: "DISCHARGE_SUMMARY" | "LAB_PDF" | "DICOM_ZIP" | "PRESCRIPTION_SCAN" | "CLINICAL_NOTE";
  uploadDate: string;
  fileSizeMb: number;
  fileUrl: string;
  uploadedBy: string;
}

export interface PrescriptionItem {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  prescribedBy: string;
  startDate: string;
  endDate: string;
  refillAvailable: boolean;
  instructions: string;
}

export interface MedicalHistoryEncounter {
  id: string;
  date: string;
  doctorName: string;
  specialty: string;
  chiefComplaint: string;
  voiceTranscriptEn: string;
  diagnosisSummary: string;
  status: "COMPLETED";
}

interface PatientStore {
  patientName: string;
  mrn: string;
  age: number;
  gender: string;
  bloodType: string;
  allergies: string[];
  vitals: VitalsSummary;
  insights: HealthInsight[];
  labResults: LabResultItem[];
  radiologyScans: RadiologyScanItem[];
  archives: MedicalArchiveItem[];
  prescriptions: PrescriptionItem[];
  historyEncounters: MedicalHistoryEncounter[];
  isLoading: boolean;
  fetchLivePatientData: () => Promise<void>;
}

export const usePatientStore = create<PatientStore>((set) => ({
  patientName: "",
  mrn: "",
  age: 0,
  gender: "",
  bloodType: "Unknown",
  allergies: [],
  vitals: {
    heartRate: 74,
    bloodPressure: "120/80",
    spo2: 98,
    glucoseMgDl: 98,
    glucoseMmolL: 5.4,
    weightKg: 70,
    bmi: 22.5,
    lastUpdated: new Date().toISOString(),
  },
  insights: [],
  labResults: [],
  radiologyScans: [],
  archives: [],
  prescriptions: [],
  historyEncounters: [],
  isLoading: false,
  fetchLivePatientData: async () => {
    set({ isLoading: true });
    try {
      const [profileRes, encRes, labsRes, radRes, arcRes] = await Promise.all([
        fetch("/api/patient/me").then((r) => r.json()).catch(() => null),
        fetch("/api/patient/encounters").then((r) => r.json()).catch(() => null),
        fetch("/api/patient/labs").then((r) => r.json()).catch(() => null),
        fetch("/api/patient/radiology").then((r) => r.json()).catch(() => null),
        fetch("/api/patient/archives").then((r) => r.json()).catch(() => null),
      ]);

      const updates: Partial<PatientStore> = { isLoading: false };

      if (profileRes?.data) {
        updates.patientName = profileRes.data.full_name || "Patient";
        updates.mrn = profileRes.data.mrn || "";
        updates.age = profileRes.data.age || 0;
        updates.gender = profileRes.data.gender || "";
      }

      if (encRes?.data && Array.isArray(encRes.data)) {
        updates.historyEncounters = encRes.data.map((e: any) => ({
          id: e.id,
          date: e.date,
          doctorName: e.doctor_name,
          specialty: e.specialty || "Clinical Medicine",
          chiefComplaint: e.chief_complaint,
          voiceTranscriptEn: e.history_summary?.summary || "Voice history interview archived.",
          diagnosisSummary: e.clinical_impression,
          status: "COMPLETED" as const,
        }));
      }

      if (labsRes?.data && Array.isArray(labsRes.data)) {
        updates.labResults = labsRes.data;

        // Build insights dynamically from real lab flags
        const highOrLowLabs = labsRes.data.filter((l: any) => l.flag === "HIGH" || l.flag === "LOW");
        if (highOrLowLabs.length > 0) {
          updates.insights = highOrLowLabs.map((l: any, idx: number) => ({
            id: `ins-db-${idx}`,
            title: `Abnormal Finding: ${l.analyte}`,
            category: "METABOLIC" as const,
            summary: `Laboratory value ${l.value} ${l.unit} flagged as ${l.flag} (Reference: ${l.referenceRange}).`,
            severity: "ATTENTION" as const,
            date: l.date || new Date().toISOString().split("T")[0],
          }));
        }
      }

      if (radRes?.data && Array.isArray(radRes.data)) {
        updates.radiologyScans = radRes.data;
      }

      if (arcRes?.data && Array.isArray(arcRes.data)) {
        updates.archives = arcRes.data;
      }

      set(updates);
    } catch (err) {
      console.error("Failed to load live patient database records:", err);
      set({ isLoading: false });
    }
  },
}));
