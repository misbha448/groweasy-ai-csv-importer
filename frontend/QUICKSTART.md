# 🚀 Quick Start Guide

## Get Up and Running in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env.local
# Edit .env.local with your API URL
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
```
http://localhost:3000
```

## Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
npm run format      # Format code with Prettier
npm run type-check  # Check TypeScript types

# Docker
docker build -t groweasy-importer .
docker run -p 3000:3000 groweasy-importer
```

## Project Structure

```
frontend/
├── app/                    # Next.js pages
│   ├── layout.jsx         # Root layout
│   ├── page.jsx           # Home page
│   └── page.module.css    # Page styles
├── components/            # React components (18)
├── services/              # API integration
├── hooks/                 # Custom hooks
├── lib/                   # Utilities
├── styles/                # Global styles
├── public/                # Static files
└── package.json           # Dependencies
```

## Key Components

| Component | Purpose |
|-----------|---------|
| `Button` | Reusable button with variants |
| `Card` | Container with styling |
| `FileDropzone` | Drag & drop upload |
| `CSVPreviewTable` | Preview CSV data |
| `ConfirmDialog` | Confirmation modal |
| `Toast` | Notifications |
| `ProgressModal` | Loading indicator |
| `StatsCards` | Statistics display |

## Workflow

1. **Upload** - User selects/drops CSV
2. **Preview** - First 10 rows shown
3. **Confirm** - User confirms import
4. **Process** - AI processes records
5. **Results** - Show statistics

## Common Tasks

### Add a New Component

```javascript
// components/NewComponent.jsx
import styles from './NewComponent.module.css';

export default function NewComponent({ prop }) {
  return <div className={styles.container}>{prop}</div>;
}
```

```css
/* components/NewComponent.module.css */
.container {
  padding: var(--spacing-lg);
  background-color: var(--white);
  border-radius: var(--radius-md);
}
```

### Use a Custom Hook

```javascript
import { useAsync } from '@/hooks/useCustom';

export default function MyComponent() {
  const { data, status, error, execute } = useAsync(
    async () => fetchData(),
    true // immediate
  );

  if (status === 'pending') return <Loading />;
  if (status === 'error') return <Error error={error} />;
  return <div>{data}</div>;
}
```

### Call an API

```javascript
import { apiClient } from '@/services/apiClient';

// GET request
const data = await apiClient.get('/endpoint');

// POST request
const result = await apiClient.post('/endpoint', { key: 'value' });

// Upload file
const response = await apiClient.uploadFile('/upload', file);
```

## Environment Variables

```env
# Required
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Optional
NEXT_PUBLIC_GA_ID=UA-xxxxx
NEXT_PUBLIC_ENABLE_DEBUG_MODE=false
```

## Troubleshooting

### Port 3000 Already in Use
```bash
# Linux/Mac
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Module Not Found
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Dependency Issues
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Performance Tips

- Use React DevTools Profiler
- Lazy load heavy components
- Optimize images
- Use production build for benchmarking
- Monitor Core Web Vitals

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Web Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)

## Next Steps

1. ✅ Install & run locally
2. 🔌 Connect backend API
3. 🔐 Add authentication
4. 📊 Implement analytics
5. 🚀 Deploy to production

## Support

For issues or questions:
1. Check the README.md
2. Review CODING_STANDARDS.md
3. Check component documentation
4. Review similar components for patterns

---

**Happy coding! 🎉**
