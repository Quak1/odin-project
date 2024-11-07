import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

const AuthForm = ({ title, fields, callback, apiUrl }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();

  async function onSubmit(formData) {
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) {
        if (typeof data.errors === "string") {
          setError("root", { type: "custom", message: data.errors });
          reset({ password: "", passwordConfirm: "" }, { keepErrors: true });
        } else
          Object.entries(data.errors).forEach(([key, value]) => {
            setError(key, { type: "custom", message: value });
          });
      } else {
        callback(data);
      }
    } catch (error) {
      setError("content", { type: "custom", message: error.message });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors.root && <p>{errors.root.message}</p>}
      {fields.map((entry) => (
        <div key={entry.name}>
          <label htmlFor={entry.id}>{entry.name}</label>
          <input
            id={entry.id}
            type={entry.type}
            {...register(entry.id, { required: `${entry.name} is required.` })}
          />
          {errors[entry.id] && <p>{errors[entry.id].message}</p>}
        </div>
      ))}
      <button type="submit">{title}</button>
    </form>
  );
};

AuthForm.propTypes = {
  title: PropTypes.string,
  apiUrl: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
    }),
  ),
  callback: PropTypes.func,
};

export default AuthForm;
