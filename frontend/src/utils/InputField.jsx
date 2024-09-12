const InputField = ({
  label,
  onChange,
  type,
  name,
  placeholder,
  value,
  required,
}) => {
  return (
    <div>
      <label className="form-label">{label}</label>
      <input
        className="form-control custom-input"
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default InputField;
