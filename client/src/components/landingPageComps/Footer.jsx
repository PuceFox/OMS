import React from "react";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { motion } from "framer-motion";

const FooterPage = () => {
  return (
    <footer
      id="about"
      className="py-20 bg-gradient-to-r from-purple-800 to-blue-600"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-6">
          {/* first section */}
          <div className="space-y-4 max-w-[300px] text-white">
            <h1 className="text-3xl font-bold">About Us</h1>
            <p>
              Orderly is a leading order management solution designed
              specifically to meet the needs of the aviation industry. We
              understand the complexities and dynamics of this sector, and we
              are here to optimize your order management processes for greater
              efficiency and direction.
            </p>
          </div>
          {/* second section */}
          <div className="grid grid-cols-2 gap-8 text-white">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Services</h1>
              <ul className="space-y-2 text-lg">
                <li className="cursor-pointer hover:text-blue-200 duration-200">
                  VIP
                </li>
                <li className="cursor-pointer hover:text-blue-200 duration-200">
                  Madevac
                </li>
                <li className="cursor-pointer hover:text-blue-200 duration-200">
                  City Tour
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Links</h1>
              <ul className="space-y-2 text-lg">
                <li className="cursor-pointer hover:text-blue-200 duration-200">
                  Home
                </li>
                <li className="cursor-pointer hover:text-blue-200 duration-200">
                  Services
                </li>
                <li className="cursor-pointer hover:text-blue-200 duration-200">
                  Features
                </li>
                <li className="cursor-pointer hover:text-blue-200 duration-200">
                  About Us
                </li>
              </ul>
            </div>
          </div>
          {/* third section */}
          <div className="space-y-4 max-w-[300px] text-white">
            <h1 className="text-2xl font-bold">Get In Touch</h1>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Enter your email"
                className="p-3 rounded-s-xl bg-purple-700 bg-opacity-80 w-full py-4 focus:ring-0 focus:outline-none placeholder:text-gray-300 text-white"
              />
              <button className="bg-blue-800 text-white font-semibold py-4 px-6 rounded-e-xl hover:bg-blue-500 duration-300">
                Go
              </button>
            </div>
            {/* social icons */}
            <div className="flex space-x-6 py-3">
              <a href="https://chat.whatsapp.com/Eg3VHplzgwzJC3u6h3z9RU">
                <FaWhatsapp className="cursor-pointer hover:text-blue-300 hover:scale-105 duration-200" />
              </a>
              <a href="https://www.instagram.com/hacktiv8id?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                <FaInstagram className="cursor-pointer hover:text-blue-300 hover:scale-105 duration-200" />
              </a>
              <a href="https://www.hacktiv8.com/">
                <TbWorldWww className="cursor-pointer hover:text-blue-300 hover:scale-105 duration-200" />
              </a>
              <a href="https://www.youtube.com/@HACKTIV8">
                <FaYoutube className="cursor-pointer hover:text-blue-300 hover:scale-105 duration-200" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default FooterPage;
