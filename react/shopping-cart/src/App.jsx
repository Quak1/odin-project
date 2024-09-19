import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { getCartCount } from "./utils";
import "./styles.module.css";

const App = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.in/api/products?limit=150")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  const addToCart = (product, amount, replaceAmount = false) => {
    const productId = product.id;
    let inCart = false;

    const newCart = cart.map((item) => {
      if (item.product.id === productId) {
        inCart = true;
        return {
          ...item,
          amount: replaceAmount ? amount : item.amount + amount,
        };
      } else return item;
    });

    if (!inCart) newCart.push({ product, amount });
    setCart(newCart);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((entry) => entry.product.id !== productId));
  };

  const emptyCart = () => {
    setCart([]);
  };

  return (
    <>
      <Navbar cartCount={getCartCount(cart)} />
      {products.length === 0 ? (
        <p
          style={{ textAlign: "center", fontSize: "30px", fontWeight: "bold" }}
        >
          Loading...
        </p>
      ) : (
        <Outlet
          context={{
            products,
            cart,
            addToCart,
            removeFromCart,
            emptyCart,
          }}
        />
      )}
      <Footer />
    </>
  );
};

export default App;
