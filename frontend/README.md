# GrowEasy AI CSV CRM Importer - Frontend

Production-grade AI-powered CSV to CRM record importer built with Next.js, vanilla CSS, and modern web technologies.

## Features

- **Drag & Drop Upload** - Intuitive file upload with drag-and-drop support
- **CSV Preview** - Preview the first 10 rows before importing
- **AI Processing** - Integration-ready flow for AI-powered data transformation
- **Real-time Progress** - Animated progress tracking during processing
- **Results Dashboard** - Displays import statistics and processed records
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Production-Ready UI** - SaaS-level professional design

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: JavaScript (ES2020)
- **Styling**: Vanilla CSS with CSS variables and CSS Modules
- **State Management**: React Hooks
- **File Parsing**: PapaParse
- **File Upload**: React Dropzone-style file input experience

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components
- `services/` - CSV parsing and API integration layer
- `hooks/` - Custom React hooks
- `lib/` - Utility functions and API helpers
- `styles/` - Global styles, reset, layout, and design tokens
- `public/` - Static assets

## Design System

- **Primary Color**: `#2563EB`
- **Spacing Base**: `8px`
- **Border Radius**: `12px`
- **Typography**: System fonts for best performance

## Key Features

### Components

- Button, Card, LoadingSpinner
- FileDropzone, CSVPreviewTable, ResultTable
- ConfirmDialog, Toast, ProgressModal
- Navbar, Footer, PageHeader

### Services

- CSV file parsing and validation
- API client with auth support
- AI processing integration through the backend API

### Hooks

- useAsync, useLocalStorage, useDebounce
- usePrevious, useMount, useUnmount

### Utilities

- File size formatting, date formatting
- Debounce, throttle, deep clone
- Email/URL validation

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Deployment

Ready to deploy on Vercel or any Node.js hosting platform.

## License

MIT
