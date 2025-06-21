import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import { useAppContext } from "./context/AppContext";
import AllProducts from "./pages/AllProducts";
import ProductCard from "./components/ProductCard";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/seller/ProductDetails.jsx";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAdress";
import MyOrders from "./pages/MyOrders";
import SellerLogin from "./components/seller/SellerLogin.jsx";
import SellerLayout from "./pages/seller/SellerLayout.jsx";
import Orders from "./pages/seller/Orders.jsx";
import AddProduct from "./pages/seller/AddProduct.jsx";
import ProductList from "./pages/seller/ProductList.jsx";
import CategoryList from "./pages/seller/CategoryList.jsx";
import EditProduct from "./pages/seller/EditProduct.jsx";
import AddCategory from "./pages/seller/AddCategory.jsx";
import EditCategory from "./pages/seller/EditCategory.jsx";
import CategoryProducts from "./components/CategoryProducts.jsx";
const App = () => {
  const location = useLocation();
  const isSellerPath = location.pathname.includes("seller");
  const { showUserLogin, isSeller } = useAppContext();
  console.log(isSellerPath);
  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />

      <div
        className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            {/* <Route index element={isSeller ? <AddProduct /> : null} /> */}
            <Route path="" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
            <Route path="category-list" element={<CategoryList />} />
            <Route path="category-add" element={<AddCategory />} />
            <Route path="product-add" element={<AddProduct />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="edit-category/:id" element={<EditCategory />} />
          </Route>

          <Route
            path="/products/category/:categoryId"
            element={<CategoryProducts />}
          />
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
