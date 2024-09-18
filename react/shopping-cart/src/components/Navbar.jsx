import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Navbar = ({ cartCount }) => {
  return (
    <nav>
      <h3>Store</h3>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/store">Store</NavLink>
        </li>
        <li>
          <NavLink to="/cart">Cart {cartCount}</NavLink>
        </li>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  cartCount: PropTypes.number.isRequired,
};

export default Navbar;
