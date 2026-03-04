import styles from './Button.module.css';

function Button(props) {
  const { children, onClick, variant = 'primary', className = '', type = 'button' } = props;

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${className}`.trim()}
    >
      {children}
    </button>
  );
}

export default Button;
