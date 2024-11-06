import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm();
  const { setToken, token } = useToken();

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  async function onSubmit(formData) {
    try {
      const api = `${import.meta.env.VITE_BACKEND_URL}/users/login`;
      const res = await fetch(api, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) {
        if (typeof data.errors === "string") {
          setError("root", { type: "custom", message: data.errors });
          reset({ password: "" }, { keepErrors: true });
        } else
          Object.entries(data.errors).forEach(([key, value]) => {
            setError(key, { type: "custom", message: value });
          });
      } else {
        setToken(data.token);
        location.reload();
      }
    } catch (error) {
      setError("content", { type: "custom", message: error.message });
    }
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.root && <p>{errors.root.message}</p>}
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            {...register("username", { required: "Username is required." })}
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
