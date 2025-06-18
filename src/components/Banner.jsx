import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <div className="w-full h-[500px] p-3">
      <div className="relative w-full h-full overflow-hidden">
        <div className="absolute top-25 left-10">
          <h1 className="text-4xl font-medium text-white shadow-2xl">
            From farm to fridge, from tech to touch <br /> all you need, just a
            click away.
          </h1>

          <div className="mt-8 flex gap-9">
            <Link to={"/products"}>
              <div className="bg-black px-3 w-40 h-10 rounded-full text-white text-sm font-semibold flex justify-between items-center border">
                Explore Now
                <div className="bg-white w-8 h-7 rounded-full flex justify-center items-center overflow-hidden group">
                  <IoIosArrowRoundForward className="text-black text-2xl transform transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>
        <img
          src="https://images.pexels.com/photos/5645122/pexels-photo-5645122.jpeg"
          alt="Green Banner"
          className="w-full h-auto object-cover rounded-lg"
        />
      </div>

      {/* <div>
       
      </div> */}

      {/* <img
        src={assets.main_banner_bg}
        alt=""
        className="w-full hidden md:block"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt=""
        className="w-full  md:hidden"
      />
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80  lg:max-w-105 leading-tight lg:leading-15">
          From farm to fridge, from tech to touch — all you need, just a click
          away
        </h1>

        <div className="flex items-center mt-6 font-medium">
          <Link
            to={"/products"}
            className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-green-500 hover:bg-green-600 transition rounded text-white cursor-pointer"
          >
            Shop Now
            <img
              src={assets.white_arrow_icon}
              className="md:hidden transition group-focus:translate-x-1"
              alt="banner"
            ></img>
          </Link>
          <Link
            to={"/products"}
            className="group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer"
          >
            Explore deals
            <img
              src={assets.black_arrow_icon}
              alt="arrow"
              className="transition group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div> */}
    </div>
  );
};
export default Banner;
