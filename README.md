# GrowEasy AI CSV Importer

## Project Overview

GrowEasy AI CSV Importer is a stateless AI-powered CSV importer that converts CSV files with varying headers and layouts into GrowEasy CRM-ready lead records. The frontend lets users upload, preview, confirm, process, review, and download results. The backend parses CSV files, sends records to Gemini in batches, validates CRM output, and returns structured JSON.

## Features

- Drag and drop CSV upload
- File picker upload
- Local CSV preview before AI processing
- Responsive preview and result tables with sticky headers
- Confirm-before-import workflow
- Gemini-powered CRM field mapping
- Batch processing with retries
- Imported and skipped record summaries
- Results CSV and JSON download
- Dark mode
- AI assistant chatbot

## Tech Stack

- Frontend: Next.js, React, CSS Modules, PapaParse
- Backend: Node.js, Express, Multer, PapaParse
- AI: Gemini API
- Database: None, stateless processing

## Installation

Install frontend dependencies:

```bash
cd frontend
npm install
```

Install backend dependencies:

```bash
cd backend
npm install
```

## Environment Variables

Frontend `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Backend `.env`:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MAX_FILE_SIZE=20971520
BATCH_SIZE=20
BATCH_TIMEOUT=30000
MAX_RETRIES=2
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## Run Frontend

```bash
cd frontend
npm run dev
```

The frontend runs on `http://localhost:3000`.

## Run Backend

```bash
cd backend
npm run dev
```

The backend runs on `http://localhost:3001`.

## Deployment

Set production environment variables for both apps before deployment. Configure `NEXT_PUBLIC_API_URL` to point to the deployed backend API and configure `FRONTEND_URL` on the backend to the deployed frontend origin. The frontend can be deployed to Vercel or any Next.js-compatible host. The backend can be deployed to Railway, Render, or any Node.js-compatible host.

## Screenshots

Screenshots can be added here after deployment.
