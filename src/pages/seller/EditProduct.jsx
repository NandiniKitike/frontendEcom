import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../constant";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock_quantity, setStock_quantity] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("bearerToken");
        const { data } = await axios.get(
          `${BASE_URL}/api/categories/getCategories`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCategories(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load categories.");
      }
    };

    const fetchProductDetails = async () => {
      try {
        const token = localStorage.getItem("bearerToken");
        const { data } = await axios.get(
          `${BASE_URL}/api/products/getProduct/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const product = data;
        setName(product.name);
        setDescription(product.description);
        setCategory(product.category_id);
        setPrice(product.price);
        setStock_quantity(product.stock);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load product details.");
      }
    };

    fetchCategories();
    if (id) fetchProductDetails();
  }, [id]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("bearerToken");
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

      const uploadedImageUrls = uploadRes.url;

      if (!uploadedImageUrls || uploadedImageUrls.length === 0) {
        toast.error("Image upload failed.");
        return;
      }

      const payload = {
        name,
        description,
        price,
        stock_quantity,
        is_active: true,
        category_id: category,
        images: uploadedImageUrls,
      };
      console.log("Updating product ID:", id);
      const response = await axios.put(
        `${BASE_URL}/api/Products/updateProduct/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      if (data.success) {
        toast.success("Product updated successfully.");
        navigate("/product-list");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
      console.error("Update product error:", error.response || error);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };
  const handleProduct = async () => {
    navigate("/seller/product-list");
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <form
        onSubmit={onSubmitHandler}
        className="md:p-10 p-4 space-y-2 max-w-lg"
      >
        <h2 className="text-2xl font-bold">Edit Product</h2>

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
              Stock
            </label>
            <input
              type="number"
              id="stock"
              value={stock_quantity}
              onChange={(e) => setStock_quantity(e.target.value)}
              placeholder="0"
              required
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            />
          </div>
        </div>

        <button
          onClick={() => handleProduct()}
          className="px-8 py-2.5 bg-green-500 text-white font-medium rounded"
        >
          {id ? "UPDATE" : "ADD"}
        </button>
      </form>
    </div>
  );
};
export default EditProduct;
