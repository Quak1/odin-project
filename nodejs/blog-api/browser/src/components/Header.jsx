import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { EDITOR_URL } from "../config/constant";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-weight: bold;
    font-size: 36px;
    color: ${(props) => props.theme.main};
    a {
      text-decoration: none;
      display: block;
    }
    a:last-child {
      font-size: 16px;
      text-decoration: underline;
    }
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
    font-size: 18px;
    text-align: center;
    margin-top: 5px;
    button {
      background: none;
      border: 2px solid ${(props) => props.theme.accent};
      border-radius: 5px;
      padding: 5px 10px;
      font-size: 16px;
      cursor: pointer;
    }
  }
`;

const Header = ({ user, logout }) => {
  return (
    <Nav>
      <p>
        <Link to="/">Blog</Link>
        <a href={EDITOR_URL}>Post editor</a>
      </p>
      <ul>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>
              <button onClick={logout}>Log out</button>
            </li>
          </>
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
    </Nav>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
};

export default Header;
