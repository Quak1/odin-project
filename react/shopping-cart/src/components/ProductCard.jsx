import { Link, useOutletContext } from "react-router-dom";
import styles from "./styles/ProductCard.module.css";
import { formatPrice, Product } from "../utils";
import PropTypes from "prop-types";
import AddCartIcon from "../components/icons/AddCartIcon";

const ProductCard = ({ product }) => {
  const { addToCart } = useOutletContext();

  return (
    <article className={styles.container}>
      <div className={styles.top}>
        <Link to={"../product/" + product.id}>
          <img src={product.image} alt={product.title} />
        </Link>
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <p className={styles.info}>
            <Link to={"../product/" + product.id}>{product.title}</Link>
          </p>
          <p className={styles.price}>{formatPrice(product.price)}</p>
        </div>
        <div className={styles.right}>
          <button onClick={() => addToCart(product, 1)}>
            <AddCartIcon />
          </button>
        </div>
      </div>
    </article>
  );
};

ProductCard.propTypes = {
  product: PropTypes.exact(Product),
};

export default ProductCard;
