import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ user, logout }) => {
  return (
    <nav>
      <p>
        <Link to="/">Blog</Link>
      </p>
      <ul>
        {user ? (
          <li>
            <button onClick={logout}>Log out</button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Log in</Link>
            </li>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
};

export default Header;
