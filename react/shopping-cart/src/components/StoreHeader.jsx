import { Link } from "react-router-dom";
import { CATEGORIES } from "../utils";

import styles from "./styles/StoreHeader.module.css";

const StoreHeader = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.categories}>
        {CATEGORIES.map(([category, name]) => (
          <li key={category}>
            <Link to={"/store/" + category}>{name}</Link>
          </li>
        ))}
        <li>
          <Link to="/store">Show all</Link>
        </li>
      </ul>
    </div>
  );
};

export default StoreHeader;
