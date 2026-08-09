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
  setPatientData: (data: Partial<PatientStore>) => void;
}

export const usePatientStore = create<PatientStore>((set) => ({
  patientName: "",
  mrn: "",
  age: 0,
  gender: "",
  bloodType: "",
  allergies: [],
  vitals: {
    heartRate: 0,
    bloodPressure: "",
    spo2: 0,
    glucoseMgDl: 0,
    glucoseMmolL: 0,
    weightKg: 0,
    bmi: 0,
    lastUpdated: new Date().toISOString(),
  },
  insights: [],
  labResults: [],
  radiologyScans: [],
  archives: [],
  prescriptions: [],
  historyEncounters: [],
  setPatientData: (data) => set((state) => ({ ...state, ...data })),
}));
