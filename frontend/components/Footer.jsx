import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="about">
      <div className={styles.container}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span>G</span>
            <strong>GrowEasy AI CSV Importer</strong>
          </div>
          <p>AI-powered CSV to CRM conversion with smart mapping, validation and import analytics.</p>
        </div>

        <div className={styles.stack} id="documentation">
          <h4>Documentation</h4>
          <ul>
            <li>Project Overview</li>
            <li>Architecture</li>
            <li>AI Pipeline</li>
            <li>Future Improvements</li>
          </ul>
        </div>

        <div className={styles.stack}>
          <h4>Importer Features</h4>
          <ul>
            <li>Drag & drop upload</li>
            <li>AI field mapping</li>
            <li>Batch processing</li>
            <li>Download CSV and JSON</li>
          </ul>
        </div>

        <div className={styles.stack} id="built-using">
          <h4>Built Using</h4>
          <ul>
            <li>Next.js</li>
            <li>Express</li>
            <li>Gemini AI</li>
            <li>CSS Modules</li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {currentYear} GrowEasy. Production-ready CRM imports with AI assistance.</p>
      </div>
    </footer>
  );
}
