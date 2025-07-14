import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../../constant";
import { assets } from "../../assets/assets"; // assumes upload_area fallback image

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch category data
  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) {
        toast.error("Invalid category ID");
        return;
      }

      try {
        const adminData = localStorage.getItem("admin");
        if (!adminData) {
          toast.error("No authentication token found. Please login again.");
          return;
        }
        const admin = JSON.parse(adminData);

        const { data } = await axios.get(
          `${BASE_URL}/api/categories/category/${id}`,
          {
            headers: {
              Authorization: `Bearer ${admin.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (data) {
          setName(data.name || "");
          setDescription(data.description || "");
          setStatus(data.is_active ? "active" : "inactive");
          setPreviewImage(data.images?.[0] || "");
        } else {
          toast.error("Category details not found.");
        }
      } catch (error) {
        console.error("Fetch Category Error:", error.response || error);
        toast.error(
          error.response?.data?.message || "Failed to fetch category details"
        );
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      const token = userData?.token;

      if (!token) {
        toast.error("Authentication token missing. Please login again.");
        setIsLoading(false);
        return;
      }

      if (!id) {
        toast.error("Invalid category ID");
        setIsLoading(false);
        return;
      }

      let imageUrl = previewImage;

      // Upload new image if changed
      if (image) {
        const imageFormData = new FormData();
        imageFormData.append("files", image);

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

        const uploadedUrls = uploadRes.data.url;
        imageUrl = Array.isArray(uploadedUrls) ? uploadedUrls[0] : uploadedUrls;

        if (!imageUrl) throw new Error("Image upload failed");
      }

      // Update category
      await axios.put(
        `${BASE_URL}/api/categories/categoryupdate/${id}`,
        {
          name,
          description,
          images: imageUrl ? [imageUrl] : [],
          is_active: status.toLowerCase() === "active",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Category updated successfully");
      navigate("/seller/category-list", { replace: true });
    } catch (error) {
      console.error("Update Error:", error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-2 max-w-lg">
        <h2 className="text-2xl mb-10 font-bold">Edit Category</h2>

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
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
                if (file) setPreviewImage(URL.createObjectURL(file));
              }}
            />
            <img
              src={previewImage || assets.upload_area}
              alt="upload"
              className="w-full border rounded"
            />
          </label>
        </div>

        {/* Name */}
        <div className="flex flex-col gap-1 max-w-md">
          <label htmlFor="category-name" className="text-base font-medium">
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
            htmlFor="category-description"
            className="text-base font-medium"
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
          <label htmlFor="category-status" className="text-base font-medium">
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

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={`px-8 py-2.5 font-medium rounded text-white ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-black"
          }`}
        >
          {isLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
