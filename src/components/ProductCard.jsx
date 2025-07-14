import React from "react";
import { useAppContext } from "../context/AppContext";
// import { assets } from "../assets/assets";
import { useEffect } from "react";
import { PiShoppingCartThin } from "react-icons/pi";
import { IoStar } from "react-icons/io5";
// import { toast } from "react-hot-toast";
const ProductCard = ({ product }) => {
  const {
    currency,
    cartItems,

    fetchCart,
    removeItem,
    navigate,
    addToCartAPI,
    // user,
  } = useAppContext();

  console.log(cartItems);
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    product && (
      <div
        onClick={() =>
          navigate(
            `/products/${product.category?.toLowerCase()}/${product._id}`
          )
        }
        className="border border-gray-500/20 sm:gap-6 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full"
      >
        <div className="group cursor-pointer flex items-center justify-center px-2">
          <img
            className="group-hover:scale-105 transition max-w-26 md:max-w-36"
            src={
              product.images && product.images.length > 0
                ? product.images[0]
                : "/placeholder.png"
            }
            alt={product.name}
          />
        </div>

        <div className="text-gray-500/60 text-sm">
          <p>{product.category}</p>
          <p className="text-gray-700 font-medium text-lg truncate w-full">
            {product.name}
          </p>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((_, i) =>
              i < 4 ? (
                <IoStar key={i} className="text-yellow-500" />
              ) : (
                <IoStar key={i} className="text-gray-300" />
              )
            )}
          </div>

          <div className="flex items-end justify-between mt-3">
            <p className="md:text-xl text-base font-medium text-black">
              {currency}
              {product.offerPrice || product.price}{" "}
              {product.offerPrice && (
                <span className="text-gray-500/60 md:text-sm text-xs line-through">
                  {currency}
                  {product.price}
                </span>
              )}
            </p>

            <div className="text-green-500">
              {Array.isArray(cartItems) &&
              !cartItems.some(
                (item) => item?.product_id?._id === product._id
              ) ? (
                <button
                  className="flex items-center justify-center gap-1 bg-black border border-black cursor-pointer md:w-[80px] w-[64px] h-[34px] rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCartAPI(product._id, 1);
                  }}
                >
                  <PiShoppingCartThin className="text-lg text-white" />
                  <span className="text-sm font-medium text-white">Add</span>
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-black rounded select-none">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(product._id);
                    }}
                    className="cursor-pointer text-md px-2 h-full text-white"
                  >
                    -
                  </button>
                  <span className="w-5 text-center">
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCartAPI(product._id);
                    }}
                    className="cursor-pointer text-md px-2 text-white h-full"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
