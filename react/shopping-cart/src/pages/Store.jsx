import { useState, useEffect } from "react";
import { useOutletContext, useParams, useSearchParams } from "react-router-dom";

import StoreHeader from "../components/StoreHeader";
import ProductCard from "../components/ProductCard";

import { PAGE_SIZE, CATEGORIES } from "../utils";
import PageNavigator from "../components/PageNavigator";

import styles from "./styles/Store.module.css";

const Store = () => {
  const { category } = useParams();
  const { products } = useOutletContext();
  const [query] = useSearchParams();
  const [activeProducts, setActiveProducts] = useState([]);
  const [categoryCount, setCategoryCount] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query]);

  const isValidCategory =
    category === undefined || CATEGORIES.some(([cat]) => cat === category);
  if (!isValidCategory) throw Error("Invalid store category");

  const page = Number(query.get("page")) || 1;

  useEffect(() => {
    const filteredProducts =
      category === undefined
        ? products
        : products.filter((entry) => entry.category === category);
    setCategoryCount(filteredProducts.length || 0);
    setActiveProducts(
      filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    );
  }, [page, category, products]);

  return (
    <main className={styles.container}>
      <StoreHeader />
      <div className={styles.grid}>
        {activeProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <PageNavigator productCount={categoryCount} page={page} />{" "}
    </main>
  );
};

export default Store;
