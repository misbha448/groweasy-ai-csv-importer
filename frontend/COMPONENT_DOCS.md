# Component Documentation

## Button

Versatile button component with multiple variants and sizes.

### Usage
```jsx
import Button from '@/components/Button';

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>
```

### Props
- `variant`: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `disabled`: boolean (default: false)
- `type`: 'button' | 'submit' | 'reset' (default: 'button')
- `onClick`: function
- `className`: string

---

## Card

Container component for grouping related content.

### Usage
```jsx
import Card from '@/components/Card';

<Card className="custom-class">
  <h3>Card Content</h3>
  <p>Some content here</p>
</Card>
```

### Props
- `children`: React nodes
- `className`: string
- `onClick`: function
- `interactive`: boolean (adds hover effect)

---

## FileDropzone

File upload component with drag-and-drop support.

### Usage
```jsx
import FileDropzone from '@/components/FileDropzone';

<FileDropzone 
  onFileSelect={(file) => handleFile(file)}
  maxSize={10 * 1024 * 1024}
  accept=".csv"
/>
```

### Props
- `onFileSelect`: function (required)
- `maxSize`: number in bytes (default: 10MB)
- `accept`: string (default: '.csv')

### Features
- Drag & drop support
- File validation
- Size limit enforcement
- File info display
- Error messages

---

## CSVPreviewTable

Component for previewing CSV data with metadata.

### Usage
```jsx
import CSVPreviewTable from '@/components/CSVPreviewTable';

<CSVPreviewTable
  data={csvData}
  fileName="data.csv"
  fileSize={1024}
  rowCount={100}
  columnCount={5}
/>
```

### Props
- `data`: array of objects (required)
- `fileName`: string
- `fileSize`: number in bytes
- `rowCount`: number
- `columnCount`: number

### Features
- Shows first 10 rows
- Displays file metadata
- Responsive table
- Row/column count

---

## ResultTable

Component for displaying processed results.

### Usage
```jsx
import ResultTable from '@/components/ResultTable';

<ResultTable 
  data={results}
  title="Import Results"
/>
```

### Props
- `data`: array of objects (required)
- `title`: string

### Features
- Responsive table
- Custom cell rendering
- Type-specific formatting
- Sticky headers

---

## StatsCards

Component for displaying statistics.

### Usage
```jsx
import StatsCards from '@/components/StatsCards';

<StatsCards stats={{
  totalRecords: 1000,
  imported: 900,
  skipped: 100,
  processingTime: 5000
}} />
```

### Props
- `stats`: object with totalRecords, imported, skipped, processingTime

### Features
- Color-coded cards
- Icons
- Formatted values
- Responsive grid

---

## ImportSummary

Component for displaying import summary information.

### Usage
```jsx
import ImportSummary from '@/components/ImportSummary';

<ImportSummary importData={{
  totalRows: 1000,
  importedRows: 900,
  skippedRows: 100,
  processingTime: 5000,
  fileName: "data.csv",
  timestamp: new Date()
}} />
```

### Props
- `importData`: object with import details

### Features
- Success rate badge
- Progress bar
- Formatted statistics
- Responsive layout

---

## ConfirmDialog

Modal for confirming actions.

### Usage
```jsx
import ConfirmDialog from '@/components/ConfirmDialog';

<ConfirmDialog
  isOpen={true}
  title="Confirm Action"
  message="Are you sure?"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
  details={<div>Details here</div>}
/>
```

### Props
- `isOpen`: boolean (required)
- `title`: string
- `message`: string
- `confirmText`: string (default: 'Confirm')
- `cancelText`: string (default: 'Cancel')
- `confirmVariant`: 'primary' | 'danger' (default: 'primary')
- `onConfirm`: function (required)
- `onCancel`: function (required)
- `details`: React node

### Features
- Backdrop blur
- Custom details
- Action buttons
- Smooth animations

---

## ProgressModal

Modal showing processing progress.

### Usage
```jsx
import ProgressModal from '@/components/ProgressModal';

<ProgressModal isVisible={true} />
```

### Props
- `isVisible`: boolean (required)

### Features
- Rotating messages
- Animated spinner
- Pulsing dots
- Auto-updates every 2.5s

---

## Toast

Notification component.

### Usage
```jsx
import Toast from '@/components/Toast';

<Toast 
  message="Success!" 
  type="success"
  onClose={handleClose}
/>
```

### Props
- `message`: string (required)
- `type`: 'success' | 'error' | 'warning' | 'info' (default: 'info')
- `duration`: number in ms (default: 4000)
- `onClose`: function

### Features
- Auto-dismiss
- Color-coded by type
- Fixed position
- Close button

---

## LoadingSpinner

Animated loading indicator.

### Usage
```jsx
import LoadingSpinner from '@/components/LoadingSpinner';

<LoadingSpinner size="md" text="Loading..." />
```

### Props
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `text`: string

### Features
- Multiple sizes
- Smooth rotation
- Optional text

---

## Navbar

Navigation bar component.

### Usage
```jsx
import Navbar from '@/components/Navbar';

<Navbar />
```

### Features
- Sticky positioning
- Logo with branding
- Navigation links
- Responsive design

---

## Footer

Footer component.

### Usage
```jsx
import Footer from '@/components/Footer';

<Footer />
```

### Features
- Multiple sections
- Links
- Copyright info
- Responsive layout

---

## PageHeader

Page title and description.

### Usage
```jsx
import PageHeader from '@/components/PageHeader';

<PageHeader
  title="Page Title"
  description="Page description"
  breadcrumbs={['Home', 'Page']}
  action={<Button>Action</Button>}
/>
```

### Props
- `title`: string (required)
- `description`: string
- `breadcrumbs`: array of strings
- `action`: React node

---

## ResponsiveTable

Responsive data table component.

### Usage
```jsx
import ResponsiveTable from '@/components/ResponsiveTable';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
];

<ResponsiveTable 
  columns={columns}
  data={data}
  striped={true}
  hoverable={true}
/>
```

### Props
- `columns`: array of { key, label, width?, render? }
- `data`: array of objects
- `striped`: boolean (default: true)
- `hoverable`: boolean (default: true)

### Features
- Sticky headers
- Custom rendering
- Striped rows
- Hover effects
- Responsive

---

## Color Reference

| Variable | Color | Usage |
|----------|-------|-------|
| `--primary` | #2563EB | Links, buttons, highlights |
| `--success` | #22C55E | Success states |
| `--warning` | #F59E0B | Warnings |
| `--danger` | #EF4444 | Errors |
| `--background` | #F8FAFC | Page background |
| `--text` | #111827 | Primary text |
| `--text-secondary` | #6B7280 | Secondary text |

---

## Spacing Scale

| Variable | Size |
|----------|------|
| `--spacing-xs` | 4px |
| `--spacing-sm` | 8px |
| `--spacing-md` | 16px |
| `--spacing-lg` | 24px |
| `--spacing-xl` | 32px |
| `--spacing-2xl` | 48px |

---

All components follow accessibility best practices and are mobile-responsive.
