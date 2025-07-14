import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../../constant";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState([null, null, null, null]);
  const [existingImages, setExistingImages] = useState([
    null,
    null,
    null,
    null,
  ]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock_quantity, setStock_quantity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("admin") || "{}");
    if (!adminData?.token) {
      toast.error(" Admin token missing. Please login again.");
      navigate("/login"); // redirect to login
      return;
    }

    const fetchData = async (token) => {
      if (!id) {
        toast.error("Invalid product ID.");
        navigate("/seller");
        return;
      }

      try {
        setIsLoading(true);

        const [categoryRes, productRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/categories/getCategories`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${BASE_URL}/api/products/getProduct/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setCategories(categoryRes.data || []);

        const product = productRes.data;
        if (!product || productRes.data.success === false) {
          toast.error(productRes.data?.message || "⚠️ Product not found.");
          navigate("/seller");
          return;
        }

        setName(product.name || "");
        setDescription(product.description || "");
        setCategory(product.category_id || "");
        setPrice(product.price || "");
        setStock_quantity(product.stock_quantity || "");

        const images = Array.isArray(product.images) ? product.images : [];
        const paddedImages = [
          ...images,
          ...Array(4 - images.length).fill(null),
        ];
        setExistingImages(paddedImages);
      } catch (err) {
        console.error("FetchData Error:", err);
        toast.error(err.response?.data?.message || "Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(adminData.token);
  }, [id, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const adminData = JSON.parse(localStorage.getItem("admin") || "{}");
      const token = adminData?.token;

      if (!token) {
        toast.error("Admin token missing");
        setIsLoading(false);
        return;
      }

      if (!name || !price || !category) {
        toast.error(" Please fill all required fields");
        setIsLoading(false);
        return;
      }

      let uploadedImageUrls = [];
      const hasNewImages = file.some((img) => img !== null);

      // 📦 Upload new images if provided
      if (hasNewImages) {
        const imageFormData = new FormData();
        file.forEach((img) => {
          if (img) imageFormData.append("files", img);
        });

        const uploadRes = await axios.post(
          `${BASE_URL}/api/products/upload-image`,
          imageFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        uploadedImageUrls = (
          Array.isArray(uploadRes.data.url)
            ? uploadRes.data.url
            : [uploadRes.data.url]
        ).filter(Boolean);

        if (!uploadedImageUrls.length) {
          toast.error(" Image upload failed. Keeping existing images.");
        }
      }

      // 🖼 Merge existing and new images
      const finalImages = existingImages
        .map((oldImg, i) => (file[i] ? uploadedImageUrls.shift() : oldImg))
        .filter(Boolean);

      if (!finalImages.length) {
        toast.error(" No product images provided");
        setIsLoading(false);
        return;
      }

      const payload = {
        name,
        description,
        price,
        stock_quantity,
        is_active: true,
        category_id: category,
        images: finalImages,
      };

      const updateRes = await axios.put(
        `${BASE_URL}/api/products/updateProduct/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Update Response:", updateRes.data); // 🪵 Debug API response

      // ✅ Reliable success check
      if (updateRes.data?.success || updateRes.status === 200) {
        toast.success(" Product updated successfully");
        navigate("/seller", { replace: true });
      } else {
        toast.error(updateRes.data?.message || " Update failed");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(error.response?.data?.message || " Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <form
        onSubmit={onSubmitHandler}
        className="md:p-10 p-4 space-y-2 max-w-lg"
      >
        <h2 className="text-2xl font-bold">Edit Product</h2>

        {/* Image Upload */}
        <div>
          <p className="text-base font-medium">Product Images</p>
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
                    className="max-w-24 max-h-24 cursor-pointer object-cover border rounded"
                    src={
                      file[index]
                        ? URL.createObjectURL(file[index])
                        : existingImages[index] || assets.upload_area
                    }
                    alt="upload"
                  />
                </label>
              ))}
          </div>
        </div>

        {/* Name */}
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

        {/* Description */}
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

        {/* Category */}
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

        {/* Price & Stock */}
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
            <label className="text-base font-medium" htmlFor="stock">
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
          type="submit"
          disabled={isLoading}
          className={`px-8 py-2.5 font-medium rounded text-white ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-black hover:bg-black"
          }`}
        >
          {isLoading ? "Updating..." : "UPDATE"}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
