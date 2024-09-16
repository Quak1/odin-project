import { Link } from "react-router-dom";
import classes from "./ProductCard.module.css";
import { formatPrice } from "../utils";

const ProductCard = ({ product }) => {
  return (
    <article>
      <div className="container">
        <div className="top">
          <img
            className={classes.image}
            src={product.image}
            alt={product.title}
          />
        </div>
        <div className="bottom">
          <div className="left">
            <p>
              <Link to={"../product/" + product.id}>{product.title}</Link>
            </p>
            <p>{formatPrice(product.price)}</p>
          </div>
          <div className="right">
            <button>Add to cart</button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
