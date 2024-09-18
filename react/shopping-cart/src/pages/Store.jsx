import { useState, useEffect } from "react";
import { useOutletContext, useParams, useSearchParams } from "react-router-dom";

import StoreHeader from "../components/StoreHeader";
import ProductCard from "../components/ProductCard";

import { PAGE_SIZE, CATEGORIES } from "../utils";
import PageNavigator from "../components/PageNavigator";

const Store = () => {
  const { category } = useParams();
  const { products } = useOutletContext();
  const [query] = useSearchParams();
  const [activeProducts, setActiveProducts] = useState([]);
  const [categoryCount, setCategoryCount] = useState();

  const isValidCategory =
    category === undefined || CATEGORIES.some(([cat]) => cat === category);
  if (!isValidCategory) throw Error("Invalid store category");

  const page = Number(query.get("page")) || 1;

  useEffect(() => {
    const filteredProducts =
      category === undefined
        ? products
        : products.filter((entry) => entry.category === category);
    setCategoryCount(filteredProducts.length);
    setActiveProducts(
      filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    );
  }, [page, category, products]);

  return (
    <div>
      <StoreHeader />
      {activeProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <PageNavigator productCount={categoryCount} page={page} />
    </div>
  );
};

export default Store;
