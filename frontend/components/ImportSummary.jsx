import Card from './Card';
import styles from './ImportSummary.module.css';

export default function ImportSummary({ 
  importData = {
    totalRows: 0,
    importedRows: 0,
    skippedRows: 0,
    processingTime: 0,
    fileName: '',
    timestamp: null
  }
}) {
  const successRate = importData.totalRows > 0 
    ? Math.round((importData.importedRows / importData.totalRows) * 100)
    : 0;

  const formatTime = (ms) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Card className={styles.card}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Import Summary</h3>
          <span className={`${styles.badge} ${styles[successRate >= 80 ? 'success' : 'warning']}`}>
            {successRate}% Success
          </span>
        </div>

        <div className={styles.grid}>
          <div className={styles.item}>
            <span className={styles.label}>File Name</span>
            <span className={styles.value}>{importData.fileName}</span>
          </div>

          <div className={styles.item}>
            <span className={styles.label}>Total Rows</span>
            <span className={styles.value}>{importData.totalRows.toLocaleString()}</span>
          </div>

          <div className={styles.item}>
            <span className={styles.label}>Imported</span>
            <span className={`${styles.value} ${styles.success}`}>
              {importData.importedRows.toLocaleString()}
            </span>
          </div>

          <div className={styles.item}>
            <span className={styles.label}>Skipped</span>
            <span className={`${styles.value} ${styles.warning}`}>
              {importData.skippedRows.toLocaleString()}
            </span>
          </div>

          <div className={styles.item}>
            <span className={styles.label}>Processing Time</span>
            <span className={styles.value}>{formatTime(importData.processingTime)}</span>
          </div>

          <div className={styles.item}>
            <span className={styles.label}>Completed</span>
            <span className={styles.value}>{formatDate(importData.timestamp)}</span>
          </div>
        </div>

        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${successRate}%` }}
            ></div>
          </div>
          <div className={styles.progressLabel}>
            {importData.importedRows.toLocaleString()} / {importData.totalRows.toLocaleString()} records successfully imported
          </div>
        </div>
      </div>
    </Card>
  );
}
