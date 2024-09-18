import { Link } from "react-router-dom";
import { PAGE_SIZE } from "../utils";
import PropTypes from "prop-types";

const PageNavigator = ({ productCount, page }) => {
  const pageCount = Math.ceil(productCount / PAGE_SIZE);
  const numbers = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <ul>
      {page >= 2 && (
        <li>
          <Link to={"?page=" + (page - 1)}>{"< Prev"}</Link>
        </li>
      )}
      {numbers.map((num) => (
        <li key={num}>
          <Link to={"?page=" + num}>
            {num}
            {num === page && " active"}
          </Link>
        </li>
      ))}
      {pageCount > 1 && page < pageCount && (
        <li>
          <Link to={"?page=" + (page + 1)}>{"Next >"}</Link>
        </li>
      )}
    </ul>
  );
};

PageNavigator.propTypes = {
  productCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

export default PageNavigator;
