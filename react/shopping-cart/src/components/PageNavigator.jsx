import { Link } from "react-router-dom";
import { PAGE_SIZE } from "../utils";
import PropTypes from "prop-types";

import styles from "./styles/PageNavigator.module.css";

const PageNavigator = ({ productCount, page }) => {
  const pageCount = Math.ceil(productCount / PAGE_SIZE);
  const numbers = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <ul className={styles.container}>
      {page >= 2 ? (
        <li>
          <Link to={"?page=" + (page - 1)} className={styles.button}>
            {"< Prev"}
          </Link>
        </li>
      ) : (
        <li className={styles.disabled}>{"< Prev"}</li>
      )}
      {numbers.map((num) => (
        <li key={num}>
          <Link
            to={"?page=" + num}
            className={[styles.number, num === page ? styles.active : ""].join(
              " ",
            )}
          >
            {num}
          </Link>
        </li>
      ))}
      {pageCount > 1 && page < pageCount ? (
        <li>
          <Link to={"?page=" + (page + 1)} className={styles.button}>
            {"Next >"}
          </Link>
        </li>
      ) : (
        <li className={styles.disabled}>{"Next >"}</li>
      )}
    </ul>
  );
};

PageNavigator.propTypes = {
  productCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

export default PageNavigator;
