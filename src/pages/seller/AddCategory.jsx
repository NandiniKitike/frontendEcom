import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets"; // assume upload_area image exists
import { BASE_URL } from "../../../constant";

const AddCategory = () => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     const token = localStorage.getItem("admin");

  //     if (!token) {
  //       toast.error("Authentication token missing");
  //       setIsLoading(false);
  //       return;
  //     }

  //     let imageUrl = "";

  //     if (image) {
  //       const imageFormData = new FormData();
  //       imageFormData.append("files", image);

  //       const uploadRes = await axios.post(
  //         `${BASE_URL}/api/Products/upload-image`,
  //         imageFormData,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );

  //       imageUrl = uploadRes.data?.url?.[0];

  //       if (!imageUrl) {
  //         toast.error("Image upload failed");
  //         setIsLoading(false);
  //         return;
  //       }
  //     }

  //     // Step 2: Create Category with image URL
  //     await axios.post(
  //       `${BASE_URL}/api/categories/create`,
  //       {
  //         name,
  //         description,
  //         images: imageUrl ? [imageUrl] : [],
  //         is_active: status.toLowerCase() === "active",
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     toast.success("Category created successfully");
  //     navigate("/seller/category-list");
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Failed to create category");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // ✅ Get admin token from localStorage properly
      const adminData = localStorage.getItem("admin");
      if (!adminData) {
        toast.error("Authentication token missing");
        setIsLoading(false);
        return;
      }

      const admin = JSON.parse(adminData);
      const token = admin.token;

      let imageUrl = "";

      // ✅ Step 1: Upload image if provided
      if (image) {
        const imageFormData = new FormData();
        imageFormData.append("files", image);

        const uploadRes = await axios.post(
          `${BASE_URL}/api/Products/upload-image`,
          imageFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ use token only
              "Content-Type": "multipart/form-data",
            },
          }
        );

        imageUrl = uploadRes.data?.url?.[0];

        if (!imageUrl) {
          toast.error("Image upload failed");
          setIsLoading(false);
          return;
        }
      }

      // ✅ Step 2: Create Category with image URL
      await axios.post(
        `${BASE_URL}/api/categories/create`,
        {
          name,
          description,
          images: imageUrl ? [imageUrl] : [],
          is_active: status.toLowerCase() === "active",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ use token only
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("✅ Category created successfully");
      navigate("/seller/category-list");
    } catch (error) {
      console.error("Category creation failed:", error);
      toast.error(error.response?.data?.message || "Failed to create category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-2 max-w-lg">
        <h2 className="text-2xl mb-10 font-bold">Create Category</h2>

        {/* Upload Image */}
        <div>
          <label className="text-base font-medium">Category Image</label>
          <label
            htmlFor="category-image"
            className="block mt-2 cursor-pointer w-24"
          >
            <input
              type="file"
              id="category-image"
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload"
              className="w-full border rounded"
            />
          </label>
        </div>

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

        {/* Description */}
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
          />
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="category-status">
            Category Status
          </label>
          <input
            type="text"
            id="category-status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="active / inactive"
            required
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          />
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

export default AddCategory;
