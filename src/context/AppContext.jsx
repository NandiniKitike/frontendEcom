import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constant";

axios.defaults.withCredentials = true;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const navigate = useNavigate();

  const [isSeller, setIsSellerState] = useState(() => {
    return localStorage.getItem("isSeller") === "null";
  });
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingAdmin, setLoadingAdmin] = useState(true);

  const setIsSeller = (value) => {
    localStorage.setItem("isSeller", value ? "true" : "false");
    setIsSellerState(value);
  };

  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedAdmin = localStorage.getItem("admin");
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedAdmin) setIsSellerState(JSON.parse(savedAdmin));
  }, []);

  // const fetchCart = async () => {
  //   try {
  //     const res = await axios.get(`${BASE_URL}/api/cart/getcart`);
  //     const cart = res.data.cart;
  //     const items = cart?.[0]?.items || [];

  //     setCartItems(items);

  //     const totalCount = items.reduce(
  //       (total, item) => total + item.quantity,
  //       0
  //     );
  //     setCount(totalCount);
  //   } catch (err) {
  //     console.error("Failed to fetch cart:", err);
  //     setCartItems([]);
  //     setCount(0);
  //   }
  // };
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/cart/getcart`);
      const cart = res.data.cart;
      const items = cart?.[0]?.items || [];

      console.log("Fetched cart items:", items); // 🔍 Check if product_id is populated

      setCartItems(items);

      const totalCount = items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setCount(totalCount);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setCartItems([]);
      setCount(0);
    }
  };
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/auth/auth/me`, {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (err) {
      console.error("Not logged in or invalid token", err.message);
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  const fetchAdmin = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/auth/Admin/me`, {
        withCredentials: true,
      });
      setIsSellerState(res.data.user);
    } catch (err) {
      console.error("Not logged in or invalid token", err.message);
      setIsSellerState(null);
    } finally {
      setLoadingAdmin(false);
    }
  };

  // const addToCartAPI = async (productId, quantity = 1) => {
  //   try {
  //     const res = await axios.post(`${BASE_URL}/api/cart/add`, {
  //       items: [{ product_id: productId, quantity }],
  //     });

  //     if (res.data.success) {
  //       fetchCart();
  //       toast.success("Item added to cart successfully!");
  //     }

  //     return res.data;
  //   } catch (error) {
  //     throw (
  //       error.response?.data?.message ||
  //       error.message ||
  //       "Failed to add to cart"
  //     );
  //   }
  // };
  const addToCartAPI = async (productId, quantity = 1) => {
    try {
      const token = localStorage.getItem("bearerToken"); // get token from localStorage

      const res = await axios.post(
        `${BASE_URL}/api/cart/add`,
        {
          items: [{ product_id: productId, quantity }],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // add token to header
          },
        }
      );

      if (res.data.success) {
        fetchCart();
        toast.success("Item added to cart successfully!");
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
      const existingItem = cartItems.find((item) => {
        const id =
          typeof item.product_id === "object"
            ? item.product_id._id
            : item.product_id;
        return id === productId;
      });
      const updatedQty = existingItem ? existingItem.quantity + newQty : newQty;

      const res = await axios.put(`${BASE_URL}/api/cart/update`, {
        product_id: productId,
        quantity: updatedQty,
      });

      if (res.data.success) {
        await fetchCart();
      }

      return res.data;
    } catch (error) {
      throw (
        error.response?.data?.message ||
        error.message ||
        "Failed to update cart"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/cart/remove/${id}`);
      if (res.data.success) {
        await fetchCart();
        console.log("Item deleted successfully.");
      } else {
        console.warn("Failed to delete item.");
      }
    } catch (error) {
      console.error("Delete item failed:", error);
    }
  };

  // useEffect(() => {
  //   fetchProducts();
  //   fetchUser();
  //   fetchCart();
  // }, []);
  useEffect(() => {
    fetchProducts();
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]);
      setCount(0);
    }
  }, [user]);

  useEffect(() => {
    fetchAdmin();
  }, []);

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
    setCartItems,
    searchQuery,
    setSearchQuery,
    upadteToCartAPI,
    addToCartAPI,
    count,
    setCount,
    loadingUser,
    loadingAdmin,
    setLoadingAdmin,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
