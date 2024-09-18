import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import styles from "./styles/Navbar.module.css";
import CartIcon from "./icons/CartIcon";

const Navbar = ({ cartCount }) => {
  return (
    <nav className={styles.container}>
      <h3 className={styles.title}>Store</h3>
      <ul className={styles.links}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/store">Store</NavLink>
        </li>
        <li title={`Cart ${cartCount} items`}>
          <NavLink to="/cart">
            <CartIcon />
            <span>{cartCount}</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  cartCount: PropTypes.number.isRequired,
};

export default Navbar;
