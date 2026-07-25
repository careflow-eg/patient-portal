# 🏥 CareFlow Patient Care Portal (`patient-portal`)

**Version**: 0.1.0 (Next.js 16 App Router)  
**Design System**: CareFlow Glassmorphic UI (Teal `#06635d` / Navy `#112344` / Dark `#021418` / Accent `#14b8a6`)  
**Repository Path**: `e:/care flow/patient-portal`

---

## 🌟 Key Features

1. **Conversational Egyptian Arabic Voice AI Intake**:
   - Real-time animated audio wave visualizer (`VoiceRecorderWidget.tsx`).
   - Turn-by-turn Arabic/English speech transcript log.
   - Red flag symptom detection tags (e.g., radiating retrosternal chest pain).
   - Instant chief complaint extraction and submission to `doctor-portal`.

2. **Normalized SI Unit Laboratory Results**:
   - Automatic unit normalization (Pint UCUM engine).
   - Clinical reference ranges and flag indicators (`NORMAL`, `HIGH`, `LOW`).
   - Analyte category filters (`METABOLIC`, `RENAL`, `LIPID`, `HEMATOLOGY`).

3. **Digital Prescriptions & Pharmacy Refills**:
   - Active medication list with dosages and intake frequencies.
   - Prescribing physician info and validity period.
   - One-click pharmacy refill request action.

4. **Doctor Appointments & Booking**:
   - Specialist search with hospital location and rating tags.
   - Instant booking confirmation.

5. **Bilingual Arabic / English & Dark Mode Support**:
   - One-click language switcher (`ar` / `en`) with dynamic RTL layout directionality.
   - Seamless dark/light theme switching with glassmorphism card highlights.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16.2 (App Router) + React 19
- **Styling**: Tailwind CSS v4 + PostCSS
- **Icons**: Lucide React (`lucide-react`)
- **State Management**: Zustand 5
- **UI Primitives**: Radix UI (Avatar, Badge, Dialog, Progress, Tabs)
- **Animations**: Framer Motion 12

---

## 🚀 Getting Started

```bash
# Navigate to repository directory
cd "e:/care flow/patient-portal"

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:3000` to interact with the patient portal.
