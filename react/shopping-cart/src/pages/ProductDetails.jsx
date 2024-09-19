import { useParams, useOutletContext } from "react-router-dom";
import { formatPrice } from "../utils";
import { useState } from "react";

import NumberInput from "../components/NumberInput";
import styles from "./styles/ProductDetails.module.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { products, addToCart } = useOutletContext();
  const [quantity, setQuantity] = useState(1);

  // TODO handle data still loading
  if (products.length === 0) return "Loading...";
  const product = products.find((product) => product.id == id);
  if (!product) throw Error("Product not found");

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={product.image} alt={product.title} />
      </div>
      <div className={styles.right}>
        <p className={styles.model}>
          Model: {product.brand} - {product.model}
        </p>
        <h2 className={styles.title}>{product.title}</h2>
        <ul className={styles.description}>
          {product.description.split("\r\n").map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
        <div className={styles.details}>
          <p>{formatPrice(product.price)}</p>
          <p>Color: {product.color}</p>
        </div>
        <div className={styles.addToCart}>
          <div className={styles.input}>
            <label htmlFor="quantity">Quantity</label>
            <NumberInput
              id="quantity"
              value={quantity}
              setValue={setQuantity}
            />
          </div>
          <button onClick={() => addToCart(product, Number(quantity))}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
