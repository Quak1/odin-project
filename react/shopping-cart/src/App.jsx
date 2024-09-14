import { Outlet } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <>
      <Navbar cartCount={cart.length} />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
