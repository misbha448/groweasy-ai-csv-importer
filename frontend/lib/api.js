// Lightweight API client using fetch with timeout and retry.
const API_BASE = process.env.NEXT_PUBLIC_API_URL;

function getApiBase() {
  if (!API_BASE) {
    throw new Error('NEXT_PUBLIC_API_URL is not configured.');
  }

  const normalizedBase = API_BASE.replace(/\/$/, '');
  return normalizedBase.endsWith('/api') ? normalizedBase : `${normalizedBase}/api`;
}

function timeoutFetch(resource, options = {}, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('AI processing timed out. Please try again with a smaller file or retry later.'));
    }, timeout);

    fetch(resource, options)
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

async function withRetry(fn, attempts = 2) {
  let lastErr;
  for (let i = 0; i <= attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      // on last attempt, throw
      if (i === attempts) break;
      // small backoff
      await new Promise(r => setTimeout(r, 500 * (i + 1)));
    }
  }
  throw lastErr;
}

function parseErrorMessage(status, fallback, body) {
  if (!body) return fallback || `Request failed with status ${status}`;

  try {
    const parsed = JSON.parse(body);
    return parsed?.error?.message || parsed?.message || fallback || `Request failed with status ${status}`;
  } catch {
    return body || fallback || `Request failed with status ${status}`;
  }
}

function buildError(status, message, body) {
  const error = new Error(parseErrorMessage(status, message, body));
  error.status = status;
  error.body = body;
  return error;
}

export function normalizeImportResponse(response) {
  const summary = response?.summary || {};
  const records = Array.isArray(response?.records) ? response.records : [];
  const skippedRecords = Array.isArray(response?.skippedRecords) ? response.skippedRecords : [];

  return {
    success: Boolean(response?.success),
    records,
    skippedRecords,
    summary: {
      totalRows: summary.totalRows ?? summary.total ?? records.length + skippedRecords.length,
      processedRows: summary.processedRows ?? summary.processed ?? records.length,
      importedRows: summary.importedRows ?? summary.imported ?? records.length,
      skippedRows: summary.skippedRows ?? summary.skipped ?? skippedRecords.length,
      processingTime: summary.processingTime ?? 0
    }
  };
}

export async function uploadCSV(file, timeout = 10 * 60 * 1000) {
  if (!file) {
    throw new Error('Choose a CSV file before importing.');
  }

  return withRetry(async () => {
    const fd = new FormData();
    fd.append('file', file, file.name);

    const res = await timeoutFetch(`${getApiBase()}/upload`, {
      method: 'POST',
      body: fd
    }, timeout);

    if (!res.ok) {
      const text = await res.text().catch(() => null);
      throw buildError(res.status, res.statusText || 'Upload failed', text);
    }

    const payload = await res.json();
    return normalizeImportResponse(payload);
  }, 0);
}

export async function processCSV(processPayload, timeout = 60000) {
  void processPayload;
  void timeout;
  throw new Error('CSV processing is handled by the upload endpoint.');
}

const api = { uploadCSV, processCSV, normalizeImportResponse };

export default api;
