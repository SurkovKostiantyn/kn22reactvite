import styles from './Input.module.css';

function Input(props) {
  const { type, placeholder, label, id, name, value, onChange } = props;

  return (
    <label>
      {label}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        id={id}
        name={name}
      />
    </label>
  );
}

export default Input;
