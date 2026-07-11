import styles from './PageHeader.module.css';

export default function PageHeader({ 
  title, 
  description, 
  action = null,
  breadcrumbs = null 
}) {
  return (
    <div className={styles.header}>
      {breadcrumbs && (
        <div className={styles.breadcrumbs}>
          {breadcrumbs.map((crumb, index) => (
            <span key={index}>
              {index > 0 && <span className={styles.separator}>/</span>}
              {crumb}
            </span>
          ))}
        </div>
      )}
      <div className={styles.badge}>Powered by Gemini AI</div>
      <div className={styles.content}>
        <div className={styles.text}>
          <h1 className={styles.title}>{title}</h1>
          {description && <p className={styles.description}>{description}</p>}
          <div className={styles.pills} aria-label="Importer features">
            {['Drag & Drop', 'AI Mapping', 'CRM Ready', 'Responsive', 'Batch Processing'].map((feature) => (
              <span key={feature}>{feature}</span>
            ))}
          </div>
        </div>
        {action && <div className={styles.action}>{action}</div>}
      </div>
    </div>
  );
}
