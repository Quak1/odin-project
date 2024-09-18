import { useParams, useOutletContext } from "react-router-dom";
import { formatPrice } from "../utils";
import { useState } from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const { products, addToCart } = useOutletContext();
  const [quantity, setQuantity] = useState(1);

  // TODO handle data still loading
  if (products.length === 0) return "Loading...";
  const product = products.find((product) => product.id == id);
  if (!product) throw Error("Product not found");

  return (
    <div>
      <div>
        <img src={product.image} alt={product.title} />
      </div>
      <div>
        <p>
          Model: {product.brand} - {product.model}
        </p>
        <h2>{product.title}</h2>
        <ul>
          {product.description.split("\r\n").map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
        <div>
          <p>{formatPrice(product.price)}</p>
          <p>Color: {product.color}</p>
        </div>
        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button onClick={() => addToCart(product, Number(quantity))}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
