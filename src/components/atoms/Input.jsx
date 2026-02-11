function Input({ type, placeholder, label }) {
    return (
        <label>
            {label}
            <input type={type} placeholder={placeholder} />
        </label>
    )
}

export default Input;