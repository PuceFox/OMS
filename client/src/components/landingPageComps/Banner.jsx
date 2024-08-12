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
    <section className="relative bg-deep-purple-100 overflow-hidden py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-indigo-600 to-purple-500 opacity-20"></div>

      <div className="relative container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-8">
        {/* Banner Image */}
        <div className="flex justify-center items-center relative">
          <div className="relative w-[350px] md:w-[450px]">
            <motion.img
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              src={NewBannerPng}
              alt="Banner"
              className="w-full h-full object-cover rounded-full "
              style={{ borderRadius: "50%" }}
            />
          </div>
        </div>
        {/* Banner Text */}
        <div className="flex flex-col justify-center">
          <div className="text-center md:text-left space-y-12">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
              }}
            >
              The World's Leading Online for Order Management System
            </motion.h1>
            <div className="flex flex-col gap-6">
              <motion.div
                variants={FadeUp(0.2)}
                initial="initial"
                whileInView={"animate"}
                viewport={{ once: true }}
                className="relative flex items-center gap-4 p-6 bg-[#f4f4f4] rounded-full hover:bg-white duration-300 hover:shadow-2xl"
              >
                <div className="absolute -inset-2 rounded-full border-2 border-purple-600"></div>
                <FaBookReader className="text-3xl text-purple-600" />
                <p className="text-lg font-semibold text-gray-800">
                  Analytics Data
                </p>
              </motion.div>
              <motion.div
                variants={FadeUp(0.4)}
                initial="initial"
                whileInView={"animate"}
                viewport={{ once: true }}
                className="relative flex items-center gap-4 p-6 bg-[#f4f4f4] rounded-full hover:bg-white duration-300 hover:shadow-2xl"
              >
                <div className="absolute -inset-2 rounded-full border-2 border-indigo-600"></div>
                <GrUserExpert className="text-3xl text-indigo-600" />
                <p className="text-lg font-semibold text-gray-800">
                  Expert Instruction
                </p>
              </motion.div>
              <motion.div
                variants={FadeUp(0.6)}
                initial="initial"
                whileInView={"animate"}
                viewport={{ once: true }}
                className="relative flex items-center gap-4 p-6 bg-[#f4f4f4] rounded-full hover:bg-white duration-300 hover:shadow-2xl"
              >
                <div className="absolute -inset-2 rounded-full border-2 border-blue-600"></div>
                <MdOutlineAccessTime className="text-3xl text-blue-600" />
                <p className="text-lg font-semibold text-gray-800">
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
