import styles from './EmptyState.module.css';

export default function EmptyState({ 
  icon = '📭',
  title = 'No data',
  description = 'There\'s nothing here yet.',
  action = null 
}) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
