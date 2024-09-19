import { useState } from "react";
import {
  formatPrice,
  getCartCount,
  getDiscountAmount,
  DISCOUNT_CODES,
} from "../utils";
import { useOutletContext, Link } from "react-router-dom";

import CartEntry from "../components/CartEntry";
import styles from "./styles/Cart.module.css";

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
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.header}>
          <h2>Shopping Cart</h2>
          <p>
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
        </div>
        <hr />
        <div className={styles.content}>
          {cart.map((cartEntry) => (
            <CartEntry key={cartEntry.product.id} entry={cartEntry} />
          ))}
        </div>
        <Link to="/store">← Back to store</Link>
      </div>
      <div className={styles.right}>
        <h2 className={styles.header}>Summary</h2>
        <hr />
        <div className={styles.priceEntry}>
          <p>Items ({itemCount}):</p>
          <p>{formatPrice(total)}</p>
        </div>
        {discount > 0 && (
          <div className={styles.priceEntry}>
            <p>Discount:</p>
            <p>-{formatPrice(discountAmount)}</p>
          </div>
        )}
        <div className={styles.priceEntry}>
          <p>Shipping: </p>
          <p>{formatPrice(shipping)}</p>
        </div>
        <form onSubmit={handleSubmitDiscountCode} className={styles.code}>
          <label htmlFor="discount-code">Discount Code:</label>
          <div className={styles.input}>
            <input
              type="text"
              id="dicount-code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button type="submit">→</button>
          </div>
        </form>
        <div className={styles.priceEntry}>
          <p>Total price:</p>
          <p>{formatPrice(discountedPrice + shipping)}</p>
        </div>
        <button onClick={handleCheckout}> Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
