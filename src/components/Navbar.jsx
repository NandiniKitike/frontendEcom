import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import { PiShoppingCartThin } from "react-icons/pi";
const Navbar = () => {
  console.log("rendered");
  const [open, setOpen] = React.useState(false);
  //tested
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    searchQuery,
    loadingUser,
    // loadingAdmin,
    setSearchQuery,
    // fetchCart,

    count,
  } = useAppContext();
  const logout = async () => {
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery, navigate]);

  if (loadingUser) return null;

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link to="/">
        <img className="h-9" src={assets.logo} alt="logo" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center text-black gap-8">
        <Link to="/">Home</Link>
        <Link to="/products">All Products</Link>
        <Link to="/contact">Contact</Link>

        <div className="hidden lg:flex text-black items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => {
              console.log("Input changed:", e.target.value);
              setSearchQuery(e.target.value);
            }}
            className="py-1.5 w-full bg-transparent outline-none placeholder-black"
            type="text"
            placeholder="Search products"
          />
          <img
            className="w-4 h-4 text-black"
            src={assets.search_icon}
            alt="search"
          />
        </div>

        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <div className="relative cursor-pointer">
            <PiShoppingCartThin />
            <button className="absolute -top-2 -right-3 text-xs text-white bg-black w-[18px] h-[16px] rounded-full">
              {count || 0}
            </button>
          </div>
        </div>

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="group flex  gap-2 w-25 justify-center h-10 md:px-9 py-3 bg-black rounded-full transition text-center items-center text-white cursor-pointer"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img src={assets.profile_icon} className="w-10" alt="profile" />
            <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
              <li
                onClick={() => navigate("/my-orders")}
                className="p-1.5 pl-3 hover:primary-300 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={logout}
                className="p-1.5 pl-3 hover:primary-300 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex  gap-6 sm:hidden">
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img className="w-4" src={assets.cart_icon} alt="cart" />
          <button className="absolute -top-2 -right-3 text-xs text-black bg-primary w-[16px] h-[16px] rounded-full">
            {count}{" "}
          </button>
        </div>

        <button
          onClick={() => (open ? setOpen(false) : setOpen(true))}
          aria-label="Menu"
          className=""
        >
          {/* Menu Icon SVG */}
          <img src={assets.menu_icon} alt="menu" />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className={`${
            open ? "flex" : "hidden"
          } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
        >
          <Link
            to="/"
            onClick={() => {
              setOpen(false);
            }}
          >
            Home
          </Link>
          <Link to="/products" onClick={() => setOpen(false)}>
            <button> All Products</button>
          </Link>
          <Link to="/contact" onClick={() => setOpen(false)}>
            contact
          </Link>
          {user && (
            <Link
              to="/my-orders"
              onClick={() => setOpen(false)}
              className="hover:border-b-2 hover:border-primary hover:text-primary transition duration-200"
            >
              my orders
            </Link>
          )}
          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 w-40 h-10 py-2 mt-2 bg-primary hover:bg-black transition text-black rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-black transition text-white rounded-full text-sm"
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
