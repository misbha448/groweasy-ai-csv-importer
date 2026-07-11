import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner({ size = 'md', text = '' }) {
  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${styles[size]}`} aria-label="Loading">
        <div className={styles.inner}></div>
      </div>
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
}
