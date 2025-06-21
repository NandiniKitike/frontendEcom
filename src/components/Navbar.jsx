// import React from "react";
// import { assets } from "../assets/assets";
// import { Link } from "react-router-dom";
// import { useAppContext } from "../context/AppContext";
// import { useEffect } from "react";
// import { PiShoppingCartThin } from "react-icons/pi";
// const Navbar = () => {
//   console.log("rendered");
//   const [open, setOpen] = React.useState(false);
//   //tested
//   const {
//     user,
//     setUser,
//     setShowUserLogin,
//     navigate,
//     searchQuery,
//     loadingUser,
//     // loadingAdmin,
//     setSearchQuery,
//     // fetchCart,

//     count,
//   } = useAppContext();
//   const logout = async () => {
//     setUser(null);
//     navigate("/");
//   };

//   useEffect(() => {
//     if (searchQuery.length > 0) {
//       navigate("/products");
//     }
//   }, [searchQuery, navigate]);

//   if (loadingUser) return null;

//   return (
//     <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
//       <Link to="/">
//         <img className="h-9" src={assets.logo} alt="logo" />
//       </Link>

//       {/* Desktop Menu */}
//       <div className="hidden sm:flex items-center text-black gap-8">
//         <Link to="/">Home</Link>
//         <Link to="/products">All Products</Link>
//         <Link to="/contact">Contact</Link>

//         <div className="hidden lg:flex text-black items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
//           <input
//             onChange={(e) => {
//               console.log("Input changed:", e.target.value);
//               setSearchQuery(e.target.value);
//             }}
//             className="py-1.5 w-full bg-transparent outline-none placeholder-black"
//             type="text"
//             placeholder="Search products"
//           />
//           <img
//             className="w-4 h-4 text-black"
//             src={assets.search_icon}
//             alt="search"
//           />
//         </div>

//         <div
//           onClick={() => navigate("/cart")}
//           className="relative cursor-pointer"
//         >
//           <div className="relative cursor-pointer">
//             <PiShoppingCartThin />
//             <button className="absolute -top-2 -right-3 text-xs text-white bg-black w-[18px] h-[16px] rounded-full">
//               {count || 0}
//             </button>
//           </div>
//         </div>

//         {!user ? (
//           <button
//             onClick={() => setShowUserLogin(true)}
//             className="group flex  gap-2 w-25 justify-center h-10 md:px-9 py-3 bg-black rounded-full transition text-center items-center text-white cursor-pointer"
//           >
//             Login
//           </button>
//         ) : (
//           <div className="relative group">
//             <img src={assets.profile_icon} className="w-10" alt="profile" />
//             <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
//               <li
//                 onClick={() => navigate("/my-orders")}
//                 className="p-1.5 pl-3 hover:primary-300 cursor-pointer"
//               >
//                 My Orders
//               </li>
//               <li
//                 onClick={logout}
//                 className="p-1.5 pl-3 hover:primary-300 cursor-pointer"
//               >
//                 Logout
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//       <div className="flex  gap-6 sm:hidden">
//         <div
//           onClick={() => navigate("/cart")}
//           className="relative cursor-pointer"
//         >
//           <img className="w-4" src={assets.cart_icon} alt="cart" />
//           <button className="absolute -top-2 -right-3 text-xs text-black bg-primary w-[16px] h-[16px] rounded-full">
//             {count}{" "}
//           </button>
//         </div>

//         <button
//           onClick={() => (open ? setOpen(false) : setOpen(true))}
//           aria-label="Menu"
//           className=""
//         >
//           {/* Menu Icon SVG */}
//           <img src={assets.menu_icon} alt="menu" />
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <div
//           className={`${
//             open ? "flex" : "hidden"
//           } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
//         >
//           <Link
//             to="/"
//             onClick={() => {
//               setOpen(false);
//             }}
//           >
//             Home
//           </Link>
//           <Link to="/products" onClick={() => setOpen(false)}>
//             <button> All Products</button>
//           </Link>
//           <Link to="/contact" onClick={() => setOpen(false)}>
//             contact
//           </Link>
//           {user && (
//             <Link
//               to="/my-orders"
//               onClick={() => setOpen(false)}
//               className="hover:border-b-2 hover:border-primary hover:text-primary transition duration-200"
//             >
//               my orders
//             </Link>
//           )}
//           {!user ? (
//             <button
//               onClick={() => {
//                 setOpen(false);
//                 setShowUserLogin(true);
//               }}
//               className="cursor-pointer px-6 w-40 h-10 py-2 mt-2 bg-primary hover:bg-black transition text-black rounded-full text-sm"
//             >
//               Login
//             </button>
//           ) : (
//             <button
//               onClick={() => {
//                 logout();
//                 setOpen(false);
//               }}
//               className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-black transition text-white rounded-full text-sm"
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

//fixed code 1

// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useAppContext } from "../context/AppContext";
// import { PiShoppingCartThin } from "react-icons/pi";
// // Import assets - make sure this path is correct
// import { assets } from "../assets/assets";

// const Navbar = () => {
//   console.log("Navbar rendered");

//   const [open, setOpen] = React.useState(false);

//   const {
//     user,
//     setUser,
//     setShowUserLogin,
//     navigate,
//     searchQuery,
//     loadingUser,
//     setSearchQuery,
//     count,
//   } = useAppContext();

