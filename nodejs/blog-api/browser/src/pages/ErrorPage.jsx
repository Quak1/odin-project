import { Link, useRouteError } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  font-family: sans-serif;
  text-align: center;
  margin-top: 100px;

  h1 {
    margin-bottom: 0;
  }
`;
const ErrorPage = () => {
  const error = useRouteError();

  return (
    <Container>
      <h1>Oops! An error has occurred</h1>
      <p>{error.statusText || error.message}</p>
      <Link to="/">Go back home!</Link>
    </Container>
  );
};

export default ErrorPage;
