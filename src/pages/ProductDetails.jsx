// export default ProductDetails;
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currency, products, user } = useAppContext();
  const { addToCartAPI } = useAppContext();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/Products/getProduct/${id}`
        );
        const data = res.data;

        const formatted = {
          _id: data._id,
          name: data.name,
          description: [data.description],
          price: data.price,
          offerPrice: data.price,
          category: data.category_id,
          image: data.images,
          inStock: data.stock_quantity > 0,
        };

        setProduct(formatted);
        setThumbnail(data.images?.[0] || null);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  // Filter related products by category excluding current product
  useEffect(() => {
    if (product && products.length > 0) {
      const filtered = products.filter(
        (item) => item.category === product.category && item._id !== product._id
      );
      setRelatedProducts(filtered.slice(0, 5));
    }
  }, [product, products]);

  const handleBuyNow = async () => {
    if (!user) {
      toast.error("Please log in to continue.");
      return;
    }

    try {
      await addToCartAPI(product._id, 1);
      navigate("/cart");
    } catch (err) {
      toast.error(err);
    }
  };

  if (!product) return <div className="px-6 py-8">Product not found.</div>;

  return (
    <div className="max-w-6xl w-full px-6">
      <p>
        <Link to={"/"}>Home</Link>/<Link to={"/products"}> Products</Link>/
        <Link
          to={`/products/${product.category?.toLowerCase?.() || "category"}`}
        >
          {product.category}
        </Link>
        /<span className="text-green-500"> {product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-4">
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {product.image?.map((img, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(img)}
                className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
            <img src={thumbnail} alt="Selected product" />
          </div>
        </div>

        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>
          <div className="flex items-center gap-0.5 mt-1">
            {Array(5)
              .fill("x")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  className="md:w-4 w-3.5"
                  alt="star icon"
                />
              ))}
            <p className="text-base ml-2">(4)</p>
          </div>

          <div className="mt-6">
            <p className="text-gray-500/70 line-through">
              MRP: {currency}
              {product.price}
            </p>
            <p className="text-2xl font-medium">
              MRP: {currency}
              {product.offerPrice}
            </p>
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            {product.description?.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>

          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
              onClick={(e) => {
                e.stopPropagation();
                addToCartAPI(product._id, 1);
              }}
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="flex flex-col items-center mt-20">
        <div className="flex flex-col w-max">
          <p className="text-3xl font-medium">Related Products</p>
          <div className="w-[120px] h-0.5 bg-green-300 rounded-full mt-2"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
          {relatedProducts
            .filter((product) => product.inStock)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
        </div>
        <button
          onClick={() => navigate("/products")}
          className="hover:bg-green-500 cursor-pointer px-12 transition my-16 py-2.5 border rounded text-primary"
        >
          See more
        </button>
      </div>
    </div>
  );
};
export default ProductDetails;
