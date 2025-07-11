import React from "react";
import { assets } from "../assets/assets";
const BottomBanner = () => {
  return (
    <div className="relative mt-24">
      {/* <img
        src={assets.bottom_banner_image}
        alt="banner"
        className="w-full hidden md:block"
      />
      <img src={assets.bottom_banner_image_sm} className="w-full  md:hidden" />
      <div className="absolute inset-0 flex flex-col items-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-black mb-6">
            why we are the best..?
          </h1>
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4 mt-4">
              <img
                className="md:w-11 w-6"
                src={feature.icon}
                alt={feature.title}
              />
              <div>
                <h3 className="text-lg md:text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div> */}
      {/* </div> */}
      <div>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          width="full"
          height="100"
          className="w-full h-auto object-cover"
        >
          <source src={assets.bannervid} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default BottomBanner;
