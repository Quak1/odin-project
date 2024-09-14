import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <h3>Store</h3>
      <ul>
        <li>
          <Link to="#">Home</Link>
        </li>
        <li>
          <Link to="#">Agent</Link>
        </li>
        <li>
          <Link to="#">About</Link>
        </li>
        <li>
          <Link to="#">Blog</Link>
        </li>
        <li>
          <Link to="#">Contact</Link>
        </li>
        <li>
          <Link to="#">Listing</Link>
        </li>
      </ul>

      <ul>
        <li>
          <Link to="#">Twitter icon</Link>
        </li>
        <li>
          <Link to="#">Facebook icon</Link>
        </li>
        <li>
          <Link to="#">Instagram icon</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
