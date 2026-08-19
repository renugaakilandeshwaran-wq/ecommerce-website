import Cart from "./pages/Cart.tsx"
import Home from "./pages/Home.tsx"
import Login from "./pages/Login.tsx"
import ProductDetails from "./pages/ProductDetails.tsx"
import Wishlist from "./pages/Wishlist.tsx"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"
import Products from "./components/Products.tsx"

export default function App() {
  return (
    <>
      <BrowserRouter>

        <Navbar />

        <div className="pt-">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/product" element={<Products />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}
