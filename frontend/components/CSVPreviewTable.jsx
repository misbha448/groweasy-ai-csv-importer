import { useMemo, useState } from 'react';
import ResponsiveTable from './ResponsiveTable';
import styles from './CSVPreviewTable.module.css';

export default function CSVPreviewTable({ 
  data = [],
  fileName = '',
  fileSize = 0,
  rowCount = 0,
  columnCount = 0,
  headers = []
}) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const safeData = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const sourceHeaders = headers.length > 0 ? headers : Object.keys(safeData[0] || {});
  const displayRowCount = rowCount || safeData.length;
  const displayColumnCount = columnCount || sourceHeaders.length;
  const columns = sourceHeaders.map((key, index) => ({
    key,
    label: key,
    width: index === 0 ? '220px' : '180px',
    render: (value) => String(value ?? '')
  }));

  const filteredData = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return safeData;
    return safeData.filter((row) => (
      sourceHeaders.some((header) => String(row[header] ?? '').toLowerCase().includes(term))
    ));
  }, [safeData, search, sourceHeaders]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
  const currentPage = Math.min(page, totalPages);
  const pagedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  if (safeData.length === 0) {
    return null;
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Preview</h3>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.label}>File</span>
            <span className={styles.value}>{fileName}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>Size</span>
            <span className={styles.value}>{formatFileSize(fileSize)}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>Rows</span>
            <span className={styles.value}>{displayRowCount.toLocaleString()}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>Columns</span>
            <span className={styles.value}>{displayColumnCount}</span>
          </div>
        </div>
      </div>

      <div className={styles.detected}>
        <span className={styles.detectedLabel}>Detected columns</span>
        <div className={styles.columnChips}>
          {sourceHeaders.slice(0, 12).map((header) => (
            <span key={header}>{header}</span>
          ))}
          {sourceHeaders.length > 12 && <span>+{sourceHeaders.length - 12} more</span>}
        </div>
      </div>

      <div className={styles.toolbar}>
        <label className={styles.searchLabel}>
          <span>Search rows</span>
          <input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Search preview data"
          />
        </label>
        <label className={styles.rowsLabel}>
          <span>Rows per page</span>
          <select
            value={rowsPerPage}
            onChange={(event) => {
              setRowsPerPage(Number(event.target.value));
              setPage(1);
            }}
          >
            {[10, 25, 50, 100].map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.tableContainer}>
        <ResponsiveTable 
          columns={columns}
          data={pagedData}
          striped={true}
          hoverable={true}
        />
      </div>

      <div className={styles.pagination}>
        <span>
          Showing {filteredData.length === 0 ? 0 : ((currentPage - 1) * rowsPerPage) + 1}
          {' '}to {Math.min(currentPage * rowsPerPage, filteredData.length)}
          {' '}of {filteredData.length.toLocaleString()} rows
        </span>
        <div className={styles.pageActions}>
          <button type="button" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} / {totalPages}</span>
          <button type="button" onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
}
