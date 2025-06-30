// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAppContext } from "../context/AppContext";

// const Categories = () => {
//   const { navigate } = useAppContext();
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:5000/api/categories/getCategories"
//         );
//         console.log("API response:", res.data);

//         // Adjust this part based on actual API response structure:
//         // Example 1: If API returns { success: true, categories: [...] }
//         if (res.data.success && Array.isArray(res.data.categories)) {
//           setCategories(res.data.categories);
//         }
//         // Example 2: If API returns { categories: [...] }
//         else if (Array.isArray(res.data.categories)) {
//           setCategories(res.data.categories);
//         }
//         // Example 3: If API returns an array directly
//         else if (Array.isArray(res.data)) {
//           setCategories(res.data);
//         } else {
//           setCategories([]);
//           console.warn("Unexpected API response format");
//         }
//       } catch (error) {
//         console.error("Failed to fetch categories", error);
//         setCategories([]);
//       }
//     };
//     fetchCategories();
//   }, []);

//   return (
//     <div className="mt-16">
//       <p className="text-2xl md:text-3xl font-medium text-black">Categories</p>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6">
//         {categories.length === 0 && <p>No categories found</p>}

//         {categories.map((category) => (
//           <div
//             key={category._id}
//             className="group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center"
//             style={{ backgroundColor: "#f0f0f0" }}
//             onClick={() => navigate(`/products/category/${category._id}`)}
//             title={category.description}
//           >
//             <img
//               src={
//                 category.images && category.images.length > 0
//                   ? category.images[0]
//                   : "/placeholder.png"
//               }
//               alt={category.name}
//               className="group-hover:scale-105 transition max-w-28"
//             />
//             <p className="text-sm font-medium">{category.name}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Categories;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import { BASE_URL } from "../../constant";

// ✅ Use base URL from axios default config

const Categories = () => {
  const { navigate } = useAppContext();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/categories/getCategories`);
        console.log("API response:", res.data);

        if (res.data.success && Array.isArray(res.data.categories)) {
          setCategories(res.data.categories);
        } else if (Array.isArray(res.data.categories)) {
          setCategories(res.data.categories);
        } else if (Array.isArray(res.data)) {
          setCategories(res.data);
        } else {
          setCategories([]);
          console.warn("Unexpected API response format");
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="mt-8 sm:mt-4">
      <p className="text-2xl md:text-3xl font-medium text-black">Categories</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6">
        {categories.length === 0 && <p>No categories found</p>}

        {categories.map((category) => (
          <div
            key={category._id}
            className="group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center"
            style={{ backgroundColor: "#f0f0f0" }}
            onClick={() => navigate(`/products/category/${category._id}`)}
            title={category.description}
          >
            <img
              src={
                category.images && category.images.length > 0
                  ? category.images[0]
                  : "/placeholder.png"
              }
              alt={category.name}
              className="group-hover:scale-105 transition max-w-28"
            />
            <p className="text-sm font-medium">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
