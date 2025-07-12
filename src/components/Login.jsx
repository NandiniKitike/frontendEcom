// import React from "react";
// import { useAppContext } from "../context/AppContext";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// const Login = () => {
//   const [state, setState] = React.useState("login"); // "login" or "register"
//   const [name, setName] = React.useState("");
//   const [email, setEmail] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const { setUser, setShowUserLogin } = useAppContext();
//   const navigate = useNavigate();

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       if (state === "login") {
//         const { data } = await axios.post(
//           "http://localhost:5000/api/auth/customer/login",
//           { email, password }
//         );
//         console.log("API Response:", data);

//         if (data.success) {
//           setUser(data.user);
//           setShowUserLogin(false);
//           toast.success("Login successful!");
//           navigate("/seller");

//           navigate("");
//         } else {
//           toast.error(data.message);
//         }
//       } else {
//         const { data } = await axios.post(
//           "http://localhost:5000/api/auth/customer/register",
//           { name, email, password }
//         );

//         if (data?.user) {
//           toast.success("Registration successful. Please login.");
//           setState("login");
//           setName("");
//           setEmail("");
//           setPassword("");
//           navigate("/seller");
//         } else {
//           toast.error(data.message);
//         }
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//     }
//   };

//   return (
//     <div
//       onClick={() => setShowUserLogin(false)}
//       className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50"
//     >
//       <form
//         onClick={(e) => e.stopPropagation()}
//         onSubmit={onSubmitHandler}
//         className="flex flex-col gap-4 m-auto items-center p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
//       >
//         <p className="text-2xl font-medium m-auto">
//           <span>USER</span> {state === "login" ? "Login" : "Sign Up"}
//         </p>

//         {state === "register" && (
//           <div className="w-full">
//             <p>Name</p>
//             <input
//               placeholder="Enter Name"
//               onChange={(e) => setName(e.target.value)}
//               value={name}
//               className="border border-gray-300 rounded w-full p-2 mt-1 outline-black"
//               required
//             />
//           </div>
//         )}

//         <div className="w-full">
//           <p>Email</p>
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             className="border border-gray-300 rounded w-full p-2 mt-1 outline-black"
//             placeholder="Enter Email"
//             type="email"
//             required
//           />
//         </div>

//         <div className="w-full">
//           <p>Password</p>
//           <input
//             placeholder="Enter Password"
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//             className="border border-gray-300 rounded w-full p-2 mt-1 outline-black"
//             value={password}
//             required
//           />
//         </div>

//         {state === "register" ? (
//           <p>
//             Already have an account?{" "}
//             <span
//               onClick={() => setState("login")}
//               className="text-black cursor-pointer"
//             >
//               Login here
//             </span>
//           </p>
//         ) : (
//           <p>
//             Create account?{" "}
//             <span
//               onClick={() => setState("register")}
//               className="text-black cursor-pointer"
//             >
//               Sign Up
//             </span>
//           </p>
//         )}

//         <button className="bg-black p-2 rounded hover:bg-black transition-all text-white w-full">
//           {state === "register" ? "Create Account" : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
import React from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL, setCookie } from "../../constant";

// ✅ Use baseURL from axios config

const Login = () => {
  const [state, setState] = React.useState("login"); // "login" or "register"
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setUser, setShowUserLogin } = useAppContext();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === "login") {
        const { data } = await axios.post(
          `${BASE_URL}/api/auth/customer/login`,
          { email, password },
          { withCredentials: true }
        );
        console.log("API Response:", data);

        if (data.success) {
          setCookie("token", data.data.token, 7);

          localStorage.setItem("user", JSON.stringify(data.user));
          if (data.user.role === "admin") {
            localStorage.setItem("admin", JSON.stringify(true));
          }

          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${data.user.token}`;

          setUser(data.user);
          setShowUserLogin(false);

          toast.success("Login successful!");
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(
          `${BASE_URL}/api/auth/customer/register`,
          { name, email, password },
          { withCredentials: true }
        );

        if (data?.user) {
          toast.success("Registration successful. Please login.");
          setState("login");
          setName("");
          setEmail("");
          setPassword("");
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-4 m-auto items-center p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span>USER</span> {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-gray-300 rounded w-full p-2 mt-1 outline-black"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-gray-300 rounded w-full p-2 mt-1 outline-black"
            placeholder="Enter Email"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            placeholder="Enter Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded w-full p-2 mt-1 outline-black"
            value={password}
            required
          />
        </div>

        {state === "register" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-black cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-black cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        )}

        <button className="bg-black p-2 rounded hover:bg-black transition-all text-white w-full">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
