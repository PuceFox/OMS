import React from "react";
import { motion } from "framer-motion";
import { GiCommercialAirplane } from "react-icons/gi";
import { GiAirplaneDeparture } from "react-icons/gi";
import { PiAirplaneTiltBold } from "react-icons/pi";
const ServicesData = [
  {
    id: 1,
    title: "VIP : Premium service with extra comfort",
    link: "#",
    icon: <GiCommercialAirplane />,
    delay: 0.2,
  },
  {
    id: 2,
    title: "Medevac : Medical evacuation service",
    link: "#",
    icon: <PiAirplaneTiltBold />,
    delay: 0.3,
  },
  {
    id: 3,
    title: "Citytour: Guided city tours",
    link: "#",
    icon: <GiAirplaneDeparture />,
    delay: 0.4,
  },
];

// Animation for sliding from left
const SlideLeft = (delay) => {
  return {
    initial: {
      opacity: 0,
      x: 50,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

const Services = () => {
  return (
    <section
      id="services"
      className="relative bg-indigo-200 h-screen w-full overflow-hidden py-16"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-indigo-500 to-blue-100 opacity-30"></div>

      <div className="relative container mx-auto pb-7 pt-40 px-4 md:px-8">
        <h1
          className="text-4xl md:text-5xl font-extrabold text-center text-white mb-28 leading-tight border-b-4 border-white pb-10"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Discover Our <br /> Exceptional Services
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-20 mr-12 ml-16">
          {ServicesData.map((service) => (
            <motion.div
              key={service.id}
              variants={SlideLeft(service.delay)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="relative bg-[#f4f4f4] rounded-full flex flex-col items-center justify-center p-5 hover:bg-blue-200 hover:shadow-2xl hover:scale-105 duration-300"
              style={{ height: "300px", width: "300px" }}
            >
              <div className="relative z-10 text-6xl text-purple-600 mb-4">
                {service.icon}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 text-center">
                {service.title}
              </h2>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100 opacity-30 rounded-full"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
