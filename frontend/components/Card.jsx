import styles from './Card.module.css';

export default function Card({
  children,
  className = '',
  onClick,
  interactive = false,
  ...props
}) {
  const cardClass = `${styles.card} ${interactive ? styles.interactive : ''} ${className}`;

  return (
    <div className={cardClass} onClick={onClick} {...props}>
      {children}
    </div>
  );
}
