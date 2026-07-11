import styles from './StatsCards.module.css';
import Card from './Card';

export default function StatsCards({ stats = {} }) {
  const defaultStats = {
    imported: 0,
    skipped: 0,
    processingTime: 0,
    totalRecords: 0,
    successRate: 0,
    ...stats
  };

  const formatTime = (ms) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const cards = [
    {
      label: 'Total Records',
      value: defaultStats.totalRecords.toLocaleString(),
      icon: 'TR',
      color: 'primary'
    },
    {
      label: 'Imported',
      value: defaultStats.imported.toLocaleString(),
      icon: 'IN',
      color: 'success'
    },
    {
      label: 'Skipped',
      value: defaultStats.skipped.toLocaleString(),
      icon: 'SK',
      color: 'warning'
    },
    {
      label: 'Processing Time',
      value: formatTime(defaultStats.processingTime),
      icon: 'MS',
      color: 'info'
    },
    {
      label: 'Success Rate',
      value: `${defaultStats.successRate}%`,
      icon: 'SR',
      color: 'accent'
    }
  ];

  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <Card key={card.label} className={styles.card}>
          <div className={`${styles.cardContent} ${styles[card.color]}`}>
            <div className={styles.icon}>{card.icon}</div>
            <div className={styles.text}>
              <p className={styles.label}>{card.label}</p>
              <p className={styles.value}>{card.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
