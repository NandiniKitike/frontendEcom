// import React from "react";
// import { IoIosArrowRoundForward } from "react-icons/io";
// import { Link } from "react-router-dom";
// const Banner = () => {
//   return (
//     <div className="w-full h-[500px] p-3">
//       <div className="relative w-full h-full overflow-hidden">
//         <div className="absolute top-25 left-10">
//           <h1 className="text-4xl font-medium text-white shadow-2xlz">
//             From farm to fridge, from tech to touch <br /> all you need, just a
//             click away.
//           </h1>

//           <div className="mt-8 flex gap-9">
//             <Link to={"/products"}>
//               <div className="bg-black px-3 w-40 h-10 rounded-full text-white text-sm font-semibold flex justify-between items-center border">
//                 Explore Now
//                 <div className="bg-white w-8 h-7 rounded-full flex justify-center items-center overflow-hidden group">
//                   <IoIosArrowRoundForward className="text-black text-2xl transform transition-transform duration-300 group-hover:translate-x-1" />
//                 </div>
//               </div>
//             </Link>
//           </div>
//         </div>
//         <img
//           src="https://images.pexels.com/photos/5645122/pexels-photo-5645122.jpeg"
//           alt="Green Banner"
//           className="w-full h-auto object-cover rounded-lg"
//         />
//       </div>

//       {/* <div>

//       </div> */}

//       {/* <img
//         src={assets.main_banner_bg}
//         alt=""
//         className="w-full hidden md:block"
//       />
//       <img
//         src={assets.main_banner_bg_sm}
//         alt=""
//         className="w-full  md:hidden"
//       />
//       <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24">
//         <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80  lg:max-w-105 leading-tight lg:leading-15">
//           From farm to fridge, from tech to touch — all you need, just a click
//           away
//         </h1>

//         <div className="flex items-center mt-6 font-medium">
//           <Link
//             to={"/products"}
//             className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-green-500 hover:bg-green-600 transition rounded text-white cursor-pointer"
//           >
//             Shop Now
//             <img
//               src={assets.white_arrow_icon}
//               className="md:hidden transition group-focus:translate-x-1"
//               alt="banner"
//             ></img>
//           </Link>
//           <Link
//             to={"/products"}
//             className="group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer"
//           >
//             Explore deals
//             <img
//               src={assets.black_arrow_icon}
//               alt="arrow"
//               className="transition group-hover:translate-x-1"
//             />
//           </Link>
//         </div>
//       </div> */}
//     </div>
//   );
// };
// export default Banner;
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Banner = () => {
  return (
    <div className="w-full lg:h-[500px] sm:h-[100vh] p-3 sm:p-2">
      <div className="relative w-full h-full overflow-hidden rounded-lg">
        {/* Text & Button container */}
        <div className="absolute inset-0 flex flex-col items-start justify-center px-10 sm:items-center sm:justify-center sm:px-4 z-10">
          <h1 className="text-sm sm:text-base md:text-xl lg:text-3xl xl:text-4xl font-semibold  text-white text-left sm:text-center leading-snug">
            "Crisp veggies, juicy fruits straight <br /> from the soil to your
            screen. <br className="hidden sm:block" />
            One click, all fresh!"
          </h1>

          <div className="mt-8 sm:mt-4 flex gap-9 sm:justify-center">
            <Link to={"/products"}>
              <div className="bg-black px-3 sm:px-4 w-40 lg:w-40 m:w-36 h-10 sm:h-9 rounded-full text-white text-sm font-semibold flex justify-between items-center border">
                Explore Now
                <div className="bg-white w-8 sm:w-7 h-7 sm:h-6 rounded-full flex justify-center items-center overflow-hidden group">
                  <IoIosArrowRoundForward className="text-black text-2xl sm:text-xl transform transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Background image */}
        <img
          src={assets.first}
          // "https://images.pexels.com/photos/5645122/pexels-photo-5645122.jpeg"
          alt="Green Banner"
          className="w-full lg:h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default Banner;
