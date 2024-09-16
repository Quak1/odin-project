import { useParams, useOutletContext } from "react-router-dom";
import { formatPrice } from "../utils";

const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useOutletContext();

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
          <input id="quantity" type="number" defaultValue="1" />
          <button>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
