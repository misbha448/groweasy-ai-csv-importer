'use client';

import { useEffect, useState } from 'react';
import styles from './ProgressModal.module.css';
import LoadingSpinner from './LoadingSpinner';

const LOADING_MESSAGES = [
  'Upload complete',
  'Parsing CSV...',
  'Detecting headers...',
  'AI mapping fields...',
  'Validating records...',
  'Preparing import...',
  'Finalizing import...'
];

const STEPS = [
  { label: 'Upload Complete', start: 0 },
  { label: 'Parsing CSV', start: 6 },
  { label: 'Detecting Headers', start: 18 },
  { label: 'AI Mapping', start: 30 },
  { label: 'Validating Records', start: 54 },
  { label: 'Preparing Import', start: 76 },
  { label: 'Completed', start: 100 }
];

const PROGRESS_SEQUENCE = [0, 5, 12, 18, 27, 39, 52, 68, 81, 95];
const ESTIMATED_SECONDS = [null, 18, 15, 12, 8, 4];

export default function ProgressModal({ isVisible = true, progress = 0, totalRows = 0 }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const safeProgress = Math.max(0, Math.min(progress, 100));
  const displayedProgress = safeProgress >= 100
    ? 100
    : PROGRESS_SEQUENCE[sequenceIndex];
  const totalBatches = Math.max(1, Math.ceil((totalRows || 100) / 20));
  const currentBatch = displayedProgress >= 100
    ? totalBatches
    : Math.max(1, Math.min(totalBatches, Math.ceil((displayedProgress / 100) * totalBatches)));
  const estimateIndex = Math.min(sequenceIndex, ESTIMATED_SECONDS.length - 1);
  const estimatedTime = displayedProgress >= 100
    ? 'Done'
    : ESTIMATED_SECONDS[estimateIndex] === null
      ? 'Calculating...'
      : `${ESTIMATED_SECONDS[estimateIndex]}s remaining`;
  const activeStepIndex = displayedProgress >= 100
    ? STEPS.length - 1
    : STEPS.reduce((activeIndex, step, index) => (
      displayedProgress >= step.start ? index : activeIndex
    ), 0);

  useEffect(() => {
    if (!isVisible || safeProgress >= 100) return;

    const interval = setInterval(() => {
      setSequenceIndex((prev) => Math.min(prev + 1, PROGRESS_SEQUENCE.length - 1));
    }, 850);

    return () => clearInterval(interval);
  }, [isVisible, safeProgress]);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 1600);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={styles.backdrop} role="status" aria-label="Processing">
      <div className={styles.modal}>
        <div className={styles.content}>
          <LoadingSpinner size="lg" />
          <h2 className={styles.title}>Processing Your CSV</h2>
          <p className={styles.message}>
            {LOADING_MESSAGES[messageIndex]}
          </p>
          <div className={styles.progressTrack} aria-label={`Progress ${Math.round(displayedProgress)}%`}>
            <div
              className={styles.progressFill}
              style={{ width: `${displayedProgress}%` }}
            />
          </div>
          <p className={styles.progressText}>{Math.round(displayedProgress)}%</p>
          <div className={styles.metaGrid}>
            <div>
              <span>Estimated time</span>
              <strong>{estimatedTime}</strong>
            </div>
            <div>
              <span>Current batch</span>
              <strong>{currentBatch} / {totalBatches}</strong>
            </div>
          </div>
          <div className={styles.steps} aria-label="Import processing steps">
            {STEPS.map((step, index) => (
              <div
                key={step.label}
                className={`${styles.step} ${index < activeStepIndex ? styles.complete : ''} ${index === activeStepIndex ? styles.active : ''}`}
              >
                <span className={styles.stepDot} />
                <span>{step.label}</span>
              </div>
            ))}
          </div>
          <div className={styles.dots}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
