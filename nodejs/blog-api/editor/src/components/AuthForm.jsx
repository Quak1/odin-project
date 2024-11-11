import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import styled from "styled-components";
import SButton from "./SubmitButton";

const Error = styled.label`
  color: red;
`;

const Label = styled.label`
  display: block;
  color: ${(props) => props.theme.main};
  font-weight: bold;
  font-size: 18px;
`;

const Form = styled.form`
  width: 100%;

  div {
    margin: 10px 0;
    width: 100%;
  }

  input {
    box-sizing: border-box;
    width: 100%;
    padding: 5px 10px;
    border-radius: 5px;
    border: 2px solid ${(props) => props.theme.gray};
    font-size: inherit;
  }
`;

const SubmitButton = styled(SButton)`
  width: 100%;
`;

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
    <Form onSubmit={handleSubmit(onSubmit)}>
      {errors.root && <Error>{errors.root.message}</Error>}
      {fields.map((entry) => (
        <div key={entry.name}>
          <Label htmlFor={entry.id}>{entry.name}</Label>
          <input
            id={entry.id}
            type={entry.type}
            {...register(entry.id, { required: `${entry.name} is required.` })}
          />
          {errors[entry.id] && (
            <Error htmlFor={entry.id}>{errors[entry.id].message}</Error>
          )}
        </div>
      ))}
      <SubmitButton type="submit">{title}</SubmitButton>
    </Form>
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
