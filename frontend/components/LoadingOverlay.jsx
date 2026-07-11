'use client';

import styles from './LoadingOverlay.module.css';
import LoadingSpinner from './LoadingSpinner';

export default function LoadingOverlay({ 
  isVisible = true,
  message = 'Loading...',
  progress = null 
}) {
  if (!isVisible) return null;

  return (
    <div className={styles.overlay} role="status" aria-label="Loading">
      <div className={styles.container}>
        <LoadingSpinner size="lg" />
        <h3 className={styles.message}>{message}</h3>
        {progress && (
          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className={styles.progressText}>{progress}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
