'use client';

import { useMemo, useState } from 'react';
import ResponsiveTable from './ResponsiveTable';
import styles from './ResultTable.module.css';

const PAGE_SIZE = 10;

export default function ResultTable({
  data = [],
  records,
  title = 'Import Results'
}) {
  const rows = records || data;
  const resultRows = useMemo(() => (
    Array.isArray(rows) ? rows : []
  ), [rows]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortKey, setSortKey] = useState('created_at');
  const [sortDirection, setSortDirection] = useState('asc');
  const [page, setPage] = useState(1);

  const crmColumns = [
    'created_at',
    'name',
    'email',
    'country_code',
    'mobile_without_country_code',
    'company',
    'city',
    'state',
    'country',
    'lead_owner',
    'crm_status',
    'crm_note',
    'data_source',
    'possession_time',
    'description'
  ];

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = resultRows.filter((row) => {
      const matchesQuery = normalizedQuery.length === 0
        || Object.values(row).some((value) => String(value ?? '').toLowerCase().includes(normalizedQuery));

      const matchesFilter = filter === 'all'
        || (filter === 'email' && String(row.email ?? '').trim() !== '')
        || (filter === 'mobile' && String(row.mobile_without_country_code ?? '').trim() !== '')
        || (filter === 'company' && String(row.company ?? '').trim() !== '');

      return matchesQuery && matchesFilter;
    });

    return [...filtered].sort((a, b) => {
      const aValue = String(a[sortKey] ?? '').toLowerCase();
      const bValue = String(b[sortKey] ?? '').toLowerCase();
      const order = aValue.localeCompare(bValue, undefined, { numeric: true });
      return sortDirection === 'asc' ? order : -order;
    });
  }, [filter, query, resultRows, sortDirection, sortKey]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filteredRows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const columns = crmColumns.map(key => ({
    key,
    label: key,
    width: key === 'description' || key === 'crm_note' ? '260px' : '180px',
    render: (value) => {
      if (value === null || value === undefined || value === '') {
        return <span className={styles.empty}>-</span>;
      }
      if (typeof value === 'boolean') {
        return (
          <span className={value ? styles.success : styles.warning}>
            {value ? 'Yes' : 'No'}
          </span>
        );
      }
      if (typeof value === 'object') {
        return <code className={styles.code}>{JSON.stringify(value)}</code>;
      }
      return value.toString();
    }
  }));

  const handleSortKeyChange = (event) => {
    setSortKey(event.target.value);
    setPage(1);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(1);
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    setPage(1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.count}>
            {filteredRows.length.toLocaleString()} of {resultRows.length.toLocaleString()} records
          </span>
        </div>
      </div>

      <div className={styles.toolbar}>
        <label className={styles.searchLabel}>
          <span className={styles.srOnly}>Search records</span>
          <input
            value={query}
            onChange={handleQueryChange}
            className={styles.search}
            type="search"
            placeholder="Search CRM records..."
          />
        </label>

        <label className={styles.control}>
          <span>Filter</span>
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All records</option>
            <option value="email">With email</option>
            <option value="mobile">With mobile</option>
            <option value="company">With company</option>
          </select>
        </label>

        <label className={styles.control}>
          <span>Sort</span>
          <select value={sortKey} onChange={handleSortKeyChange}>
            {crmColumns.map((column) => (
              <option key={column} value={column}>{column}</option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className={styles.sortButton}
          onClick={() => setSortDirection((current) => current === 'asc' ? 'desc' : 'asc')}
          aria-label={`Sort ${sortDirection === 'asc' ? 'descending' : 'ascending'}`}
        >
          {sortDirection === 'asc' ? 'Asc' : 'Desc'}
        </button>
      </div>

      <div className={styles.content}>
        <ResponsiveTable
          columns={columns}
          data={pageRows}
          striped={true}
          hoverable={true}
        />
      </div>

      <div className={styles.pagination}>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className={styles.pageActions}>
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
