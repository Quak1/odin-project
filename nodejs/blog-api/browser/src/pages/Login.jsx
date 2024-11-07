import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";

import AuthForm from "../components/AuthForm";
import { API_URL } from "../config/constant";

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useOutletContext();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div>
      <h1>Log in</h1>
      <AuthForm
        title="Log in"
        apiUrl={`${API_URL}/users/login`}
        callback={login}
        fields={[
          { id: "username", name: "Username", type: "text" },
          { id: "password", name: "Password", type: "password" },
        ]}
      />
    </div>
  );
};

export default Login;
