import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

const App = () => {
  const location = useLocation(); // 👈 Needed for dynamic route check
  const isSellerPath = location.pathname.includes("seller");

  return (
    <div>
      {/* ✅ Include Toaster component */}
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />

      <Navbar />

      <div
        className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
