<div align="center">
  <h1>🏥 CareFlow Patient Portal</h1>
  <p><em>Patient-facing care portal — voice intake, medical history, and encounter tracking</em></p>
  <p>
    <img src="https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white" />
    <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" />
    <img src="https://github.com/careflow-eg/patient-portal/actions/workflows/ci.yml/badge.svg" />
  </p>
</div>

---

## Overview

The **Patient Portal** provides patients with a self-service interface for voice-based medical history intake, encounter tracking, and accessing their clinical data. Built with a glassmorphic, mobile-first UI design using CareFlow's teal/navy design system.

## Key Features

- **Voice Intake** — Browser-based voice recording for medical history collection
- **Encounter History** — View past encounters and clinical summaries
- **Responsive Design** — Mobile-first glassmorphic UI
- **Secure Auth** — JWT-based patient authentication

## Project Structure

```
patient-portal/
├── .github/workflows/    # CI/CD pipeline
├── app/                  # Next.js App Router
│   └── (portal)/         # Protected portal pages
├── components/           # UI components
│   ├── ui/               # Base components
│   ├── voice/            # Voice recorder widget
│   └── providers/        # Context providers
├── lib/                  # API client, utilities
├── services/             # API service layers
├── stores/               # Zustand state
├── types/                # TypeScript interfaces
├── public/               # Static assets
├── .env.example          # Environment template
└── package.json          # Dependencies
```

## Quick Start

```bash
git clone https://github.com/careflow-eg/patient-portal.git
cd patient-portal
cp .env.example .env
npm install
npm run dev
# Open http://localhost:3001
```

## License

Proprietary — CareFlow © 2026
