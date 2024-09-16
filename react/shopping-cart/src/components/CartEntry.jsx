import { Link, useOutletContext } from "react-router-dom";

import { formatPrice } from "../utils";

const CartEntry = ({ cartProduct }) => {
  const { product, amount } = cartProduct;
  const { removeFromCart } = useOutletContext();

  return (
    <div>
      <img src={product.image} alt={product.title} />
      <div>
        <p>{product.category}</p>
        <p>
          <Link to={"/product/" + product.id}>{product.title}</Link>
        </p>
      </div>
      <input type="number" defaultValue={amount} />
      <p>{formatPrice(product.price * amount)}</p>
      <button onClick={() => removeFromCart(product.id)}>remove</button>
    </div>
  );
};

export default CartEntry;
