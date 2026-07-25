import { create } from "zustand";

export interface ConversationTurn {
  id: string;
  speaker: "PATIENT" | "CAREFLOW_AI";
  textAr: string;
  textEn: string;
  timestamp: string;
  redFlag?: boolean;
}

interface VoiceIntakeStore {
  isRecording: boolean;
  isProcessing: boolean;
  isCompleted: boolean;
  waveformAmplitudes: number[];
  turns: ConversationTurn[];
  chiefComplaintAr: string;
  chiefComplaintEn: string;
  associatedSymptoms: string[];
  durationSeconds: number;
  startRecording: () => void;
  stopRecording: () => void;
  addTurn: (turn: Omit<ConversationTurn, "id" | "timestamp">) => void;
  finalizeSession: () => void;
  resetSession: () => void;
}

export const useVoiceIntakeStore = create<VoiceIntakeStore>((set, get) => ({
  isRecording: false,
  isProcessing: false,
  isCompleted: false,
  waveformAmplitudes: [12, 24, 38, 45, 20, 15, 52, 30, 40, 18, 25, 35],
  turns: [
    {
      id: "turn-1",
      speaker: "CAREFLOW_AI",
      textAr: "أهلاً بك في كيرفلو. سلامتك! احكي لي حاسس بإيه النهاردة؟",
      textEn: "Welcome to CareFlow. Get well soon! Tell me how you are feeling today?",
      timestamp: "10:30 AM",
    },
    {
      id: "turn-2",
      speaker: "PATIENT",
      textAr: "حاسس بوجع جامد في صدري وبيسمع في كتفي الشمال ونازل عرق بارد من ساعتين",
      textEn: "I feel severe pain in my chest radiating to my left shoulder with cold sweating for two hours.",
      timestamp: "10:31 AM",
      redFlag: true,
    },
    {
      id: "turn-3",
      speaker: "CAREFLOW_AI",
      textAr: "فهمتك تماماً. هل الوجع بيزيد مع المجهود أو التنفس العميق؟ وهل حاسس بكرشة نفس؟",
      textEn: "Understood. Does the pain increase with exertion or deep breathing? Are you experiencing shortness of breath?",
      timestamp: "10:31 AM",
    },
  ],
  chiefComplaintAr: "ألم حاد بالصدر ممتد للكتف الأيسر مع تعرق بارد وضيق تنفس",
  chiefComplaintEn: "Acute retrosternal chest pain radiating to left shoulder with cold diaphoresis and dyspnea",
  associatedSymptoms: ["Chest Pain", "Left Shoulder Radiation", "Diaphoresis", "Dyspnea"],
  durationSeconds: 145,

  startRecording: () => {
    set({ isRecording: true });
  },

  stopRecording: () => {
    set({ isRecording: false, isProcessing: true });
    setTimeout(() => {
      set({ isProcessing: false });
    }, 1200);
  },

  addTurn: (turnData) => {
    const newTurn: ConversationTurn = {
      ...turnData,
      id: `turn-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    set((state) => ({ turns: [...state.turns, newTurn] }));
  },

  finalizeSession: () => {
    set({ isCompleted: true, isRecording: false, isProcessing: false });
  },

  resetSession: () => {
    set({
      isRecording: false,
      isProcessing: false,
      isCompleted: false,
      turns: [],
      chiefComplaintAr: "",
      chiefComplaintEn: "",
      associatedSymptoms: [],
      durationSeconds: 0,
    });
  },
}));
