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
}

export const usePatientStore = create<PatientStore>(() => ({
  patientName: "Ahmed Hassan",
  mrn: "PAT-2026-8841",
  age: 48,
  gender: "Male",
  bloodType: "A+",
  allergies: ["Penicillin", "Sulfa Drugs"],
  vitals: {
    heartRate: 74,
    bloodPressure: "120/80",
    spo2: 98,
    glucoseMgDl: 98,
    glucoseMmolL: 5.4,
    weightKg: 82.5,
    bmi: 25.8,
    lastUpdated: "2026-07-25T14:30:00Z",
  },
  insights: [
    {
      id: "ins-1",
      title: "Glycemic Stability Maintained",
      category: "METABOLIC",
      summary: "Fasting blood glucose levels are currently optimal at 5.4 mmol/L (98 mg/dL). Continue current dietary protocol.",
      severity: "NORMAL",
      date: "2026-07-25",
    },
    {
      id: "ins-2",
      title: "Lipid Profile Monitoring Required",
      category: "CARDIOVASCULAR",
      summary: "Total cholesterol is slightly elevated at 5.8 mmol/L. Statin therapy dosage will be re-evaluated during your next visit.",
      severity: "ATTENTION",
      date: "2026-07-20",
    },
  ],
  labResults: [
    {
      id: "lab-1",
      analyte: "Fasting Blood Glucose",
      value: 5.4,
      unit: "mmol/L",
      referenceRange: "3.9 – 5.6 mmol/L",
      flag: "NORMAL",
      category: "METABOLIC",
      date: "2026-07-20",
    },
    {
      id: "lab-2",
      analyte: "Serum Creatinine",
      value: 88.4,
      unit: "μmol/L",
      referenceRange: "62 – 115 μmol/L",
      flag: "NORMAL",
      category: "RENAL",
      date: "2026-07-20",
    },
    {
      id: "lab-3",
      analyte: "Total Cholesterol",
      value: 5.8,
      unit: "mmol/L",
      referenceRange: "< 5.2 mmol/L",
      flag: "HIGH",
      category: "LIPID",
      date: "2026-07-20",
    },
    {
      id: "lab-4",
      analyte: "Hemoglobin A1c",
      value: 6.8,
      unit: "%",
      referenceRange: "< 5.7 %",
      flag: "HIGH",
      category: "METABOLIC",
      date: "2026-07-20",
    },
  ],
  radiologyScans: [
    {
      id: "rad-101",
      modality: "X-RAY",
      bodyPart: "Chest (PA & Lateral Views)",
      scanDate: "2026-07-21",
      radiologist: "Dr. Tarek El-Mansoury",
      vlmImpression: "MedGemma VLM Analysis: Mild bilateral basalar peribronchial thickening without focal consolidation. Cardiac silhouette is within normal limits.",
      segmentationFindings: "MedSAM 2.0 ROI Analysis: Lung fields 98.2% clear, cardiothoracic ratio (CTR) = 0.46 (Normal < 0.50).",
      imageUrl: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800",
      dicomFileUrl: "/files/scans/chest_xray_pat8841.dcm",
    },
  ],
  archives: [
    {
      id: "arc-1",
      documentTitle: "Hospital Discharge Summary & Cardiac Evaluation",
      documentType: "DISCHARGE_SUMMARY",
      uploadDate: "2026-07-22",
      fileSizeMb: 3.4,
      fileUrl: "/files/docs/discharge_summary_july2026.pdf",
      uploadedBy: "Cairo Medical Center Archive",
    },
    {
      id: "arc-2",
      documentTitle: "Comprehensive Metabolic & Lipid Panel PDF",
      documentType: "LAB_PDF",
      uploadDate: "2026-07-20",
      fileSizeMb: 1.8,
      fileUrl: "/files/docs/lab_panel_july2026.pdf",
      uploadedBy: "Central Labs Cairo",
    },
    {
      id: "arc-3",
      documentTitle: "Chest X-Ray DICOM Study Package",
      documentType: "DICOM_ZIP",
      uploadDate: "2026-07-21",
      fileSizeMb: 24.6,
      fileUrl: "/files/docs/chest_xray_dicom.zip",
      uploadedBy: "Radiology Dept",
    },
  ],
  prescriptions: [
    {
      id: "rx-1",
      medicationName: "Atorvastatin (Lipitor)",
      dosage: "20 mg",
      frequency: "Once daily at bedtime",
      prescribedBy: "Dr. Tarek El-Mansoury",
      startDate: "2026-06-15",
      endDate: "2026-09-15",
      refillAvailable: true,
      instructions: "Take with or without food. Avoid grapefruit juice.",
    },
    {
      id: "rx-2",
      medicationName: "Metformin ER",
      dosage: "500 mg",
      frequency: "Twice daily with meals",
      prescribedBy: "Dr. Mona Abdel-Aziz",
      startDate: "2026-05-10",
      endDate: "2026-08-10",
      refillAvailable: true,
      instructions: "Take with meals to reduce gastrointestinal upset.",
    },
  ],
  historyEncounters: [
    {
      id: "enc-101",
      date: "2026-07-20",
      doctorName: "Dr. Tarek El-Mansoury",
      specialty: "Cardiology",
      chiefComplaint: "Retrosternal chest tightness radiating to left arm with exertional dyspnea",
      voiceTranscriptEn: "Patient reported severe chest pain radiating to left shoulder with shortness of breath for 2 hours.",
      diagnosisSummary: "Stable Angina Pectoris; Coronary Artery Disease risk evaluation completed",
      status: "COMPLETED",
    },
  ],
}));
