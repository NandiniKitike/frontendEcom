import axios from "axios";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { NavLink, Outlet, Link } from "react-router-dom";
import { BASE_URL } from "../../../constant";

const SellerLayout = () => {
  const { navigate, setUser } = useAppContext();

  // const logout = async () => {
  //   try {
  //     const { data } = await axios.post(`${BASE_URL}/api/auth/logoutadmin`);
  //     if (data.success) {
  //       toast.success(data.message);
  //       navigate("/");
  //     } else {
  //       toast.success(data.message);
  //     }
  //   } catch (error) {
  //     toast.success(error.message);
  //   }
  // };
  const logout = async () => {
    try {
      // 🛑 Call backend to clear cookie
      await axios.post(
        `${BASE_URL}/api/auth/logoutadmin`,
        {},
        { withCredentials: true } // send cookie
      );

      // 🧹 Clean frontend state
      localStorage.removeItem("bearerToken");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);

      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Logout failed. Please try again.");
    }
  };

  const sidebarLinks = [
    {
      name: "product List",
      path: "/seller",
      icon: assets.product_list_icon,
    },
    { name: "orders", path: "/seller/orders", icon: assets.order_icon },
    {
      name: "categories",
      path: "/seller/category-list",
      icon: assets.order_icon,
    },
  ];

  return (
    <>
      {/* Top Navigation */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-1 bg-white">
        <Link to="/">
          <img
            className="w-10 md:w-15 cursor-pointer"
            src={assets.logo}
            alt="logo"
          />
        </Link>
        <div className="flex items-center gap-5 text-black">
          <p>Hi! Admin</p>
          <button
            onClick={logout}
            className="border rounded-full text-sm hover:bg-black hover:text-white px-5 py-2"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content: Sidebar + Page Content in Row */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="md:w-64 w-16 border-r h-[100vh] text-base border-gray-300 pt-4 flex flex-col">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] hover:bg-gray-300  hover:text-black border-black text-black"
                    : "hover:bg-gray-100/90 border-white "
                }`}
            >
              <img src={item.icon} alt="" className="w-7 h-7" />
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
          ))}
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SellerLayout;
