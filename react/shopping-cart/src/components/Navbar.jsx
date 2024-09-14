import { NavLink } from "react-router-dom";

const Navbar = ({ cartCount }) => {
  return (
    <nav>
      <h3>Store</h3>
      <ul>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/shop">Shop</NavLink>
        </li>
        <li>
          <NavLink to="/cart">Cart {cartCount}</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
