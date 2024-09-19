import { Link, useOutletContext } from "react-router-dom";
import PropTypes from "prop-types";

import NumberInput from "./NumberInput";
import { capitalizeFirst, formatPrice, Product } from "../utils";
import styles from "./styles/CartEntry.module.css";

const CartEntry = ({ entry: { product, amount } }) => {
  const { addToCart, removeFromCart } = useOutletContext();

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <img src={product.image} alt={product.title} />
      </div>
      <div className={styles.title}>
        <p>{capitalizeFirst(product.category)}</p>
        <Link to={"/product/" + product.id}>{product.title}</Link>
      </div>
      <div className={styles.quantity}>
        <NumberInput
          value={amount}
          setValue={(num) => addToCart(product, num, true)}
          min={1}
        />
      </div>
      <p>{formatPrice(product.price * amount)}</p>
      <button
        onClick={() => removeFromCart(product.id)}
        title="Remove from cart"
      >
        ✕
      </button>
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
