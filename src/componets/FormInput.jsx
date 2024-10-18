import { FormGroup, Label, Input } from "reactstrap";

const FormInput = ({
  id,
  label,
  name,
  type,
  value,
  onBlur,
  onFocus,
  onChange,
  isFocused,
  placeholder,
  rows,
  options,
  error,
  errorMessage,
}) => {
  const focusedStyle = {
    boxShadow: "0 0 0 0.2rem rgba(125, 157, 156, 0.5)",
    borderColor: "#7D9D9C",
  };

  const errorStyle = {
    borderColor: "#dc3545",
    boxShadow: "0 0 0 0.2rem rgba(220, 53, 69, 0.25)",
  };

  const inputStyle = error ? errorStyle : isFocused ? focusedStyle : {};

  return (
    <>
      <FormGroup>
        <Label style={{ fontWeight: "500" }}>{label}</Label>
        {type === "textarea" ? (
          <Input
            id={id}
            name={name}
            type={type}
            value={value}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={onChange}
            placeholder={placeholder}
            error={error}
            style={inputStyle}
            rows={rows}
            as="textarea"
          />
        ) : type === "select" ? (
          <Input
            id={id}
            name={name}
            type={type}
            value={value}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={onChange}
            error={error}
            style={inputStyle}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Input>
        ) : (
          <Input
            id={id}
            name={name}
            type={type}
            value={value}
            onBlur={onBlur}
            onFocus={onFocus}
            onChange={onChange}
            placeholder={placeholder}
            error={error}
            style={inputStyle}
          />
        )}
      </FormGroup>
      {error && <p className="text-danger small">{errorMessage}</p>}
    </>
  );
};

export default FormInput;
