import { assets } from "../assets/assets";
import { footerLinks } from "../assets/assets";
const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-gray-700">
      <div className="flex flex-col md:flex-row  justify-between  py-10 border-b border-gray-500/30 text-gray-500">
        <div>
          <img className="w-30 md:w-32" src={assets.logo} />
          <p className="max-w-[410px] mt-6 text-white">
            Fresh, fast, and fabulous — your favorites are just a cart away!
          </p>
        </div>
        <div className="flex flex-wrap justify-betweenn w-full md:w-[45%] gap-30">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold text-white text-base  md:mb-6 mb-2">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      className=" text-white hover:underline transition"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className=" text-white text-center">
        {new Date().getFullYear()} © 2025 Trendora. All rights reserved.
      </div>
    </div>
  );
};
export default Footer;
