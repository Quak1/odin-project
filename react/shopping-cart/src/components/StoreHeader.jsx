import { Link } from "react-router-dom";
import { CATEGORIES } from "../utils";

const StoreHeader = () => {
  return (
    <div>
      <ul>
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
