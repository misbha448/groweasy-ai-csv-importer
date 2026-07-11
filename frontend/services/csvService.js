import Papa from 'papaparse';
import { processCSV, uploadCSV as uploadViaApi } from '../lib/api';

export async function uploadCSV(file) {
  return uploadViaApi(file);
}

export async function parseCSVLocally(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: false,
      transformHeader: (header) => header.replace(/^\uFEFF/, ''),
      complete: (results) => {
        if (results.errors?.length) {
          reject(new Error(results.errors[0].message || 'Failed to parse CSV file'));
          return;
        }

        const headers = results.meta?.fields || [];
        const rows = (results.data || []).filter((row) => (
          row && Object.values(row).some((value) => String(value ?? '').trim() !== '')
        ));

        if (headers.length === 0 || rows.length === 0) {
          reject(new Error('Empty CSV file'));
          return;
        }

        resolve({
          headers,
          rows,
          data: rows,
          metadata: {
            rowCount: rows.length,
            columnCount: headers.length,
            headers,
            delimiter: results.meta?.delimiter || ',',
            truncated: Boolean(results.meta?.truncated)
          }
        });
      },
      error: (error) => {
        reject(new Error(error.message || 'Failed to parse CSV file'));
      }
    });
  });
}

export async function validateCSV(data) {
  const hasRows = Array.isArray(data) && data.length > 0;

  return {
    valid: hasRows,
    errors: hasRows ? [] : ['No CSV rows found'],
    warnings: []
  };
}

export async function processCSVWithAI(fileId, options = {}) {
  return processCSV({ fileId, processingOptions: options });
}

export async function getProcessingStatus(processId) {
  void processId;
  throw new Error('Processing status endpoint is not available for synchronous imports.');
}

export async function getProcessingResults(processId) {
  void processId;
  throw new Error('Processing results endpoint is not available for synchronous imports.');
}

export async function getImportHistory() {
  return [];
}

export async function cancelProcessing(processId) {
  void processId;
  throw new Error('Cancel endpoint is not available for synchronous imports.');
}
