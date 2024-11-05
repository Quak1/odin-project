import { useState, useEffect } from "react";

const key = "userToken";

export default function useToken() {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem(key)));

  useEffect(() => {
    if (token === null) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(token));
  }, [token]);

  const removeToken = () => setToken(null);

  return { token, setToken, removeToken };
}
