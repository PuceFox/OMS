import React from "react";
import NewBannerPng from "../../assets/o.png";
import { GrUserExpert } from "react-icons/gr";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { motion } from "framer-motion";

export const FadeUp = (delay) => {
  return {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

const Banner1 = () => {
  return (
    <section
      id="features"
      className="relative w-full h-screen bg-deep-purple-100 overflow-hidden flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-indigo-600 to-purple-500 opacity-20"></div>

      <div className="relative container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-8">
        {/* Banner Image */}
        <div className="flex justify-start items-center">
          <div className="relative w-[400px] md:w-[500px] lg:w-[600px] -ml-28">
            <motion.img
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              src={NewBannerPng}
              alt="Banner"
              className="w-full h-full object-cover rounded-full"
              style={{ borderRadius: "50%" }}
            />
          </div>
        </div>
        {/* Banner Text */}
        <div className="flex flex-col justify-center">
          <div className="md:text-left space-y-12">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl font-bold text-white leading-tight"
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
              }}
            >
              The World's Leading Online for Order Management System
            </motion.h1>
            <div className="flex flex-col gap-8">
              <motion.div
                variants={FadeUp(0.2)}
                initial="initial"
                whileInView={"animate"}
                viewport={{ once: true }}
                className="relative flex items-center justify-center gap-4 p-6 bg-[#ffffff] rounded-full hover:bg-[#f4f4f4] duration-300 hover:shadow-2xl"
              >
                <div className="absolute -inset-2 rounded-full border-2 border-purple-600"></div>
                <FaBookReader className="text-5xl text-purple-600" />
                <p className="text-xl font-semibold text-gray-800">
                  Analytics Data
                </p>
              </motion.div>
              <motion.div
                variants={FadeUp(0.4)}
                initial="initial"
                whileInView={"animate"}
                viewport={{ once: true }}
                className="relative flex items-center justify-center gap-4 p-6 bg-[#ffffff] rounded-full hover:bg-[#f4f4f4] duration-300 hover:shadow-2xl"
              >
                <div className="absolute -inset-2 rounded-full border-2 border-indigo-600"></div>
                <GrUserExpert className="text-5xl text-indigo-600" />
                <p className="text-xl font-semibold text-gray-800">
                  AI Integreted for Business Intelligence
                </p>
              </motion.div>
              <motion.div
                variants={FadeUp(0.6)}
                initial="initial"
                whileInView={"animate"}
                viewport={{ once: true }}
                className="relative flex items-center justify-center gap-4 p-6 bg-[#ffffff] rounded-full hover:bg-[#f4f4f4] duration-300 hover:shadow-2xl"
              >
                <div className="absolute -inset-2 rounded-full border-2 border-blue-600"></div>
                <MdOutlineAccessTime className="text-5xl text-blue-600" />
                <p className="text-xl font-semibold text-gray-800">
                  Time Efficiency
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner1;
