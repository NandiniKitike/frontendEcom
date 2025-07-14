// // import React, { useState, useEffect } from "react";
// // import { useAppContext } from "../../context/AppContext";
// // import toast from "react-hot-toast";
// // import axios from "axios";

// // const SellerLogin = () => {
// //   const { isSeller, setIsSeller, navigate } = useAppContext();
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const onSubmitHandler = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const response = await axios.post(
// //         "http://localhost:5000/api/auth/admin/login",
// //         {
// //           email,
// //           password,
// //         }
// //       );

// //       const data = response.data;

// //       if (data.success) {
// //         localStorage.setItem("bearerToken", data.token); // Save token
// //         setIsSeller(true);

// //         navigate("/seller/product-list");
// //       } else {
// //         toast.error(data.message);
// //       }
// //     } catch (error) {
// //       toast.error(error?.response?.data?.message || error.message);
// //     }
// //   };

// //   useEffect(() => {
// //     if (isSeller) {
// //       navigate("/seller");
// //     }
// //   }, [isSeller, navigate]); // ✅ Add `navigate` to the dependency array

// //   return (
// //     !isSeller && (
// //       <form
// //         onSubmit={onSubmitHandler}
// //         className="min-h-screen flex items-center text-sm text-gray-600"
// //       >
// //         <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
// //           <p className="text-2xl font-medium m-auto">
// //             <span className="text-green-500">Seller </span>Login
// //           </p>
// //           <div className="w-full">
// //             <p>Email</p>
// //             <input
// //               type="email"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               placeholder="Enter your email"
// //               className="border border-gray-300 rounded w-full p-2 mt-1 outline-green-500"
// //               required
// //             />
// //           </div>
// //           <div className="w-full">
// //             <p>Password</p>
// //             <input
// //               type="password"
// //               value={password} // ✅ Controlled input
// //               onChange={(e) => setPassword(e.target.value)}
// //               placeholder="Enter your password"
// //               className="border border-gray-300 rounded w-full p-2 mt-1 outline-green-500"
// //               required
// //             />
// //           </div>
// //           <button
// //             type="submit"
// //             className="bg-green-500 text-white w-full py-2 rounded-md cursor-pointer"
// //           >
// //             Login
// //           </button>
// //         </div>
// //       </form>
// //     )
// //   );
// // };

// // export default SellerLogin;
// import React, { useState, useEffect } from "react";
// import { useAppContext } from "../../context/AppContext";
// import toast from "react-hot-toast";
// import axios from "axios";

// const SellerLogin = () => {
//   const { isSeller, setIsSeller, navigate } = useAppContext();

//   const [isLogin, setIsLogin] = useState(true); // true = login, false = register

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Submit handler
//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     const url = isLogin
//       ? "http://localhost:5000/api/auth/admin/login"
//       : "http://localhost:5000/api/auth/admin/register"; // replace with your actual register API

//     const payload = isLogin ? { email, password } : { name, email, password };

//     try {
//       const response = await axios.post(url, payload);
//       const data = response.data;

//       if (data.success) {
//         toast.success(data.message);
//         console.log(data);
//         if (isLogin) {
//           localStorage.setItem("bearerToken", data.token);
//           setIsSeller(true);
//           navigate("/seller/product-list");
//         } else {
//           setIsLogin(true); // After successful registration, switch to login mode
//         }
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message || error.message);
//     }
//   };

//   useEffect(() => {
//     if (isSeller) {
//       navigate("/seller");
//     }
//   }, [isSeller, navigate]);

//   return (
//     !isSeller && (
//       <form
//         onSubmit={onSubmitHandler}
//         className="min-h-screen flex items-center text-sm text-gray-600"
//       >
//         <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
//           <p className="text-2xl font-medium m-auto">
//             <span className="text-green-500">Seller </span>
//             {isLogin ? "Login" : "Register"}
//           </p>

//           {!isLogin && (
//             <div className="w-full">
//               <p>Name</p>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter your name"
//                 className="border border-gray-300 rounded w-full p-2 mt-1 outline-green-500"
//                 required
//               />
//             </div>
//           )}

//           <div className="w-full">
//             <p>Email</p>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="border border-gray-300 rounded w-full p-2 mt-1 outline-green-500"
//               required
//             />
//           </div>

//           <div className="w-full">
//             <p>Password</p>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               className="border border-gray-300 rounded w-full p-2 mt-1 outline-green-500"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-green-500 text-white w-full py-2 rounded-md cursor-pointer"
//           >
//             {isLogin ? "Login" : "Register"}
//           </button>

//           <p className="text-center w-full">
//             {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//             <span
//               onClick={() => setIsLogin(!isLogin)}
//               className="text-green-500 cursor-pointer font-semibold"
//             >
//               {isLogin ? "Register" : "Login"}
//             </span>
//           </p>
//         </div>
//       </form>
//     )
//   );
// };

// export default SellerLogin;
import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../../constant";

const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate } = useAppContext();

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const onSubmitHandler = async (e) => {
  //   e.preventDefault();

  //   const url = isLogin
  //     ? `${BASE_URL}/api/auth/admin/login`
  //     : `${BASE_URL}/api/auth/admin/register`;

  //   const payload = isLogin ? { email, password } : { name, email, password };

  //   try {
  //     const response = await axios.post(url, payload);
  //     const data = response.data;
  //     console.log(data, "-===============================");
  //     if (data.success === true && data.token) {
  //       toast.success(isLogin ? "Login successful" : "Registration successful");

  //       if (isLogin) {
  //         localStorage.setItem("bearerToken", data.token);
  //         setIsSeller(true); // Update context and localStorage
  //         navigate("/seller");
  //       } else {
  //         setIsLogin(true); // Switch to login after successful registration
  //       }
  //     } else {
  //       toast.error(data.message || "Something went wrong");
  //     }
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message || error.message);
  //   }
  // };
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? `${BASE_URL}/api/auth/admin/login`
      : `${BASE_URL}/api/auth/admin/register`;

    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await axios.post(url, payload);
      const data = response.data;

      console.log(data, "=== Admin Auth Response ===");

      if (data.success && data.token) {
        toast.success(isLogin ? "Admin login successful" : "Admin registered");

        if (isLogin) {
          localStorage.setItem(
            "admin",
            JSON.stringify({
              token: data.token,
              role: "admin",
              user: data.user,
            })
          );

          setIsSeller(true);
          navigate("/seller", { replace: true });
        } else {
          setIsLogin(true);
        }
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };
  useEffect(() => {
    console.log("Seller status changed:", isSeller);
    if (isSeller) {
      navigate("/seller/products");
    }
  }, [isSeller, navigate]);

  // Prevent rendering form if already seller logged in
  if (isSeller) return null;

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen flex items-center text-sm text-gray-600"
    >
      <div className="flex flex-col gap-5 m-auto items-start p-8 py-12 sm:min-w-88 rounded-lg shadow-xl border border-gray-200">
        <p className="text-2xl font-medium m-auto">
          <span className="text-black">Seller </span>
          {isLogin ? "Login" : "Register"}
        </p>

        {!isLogin && (
          <div className="w-full">
            <p>Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="border border-gray-300 rounded w-full p-2 mt-1 outline-black"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border border-gray-300 rounded w-full p-2 mt-1 outline-black"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="border border-gray-300 rounded w-full p-2 mt-1 outline-black"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white w-full py-2 rounded-md cursor-pointer"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="text-center w-full">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-black cursor-pointer font-semibold"
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </div>
    </form>
  );
};

export default SellerLogin;
