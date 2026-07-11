'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './page.module.css';
import FileDropzone from '../components/FileDropzone';
import CSVPreviewTable from '../components/CSVPreviewTable';
import PageHeader from '../components/PageHeader';
import Button from '../components/Button';
import ConfirmDialog from '../components/ConfirmDialog';
import ProgressModal from '../components/ProgressModal';
import StatsCards from '../components/StatsCards';
import ImportSummary from '../components/ImportSummary';
import ResultTable from '../components/ResultTable';
import ResponsiveTable from '../components/ResponsiveTable';
import Toast from '../components/Toast';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import { parseCSVLocally } from '../services/csvService';

export default function Home() {
  const [currentStep, setCurrentStep] = useState('upload');
  const [selectedFile, setSelectedFile] = useState(null);
  const [csvData, setCsvData] = useState([]);
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [csvMetadata, setCsvMetadata] = useState({ rowCount: 0, columnCount: 0, headers: [] });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [results, setResults] = useState(null);
  const [importStats, setImportStats] = useState({
    totalRows: 0,
    importedRows: 0,
    skippedRows: 0,
    processingTime: 0,
    fileName: '',
    timestamp: null
  });
  const [toast, setToast] = useState(null);
  const processingRef = useRef(null);

  const showToast = useCallback((message, type = 'info') => {
    setToast({ id: `${Date.now()}-${message}`, message, type });
  }, []);

  const resetImportState = useCallback(({ message = null } = {}) => {
    setSelectedFile(null);
    setCsvData([]);
    setCsvHeaders([]);
    setCsvMetadata({ rowCount: 0, columnCount: 0, headers: [] });
    setShowConfirmDialog(false);
    setIsProcessing(false);
    setProcessingProgress(0);
    setResults(null);
    setImportStats({
      totalRows: 0,
      importedRows: 0,
      skippedRows: 0,
      processingTime: 0,
      fileName: '',
      timestamp: null
    });
    setCurrentStep('upload');
    processingRef.current = null;

    if (message) {
      showToast(message, 'info');
    }
  }, [showToast]);

  useEffect(() => {
    const handleHome = () => {
      resetImportState();
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    };

    window.addEventListener('groweasy:home', handleHome);
    return () => window.removeEventListener('groweasy:home', handleHome);
  }, [resetImportState]);

  const downloadBlob = (content, fileName, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const escapeCsvValue = (value) => {
    const stringValue = value === null || value === undefined
      ? ''
      : typeof value === 'object'
        ? JSON.stringify(value)
        : String(value);

    if (/[",\n\r]/.test(stringValue)) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }

    return stringValue;
  };

  const rowsToCsv = (rows, preferredHeaders = []) => {
    const headers = preferredHeaders.length > 0
      ? preferredHeaders
      : Array.from(rows.reduce((keys, row) => {
        Object.keys(row || {}).forEach((key) => keys.add(key));
        return keys;
      }, new Set()));

    const lines = [
      headers.map(escapeCsvValue).join(','),
      ...rows.map((row) => headers.map((header) => escapeCsvValue(row?.[header])).join(','))
    ];

    return lines.join('\n');
  };

  const handleFileSelect = async (file) => {
    if (isProcessing) return;
    setSelectedFile(file);

    try {
      const { rows, headers, metadata } = await parseCSVLocally(file);
      setCsvData(rows);
      setCsvHeaders(headers);
      setCsvMetadata(metadata);
      setCurrentStep('preview');
      showToast(`File "${file.name}" loaded successfully`, 'success');
    } catch (error) {
      showToast(error.message || 'Invalid CSV file', 'error');
      setSelectedFile(null);
      setCsvData([]);
      setCsvHeaders([]);
      setCsvMetadata({ rowCount: 0, columnCount: 0, headers: [] });
    }
  };

  const handleConfirmImport = () => {
    if (isProcessing || !selectedFile || csvData.length === 0) return;
    setShowConfirmDialog(true);
  };

  const handleExecuteImport = async () => {
    if (processingRef.current || !selectedFile) return;
    processingRef.current = true;
    setShowConfirmDialog(false);
    setCurrentStep('processing');
    setIsProcessing(true);
    setProcessingProgress(0);

    const startTime = Date.now();

    try {
      const api = await import('../lib/api');
      setProcessingProgress(10);

      const uploadResp = await api.uploadCSV(selectedFile);
      setProcessingProgress(85);

      const finalResults = api.normalizeImportResponse(uploadResp);

      if (!finalResults?.success) {
        throw new Error('Import failed. Please check the CSV and try again.');
      }

      if (!finalResults.records) {
        throw new Error('Unexpected response from upload API');
      }

      setProcessingProgress(100);
      await new Promise((resolve) => setTimeout(resolve, 400));

      setResults(finalResults);
      setImportStats({
        totalRows: finalResults.summary.totalRows,
        importedRows: finalResults.summary.importedRows,
        skippedRows: finalResults.summary.skippedRows,
        processingTime: finalResults.summary?.processingTime || (Date.now() - startTime),
        fileName: selectedFile.name,
        timestamp: new Date()
      });

      setCurrentStep('results');
      showToast('Import completed successfully', 'success');
    } catch (error) {
      const msg = error?.message || 'Import failed';
      showToast(msg, 'error');
      setCurrentStep('preview');
    } finally {
      setIsProcessing(false);
      processingRef.current = null;
    }
  };

  const handleCancel = () => {
    if (isProcessing) return;
    resetImportState({ message: 'Import cancelled' });
  };

  const handleNewImport = () => {
    if (isProcessing) return;
    resetImportState({ message: 'Ready for another CSV import' });
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const handleDownloadPreview = () => {
    downloadBlob(
      rowsToCsv(csvData, csvHeaders),
      `groweasy-preview-${Date.now()}.csv`,
      'text/csv;charset=utf-8'
    );
    showToast('Preview CSV downloaded', 'success');
  };

  const handleDownloadImportedCsv = () => {
    downloadBlob(
      rowsToCsv(results?.records || []),
      `groweasy-imported-${Date.now()}.csv`,
      'text/csv;charset=utf-8'
    );
    showToast('Imported CSV downloaded', 'success');
  };

  const handleDownloadJson = () => {
    downloadBlob(
      JSON.stringify(results || {}, null, 2),
      `groweasy-import-${Date.now()}.json`,
      'application/json;charset=utf-8'
    );
    showToast('JSON downloaded', 'success');
  };

  return (
    <div className={styles.container}>
      {currentStep === 'upload' && (
      <section id="hero" className={styles.heroAnchor} aria-label="GrowEasy CSV importer home">
        <PageHeader
          title="AI Powered CSV CRM Importer"
          description="Upload CSV files from any source and intelligently convert them into GrowEasy CRM records using AI."
        />
      </section>
      )}

      <section id="upload" className={styles.workflow} aria-label="CSV import workflow">
        {currentStep === 'upload' && (
          <Card className={styles.card}>
            <FileDropzone onFileSelect={handleFileSelect} maxSize={20 * 1024 * 1024} accept=".csv" />
          </Card>
        )}

        {currentStep === 'preview' && selectedFile && (
          <>
          <CSVPreviewTable
            data={csvData}
            fileName={selectedFile.name}
            fileSize={selectedFile.size}
            rowCount={csvMetadata.rowCount}
            columnCount={csvMetadata.columnCount}
            headers={csvHeaders}
          />

          <div className={styles.actions}>
            <Button variant="ghost" onClick={handleDownloadPreview} disabled={isProcessing || csvData.length === 0}>
              Download Preview CSV
            </Button>
            <Button variant="secondary" onClick={handleCancel} disabled={isProcessing}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleConfirmImport}
              className={styles.confirmBtn}
              disabled={isProcessing || !csvData || csvData.length === 0}
              aria-disabled={isProcessing || !csvData || csvData.length === 0}
            >
              Confirm Import
            </Button>
          </div>
          </>
        )}

        {currentStep === 'processing' && (
          <section id="processing-section" className={styles.sectionAnchor} aria-label="CSV processing">
            <ProgressModal
              isVisible={isProcessing}
              progress={processingProgress}
              totalRows={csvMetadata.rowCount}
            />
          </section>
        )}

        {currentStep === 'results' && results && (
          <section id="import-results" className={styles.sectionAnchor} aria-label="Import results">
          <StatsCards
            stats={{
              totalRecords: importStats.totalRows,
              imported: importStats.importedRows,
              skipped: importStats.skippedRows,
              processingTime: importStats.processingTime,
              successRate: importStats.totalRows > 0
                ? Math.round((importStats.importedRows / importStats.totalRows) * 100)
                : 0
            }}
          />

          <ImportSummary importData={importStats} />

          <div id="download" className={styles.actions}>
            <Button variant="ghost" onClick={handleDownloadImportedCsv} disabled={!results.records?.length}>
              Download Imported CSV
            </Button>
            <Button variant="secondary" onClick={handleDownloadJson}>
              Download JSON
            </Button>
            <Button variant="primary" onClick={handleNewImport}>
              Upload Another CSV
            </Button>
          </div>

          <ResultTable records={results.records} title="Imported Records" />

          {results.skippedRecords.length > 0 && (
            <div className={styles.skippedSection}>
              <h3 className={styles.sectionTitle}>Skipped Records</h3>
              <ResponsiveTable
                columns={[
                  {
                    key: 'reason',
                    label: 'reason',
                    width: '260px',
                    render: (value) => String(value ?? '-')
                  },
                  {
                    key: 'originalData',
                    label: 'original_data',
                    width: '420px',
                    render: (value) => JSON.stringify(value ?? {})
                  }
                ]}
                data={results.skippedRecords}
                maxHeight={360}
                striped={true}
                hoverable={true}
              />
            </div>
          )}

          </section>
        )}
      </section>

      {!selectedFile && currentStep === 'upload' && (
        <EmptyState message="Choose a CSV file to import using the button above." />
      )}

      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {showConfirmDialog && (
        <ConfirmDialog
          title="Confirm CSV Import"
          message="Are you sure you want to process this CSV file with AI?"
          isOpen={showConfirmDialog}
          confirmText="Confirm Import"
          onConfirm={handleExecuteImport}
          onCancel={() => setShowConfirmDialog(false)}
          details={
            <div className={styles.confirmDetails}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>File</span>
                <span className={styles.detailValue}>{selectedFile?.name}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Rows</span>
                <span className={styles.detailValue}>{csvMetadata.rowCount.toLocaleString()}</span>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
}
