import React from "react";
import Navbar from "../../components/landingPageComps/Navbar";
import { IoIosArrowRoundForward } from "react-icons/io";
import HeroPng from "../../assets/logo.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Function for framer-motion animation
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
        stiffness: 120,
        duration: 0.8,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

const Hero = () => {
  return (
    <>
      <Navbar />
      <section
        id="home"
        className="relative bg-gray-100 overflow-hidden min-h-screen flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-indigo-600 to-blue-300 opacity-80"></div>
        <div className="relative container grid grid-cols-1 md:grid-cols-2 gap-8 px-4 py-6 md:py-24">
          {/* Brand Info */}
          <div
            id="brand-info"
            className="flex flex-col justify-center py-14 md:py-0 relative z-20 text-center md:text-left"
          >
            <div className="space-y-6 lg:max-w-xl mx-auto md:mx-0">
              <motion.h1
                variants={FadeUp(0.6)}
                initial="initial"
                animate="animate"
                className="text-4xl md:text-5xl sm:text-6xl font-semibold leading-tight text-deep-purple-100"
                style={{
                  textShadow: "5px 8px 5px rgba(0, 0, 0, 0.4)",
                }}
              >
                Plan Your Exclusive Journey with Us
              </motion.h1>
              <br />
              <motion.div
                variants={FadeUp(0.8)}
                initial="initial"
                animate="animate"
                className="flex justify-center md:justify-start"
              >
                <Link
                  to="/form"
                  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 px-6 rounded-full flex items-center gap-2 group hover:from-blue-800 hover:to-blue-300 transition duration-300 ease-in-out shadow-md ring-1 ring-purple-300"
                >
                  Get Started
                  <IoIosArrowRoundForward className="text-xl group-hover:translate-x-2 group-hover:-rotate-45 duration-300" />
                </Link>
              </motion.div>
            </div>
          </div>
          {/* Hero Image */}
          <div
            id="hero-image"
            className="relative flex justify-center items-center"
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
              src={HeroPng}
              alt="Hero"
              className="relative z-10"
              style={{
                maxWidth: "110%",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "20px",
                padding: "30px",
                filter: "brightness(0.9)",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
