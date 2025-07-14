// import React, { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import { useAppContext } from "../context/AppContext";
// import { PiShoppingCartThin } from "react-icons/pi";
// import { assets } from "../assets/assets";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);
//   // const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const {
//     user,
//     setUser,
//     setShowUserLogin,
//     navigate,
//     searchQuery,
//     setSearchQuery,
//     count,
//     setCartItems,
//     setCount,
//   } = useAppContext();

//   // Logout function
//   const logout = () => {
//     localStorage.removeItem("bearerToken");
//     setUser(null);
//     navigate("/");
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     if (searchQuery && searchQuery.length > 0) {
//       navigate("/products");
//     }
//   }, [searchQuery, navigate]);

//   console.log("userdata", user);

//   return (
//     <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
//       {/* Logo */}
//       <Link to="/">
//         {assets?.logo ? (
//           <img className="h-9" src={assets.logo} alt="logo" />
//         ) : (
//           <div className="h-9 w-24 bg-gray-200 rounded flex items-center justify-center text-sm">
//             Logo
//           </div>
//         )}
//       </Link>

//       {/* Desktop Menu */}
//       <div className="hidden sm:flex items-center text-black gap-8">
//         <Link to="/" className="hover:text-gray-600 transition-colors">
//           Home
//         </Link>
//         <Link to="/products" className="hover:text-gray-600 transition-colors">
//           All Products
//         </Link>
//         {user && (
//           <Link
//             to="/my-orders"
//             className="hover:text-gray-600 transition-colors"
//           >
//             My Orders
//           </Link>
//         )}
//         {/* Search Bar */}
//         <div className="hidden lg:flex text-black items-center text-sm gap-2 border border-gray-300 px-3 py-1 rounded-full">
//           <input
//             value={searchQuery || ""}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="py-1 w-32 bg-transparent outline-none placeholder-gray-500"
//             type="text"
//             placeholder="Search products"
//           />
//           {assets?.search_icon ? (
//             <img className="w-4 h-4" src={assets.search_icon} alt="search" />
//           ) : (
//             <div className="w-4 h-4 bg-gray-400 rounded"></div>
//           )}
//         </div>
//         {/* Cart */}
//         <div
//           onClick={() => navigate("/cart")}
//           className="relative cursor-pointer hover:text-gray-600 transition-colors"
//         >
//           <PiShoppingCartThin className="w-6 h-6" />
//           {count > 0 && (
//             <span className="absolute -top-2 -right-2 text-xs text-white bg-black w-5 h-5 rounded-full flex items-center justify-center">
//               {count > 99 ? "99+" : count}
//             </span>
//           )}
//         </div>
//         {/* User Authentication */}
//         {!user ? (
//           <button
//             onClick={() => setShowUserLogin(true)}
//             className="group flex gap-2 justify-center h-10 px-6 py-2 bg-black hover:bg-gray-800 rounded-full transition text-center items-center text-white cursor-pointer"
//           >
//             Login
//           </button>
//         ) : (
//           <div className="relative" ref={dropdownRef}>
//             <div onClick={() => setShowDropdown((prev) => !prev)}>
//               {assets?.profile_icon ? (
//                 <img
//                   src={assets.profile_icon}
//                   className="w-10 h-10 rounded-full cursor-pointer"
//                   alt="profile"
//                 />
//               ) : (
//                 <div className="w-10 h-10 bg-gray-300 rounded-full cursor-pointer flex items-center justify-center">
//                   👤
//                 </div>
//               )}
//             </div>
//             {showDropdown && (
//               <ul className="absolute top-12 right-0 bg-white shadow-lg border border-gray-200 py-2 w-36 rounded-md text-sm z-50">
//                 {/* <li
//                   onClick={() => {
//                     navigate("/my-orders");
//                     setShowDropdown(false);
//                   }}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                 >
//                   My Orders
//                 </li> */}
//                 <li
//                   onClick={() => {
//                     logout();
//                     setShowDropdown(false);
//                     setCartItems([]);
//                     setCount(0);
//                   }}
//                   className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                 >
//                   Logout
//                 </li>
//               </ul>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Mobile Menu Button & Cart */}
//       <div className="flex gap-4 sm:hidden items-center">
//         {/* Mobile Cart */}
//         <div
//           onClick={() => navigate("/cart")}
//           className="relative cursor-pointer"
//         >
//           <PiShoppingCartThin className="w-6 h-6" />

//           {count > 0 && (
//             <span className="absolute -top-2 -right-2 text-xs text-white bg-black w-5 h-5 rounded-full flex items-center justify-center">
//               {count > 99 ? "99+" : count}
//             </span>
//           )}
//         </div>

//         {/* Mobile Menu Toggle */}
//         <button
//           onClick={() => setOpen(!open)}
//           aria-label="Toggle Menu"
//           className="p-1"
//         >
//           {assets?.menu_icon ? (
//             <img className="w-6 h-6" src={assets.menu_icon} alt="menu" />
//           ) : (
//             <div className="w-6 h-6 flex flex-col justify-center space-y-1">
//               <div className="w-6 h-0.5 bg-black"></div>
//               <div className="w-6 h-0.5 bg-black"></div>
//               <div className="w-6 h-0.5 bg-black"></div>
//             </div>
//           )}
//         </button>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       {open && (
//         <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t py-4 flex flex-col gap-3 px-6 text-sm sm:hidden z-40">
//           <Link
//             to="/"
//             onClick={() => setOpen(false)}
//             className="py-2 hover:text-gray-600 transition-colors"
//           >
//             Home
//           </Link>
//           <Link
//             to="/products"
//             onClick={() => setOpen(false)}
//             className="py-2 hover:text-gray-600 transition-colors"
//           >
//             All Products
//           </Link>
//           <Link
//             to="/contact"
//             onClick={() => setOpen(false)}
//             className="py-2 hover:text-gray-600 transition-colors"
//           >
//             My Orders
//           </Link>
//           {/*
//           {user && (
//             <Link
//               to="/my-orders"
//               onClick={() => setOpen(false)}
//               className="py-2 hover:text-gray-600 transition-colors"
//             >
//               My Orders
//             </Link>
//           )} */}

//           {!user ? (
//             <button
//               onClick={() => {
//                 setOpen(false);
//                 setShowUserLogin(true);
//               }}
//               className="w-32 h-10 mt-2 bg-black hover:bg-gray-800 transition text-white rounded-full text-sm"
//             >
//               Login
//             </button>
//           ) : (
//             <button
//               onClick={() => {
//                 logout();
//                 setOpen(false);
//               }}
//               className="w-32 h-10 mt-2 bg-red-600 hover:bg-red-700 transition text-white rounded-full text-sm"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { PiShoppingCartThin } from "react-icons/pi";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../../constant";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    count,
    setCartItems,
    setCount,
  } = useAppContext();

  // ✅ Logout function
  // const logout = async () => {
  //   try {
  //     // 🛑 Call backend to clear cookie
  //     await axios.post(
  //       `${BASE_URL}/api/auth/logout`,
  //       {},
  //       { withCredentials: true } // send cookie
  //     );

  //     // 🧹 Clean frontend state
  //     localStorage.removeItem("bearerToken");
  //     localStorage.removeItem("user");
  //     delete axios.defaults.headers.common["Authorization"];
  //     setUser(null);
  //     setCartItems([]);
  //     setCount(0);

  //     toast.success("Logged out successfully");
  //     navigate("/");
  //   } catch (err) {
  //     console.error("Logout error:", err);
  //     toast.error("Logout failed. Please try again.");
  //   }
  // };

  //a.
  const logout = async () => {
    try {
      // 🧹 Clean frontend state
      localStorage.removeItem("user");
      localStorage.removeItem("admin");
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
      setCartItems([]);
      setCount(0);

      toast.success("Logged out successfully");

      // Refresh the page
      window.location.reload();
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Logout failed. Please try again.");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery, navigate]);

  console.log("userdata", user);

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      {/* Logo */}
      <Link to="/">
        {assets?.logo ? (
          <img className="h-9" src={assets.logo} alt="logo" />
        ) : (
          <div className="h-9 w-24 bg-gray-200 rounded flex items-center justify-center text-sm">
            Logo
          </div>
        )}
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center text-black gap-8">
        <Link to="/" className="hover:text-gray-600 transition-colors">
          Home
        </Link>
        <Link to="/products" className="hover:text-gray-600 transition-colors">
          All Products
        </Link>
        {user && (
          <Link
            to="/my-orders"
            className="hover:text-gray-600 transition-colors"
          >
            My Orders
          </Link>
        )}
        {/* Search Bar */}
        <div className="hidden lg:flex text-black items-center text-sm gap-2 border border-gray-300 px-3 py-1 rounded-full">
          <input
            value={searchQuery || ""}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1 w-32 bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          {assets?.search_icon ? (
            <img className="w-4 h-4" src={assets.search_icon} alt="search" />
          ) : (
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
          )}
        </div>
        {/* Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer hover:text-gray-600 transition-colors"
        >
          <PiShoppingCartThin className="w-6 h-6" />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 text-xs text-white bg-black w-5 h-5 rounded-full flex items-center justify-center">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </div>
        {/* User Authentication */}
        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="group flex gap-2 justify-center h-10 px-6 py-2 bg-black hover:bg-gray-800 rounded-full transition text-center items-center text-white cursor-pointer"
          >
            Login
          </button>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <div onClick={() => setShowDropdown((prev) => !prev)}>
              {assets?.profile_icon ? (
                <img
                  src={assets.profile_icon}
                  className="w-10 h-10 rounded-full cursor-pointer"
                  alt="profile"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full cursor-pointer flex items-center justify-center">
                  👤
                </div>
              )}
            </div>
            {showDropdown && (
              <ul className="absolute top-12 right-0 bg-white shadow-lg border border-gray-200 py-2 w-36 rounded-md text-sm z-50">
                <li
                  onClick={() => {
                    logout();
                    setShowDropdown(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Button & Cart */}
      <div className="flex gap-4 sm:hidden items-center">
        {/* Mobile Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <PiShoppingCartThin className="w-6 h-6" />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 text-xs text-white bg-black w-5 h-5 rounded-full flex items-center justify-center">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
          className="p-1"
        >
          {assets?.menu_icon ? (
            <img className="w-6 h-6" src={assets.menu_icon} alt="menu" />
          ) : (
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div className="w-6 h-0.5 bg-black"></div>
              <div className="w-6 h-0.5 bg-black"></div>
              <div className="w-6 h-0.5 bg-black"></div>
            </div>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t py-4 flex flex-col gap-3 px-6 text-sm sm:hidden z-40">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="py-2 hover:text-gray-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setOpen(false)}
            className="py-2 hover:text-gray-600 transition-colors"
          >
            All Products
          </Link>
          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="w-32 h-10 mt-2 bg-black hover:bg-gray-800 transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="w-32 h-10 mt-2 bg-red-600 hover:bg-red-700 transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
