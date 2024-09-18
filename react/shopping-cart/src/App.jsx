import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { getCartCount } from "./utils";
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
      <Outlet
        context={{
          products,
          cart,
          addToCart,
          removeFromCart,
          emptyCart,
        }}
      />
      <Footer />
    </>
  );
};

export default App;
