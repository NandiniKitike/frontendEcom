import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const BestSeller = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products/getAllProducts"
        );
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.warn("Unexpected product response format:", res.data);
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching best seller products:", err);
        setProducts([]);
      }
    };

    fetchBestSellers();
  }, []);

  const bestSellers = products
    .filter((product) => product.is_active && product.stock_quantity > 0)
    .slice(0, 5);

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Best Seller</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6">
        {bestSellers.length === 0 ? (
          <p>No best sellers found.</p>
        ) : (
          bestSellers.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default BestSeller;
