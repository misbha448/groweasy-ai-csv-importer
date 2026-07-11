'use client';

import { useEffect, useState } from 'react';
import styles from './Toast.module.css';

export default function Toast({
  message,
  type = 'info',
  duration = 4000,
  onClose
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!duration) return undefined;

    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, message, onClose]);

  if (!isVisible) return null;

  const icons = {
    success: 'OK',
    error: '!',
    warning: '!',
    info: 'i'
  };

  return (
    <div className={`${styles.toast} ${styles[type]}`} role="alert">
      <span className={styles.icon}>{icons[type] || icons.info}</span>
      <span className={styles.message}>{message}</span>
      <button
        className={styles.close}
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        aria-label="Close notification"
        type="button"
      >
        x
      </button>
    </div>
  );
}
