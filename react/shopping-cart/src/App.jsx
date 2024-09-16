import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import data from "./products.json";

const App = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data.products);
    setCart([
      { product: data.products[0], amount: 1 },
      { product: data.products[1], amount: 2 },
    ]);
  }, []);

  const addToCart = (product, amount, replaceAmount = false) => {
    const productId = product.id;
    let inCart = false;

    const newCart = cart.map((item) => {
      if (item.id === productId) {
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

  return (
    <>
      <Navbar cartCount={cart.length} />
      <Outlet context={{ products, cart, addToCart, removeFromCart }} />
      <Footer />
    </>
  );
};

export default App;
