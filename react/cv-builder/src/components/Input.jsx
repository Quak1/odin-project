export default function Input({ state: [value, setValue], ...rest }) {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <input value={value} onChange={handleChange} placeholder="" {...rest} />
  );
}
