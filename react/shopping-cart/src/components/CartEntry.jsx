import { Link, useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";

import { formatPrice, Product } from "../utils";

const CartEntry = ({ entry: { product, amount } }) => {
  const { addToCart, removeFromCart } = useOutletContext();

  return (
    <div>
      <img src={product.image} alt={product.title} />
      <div>
        <p>{product.category}</p>
        <p>
          <Link to={"/product/" + product.id}>{product.title}</Link>
        </p>
      </div>
      <input
        type="number"
        value={amount}
        onChange={(e) => addToCart(product, Number(e.target.value), true)}
        min={1}
      />
      <p>{formatPrice(product.price * amount)}</p>
      <button onClick={() => removeFromCart(product.id)}>remove</button>
    </div>
  );
};

CartEntry.propTypes = {
  entry: PropTypes.exact({
    product: PropTypes.exact(Product),
    amount: PropTypes.number.isRequired,
  }),
};

export default CartEntry;
