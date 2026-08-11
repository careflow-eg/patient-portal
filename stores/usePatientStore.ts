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
  patientName: "Bahaa",
  mrn: "MRN-620474",
  age: 30,
  gender: "Male",
  bloodType: "A+",
  allergies: ["Penicillin"],
  vitals: {
    heartRate: 74,
    bloodPressure: "120/80",
    spo2: 98,
    glucoseMgDl: 98,
    glucoseMmolL: 5.4,
    weightKg: 82.5,
    bmi: 25.8,
    lastUpdated: new Date().toISOString(),
  },
  insights: [
    {
      id: "ins-1",
      title: "Neutrophilia & Lymphopenia Flagged",
      category: "METABOLIC",
      summary: "Relative neutrophilia (83%) and lymphopenia (11%) observed in recent CBC. Suggests active inflammatory or viral response.",
      severity: "ATTENTION",
      date: "2026-08-10",
    },
    {
      id: "ins-2",
      title: "Radiology VLM Impression Available",
      category: "PREVENTIVE",
      summary: "Brain MRI demonstrates hyperintense right frontal lobe lesion with surrounding edema. Specialist follow-up recommended.",
      severity: "ATTENTION",
      date: "2026-08-10",
    },
  ],
  labResults: [
    {
      id: "lab-1",
      analyte: "Neutrophils (Relative)",
      value: 83,
      unit: "%",
      referenceRange: "37 – 75 %",
      flag: "HIGH",
      category: "HEMATOLOGY",
      date: "2026-08-10",
    },
    {
      id: "lab-2",
      analyte: "Lymphocytes (Relative)",
      value: 11,
      unit: "%",
      referenceRange: "20 – 45 %",
      flag: "LOW",
      category: "HEMATOLOGY",
      date: "2026-08-10",
    },
    {
      id: "lab-3",
      analyte: "Hemoglobin",
      value: 13.6,
      unit: "g%",
      referenceRange: "13 – 17 g%",
      flag: "NORMAL",
      category: "HEMATOLOGY",
      date: "2026-08-10",
    },
    {
      id: "lab-4",
      analyte: "White cell count",
      value: 8.51,
      unit: "Thousands/cmm",
      referenceRange: "4 – 11",
      flag: "NORMAL",
      category: "HEMATOLOGY",
      date: "2026-08-10",
    },
  ],
  radiologyScans: [
    {
      id: "rad-101",
      modality: "MRI",
      bodyPart: "Brain & Frontal Lobe",
      scanDate: "2026-08-10",
      radiologist: "Dr. Ahmed Hassan, MD",
      vlmImpression: "MRI of the brain demonstrates a large, irregular, hyperintense lesion in the right frontal lobe with mass effect and midline shift.",
      segmentationFindings: "Surrounding edema identified with right-to-left midline displacement.",
      imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
      dicomFileUrl: "/files/scans/brain_mri_pat620474.dcm",
    },
    {
      id: "rad-102",
      modality: "X-RAY",
      bodyPart: "Chest PA View",
      scanDate: "2026-08-10",
      radiologist: "Dr. Ahmed Hassan, MD",
      vlmImpression: "Normal chest X-ray. Lungs clear, heart size normal, no pleural effusion.",
      segmentationFindings: "Mediastinum unremarkable, cardiothoracic ratio normal.",
      imageUrl: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80",
      dicomFileUrl: "/files/scans/chest_xray_pat620474.dcm",
    },
  ],
  archives: [
    {
      id: "arc-1",
      documentTitle: "Hospital Visit Summary & History Intake",
      documentType: "DISCHARGE_SUMMARY",
      uploadDate: "2026-08-10",
      fileSizeMb: 2.1,
      fileUrl: "/files/docs/visit_summary_aug2026.pdf",
      uploadedBy: "CareFlow Clinical Network",
    },
    {
      id: "arc-2",
      documentTitle: "Complete Blood Count & Lab OCR Panel",
      documentType: "LAB_PDF",
      uploadDate: "2026-08-10",
      fileSizeMb: 1.4,
      fileUrl: "/files/docs/cbc_lab_panel.pdf",
      uploadedBy: "CareFlow Central Diagnostics",
    },
  ],
  prescriptions: [
    {
      id: "rx-1",
      medicationName: "Ibuprofen",
      dosage: "400 mg",
      frequency: "Every 8 hours as needed",
      prescribedBy: "Dr. Sarah Al-Sayed",
      startDate: "2026-08-10",
      endDate: "2026-08-17",
      refillAvailable: true,
      instructions: "Take with food to minimize stomach upset.",
    },
  ],
  historyEncounters: [
    {
      id: "enc-101",
      date: "2026-08-10",
      doctorName: "Dr. Sarah Al-Sayed",
      specialty: "Internal Medicine",
      chiefComplaint: "Lethargy, loss of energy, and frontal headache",
      voiceTranscriptEn: "Patient reports severe exhaustion, hypersomnia, and continuous low-energy state for two weeks.",
      diagnosisSummary: "Neutrophilia with absolute lymphopenia; MRI brain demonstrates right frontal lesion requiring neurosurgical review.",
      status: "COMPLETED",
    },
  ],
  isLoading: false,
  fetchLivePatientData: async () => {
    set({ isLoading: true });
    try {
      const [profileRes, encRes, labsRes, radRes] = await Promise.all([
        fetch("/api/patient/me").then((r) => r.json()).catch(() => null),
        fetch("/api/patient/encounters").then((r) => r.json()).catch(() => null),
        fetch("/api/patient/labs").then((r) => r.json()).catch(() => null),
        fetch("/api/patient/radiology").then((r) => r.json()).catch(() => null),
      ]);

      const updates: Partial<PatientStore> = { isLoading: false };

      if (profileRes?.data) {
        updates.patientName = profileRes.data.full_name || "Bahaa";
        updates.mrn = profileRes.data.mrn || "MRN-620474";
        updates.age = profileRes.data.age || 30;
        updates.gender = profileRes.data.gender || "Male";
      }

      if (encRes?.data && Array.isArray(encRes.data) && encRes.data.length > 0) {
        updates.historyEncounters = encRes.data.map((e: any) => ({
          id: e.id,
          date: e.date,
          doctorName: e.doctor_name,
          specialty: "Internal Medicine",
          chiefComplaint: e.chief_complaint,
          voiceTranscriptEn: e.history_summary?.summary || "Arabic voice history completed with automated clinical transcript.",
          diagnosisSummary: e.clinical_impression,
          status: "COMPLETED" as const,
        }));
      }

      if (labsRes?.data && Array.isArray(labsRes.data) && labsRes.data.length > 0) {
        updates.labResults = labsRes.data;
      }

      if (radRes?.data && Array.isArray(radRes.data) && radRes.data.length > 0) {
        updates.radiologyScans = radRes.data;
      }

      set(updates);
    } catch (err) {
      console.error("Failed to load live patient data:", err);
      set({ isLoading: false });
    }
  },
}));
