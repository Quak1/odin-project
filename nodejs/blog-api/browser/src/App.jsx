import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useState } from "react";

import { getUserInfo, clearUserInfo, setUserInfo } from "./utils";

function App() {
  const [user, setUser] = useState(getUserInfo());

  const login = ({ username, id, token }) => {
    setUser({ username, id, token });
    setUserInfo(id, username, token);
  };

  const logout = () => {
    setUser(null);
    clearUserInfo();
  };

  return (
    <>
      <Header logout={logout} user={user} />
      <Outlet context={{ user, login }} />
    </>
  );
}

export default App;
