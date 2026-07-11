import styles from './Button.module.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  type = 'button',
  as = 'button',
  onClick,
  className = '',
  ...props
}) {
  const Element = as;
  const buttonClass = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

  return (
    <Element
      className={buttonClass}
      {...(Element === 'button' ? { type, disabled } : {})}
      onClick={onClick}
      {...props}
    >
      {children}
    </Element>
  );
}
