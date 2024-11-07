import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import AuthForm from "../components/AuthForm";
import { API_URL } from "../config/constant";

const Signup = () => {
  const navigate = useNavigate();
  const { user } = useOutletContext();

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div>
      <h1>Log in</h1>
      <AuthForm
        title="Sign up"
        apiUrl={`${API_URL}/users`}
        callback={() => navigate("/login")}
        fields={[
          { id: "username", name: "Username", type: "text" },
          { id: "password", name: "Password", type: "password" },
          {
            id: "passwordConfirmation",
            name: "Password confirmation",
            type: "password",
          },
        ]}
      />
    </div>
  );
};

export default Signup;
