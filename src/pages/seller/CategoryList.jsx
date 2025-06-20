import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Edit3 } from "lucide-react";
import { Trash2 } from "lucide-react";
// import { useAppContext } from "../../context/AppContext";
const CategoryList = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("bearerToken");
        const { data } = await axios.get(
          "http://localhost:5000/api/categories/getCategories",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("categories", data);

        // ✅ Directly set data since it's already an array
        setCategory(data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    };

    fetchCategories();
  }, []);

  const onSubmitHandler = async () => {
    navigate("/seller/category-add");
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("bearerToken");
        await axios.delete(
          "http://localhost:5000/api/categories/delCategory/" + id,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCategory((prevProducts) => prevProducts.filter((p) => p._id !== id));
        toast.success("Product deleted successfully");
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to delete product"
        );
      }
    }
  };

  const handleEdit = async (id) => {
    navigate("/seller/edit-category/" + id);
  };
  return (
    <div className="flex-1 py-10 flex flex-col mt-[-10px] justify-between">
      <div className="w-full md:p-10 p-4">
        <div className="flex justify-between  mt-[-50px] items-center pb-4">
          <h2 className="text-2xl font-bold ">All Categories</h2>
          <button
            onClick={onSubmitHandler}
            className="bg-gray-200 text-black px-4 py-2 rounded hover:text-white hover:bg-black text-sm ml-[75%] mb-4"
          >
            Add Category
          </button>
        </div>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate">Name</th>
                <th className="px-4 py-3 font-semibold truncate">
                  Description
                </th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">
                  Status
                </th>
                <th className="px-4 py-3 font-semibold truncate">Edit</th>
                <th className="px-4 py-3 font-semibold truncate">Delete</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {category.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-400">
                    No categories found.
                  </td>
                </tr>
              ) : (
                category?.map((cat) => (
                  <tr key={cat._id} className="border-t border-gray-500/20">
                    <td className="px-4 py-3">
                      {cat.images && cat.images.length > 0 ? (
                        <img
                          src={cat.images[0]}
                          alt={cat.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      ) : (
                        <span className="text-gray-400">No image</span>
                      )}
                    </td>
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                      <span className="truncate max-sm:hidden w-full">
                        {cat.name}
                      </span>
                    </td>
                    <td className="px-4 py-3">{cat.description}</td>
                    <td className="px-4 py-3">
                      {cat.is_active ? "Active" : "Inactive"}
                    </td>
                    <td>
                      <button onClick={() => handleEdit(cat._id)}>
                        <Edit3 className="w-5 h-5 text-gray-500 hover:text-gray-500" />
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(cat._id)}>
                        <Trash2 className="w-5 h-5 text-gray-500 hover:text-gray-500" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
