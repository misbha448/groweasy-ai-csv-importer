'use client';

import { useCallback, useId, useRef, useState } from 'react';
import styles from './FileDropzone.module.css';
import Button from './Button';

export default function FileDropzone({
  onFileSelect,
  maxSize = 20 * 1024 * 1024, // 20MB
  accept = '.csv'
}) {
  const fileInputRef = useRef(null);
  const fileInputId = useId();
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);

  const validateFile = useCallback((file) => {
    const name = file.name.toLowerCase();
    const forbiddenExt = ['.xlsx', '.xls', '.pdf', '.png', '.jpg', '.jpeg', '.zip'];

    if (!name.endsWith('.csv')) {
      if (forbiddenExt.some(ext => name.endsWith(ext))) {
        setError('Unsupported file type. Please upload a .csv file.');
      } else {
        setError('Only CSV files are accepted.');
      }
      return false;
    }

    if (file.size > maxSize) {
      setError(`File size exceeds ${maxSize / 1024 / 1024} MB limit`);
      return false;
    }

    setError('');
    return true;
  }, [maxSize]);

  const handleFile = useCallback((file) => {
    if (!file) return;

    if (validateFile(file)) {
      setFileName(file.name);
      setFileSize(file.size);
      onFileSelect(file);
    }
  }, [onFileSelect, validateFile]);

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
    return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`;
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const openFilePicker = (e) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (!fileInputRef.current) return;
    fileInputRef.current.value = '';
    fileInputRef.current.click();
  };

  return (
    <div
      className={`${styles.dropzone} ${isDragActive ? styles.active : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className={styles.content}>
        <div className={styles.icon} aria-hidden="true">CSV</div>
        <h3 className={styles.title}>Drag & drop your CSV file</h3>
        <p className={styles.subtitle}>or click button below to browse</p>

        <input
          id={fileInputId}
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className={styles.fileInput}
          aria-label="Upload CSV file"
        />

        <Button
          variant="primary"
          size="lg"
          type="button"
          onClick={openFilePicker}
          className={styles.browseButton}
          aria-controls={fileInputId}
        >
          Browse Files
        </Button>

        {fileName && (
          <div className={styles.fileInfo}>
            <span className={styles.fileIcon}>OK</span>
            <span className={styles.fileText}>
              <span className={styles.fileName}>{fileName}</span>
              <span className={styles.fileMeta}>{formatFileSize(fileSize)}</span>
            </span>
          </div>
        )}

        {error && (
          <div className={styles.error}>
            <span className={styles.errorIcon}>!</span>
            {error}
          </div>
        )}

        <div className={styles.info}>
          <p>CSV only - Max {maxSize / 1024 / 1024}MB - headers are detected automatically</p>
        </div>
      </div>
    </div>
  );
}
