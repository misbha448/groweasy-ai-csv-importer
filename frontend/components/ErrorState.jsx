import styles from './ErrorState.module.css';
import Button from './Button';

export default function ErrorState({ 
  icon = '⚠️',
  title = 'Something went wrong',
  description = 'An unexpected error occurred. Please try again.',
  action = null,
  onRetry = null
}) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.actions}>
        {onRetry && (
          <Button variant="primary" onClick={onRetry}>
            Try Again
          </Button>
        )}
        {action && action}
      </div>
    </div>
  );
}
