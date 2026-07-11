import styles from './ResponsiveTable.module.css';

export default function ResponsiveTable({ 
  columns = [],
  data = [],
  striped = true,
  hoverable = true,
  maxHeight = 560
}) {
  if (data.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No data to display</p>
      </div>
    );
  }

  return (
    <div
      className={styles.tableWrapper}
      style={{
        '--table-max-height': `${maxHeight}px`,
        '--table-min-width': `${Math.max(columns.length * 180, 960)}px`
      }}
    >
      <table className={`${styles.table} ${striped ? styles.striped : ''} ${hoverable ? styles.hoverable : ''}`}>
        <thead>
          <tr>
            {columns.map((col, columnIndex) => (
              <th
                key={`${col.key}-${columnIndex}`}
                scope="col"
                style={col.width ? { width: col.width } : {}}
                title={String(col.label ?? '')}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, columnIndex) => (
                <td key={`${rowIndex}-${col.key}-${columnIndex}`}>
                  <span className={styles.cellText} title={String(row[col.key] ?? '')}>
                    {col.render
                      ? col.render(row[col.key], row, rowIndex)
                      : String(row[col.key] ?? '')}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
