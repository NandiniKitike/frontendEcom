import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { BASE_URL } from "../../constant";

import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");
  const { searchQuery } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/Products/getAllProducts`);
        setProducts(res.data); // Assuming API returns array of products
        setFilteredProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  //  Update filtered products based on search
  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="flex flex-col mt-11">
      <div className="block lg:hidden absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate(-1)} // go back
          className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
        >
          <IoIosArrowBack className="text-2xl text-black" />
        </button>
      </div>

      <div className="flex flex-col mb-2 items-start">
        <p className="uppercase text-2xl font-medium">All products</p>
        <div className="w-16 h-0.5 bg-green-500 rounded-full"></div>
      </div>

      {/* Optional search bar  */}

      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {filteredProducts
          .filter((product) => product.is_active)
          .map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
