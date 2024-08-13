import React from "react";
import { IoMdMenu } from "react-icons/io";
import { motion } from "framer-motion";

const NavbarMenu = [
  { id: 1, title: "Home", path: "#home" },
  { id: 2, title: "Services", path: "#services" },
  { id: 3, title: "Features", path: "#features" },
  { id: 4, title: "Testimonials", path: "#testimonials" },
  { id: 5, title: "About Us", path: "#about" },
];

const Navbar = () => {
  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 text-white shadow-lg z-20">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-4 flex justify-between items-center max-w-7xl"
      >
        {/* Logo section */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-purple-800 font-bold text-xl">O</span>
          </div>
          <h1 className="font-bold text-2xl text-white">Orderly</h1>
        </div>
        {/* Menu section */}
        <div className="hidden lg:flex flex-grow justify-end">
          <ul className="flex items-center gap-12">
            {" "}
            {/* Increased gap here */}
            {NavbarMenu.map((menu) => (
              <li key={menu.id}>
                <a
                  href={menu.path}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(menu.path);
                  }}
                  className="relative group text-white font-semibold text-lg transition duration-300 hover:text-blue-300"
                >
                  {menu.title}
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-300 transition-transform duration-300 scale-x-0 group-hover:scale-x-100 origin-left"></span>
                </a>
              </li>
            ))}
            {/* <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
              Sign In
            </button> */}
          </ul>
        </div>
        <div className="lg:hidden">
          <IoMdMenu className="text-4xl text-white hover:text-blue-300 transition duration-300" />
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
