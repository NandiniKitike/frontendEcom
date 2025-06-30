// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import ProductCard from "../components/ProductCard";

// const CategoryProducts = () => {
//   const { categoryId } = useParams();
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProductsByCategory = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/products/category/${categoryId}`
//         );
//         if (res.data.success && Array.isArray(res.data.products)) {
//           setProducts(res.data.products);
//         } else {
//           setProducts([]);
//           console.warn("Unexpected response:", res.data);
//         }
//       } catch (err) {
//         console.error("Error fetching products by category:", err);
//         setProducts([]);
//       }
//     };

//     if (categoryId) fetchProductsByCategory();
//   }, [categoryId]);

//   return (
//     <div className="mt-16 px-4">
//       <h2 className="text-2xl font-semibold mb-4">Products</h2>
//       {products.length === 0 ? (
//         <p>No products found in this category.</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {products.map((product) => (
//             <ProductCard
//               key={product._id}
//               product={product}
//               navigate={navigate}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoryProducts;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { BASE_URL } from "../../constant";
import { IoIosArrowBack } from "react-icons/io";

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/api/products/category/${categoryId}`
        );
        if (res.data.success && Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          setProducts([]);
          console.warn("Unexpected response:", res.data);
        }
      } catch (err) {
        console.error("Error fetching products by category:", err);
        setProducts([]);
      }
    };

    if (categoryId) fetchProductsByCategory();
  }, [categoryId]);

  return (
    <div className="mt-16 px-4">
      <div className="block lg:hidden absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate(-1)} // go back
          className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
        >
          <IoIosArrowBack className="text-2xl text-black" />
        </button>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Products</h2>
      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              navigate={navigate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
