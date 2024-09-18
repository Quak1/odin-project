import { Link, useOutletContext } from "react-router-dom";
import classes from "./ProductCard.module.css";
import { formatPrice, Product } from "../utils";
import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  const { addToCart } = useOutletContext();

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
            <button onClick={() => addToCart(product, 1)}>Add to cart</button>
          </div>
        </div>
      </div>
    </article>
  );
};

ProductCard.propTypes = {
  product: PropTypes.exact(Product),
};

export default ProductCard;
