import { Link } from "react-router-dom";
import useToken from "../hooks/useToken";

const Header = () => {
  const { token } = useToken();

  return (
    <nav>
      <p>
        <Link to="/">Blog</Link>
      </p>
      <ul>
        {token ? (
          <li>Logout</li>
        ) : (
          <li>
            <Link to="/login">Log in</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
