# Frontend Coding Standards

## File Organization

### Component Files
```
components/
├── ComponentName.jsx         # Component logic
├── ComponentName.module.css  # Component styles
```

- One component per file
- Related styles in sibling `.module.css`
- Clear, descriptive names

### Service Files
```
services/
├── serviceName.js            # Service logic
```

- Group related API calls
- Use consistent naming: `upload*`, `get*`, `process*`
- Document with JSDoc comments

### Hook Files
```
hooks/
├── useHookName.js            # Custom hook
```

- Start with `use` prefix
- One hook per file
- Extract complex logic into hooks

## Naming Conventions

### Components
```javascript
// ✅ Good
function FileUploadCard() {}
function CSVPreviewTable() {}
function ImportProgressModal() {}

// ❌ Avoid
function FileUpload() {}
function preview() {}
function Modal() {}
```

### Variables
```javascript
// ✅ Good
const [csvData, setCsvData] = useState([]);
const isProcessing = true;
const fileSize = 1024;

// ❌ Avoid
const [data, setData] = useState([]);
const proc = true;
const fs = 1024;
```

### Functions
```javascript
// ✅ Good
function handleFileSelect(file) {}
function formatFileSize(bytes) {}
async function processCSV(data) {}

// ❌ Avoid
function onFile(f) {}
function fmt(b) {}
async function process(d) {}
```

## CSS Conventions

### Naming
```css
/* ✅ Good - BEM-like naming */
.container { }
.header { }
.header-title { }
.button-primary { }
.button-primary:hover { }

/* ❌ Avoid */
.main { }
.title { }
.btn { }
.primary { }
```

### Structure
```css
/* ✅ Good organization */
.component {
  /* Layout */
  display: flex;
  justify-content: space-between;
  
  /* Box Model */
  padding: var(--spacing-md);
  margin: var(--spacing-lg);
  
  /* Appearance */
  background-color: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  
  /* Effects */
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}

.component:hover {
  /* Hover state */
}

@media (max-width: 768px) {
  /* Responsive */
}
```

### Variables
```css
/* ✅ Use CSS variables */
.button {
  background-color: var(--primary);
  color: var(--white);
  padding: var(--spacing-md) var(--spacing-lg);
}

/* ❌ Avoid hardcoding */
.button {
  background-color: #2563EB;
  color: #fff;
  padding: 16px 24px;
}
```

## React Patterns

### Component Structure
```javascript
// ✅ Good
import styles from './ComponentName.module.css';
import Button from '@/components/Button';
import { useCustomHook } from '@/hooks/useCustom';

export default function ComponentName({ prop1, prop2 = default }) {
  // State
  const [state, setState] = useState(initialValue);

  // Derived state
  const isDone = state > 50;

  // Effects
  useEffect(() => {
    // Setup
    return () => {
      // Cleanup
    };
  }, [dependencies]);

  // Handlers
  const handleAction = () => {
    // Logic
  };

  // Render
  return (
    <div className={styles.container}>
      {/* JSX */}
    </div>
  );
}
```

### Props Documentation
```javascript
// ✅ Document props
export default function Button({
  // Behavior
  variant = 'primary',    // 'primary' | 'secondary' | 'danger'
  size = 'md',           // 'sm' | 'md' | 'lg' | 'xl'
  
  // State
  disabled = false,      // boolean
  
  // Callbacks
  onClick,               // function
  
  // Styling
  className = '',        // string
  
  // Spread
  ...props
}) {
  // Component logic
}
```

### Imports
```javascript
// ✅ Organize imports
import { useState, useCallback } from 'react';
import styles from './Component.module.css';
import Button from '@/components/Button';
import { useAsync } from '@/hooks/useCustom';
import { formatFileSize } from '@/lib/utils';

// ❌ Avoid
import Component from '../../../components/Component';
import { a, b, c } from '@/lib/utils';
import styles from './Component.module.css';
import Button from '@/components/Button';
```

## Best Practices

### Error Handling
```javascript
// ✅ Good
try {
  const result = await fetchData();
  setData(result);
} catch (error) {
  console.error('Failed to fetch data:', error);
  setError(error.message);
  showToast('Error loading data', 'error');
}

// ❌ Avoid
try {
  const result = await fetchData();
} catch (e) {
  console.log(e);
}
```

### State Management
```javascript
// ✅ Good - Single source of truth
const [csvData, setCsvData] = useState([]);
const [isProcessing, setIsProcessing] = useState(false);
const [results, setResults] = useState(null);

// ❌ Avoid - Derived state as state
const [csvData, setCsvData] = useState([]);
const [rowCount, setRowCount] = useState(0); // Derive from csvData.length
```

### Performance
```javascript
// ✅ Good - Use callback for event handlers
const handleClick = useCallback(() => {
  doSomething();
}, [dependency]);

// ✅ Good - Memoize expensive computations
const filteredData = useMemo(() => {
  return data.filter(item => item.active);
}, [data]);

// ❌ Avoid - New function on every render
<Button onClick={() => doSomething()} />
```

### Accessibility
```javascript
// ✅ Good
<button 
  onClick={handleClick}
  aria-label="Close dialog"
  aria-disabled={disabled}
>
  ✕
</button>

<input 
  id="email"
  type="email"
  aria-label="Email address"
  aria-required="true"
/>

// ❌ Avoid
<div onClick={handleClick}>✕</div>
<input type="text" placeholder="Email" />
```

## Code Review Checklist

- [ ] Component has single responsibility
- [ ] Props are documented
- [ ] State is properly managed
- [ ] No console errors or warnings
- [ ] Responsive design tested
- [ ] Accessibility features present
- [ ] Error handling implemented
- [ ] Loading states shown
- [ ] No hardcoded values
- [ ] CSS uses variables
- [ ] No inline styles
- [ ] Performance optimized
- [ ] Tests written (if applicable)
- [ ] Comments explain complex logic

## Performance Guidelines

- Use `React.memo` for pure components
- Use `useCallback` for event handlers
- Use `useMemo` for expensive calculations
- Lazy load components when needed
- Optimize images and assets
- Minimize bundle size
- Use production build for deployment

## Testing Conventions

- Test component rendering
- Test user interactions
- Test error states
- Test loading states
- Test responsive behavior
- Test accessibility

## Documentation Standards

```javascript
/**
 * Description of what the component does
 * 
 * @component
 * @example
 * return (
 *   <ComponentName prop1="value" prop2={123} />
 * )
 * 
 * @param {string} prop1 - Description
 * @param {number} prop2 - Description
 * @returns {JSX.Element} Rendered component
 */
export default function ComponentName({ prop1, prop2 }) {
  // Component logic
}
```

## Common Mistakes to Avoid

1. **Prop drilling** - Use context for deeply nested data
2. **State in wrong place** - Keep state as low as possible
3. **Unhandled promises** - Always use try-catch with async/await
4. **Memory leaks** - Clean up effects and listeners
5. **Lost focus** - Focus management in modals/dialogs
6. **Missing keys** - Use unique keys in lists
7. **Stale closures** - Include dependencies in useEffect
8. **Hard-coded values** - Use constants and environment variables

## Resources

- [React Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [MDN Web Docs](https://developer.mozilla.org)
- [WCAG Accessibility](https://www.w3.org/WAI/WCAG21/quickref/)

---

Follow these standards to maintain a clean, maintainable, and scalable codebase.
