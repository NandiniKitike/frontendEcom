import React from "react";
import { useAppContext } from "../../context/AppContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { Pencil } from "lucide-react";
import { Edit3 } from "lucide-react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
const API_BASE_URL = axios.defaults.baseURL;
const ProductList = () => {
  const { currency } = useAppContext();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const onSubmitHandler = async () => {
    navigate("/seller/product-add");
  };
  const handleEdit = async (id) => {
    navigate("/seller/edit-product/" + id);
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem("bearerToken");
        await axios.delete("${API_BASE_URL}/api/Products/delProduct/" + id, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProduct((prevProducts) => prevProducts.filter((p) => p._id !== id));
        toast.success("Product deleted successfully");
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to delete product"
        );
      }
    }
  };
  const toggleStock = async (id) => {
    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/api/products/toggle-stock/${id}`
      );

      toast.success(data.message);

      setProduct((prev) =>
        prev.map((prod) =>
          prod._id === id
            ? { ...prod, is_active: data.product.is_active }
            : prod
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating status");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("bearerToken");
        const { data } = await axios.get(
          `${API_BASE_URL}/api/Products/getAllProducts?page=${page}&limit=${limit}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("categories", data);
        setTotalPages(data.totalPages);
        setProduct(data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    };

    fetchProducts();
  }, [page]);

  return (
    <div className="flex-1 py-10 flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        {/* Header with title and Add Product button */}
        <div className="flex justify-between  mt-[-50px] items-center pb-4">
          <h2 className="text-2xl font-bold">All Products</h2>
          <button
            onClick={onSubmitHandler}
            className="bg-gray-50 text-black border  px-4 py-2 rounded text-sm hover:bg-black hover:text-white"
          >
            Add Product
          </button>
        </div>

        {/* Product Table */}
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold truncate">Product</th>
                <th className="px-4 py-3 font-semibold truncate">Category</th>
                <th className="px-4 py-3 font-semibold truncate hidden md:block">
                  Selling Price
                </th>
                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                <th className="px-4 py-3 font-semibold truncate">Edit</th>
                <th className="px-4 py-3 font-semibold truncate">Delete</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {product.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-400">
                    No products found.
                  </td>
                </tr>
              ) : (
                product.map((product) => (
                  <tr key={product._id} className="border-t border-gray-500/20">
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                      <div className="border border-gray-300 rounded p-2">
                        <img
                          src={product.images[0]}
                          alt="Product"
                          className="w-16"
                        />
                      </div>
                      <span className="truncate max-sm:hidden w-full">
                        {product.name}
                      </span>
                    </td>
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3 max-sm:hidden">
                      {currency}
                      {product.price}
                    </td>
                    <td className="px-4 py-3">{product.stock_quantity}</td>
                    <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                      <input
                        onChange={(e) =>
                          toggleStock(product._id, e.target.checked)
                        }
                        checked={product.is_active}
                        type="checkbox"
                        className="sr-only peer"
                      />
                      <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-gray-600 transition-colors duration-200"></div>
                      <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                    </label>
                    <td>
                      <button onClick={() => handleEdit(product._id)}>
                        <Edit3 className="w-5 h-5 text-black-600 hover:text-blue-800" />
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleDelete(product._id)}>
                        <Trash2 className="w-5 h-5 text-black-600 hover:text-blue-800" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="px-3 py-1 border">{totalPages ? page : 1}</span>
        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
