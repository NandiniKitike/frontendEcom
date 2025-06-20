// import React, { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// const EditCategory = () => {
//   const { id } = useParams();
//   const [description, setDescription] = useState("");
//   const [name, setName] = useState("");
//   const [is_active, setIs_active] = useState("");
//   const navigate = useNavigate();

//   // Fetch existing category data when component mounts
//   useEffect(() => {
//     const fetchCategory = async () => {
//       try {
//         const token = localStorage.getItem("bearerToken");
//         const { data } = await axios.get(
//           `http://localhost:5000/api/categories/category/${id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setName(data.name);
//         setDescription(data.description);
//         setIs_active(data.is_active);
//       } catch (error) {
//         toast.error("Failed to fetch category details");
//         console.error("Update category error:", error.response || error);
//       }
//     };

//     fetchCategory();
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("bearerToken");

//       if (!token) {
//         toast.error("Authentication token missing");
//         return;
//       }

//       await axios.put(
//         `http://localhost:5000/api/categories/categoryupdate/${id}`,
//         {
//           name,
//           description,
//           is_active,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       toast.success("Category updated successfully");
//       navigate("/seller/category-list");
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to update category");
//     }
//   };
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE_URL = axios.defaults.baseURL;

const EditCategory = () => {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [is_active, setIs_active] = useState("");
  const navigate = useNavigate();

  // Fetch existing category data when component mounts
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = localStorage.getItem("bearerToken");
        const { data } = await axios.get(
          `${API_BASE_URL}/api/categories/category/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setName(data.name);
        setDescription(data.description);
        setIs_active(data.is_active);
      } catch (error) {
        toast.error("Failed to fetch category details");
        console.error("Fetch category error:", error.response || error);
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("bearerToken");

      if (!token) {
        toast.error("Authentication token missing");
        return;
      }

      await axios.put(
        `${API_BASE_URL}/api/categories/categoryupdate/${id}`,
        {
          name,
          description,
          is_active,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Category updated successfully");
      navigate("/seller/category-list");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update category");
    }
  };
  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-2 max-w-lg">
        <h2 className="text-2xl mb-10 font-bold">Edit Category</h2>

        {/* Category Name */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="category-name">
            Category Name
          </label>
          <input
            type="text"
            id="category-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type here"
            required
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          />
        </div>

        {/* Category Description */}
        <div className="flex flex-col gap-1 max-w-md">
          <label
            className="text-base font-medium"
            htmlFor="category-description"
          >
            Category Description
          </label>
          <textarea
            id="category-description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
          ></textarea>
        </div>

        {/* Category Status */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="category-status">
            Category Status
          </label>
          <input
            type="text"
            id="category-status"
            value={is_active}
            onChange={(e) => setIs_active(e.target.value)}
            placeholder="Type here"
            required
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-8 py-2.5 bg-green-500 text-white font-medium rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
