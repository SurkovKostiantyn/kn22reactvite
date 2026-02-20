import styles from './Button.module.css';

function Button(props) {
  const { children, onClick, variant = 'primary', className = '' } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${className}`.trim()}
    >
      {children}
    </button>
  );
}

export default Button;
