import { useState } from "react";
import { formatPrice, getDiscountedPrice } from "../utils";
import { useOutletContext } from "react-router-dom";

import CartEntry from "../components/CartEntry";

const Cart = () => {
  const [discount, setDiscount] = useState(0);
  const { cart } = useOutletContext();
  const itemCount = cart.reduce((count, product) => count + product.amount, 0);
  const total = cart.reduce(
    (total, product) => total + product.product.price * product.amount,
    0,
  );

  return (
    <div>
      <div>
        <div>
          <h2>Shopping Cart</h2>
          <p>
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
        </div>
        <div>
          {cart.map((cartEntry) => (
            <CartEntry key={cartEntry.product.id} cartProduct={cartEntry} />
          ))}
        </div>
        <a href="/store">Back to store</a>
      </div>
      <div>
        <h2>Summary</h2>
        <div>
          <p>Items ({itemCount}):</p>
          <p>{formatPrice(total)}</p>
        </div>
        <div>
          <p>Shipping: </p>
          <p>{formatPrice(0)}</p>
        </div>
        <div>
          <label htmlFor="discount-code">Discount Code:</label>
          <input type="text" id="dicount-code" />
        </div>
        <div>
          <p>Total price:</p>
          <p>{getDiscountedPrice(total, discount)}</p>
        </div>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
