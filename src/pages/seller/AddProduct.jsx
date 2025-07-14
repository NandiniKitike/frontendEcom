import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../constant";

const AddProduct = () => {
  const [file, setFile] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stock_quantity, setstock_quantity] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const adminData = localStorage.getItem("admin");
      const admin = JSON.parse(adminData);
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/categories/getCategories`,
          {
            headers: {
              Authorization: `Bearer ${admin.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setCategories(data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    };

    fetchCategories();
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("bearerToken");
      if (!token) {
        toast.error("No authentication token found. Please login again.");
        setIsLoading(false);
        return;
      }

      const imageFormData = new FormData();
      file.forEach((img) => {
        if (img) imageFormData.append("files", img);
      });

      const uploadRes = await axios.post(
        `${BASE_URL}/api/Products/upload-image`,
        imageFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const uploadedImageUrls = uploadRes.data.url;

      if (!uploadedImageUrls || uploadedImageUrls.length === 0) {
        toast.error("Image upload failed.");
        return;
      }

      const createProductPayload = {
        name,
        description,
        price,
        stock_quantity,
        is_active: true,
        category_id: category,
        images: uploadedImageUrls,
      };
      const adminData = localStorage.getItem("admin");
      const admin = JSON.parse(adminData);
      const createRes = await axios.post(
        `${BASE_URL}/api/Products/createProduct`,
        createProductPayload,
        {
          headers: {
            Authorization: `Bearer ${admin.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = createRes.data;

      if (data.success) {
        toast.success("Product created successfully");
        navigate("/seller");
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setstock_quantity("");
        setFile([null, null, null, null]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
    setIsLoading(false);
  };
  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <form
        onSubmit={onSubmitHandler}
        className="md:p-10 p-4 space-y-2 max-w-lg"
      >
        <h2 className="text-2xl font-bold">Add Product</h2>
        {/* Image Upload */}
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input
                    type="file"
                    id={`image${index}`}
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const updatedFiles = [...file];
                      updatedFiles[index] = e.target.files[0];
                      setFile(updatedFiles);
                    }}
                  />
                  <img
                    className="max-w-24 cursor-pointer"
                    src={
                      file[index]
                        ? URL.createObjectURL(file[index])
                        : assets.upload_area
                    }
                    alt="upload"
                  />
                </label>
              ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">
            Product Name
          </label>
          <input
            type="text"
            id="product-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type here"
            required
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          />
        </div>

        {/* Product Description */}
        <div className="flex flex-col gap-1 max-w-md">
          <label
            className="text-base font-medium"
            htmlFor="product-description"
          >
            Product Description
          </label>
          <textarea
            id="product-description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
          ></textarea>
        </div>

        {/* Category Dropdown */}
        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          >
            <option value="">Select Category</option>
            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price Fields */}
        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="product-price">
              Product Price
            </label>
            <input
              type="number"
              id="product-price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              required
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offer-price">
              stock_quantity
            </label>
            <input
              type="number"
              id="stock_quantity"
              value={stock_quantity}
              onChange={(e) => setstock_quantity(e.target.value)}
              placeholder="0"
              required
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`px-8 py-2.5 font-medium rounded text-white ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-black"
          }`}
        >
          {isLoading ? "Adding..." : "ADD"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
