import styles from './Button.module.css';

function Button({ children, onClick, variant = 'primary' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.button} ${styles[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;
