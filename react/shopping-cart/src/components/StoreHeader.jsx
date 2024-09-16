import { Link } from "react-router-dom";

const StoreHeader = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="tv">TV</Link>
        </li>
        <li>
          <Link to="audio">Audio</Link>
        </li>
        <li>
          <Link to="laptop">Laptop</Link>
        </li>
        <li>
          <Link to="mobile">Mobile</Link>
        </li>
        <li>
          <Link to="gaming">Gaming</Link>
        </li>
        <li>
          <Link to="appliances">Appliances</Link>
        </li>
        <li>
          <Link to="">Show all</Link>
        </li>
      </ul>
    </div>
  );
};

export default StoreHeader;
