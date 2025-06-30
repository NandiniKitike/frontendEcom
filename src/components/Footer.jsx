import { assets } from "../assets/assets";
import { footerLinks } from "../assets/assets";
const Footer = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-24 bg-black">
      <div className="flex flex-col md:flex-row justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div className="md:w-1/3">
          <img className="w-24 md:w-32" src={assets.logo} alt="Logo" />
          <p className="mt-6 text-white max-w-sm">
            Fresh, fast, and fabulous — your favorites are just a cart away!
          </p>
        </div>

        <div className="flex flex-wrap justify-between gap-10 md:w-2/3">
          {footerLinks.map((section, index) => (
            <div key={index} className="min-w-[140px]">
              <h3 className="font-bold text-white text-base mb-3 md:mb-4">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      className="text-white hover:underline transition"
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

      {/* Copyright */}
      <div className="text-white text-center text-sm py-4">
        © {new Date().getFullYear()} Zentra. All rights reserved.
      </div>
    </div>
  );
};
export default Footer;
