import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
// import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const navigate = useNavigate();

  // Initialize from localStorage so login persists on refresh
  const [isSeller, setIsSellerState] = useState(() => {
    return localStorage.getItem("isSeller") === "null";
  });
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingAdmin, setLoadingAdmin] = useState(true);
  // const [cartCount, setCartCount] = useState([]);
  // Safe setter for isSeller to keep localStorage sync
  const setIsSeller = (value) => {
    localStorage.setItem("isSeller", value ? "true" : "false");
    setIsSellerState(value);
  };

  // Fetch products (dummy here)
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  // const addToCart = (itemId) => {
  //   let cartData = structuredClone(cartItems);
  //   cartData[itemId] = cartData[itemId] ? cartData[itemId] + 1 : 1;
  //   setCartItems(cartData);
  //   toast.success("Added to cart");
  // };

  // const updateCartItem = (itemId, quantity) => {
  //   let cartData = structuredClone(cartItems);
  //   cartData[itemId] = quantity;
  //   setCartItems(cartData);
  //   toast.success("Updated cart");
  // };

  // const removeItem = (itemId) => {
  //   let cartData = structuredClone(cartItems);
  //   if (cartData[itemId]) {
  //     cartData[itemId] -= 1;
  //     if (cartData[itemId] === 0) {
  //       delete cartData[itemId];
  //     }
  //   }
  //   setCartItems(cartData);
  //   toast.success("Removed from cart");
  // };

  // const getCartCount = () => {
  //   return Object.values(cartItems).reduce((sum, count) => sum + count, 0);
  // };

  // const getCartAmount = () => {
  //   let totalAmount = 0;
  //   for (const itemId in cartItems) {
  //     const product = products.find((p) => p._id === itemId);
  //     if (product && cartItems[itemId] > 0) {
  //       totalAmount += product.offerPrice * cartItems[itemId];
  //     }
  //   }
  //   return Math.floor(totalAmount * 100) / 100;
  // };

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token")?.trim();
      const res = await axios.get("http://localhost:5000/api/cart/getcart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItems(res.data.cart[0]?.items || []);
      setCount(
        res.data.cart[0]?.items.reduce(
          (total, item) => total + item.quantity,
          0
        )
      );
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/auth/me");
      setUser(res.data.user);
    } catch (err) {
      console.error("Not logged in or invalid token", err.message);
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchAdmin = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/Admin/me");
      setIsSellerState(res.data.user);
    } catch (err) {
      console.error("Not logged in or invalid token", err.message);
      setIsSellerState(null);
    } finally {
      setLoadingAdmin(false);
    }
  };
  useEffect(() => {
    fetchAdmin();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);
  const addToCartAPI = async (productId, quantity = 1) => {
    try {
      const token = localStorage.getItem("token")?.trim(); // JWT token from localStorage

      if (!token) {
        throw new Error("User is not authenticated");
      }

      const res = await axios.post(
        "http://localhost:5000/api/cart/add",
        {
          items: [
            {
              product_id: productId,
              quantity,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Authorization header with Bearer token
          },
          withCredentials: true, // optional, for cookies
        }
      );
      if (res.data.success) {
        fetchCart();
      }
      return res.data;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        error.message ||
        "Failed to add to cart"
      );
    }
  };

  const upadteToCartAPI = async (productId, newQty = 1) => {
    try {
      const token = localStorage.getItem("token")?.trim();
      if (!token) throw new Error("User not authenticated");

      // Assuming `items` is the cart.items array from context or state
      const existingItem = cartItems.find(
        (item) => item.product_id === productId
      );

      const updatedQty = existingItem ? existingItem.quantity + newQty : newQty;

      const res = await axios.put(
        "http://localhost:5000/api/cart/update",
        {
          product_id: productId,
          quantity: updatedQty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // optional, for cookies
        }
      );

      if (res.data.success) {
        await fetchCart();
      }
      return res.data;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        error.message ||
        "Failed to add to cart"
      );
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token")?.trim();
    if (token) {
      fetchUser();
      fetchCart();
    }
    // ✅ ADD THIS
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("bearerToken");
      const res = await axios.delete(
        `http://localhost:5000/api/cart/remove/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        console.log("Item deleted successfully.");
        await fetchCart();
      } else {
        console.warn("Failed to delete item.");
      }
    } catch (error) {
      console.error("Delete item failed:", error);
    }
  };
  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    cartItems,
    handleDelete,
    fetchCart,
    // removeItem,
    setCartItems,
    // updateCartItem,
    searchQuery,
    setSearchQuery,
    upadteToCartAPI,
    // getCartAmount,
    addToCartAPI,
    // getCartCount,
    count,
    setCount,
    loadingUser,
    loadingAdmin,
    setLoadingAdmin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
