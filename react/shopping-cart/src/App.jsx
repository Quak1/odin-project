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
  }, []);

  return (
    <>
      <Navbar cartCount={cart.length} />
      <Outlet context={{ products }} />
      <Footer />
    </>
  );
};

export default App;
