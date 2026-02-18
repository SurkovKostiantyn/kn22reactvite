import styles from './Button.module.css';

function Button(props) {
  const { children, onClick, variant = 'primary' } = props;

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
