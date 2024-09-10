export default function Input({
  state: [value, setValue],
  type = "text",
  required = false,
}) {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <input
      type={type}
      value={value}
      onChange={handleChange}
      required={required}
    />
  );
}
