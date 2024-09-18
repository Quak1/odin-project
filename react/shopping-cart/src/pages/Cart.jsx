import { useState } from "react";
import {
  formatPrice,
  getCartCount,
  getDiscountAmount,
  DISCOUNT_CODES,
} from "../utils";
import { useOutletContext } from "react-router-dom";

import CartEntry from "../components/CartEntry";

const Cart = () => {
  const [discount, setDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const { cart, emptyCart } = useOutletContext();

  const itemCount = getCartCount(cart);
  const total = cart.reduce(
    (total, product) => total + product.product.price * product.amount,
    0,
  );
  const discountAmount = getDiscountAmount(total, discount);
  const discountedPrice = total - discountAmount;
  const shipping = total > 150 || total === 0 ? 0 : 20;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    alert("Checkout success!\nYour cart will be emptied.");
    emptyCart();
  };

  const handleSubmitDiscountCode = (e) => {
    e.preventDefault();
    const item = DISCOUNT_CODES.find((entry) => entry.code === discountCode);
    if (!item) return;
    setDiscount(item.discount);
    setDiscountCode("");
  };

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
            <CartEntry key={cartEntry.product.id} entry={cartEntry} />
          ))}
        </div>
        <a href="/store">Back to store</a>
      </div>
      <div>
        <h2>Summary</h2>
        <div>
          <p>Items ({itemCount}):</p>
          <p>{formatPrice(total)}</p>
          {discount > 0 && <p>-{formatPrice(discountAmount)}</p>}
        </div>
        <div>
          <p>Shipping: </p>
          <p>{formatPrice(shipping)}</p>
        </div>
        <form onSubmit={handleSubmitDiscountCode}>
          <label htmlFor="discount-code">Discount Code:</label>
          <input
            type="text"
            id="dicount-code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          <button type="submit">Enter</button>
        </form>
        <div>
          <p>Total price:</p>
          <p>{formatPrice(discountedPrice + shipping)}</p>
        </div>
        <button onClick={handleCheckout}> Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
