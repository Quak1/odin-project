import { Link } from "react-router-dom";
import useToken from "../hooks/useToken";

const Header = () => {
  const { token, removeToken } = useToken();

  return (
    <nav>
      <p>
        <Link to="/">Blog</Link>
      </p>
      <ul>
        {token ? (
          <li>
            <button onClick={removeToken}>Log out</button>
          </li>
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
