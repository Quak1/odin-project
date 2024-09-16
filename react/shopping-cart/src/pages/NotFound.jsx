import { useRouteError, Link } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();

  return (
    <div>
      <h2>Page not found!</h2>
      <p>{error.message}</p>
      <Link to="/store">Go back to the store</Link>
    </div>
  );
};

export default NotFound;
