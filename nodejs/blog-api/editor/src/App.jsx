import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useState } from "react";

import { getUserInfo, clearUserInfo, setUserInfo } from "./utils";
import styled, { ThemeProvider } from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.theme.gray};
  height: 100vh;
`;

const Inner = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-family: sans-serif;
  a {
    color: inherit;
  }
`;

const theme = {
  white: "#FFFFFF",
  black: "#000000",
  accent: "#FCA311",
  main: "#14213D",
  gray: "#E5E5E5",
};

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
    <ThemeProvider theme={theme}>
      <Container>
        <Inner>
          <Header logout={logout} user={user} />
          <Outlet context={{ user, login }} />
        </Inner>
      </Container>
    </ThemeProvider>
  );
}

export default App;
