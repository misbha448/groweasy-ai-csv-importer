# GrowEasy AI CSV Importer

GrowEasy AI CSV Importer is an AI-powered CSV importer built to transform messy, inconsistent CSV files into clean GrowEasy CRM-ready records. It uses Gemini AI to automatically map unpredictable CSV headers and values into a structured CRM format, paired with a modern responsive frontend, a stateless backend, and a production-ready architecture suitable for real-world deployment.

This repository is an assignment submission for the Software Developer Intern position at GrowEasy AI.

---

## Live Demo

Frontend:  
https://groweasy-ai-csv-importer-pearl.vercel.app

Backend:  
https://groweasy-ai-csv-importer-fegz.onrender.com

---

## Screenshots

### Home Page
![Home Page](screenshots/HomePage.png)

### Dark Theme
![Dark Theme](screenshots/DarkTheme.png)

### CSV Preview
![Preview](screenshots/Preview.png)

### Imported CRM Records
![Imported Records](screenshots/ImportedRecords.png)

### AI Assistant Chatbot
![Chatbot](screenshots/Chatbot.png)

---

## Features

- [x] AI Powered CRM Field Mapping
- [x] Gemini AI Integration
- [x] Supports Messy CSV Files
- [x] Drag & Drop Upload
- [x] File Picker Upload
- [x] Local CSV Preview
- [x] Sticky Table Headers
- [x] Responsive Design
- [x] Batch Processing
- [x] Retry Mechanism
- [x] Import Summary
- [x] Download CSV
- [x] Download JSON
- [x] AI Assistant Chatbot
- [x] Dark / Light Theme
- [x] Toast Notifications
- [x] Error Handling
- [x] Loading States
- [x] Production Deployment

---

## Tech Stack

**Frontend**

- Next.js
- React
- CSS Modules
- PapaParse

**Backend**

- Node.js
- Express.js
- Multer
- PapaParse

**AI**

- Google Gemini API

**Deployment**

- Vercel
- Render

---

## Project Architecture

```text
frontend/
backend/
screenshots/
```

The `frontend/` application provides the user-facing CSV upload experience, local preview, import confirmation flow, CRM results table, downloads, theme support, and AI assistant chatbot.

The `backend/` service handles CSV uploads, parsing, batch processing, Gemini AI field mapping, CRM validation, retry logic, and stateless API responses.

The `screenshots/` directory contains the visual assets used in this README to showcase the application.

---

## Application Workflow

1. Upload CSV

↓

2. Preview CSV

↓

3. Confirm Import

↓

4. Gemini AI Mapping

↓

5. CRM Validation

↓

6. Results

↓

7. Download CSV / JSON

---

## CRM Fields Extracted

| Field |
| --- |
| created_at |
| name |
| email |
| country_code |
| mobile_without_country_code |
| company |
| city |
| state |
| country |
| lead_owner |
| crm_status |
| crm_note |
| data_source |
| possession_time |
| description |

---

## Local Setup

**Frontend**

```bash
npm install
npm run dev
```

**Backend**

```bash
npm install
npm run dev
```

---

## Environment Variables

**Frontend**

```env
NEXT_PUBLIC_API_URL=
```

**Backend**

```env
GEMINI_API_KEY=
PORT=
FRONTEND_URL=
```

No real API keys are included in this repository. Configure production secrets directly in the hosting provider environment settings.

---

## Deployment

The frontend is deployed on Vercel.

The backend is deployed on Render.

Gemini API access is configured securely using environment variables, keeping secrets outside the codebase while allowing the deployed backend to perform AI-powered CRM mapping.

---

## Assignment Requirements Covered

- [x] CSV Upload
- [x] Preview
- [x] AI Processing
- [x] Gemini Mapping
- [x] Responsive UI
- [x] Sticky Tables
- [x] Downloads
- [x] Dark Mode
- [x] Chatbot
- [x] Batch Processing
- [x] Retry Logic
- [x] Error Handling
- [x] Stateless Backend

---

## Future Improvements

- Authentication
- CSV History
- Export to Excel
- Multi-language Support
- Streaming Imports
- Admin Dashboard
- Analytics

---