//   const logout = async () => {
//     try {
//       // Clear any stored tokens
//       localStorage.removeItem("bearerToken");
//       setUser(null);
//       navigate("/");
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   useEffect(() => {
//     if (searchQuery && searchQuery.length > 0) {
//       navigate("/products");
//     }
//   }, [searchQuery, navigate]);

//   // Remove this line that's blocking render - let navbar show even during loading
//   // if (loadingUser) return null;

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
//         <Link to="/contact" className="hover:text-gray-600 transition-colors">
//           Contact
//         </Link>

//         {/* Search Bar */}
//         <div className="hidden lg:flex text-black items-center text-sm gap-2 border border-gray-300 px-3 py-1 rounded-full">
//           <input
//             value={searchQuery || ""}
//             onChange={(e) => {
//               console.log("Search input changed:", e.target.value);
//               setSearchQuery(e.target.value);
//             }}
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
//           <div className="relative">
//             <PiShoppingCartThin className="w-6 h-6" />
//             {count > 0 && (
//               <span className="absolute -top-2 -right-2 text-xs text-white bg-black w-5 h-5 rounded-full flex items-center justify-center">
//                 {count > 99 ? "99+" : count}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* User Authentication */}
//         {loadingUser ? (
//           <div className="w-20 h-10 bg-gray-200 rounded-full animate-pulse"></div>
//         ) : !user ? (
//           <button
//             onClick={() => setShowUserLogin(true)}
//             className="group flex gap-2 justify-center h-10 px-6 py-2 bg-black hover:bg-gray-800 rounded-full transition text-center items-center text-white cursor-pointer"
//           >
//             Login
//           </button>
//         ) : (
//           <div className="relative group">
//             {assets?.profile_icon ? (
//               <img
//                 src={assets.profile_icon}
//                 className="w-10 h-10 rounded-full cursor-pointer"
//                 alt="profile"
//               />
//             ) : (
//               <div className="w-10 h-10 bg-gray-300 rounded-full cursor-pointer flex items-center justify-center">
//                 👤
//               </div>
//             )}
//             <ul className="hidden group-hover:block absolute top-12 right-0 bg-white shadow-lg border border-gray-200 py-2 w-36 rounded-md text-sm z-50">
//               <li
//                 onClick={() => navigate("/my-orders")}
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//               >
//                 My Orders
//               </li>
//               <li
//                 onClick={logout}
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//               >
//                 Logout
//               </li>
//             </ul>
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
//           {assets?.cart_icon ? (
//             <img className="w-6 h-6" src={assets.cart_icon} alt="cart" />
//           ) : (
//             <PiShoppingCartThin className="w-6 h-6" />
//           )}
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
//             Contact
//           </Link>

//           {user && (
//             <Link
//               to="/my-orders"
//               onClick={() => setOpen(false)}
//               className="py-2 hover:text-gray-600 transition-colors"
//             >
//               My Orders
//             </Link>
//           )}

//           {loadingUser ? (
//             <div className="w-32 h-10 bg-gray-200 rounded-full animate-pulse"></div>
//           ) : !user ? (
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

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { PiShoppingCartThin } from "react-icons/pi";
// Import assets - make sure this path is correct
import { assets } from "../assets/assets";

const Navbar = () => {
  console.log("Navbar rendered");

  const [open, setOpen] = React.useState(false);

  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    searchQuery,
    loadingUser,
    setSearchQuery,
    count,
  } = useAppContext();

  const logout = async () => {
    try {
      // Clear any stored tokens
      localStorage.removeItem("bearerToken");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery, navigate]);

  // Remove this line that's blocking render - let navbar show even during loading
  // if (loadingUser) return null;

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
        <Link to="/contact" className="hover:text-gray-600 transition-colors">
          Contact
        </Link>

        {/* Search Bar */}
        <div className="hidden lg:flex text-black items-center text-sm gap-2 border border-gray-300 px-3 py-1 rounded-full">
          <input
            value={searchQuery || ""}
            onChange={(e) => {
              console.log("Search input changed:", e.target.value);
              setSearchQuery(e.target.value);
            }}
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
          <div className="relative">
            <PiShoppingCartThin className="w-6 h-6" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 text-xs text-white bg-black w-5 h-5 rounded-full flex items-center justify-center">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </div>
        </div>

        {/* User Authentication */}
        {loadingUser ? (
          <div className="w-20 h-10 bg-gray-200 rounded-full animate-pulse"></div>
        ) : !user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="group flex gap-2 justify-center h-10 px-6 py-2 bg-black hover:bg-gray-800 rounded-full transition text-center items-center text-white cursor-pointer"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
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
            <ul className="hidden group-hover:block absolute top-12 right-0 bg-white shadow-lg border border-gray-200 py-2 w-36 rounded-md text-sm z-50">
              <li
                onClick={() => navigate("/my-orders")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={logout}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Logout
              </li>
            </ul>
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
          {assets?.cart_icon ? (
            <img className="w-6 h-6" src={assets.cart_icon} alt="cart" />
          ) : (
            <PiShoppingCartThin className="w-6 h-6" />
          )}
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
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="py-2 hover:text-gray-600 transition-colors"
          >
            Contact
          </Link>

          {user && (
            <Link
              to="/my-orders"
              onClick={() => setOpen(false)}
              className="py-2 hover:text-gray-600 transition-colors"
            >
              My Orders
            </Link>
          )}

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
