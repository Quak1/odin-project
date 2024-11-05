import useToken from "../hooks/useToken";

const Header = () => {
  const { token } = useToken();

  return (
    <nav>
      <p>Blog</p>
      <ul>{token ? <li>Logout</li> : <li>Login</li>}</ul>
    </nav>
  );
};

export default Header;
