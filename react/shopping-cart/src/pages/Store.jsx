import { useOutletContext, useParams } from "react-router-dom";

import StoreHeader from "../components/StoreHeader";
import ProductCard from "../components/ProductCard";

const Store = () => {
  const { category } = useParams();
  const { products } = useOutletContext();

  console.log(products);

  return (
    <div>
      <StoreHeader />
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Store;
